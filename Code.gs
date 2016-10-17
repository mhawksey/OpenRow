// var KEYS = ['row', 'header', 'sheet', 'id' ];

function doGet(e) {
  var html = HtmlService.createTemplateFromFile('index');
  html.e = e.parameter;
  return html.evaluate().setTitle('Opening a row...');
}

function setCache(parameter){
  var values = {
     'row': parameter.row,
     'header':parameter.header,
     'sheet':parameter.sheet,
     'id': parameter.id
   };
  // tried CacheService but seemed unreliabe 
  // CacheService.getUserCache().putAll(values, 10000); // expires in 10 seconds
  PropertiesService.getUserProperties().setProperties(values)
  return "https://docs.google.com/spreadsheets/d/"+parameter.id+"/edit";
}


function getCache_(){
  // tried CacheService but seemed unreliabe 
  // return CacheService.getUserCache().getAll(KEYS);
  return PropertiesService.getUserProperties().getProperties();
}

function showRow(doc){ 
  var cache = getCache_();
 
  try {
    // if cache is set and id matches handle open row for editing
    if (cache.id && cache.id === doc.getId()){
      doc.toast("Opened on row for editing...");
      var sheet = doc.getSheetByName(cache.sheet);
      if (sheet != null) {
        if(cache.row){
          sheet.hideRows(2, sheet.getLastRow()-1); // hide all the rows
          sheet.showRows(cache.row); // show row
          if (cache.header > 0){ // if header set show it
            sheet.showRows(1, cache.header);
          } else {
            sheet.hideRow(1);
          }
          doc.setActiveRange(sheet.getRange("B1")); // set to row one first to keep above fold
          doc.setActiveRange(sheet.getRange("A"+cache.row));
        }
        PropertiesService.getUserProperties().setProperty("id", "");
      }
      // tried CacheService but seemed unreliabe 
      //CacheService.getUserCache().removeAll(KEYS)
    } else {
      // default to showing all rows .. bit of a hacky way of doing it
      var sheets = doc.getSheets();
      for(var n in sheets){
        sheets[n].showRows(1, sheets[n].getLastRow());
      }
      doc.toast("Showing all rows...");
    }
  } catch(e) {
    PropertiesService.getUserProperties().setProperty("id", "");
    doc.toast("Error on " +e.lineNumber + " "+e.message);
  }
}