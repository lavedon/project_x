window.scrollTo(0,document.body.scrollHeight);
document.body.style = "background: #f00";
blocks = document.getElementsByClassName("provider-row");

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

var data = {"cat": "Mommy Cat", "demon": "muffin"}
chrome.runtime.sendMessage(data, function(response) {
    console.log("response received from background script.")
    console.log(response.farewell);
});
