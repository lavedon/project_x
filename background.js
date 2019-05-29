var sheetUrl = "https://script.google.com/macros/s/AKfycbxJHG59J6LwmJO-cXKUbOjEfkVv_xEZdfb9AqmpOCBZeqPqhhU/exec"
var currentTab;


chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlContains: 'facebook.com/groups/' },
                    })
                ],
                // And shows the extension's page action.
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});

var grabMenuItem = {
    "id": "grabResults",
    "title": "Grab Results",
    "contexts": ["all"],
};
   
   
var scrollMenuItem = {
    "id": "scroll",
    "title": "Scroll To Bottom",
    "contexts": ["all"]
}

var stopScrollMenuItem = { 
    "id": "stopScroll",
    "title": "Stop Scrolling",
    "contexts": ["all"]
}


chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create(grabMenuItem);
    chrome.contextMenus.create(scrollMenuItem);
    chrome.contextMenus.create(stopScrollMenuItem);
});



chrome.contextMenus.onClicked.addListener((clickData) => {

    if (clickData.menuItemId == "scroll") {
        console.log("MenuItem scroll selected");
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {message: "scroll"},
                (response) => console.log(response.received));
            
    });
    } 
    else if (clickData.menuItemId == "stopScroll") {
        console.log("MenuItem scroll selected");
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {message: "stopScroll"},
                (response) => console.log(response.received));
            
    });
    } 
    else if (clickData.menuItemId == "grabResults") {
        console.log("MenuItem scroll selected");
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {message: "grabResults"},
                (response) => console.log(response.received));
            
    });
    } 

});


        

// test message passing
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url : 
            "from the extension");
        if (request.greeting == "hello") {
            sendResponse({received: "goodbye"});
        }
        else { 
            console.log("data received.");
            sendResponse({received: "data received"}); 
            var xhr = new XMLHttpRequest();
            xhr.open("POST", sheetUrl);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(request));
            console.log("Sent POST to sheet");
        }
    });
