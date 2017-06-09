<cfif isDefined ("name") AND isDefined ("time")>
	<cfset namefromurl="#name#">
    
	<cfif IsNumeric(time)>     
    	<cfset timefromurl ="#time#">
    <cfelse>
		<cfset timefromurl =999999>
    </cfif>

</cfif>

<cffile action = "append" file = "#ExpandPath( "./" )#highscore.txt" output = "#namefromurl#|#timefromurl#" fixnewline = "yes">
<cffile action="read" file="#ExpandPath( "./" )#highscore.txt" variable="RawData">

<cfset TempTable = QueryNew("nametemp,timetemp","VarChar,BigInt")>

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

<!--- Query Temp Table--->
<cfquery name="outputxml" dbtype="query">
	SELECT *
	FROM TempTable
	ORDER by timetemp
</cfquery>
		  
<!--- Format XML file---> 
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

<!--- Delete highscore text file---> 
<cffile action = "delete" file = "#ExpandPath( "./" )#highscore.txt">   

<!--- Write data to highscore text file---> 
<cfoutput query="outputxml" maxrows="10">
	<cffile action = "append" file = "#ExpandPath( "./" )#highscore.txt" output = "#LEFT(nametemp,3)#|#timetemp#" addnewline="yes">	
</cfoutput>
 
<!--- Write data to highscore XML file--->  
<cffile action="write" file="#ExpandPath( "./" )#highscore.xml" output=#toString(xmlPacket)#>

                



