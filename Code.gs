function doPost(e) {
var sheet = SpreadsheetApp.openById("1HVbmbCTf3TtT1_PQw5vNi7lCZhRjaW9SYWn8ha4yK90");
var range = sheet.getRange("A1");
range.setValue("testing!");
  
var names = [];
  Logger.log("doPost called!");
  //Return if null
if( e == undefined ) {
    Logger.log("no data");
    return HtmlService.createHtmlOutput("need data");
}

var params = JSON.stringify(e);
var data = JSON.parse(e.postData.contents);
Logger.log("data is, only 1 parse");
Logger.log(data);
  
Logger.log("data keys are");
Logger.log(Object.keys(data));
  
Logger.log("More parsing");
var furtherData = JSON.parse(data);
Logger.log("data is now:");
Logger.log(furtherData);
  
Logger.log("furtherData keys are");
Logger.log(Object.keys(furtherData));
  
  
Object.keys(furtherData).forEach(function(name) {
   Logger.log(Object.values(name));
   names.push(Object.values(name));
});
  
Logger.log(names);
  
return HtmlService.createHtmlOutput(params);

  
}
