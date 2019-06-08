function zip() {
    var args = [].slice.call(arguments);
    var longest = args.reduce(function(a,b){
        return a.length>b.length ? a : b
    }, []);

    return longest.map(function(_,i){
        return args.map(function(array){return array[i]})
    });
}



function doPost(e) {
// If you do not specify a sheet within the spreadsheet only a1notation will work in getRange
var ss = SpreadsheetApp.openById("1HVbmbCTf3TtT1_PQw5vNi7lCZhRjaW9SYWn8ha4yK90");
var sheet = ss.getSheets()[0];


                       
  
var names = [];
var facebookURLs = [];
var splitNames = {};  
  
//Return if null
if( e == undefined ) {
  Logger.log("no data");
  return HtmlService.createHtmlOutput("need data");
}

var data = JSON.parse(e.postData.contents);

  
var splitNames = data.split("}");

Logger.log("splitNames length is: " + splitNames.length);


var i = 0;
  
for(var [key,val] in splitNames){
var entry = splitNames[key];
var splitEntry = entry.split("facebookURL");
var dirtyName = splitEntry[0];
var name = dirtyName.split(":")[1].slice(1, -3);
var facebookURL = entry.split(":")[3].slice(2, -2);
i++;

names.push(name);
facebookURLs.push(facebookURL);

// why do I have to do this?
  if (i == splitNames.length - 1) {
   break; 
  }

}

Logger.log("Loop finished.");



var sheetArray = zip(names, facebookURLs);


Logger.log("2d array of names are:");
Logger.log(sheetArray);
Logger.log("Length of sheetArray: " + sheetArray.length);
Logger.log("Now trying to write to sheet");

                               
var range = sheet.getRange(1, 1, sheetArray.length, 2);
 
range.setValues(sheetArray);

}
