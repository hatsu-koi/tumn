import "../../app/less/abuse.less";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status == 'complete') {
		chrome.tabs.executeScript()
	}
});
