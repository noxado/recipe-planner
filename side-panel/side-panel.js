function extractRecipe() {
    const jsondata = JSON.parse(document.querySelectorAll('[type="application/ld+json"]')[0].innerText)
    chrome.runtime.sendMessage(jsondata)

}

async function clickExtractButton() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: extractRecipe
    });
}
document.getElementById("extractButton").addEventListener("click", clickExtractButton);
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
})
