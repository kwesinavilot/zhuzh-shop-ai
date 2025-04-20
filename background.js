// Listen for extension install/update events
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default settings or show onboarding
    chrome.storage.sync.set({ zhuzhSettings: {} });
  }
  // ...additional install/update logic...
});

// Listen for messages from content scripts, popup, or sidepanel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Example: handle API key storage/retrieval
  if (message.type === 'getApiKey') {
    chrome.storage.sync.get(['sonarApiKey'], (result) => {
      sendResponse({ apiKey: result.sonarApiKey || null });
    });
    return true; // Keep the message channel open for async response
  }
  if (message.type === 'setApiKey') {
    chrome.storage.sync.set({ sonarApiKey: message.apiKey }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  // ...future: handle Sonar API proxy, coupon checks, etc...
});

// (Optional) Listen for tab updates to trigger content script logic
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Example: could inject scripts or notify content script on navigation
  // ...future logic...
});
