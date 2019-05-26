var scrolling = true;

window.scrollTo(0,document.body.scrollHeight);
document.body.style = "background: #f00";
blocks = document.getElementsByClassName("provider-row");


var data = {"cat": "Mommy Cat", "demon": "muffin"}
chrome.runtime.sendMessage(data, function(response) {
    console.log("response received from background script.")
    console.log(response.farewell);
});


function scrape_it() {
        chrome.tabs.executeScript({
            file: "content.js"
            });
        }

async function scrollToBottom() {

    console.log("Called scrollToBottom()");
    console.log("Scrolling ==" + scrolling);
    while (scrolling == true) {

    let rand = Math.random() * 10000;
    console.log("random number = " + rand);
    setTimeout(window.scrollTo(0, document.body.scrollHeight));
    console.log("Scrolling...");

    }
}


function stopScroll() {
    scrolling = false;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received")
    sendResponse(myFunc(request.args));
    console.log("Message is: " + myFunc(request.args));
    return true;
    });
