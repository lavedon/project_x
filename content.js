var blocks;
var webappUrl;
var output;
var companyName;
var description;
var phoneNumber;
var emailContact;
var numOfEmployees;
var city;
var profileUrl;
var specialties;
var JSONdata;

JSONdata = { pet: "Mommy Cat"};

document.body.style = "background: #f00";
webappUrl = "https://script.google.com/macros/s/AKfycbxBtPROgI4HGkXiJW7fugiQFh95yd5ijRaembSdD4uMTw7TF4w/exec"
blocks = document.getElementsByClassName("provider-row");

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


async function scrape_results() {
for (let i = 0; i < blocks.length; i++) {
    try {
    
    
        console.warn("Async scrape_results called");
        } catch(e) {
    console.log(e);
    }

	try {
		chrome.runtime.sendMessage({ message: output });
		} catch(err) {
		console.log(err);
		}
	}
}
scrape_results();

chrome.runtime.sendMessage(
    {
        contentScriptQuery: "postData"
        , data: JSONdata
        , url: webappUrl
    }, function (response) {
        console.warn("sending message");
        debugger;
        if (response != undefined && response != "") {
            callback(response);
        }
        else {
        console.warn("message with callback");
            debugger;
            callback(null);
        }
    });

setTimeout(function(){document.body.style = "background: #fff";}, 500);

