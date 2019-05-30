function doPost(e) {
  Logger.log("doPost called!");
  var ss = SpreadsheetApp.openById("1HVbmbCTf3TtT1_PQw5vNi7lCZhRjaW9SYWn8ha4yK90");
  var sheet = ss.getSheetByName("Sheet1");
  var data = JSON.parse(e.postData.contents);
  var values = [];
  
  Logger.log(data);
  Logger.log("Length of data is " + data.length);
  
  for (var i = 0; i < data.length; i++) {
    Logger.log("Pushing data" + data[i].name);
    values.push(data[i].name);  
    Logger.log("values array now = " + values);
  }

  Logger.log("Loop done.  Values now has " + values);
  
  sheet.getRange(sheet.getLastRow()+1, 1, values.length).setValues(values);
  }
