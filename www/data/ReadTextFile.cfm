<cfif isDefined ("name") AND isDefined ("time")>
	<cfset namefromurl="#name#">
    <cfset timefromurl ="#time#">
</cfif>

<cffile action = "append" file = "#ExpandPath( "./" )#highscore.txt" output = "#namefromurl#|#timefromurl#" fixnewline = "yes">

<cffile action="read" file="#ExpandPath( "./" )#highscore.txt" variable="RawData">





<cfset TempTable = QueryNew("nametemp,timetemp","VarChar,Integer")>

	<cfset count = 0>

    <cfloop list="#RawData#" delimiters="#CHR(10)#" index="i">
        <cfset count = count +1 >
        <cfif ListLen(i,'|') GTE 0>
            <cfset namex = ListGetAt(i,1,'|')>
            <cfset timex = ListGetAt(i,2,'|')>              
            <cfset temp = QueryAddRow(TempTable)>
            <cfset temp = QuerySetCell(TempTable, "nametemp", "#namex#", #count#)>
            <cfset temp = QuerySetCell(TempTable, "timetemp", "#timex#", #count#)>
        </cfif>
    </cfloop>

    <cfquery name="outputxml" dbtype="query">
        SELECT *
        FROM TempTable
        ORDER by timetemp
    </cfquery>
                
    <cfxml variable="xmlPacket">
    <?xml version="1.0" encoding="UTF-8"?>
    <xmlData>   
        <scores>
            <cfoutput query="outputxml">
                <score>
                  <name>#nametemp#</name>
                  <time>#timetemp#</time>
                </score>
            </cfoutput>
        </scores>   
    </xmlData>
    </cfxml>
    
    <cffile action="write" file="#ExpandPath( "./" )#highscore.xml" output=#toString(xmlPacket)#>

                



