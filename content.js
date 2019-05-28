var scrolling = true;
var data = [];

var wait = ms => new Promise((r, j) => setTimeout(r, ms));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Got message from background.js");
    if (request.message == "scroll") { 
        sendResponse({received: "Going to scroll now."});
        console.log("got message to scroll");
        scroll();
    } else if (request.message == "stopScroll") {
        sendResponse({received: "Going to stop scrolling now."});
        console.log("message to Stop Scrolling");
        stopScroll();
    } else if (request.message == "grabResults") {
        sendResponse({received: "Going to scrape data now."});
        console.log("message to scrape data.");
        grabResults();
    }

});

async function scroll() { 
    console.log("scroll called");
    scrolling = true;
    while (scrolling == true) {
        console.log("Scrolling forever");
        window.scrollTo(0, document.body.scrollHeight);
        await wait(2000);
    }

}

function stopScroll() {
    console.log("Stop scroll called");
    scrolling = false;

}

async function grabResults() {
    let blocks = document.getElementById("groupsMemberBrowserContent");
    let profiles = blocks.getElementsByClassName("uiProfileBlockContent");
    let name = profiles[5].getElementsByTagName("a")[0].innerText;
    let profileLinkDirty = profiles[5].getElementsByTagName("a")[0].innerHTML;

    // use below RegEx to get the important part of the profile
    // (?:(?!\?).)*
    // Only select the first part from the array
    

    //  @TODO Add what group they are from to each object?
    //  Get from current tab URL?
    //
    //
    // profiles is each profile block which includes name, joined date, 
    // and sometimes employment and education.

    console.log("grabResults() called from content script.");
    chrome.runtime.sendMessage({cat: "Mommy Cat"}, 
        (response) => response.received);
}
