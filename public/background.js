const updateTabCount = async () => {
chrome.tabs.query({}, async (tabs) => {
    let tabCounts = {};

    tabs.forEach((tab) => {
    try {

        if (!tab.url || !tab.url.startsWith("http")) return;

        let url = new URL(tab.url);
        let domain = url.hostname;
        tabCounts[domain] = (tabCounts[domain] || 0) + 1;
    } catch (e) {
        console.error("Invalid URL:", e);
    }
    });

    await chrome.storage.local.set({ tabCounts });

    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.url && tab.url.startsWith("http")) {
            chrome.tabs.sendMessage(tab.id, { action: "updateTitle" }, () => {
              if (chrome.runtime.lastError) {
                console.warn("Content script not found in tab:", tab.url);
              }
            });
          }
        });
    });
});
};


chrome.tabs.onCreated.addListener(updateTabCount);
chrome.tabs.onUpdated.addListener(updateTabCount);
chrome.tabs.onRemoved.addListener(updateTabCount);

chrome.runtime.onStartup.addListener(updateTabCount);