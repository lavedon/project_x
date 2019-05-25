var sheetUrl = "https://script.google.com/macros/s/AKfycbxJHG59J6LwmJO-cXKUbOjEfkVv_xEZdfb9AqmpOCBZeqPqhhU/exec"

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        console.log("Check if on YouTube.com");
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlContains: 'youtube.com' },
                    })
                ],
                // And shows the extension's page action.
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});

var contextMenuItem = {
    "id": "grabResults",
    "title": "Grab Results",
    "contexts": ["all"]
};


chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create(contextMenuItem);
});


function scrape_it() {
        chrome.tabs.executeScript({
            file: "content.js"
            });
        }


chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "grabResults") {
            scrape_it();
        } 
        });
        
chrome.commands.onCommand.addListener(function(command) {
    scrape_it();
});

// test message passing
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url : 
            "from the extension");
        if (request.greeting == "hello") {
            sendResponse({farewell: "goodbye"});
        }
        else if (request.cat == "Mommy Cat") { 
            sendResponse({farewell: "Mommy Cat received"}); 
            var xhr = new XMLHttpRequest();
            xhr.open("POST", sheetUrl);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(request));
            console.log("Sent POST to sheet");

        }
        else {
            sendResponse({farewell: "got something."});
        }
    });


