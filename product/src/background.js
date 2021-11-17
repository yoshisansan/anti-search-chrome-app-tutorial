'use strict';

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['./content-script.js'],
  });
});

chrome.runtime.onInstalled.addListener(async () => {
  const url = chrome.runtime.getURL('src/index.html');
  const tab = await chrome.tabs.create({ url });
  console.log(`タブのID：${tab.id}`);
});
