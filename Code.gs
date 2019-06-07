function doPost(e) {
var sheet = SpreadsheetApp.openById("1HVbmbCTf3TtT1_PQw5vNi7lCZhRjaW9SYWn8ha4yK90");
var range = sheet.getRange("A1");
range.setValue("testing!");
  
var names = [];

//Return if null
if( e == undefined ) {
  Logger.log("no data");
  return HtmlService.createHtmlOutput("need data");
}


var data = JSON.parse(e.postData.contents);
var splitNames = data.split(",");


for(var [key,val] in splitNames){
/*
  Logger.log("split names for " + splitNames[key]);
  Logger.log("type of " + typeof(splitNames[key]));
  */
  
  Logger.log("spliting the split name " + splitNames[key].split(":")[1].slice(0, -1));

  
  names.push(splitNames[key].split(":")[1].slice(0, -1));
    }

Logger.log("Length of names array");
Logger.log(names.length);
  
Logger.log("names are now");
Logger.log(names);
  
}
