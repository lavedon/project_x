function doPost(e) {
// If you do not specify a sheet within the spreadsheet only a1notation will work in getRange
var ss = SpreadsheetApp.openById("1HVbmbCTf3TtT1_PQw5vNi7lCZhRjaW9SYWn8ha4yK90");
var sheet = ss.getSheets()[0];


                       
  
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
  
 
  
  
  Logger.log("spliting the split name " + splitNames[key].split(":")[1].slice(1, -2));
 */

  
  names.push(splitNames[key].split(":")[1].slice(1, -2));
  

}
  

var sheetNames = names.map(function (el) {
     el.replace("}", "");
     
     return [el];
  });


    
Logger.log("2d array of names are:");
Logger.log(sheetNames);
Logger.log("Length of sheetNames: " + sheetNames.length);
Logger.log("Now trying to write to sheet");


                               
var range = sheet.getRange(1, 1, sheetNames.length, 1);
 
range.setValues(sheetNames);

  
}
