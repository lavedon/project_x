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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.contentScriptQuery == "getdata") {
        var url = request.url;
        fetch(url)
            .then(response => response.text())
            .then(response => sendResponse(response))
            .catch()
        return true;
    }
    if (request.contentScriptQuery == "postData") {
        fetch(request.url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: 'result=' + request.data
        })
            .then(response => response.json())
            .then(response => sendResponse(response))
            .catch(error => console.log('Error:', error));
        return true;
    }
});
