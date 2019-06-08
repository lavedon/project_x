function doPost(e) {
// If you do not specify a sheet within the spreadsheet only a1notation will work in getRange
var ss = SpreadsheetApp.openById("1HVbmbCTf3TtT1_PQw5vNi7lCZhRjaW9SYWn8ha4yK90");
var sheet = ss.getSheets()[0];


                       
  
var names = [];
var facebookURLs = [];
  
//Return if null
if( e == undefined ) {
  Logger.log("no data");
  return HtmlService.createHtmlOutput("need data");
}


var data = JSON.parse(e.postData.contents);
// Logger.log("data is: " + data);
  
var splitNames = data.split("}");

// Logger.log("splitnames is: " + typeof(splitNames));
Logger.log("splitNames length is: " + splitNames.length);

// Logger.log("splitNames are: " + splitNames);
  
for(var [key,val] in splitNames){

/*
Logger.log("split names for " + splitNames[key]);


Logger.log("key is: " + key);
Logger.log("val is: " + val);
*/  
 
var entry = splitNames[key];

var splitEntry = entry.split("facebookURL");
// Logger.log("typeof splitEntry[0]: " + typeof(splitEntry[0]));
// Logger.log("splitEntry[0] is: " + splitEntry[0]);
var dirtyName = splitEntry[0];
// Logger.log("dirtyName is: " + dirtyName); 

var name = dirtyName.split(":")[1].slice(1, -3);
// Logger.log("name is: " + name);

// Logger.log("entry is: " + entry);
var facebookURL = entry.split(":")[3].slice(2, -2);
// Logger.log("facebookURL is: " + facebookURL);

// Logger.log("pushing to names");  
names.push(name);
  
// Logger.log("pushing to facebookURL");
facebookURLs.push(facebookURL);

  
}

Logger.log("names are: ");
Logger.log(names);

/*  
Logger.log("facebookURLs are: ");
Logger.log(facebookURLs);

var sheetData = names.map(function (el) {
     el.replace("}", "");
     
     return [el];
  });


/*    
Logger.log("2d array of names are:");
Logger.log(sheetNames);
Logger.log("Length of sheetNames: " + sheetNames.length);
Logger.log("Now trying to write to sheet");


                               
var range = sheet.getRange(1, 1, sheetNames.length, 1);
 
range.setValues(sheetNames);

  */
}
