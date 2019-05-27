var wait = ms => new Promise((r, j) => setTimeout(r, ms));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Got message from background.js");
    if (request.message == "scroll") { 
        sendResponse({farewell: "Going to scroll now."});
        console.log("got message to scroll");
        scroll();
    }

});


async function scroll() { 
    console.log("scroll called");
    for (let i = 0; i < 10; i++) {
        console.log("Scroll loop # " + i);
        window.scrollTo(0, document.body.scrollHeight);
        await wait(2000);
    }

}
