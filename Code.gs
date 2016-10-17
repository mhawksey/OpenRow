var KEYS = ['row', 'header', 'sheet', 'id' ];

function doGet(e) {
  var html = HtmlService.createTemplateFromFile('index');
  html.e = e.parameter;
  return html.evaluate().setTitle('Opening a row...');
}

function getCache(){
  return CacheService.getUserCache().getAll(KEYS);
  // if CacheService breaks you can 
  // return Properties Service.getUserProperties().getProperties();
}

function setCache(parameter){
  var values = {
     'row': parameter.row,
     'header':parameter.header,
     'sheet':parameter.sheet,
     'id': parameter.id
   };

  CacheService.getUserCache().putAll(values, 10); // expires in 10 seconds
  // if CacheService breaks you can 
  //Properties Service.getUserProperties().setProperties(values)
  return "https://docs.google.com/spreadsheets/d/"+parameter.id+"/edit";
}

function showRow(ss){
  var cache = getCache();
  // if cache is set and id matches handle open row for editing
  if (cache.id && cache.id === ss.getId()){
    var sheet = ss.getSheetByName(cache.sheet);
    if (sheet != null) {
      if(cache.row){
        sheet.hideRows(1, sheet.getLastRow()); // hide all the rows
        sheet.showRows(cache.row); // show row
        if (cache.header > 0){ // if header set show it
          sheet.showRows(1, cache.header);
        }
        ss.setActiveRange(sheet.getRange("A1")); // set to row one first to keep above fold
        ss.setActiveRange(sheet.getRange("A"+cache.row));
      }
    }
    CacheService.getUserCache().removeAll(KEYS)
    // if CacheService breaks you can 
    // Properties Service.getUserProperties().deleteAllProperties();
    ss.toast("Opened on row for editting");
  } else {
    // default to showing all rows .. bit of a hacky way of doing it
    var sheets = ss.getSheets();
    for(var n in sheets){
      sheets[n].showRows(1, sheets[n].getLastRow());
    }
  }
}