# OpenRow
Google Script Library for opening Google Sheet on a row for editing 

To use this library: 

1. create a new Google Sheet
1. Open Tools > Script editor and in the editor open Resources > Libraries 
1. In the Find Libraries box enter the script id: `11ZaVyzV5H3yp5f-MxAlY04Z6FTJ-sYbkGZKNUqu8pCVLSVofUeIZA9Oa`
1. Select the most recent version of OpenRow and click save to close the library window

Finally in the script editor add the following function:

	function onOpen(){
  		var ss = SpreadsheetApp.getActiveSpreadsheet();
  		OpenRow.showRow(ss);
	}

To open your sheet at a row for editing direct users to the following url replacing the values as indicated:
`https://script.google.com/macros/s/AKfycbzG9_2mWd6x7zFf9V6PH33ORRzZWcVGi_pQs500nbs5Pbdkwy26/exec?id=YOUR_SHEET_ID&sheet=YOUR_SHEET_NAME&row=YOUR_ROW_NUMBER`

Optionally if you wish to include a header row when the sheet opens use `&header=NUMBER_OF_ROWS_FOR_HEADER`

You are welcome to fork this library and modify the functionality to meet your needs.

Here is a [blog post explaining this library](https://mashe.hawksey.info/?p=17359).
