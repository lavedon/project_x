

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Got message from background.js");
    if (request.message == "grabResults") { 
        sendResponse({farewell: "Got it. thanks."});
    }

});
