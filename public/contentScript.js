const updateTabTitle = async () => {
const result = await chrome.storage.local.get("tabCounts");
if (!result.tabCounts) return;

try {
    let currentDomain = new URL(window.location.href).hostname;
    let tabCount = result.tabCounts[currentDomain] || 1;
    
    let originalTitle = document.title.replace(/^\(\d+\) /, "");

    document.title = `(${tabCount}) ${originalTitle}`;
} catch (e) {
    console.error("Error updating tab title:", e);
}
};

// Run when page loads
updateTabTitle();

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "updateTitle") {
      updateTabTitle();
    }
});