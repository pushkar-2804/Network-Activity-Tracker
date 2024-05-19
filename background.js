let networkData = {};

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const { tabId, url, method, requestId, timeStamp } = details;
    if (tabId < 0) return; // Ignore requests that don't have a tab ID

    if (!networkData[tabId]) {
      networkData[tabId] = [];
    }

    networkData[tabId].push({
      requestId,
      url,
      method,
      timeStamp: new Date(timeStamp).toISOString(),
      endTime: null,
      status: null,
    });
  },
  { urls: ["<all_urls>"], types: ["xmlhttprequest", "object", "websocket"] }
);

chrome.webRequest.onCompleted.addListener(
  (details) => {
    const { tabId, requestId, statusCode, timeStamp } = details;
    if (tabId < 0) return; // Ignore requests that don't have a tab ID

    if (!networkData[tabId]) {
      networkData[tabId] = [];
    }

    const requestData = networkData[tabId].find(
      (request) => request.requestId === requestId
    );
    if (requestData) {
      requestData.endTime = new Date(timeStamp).getTime();
      requestData.status = statusCode;
    } else {
      // In case the request was not logged before
      networkData[tabId].push({
        requestId,
        url: details.url,
        method: details.method,
        timeStamp: null,
        endTime: new Date(timeStamp).getTime(),
        status: statusCode,
      });
    }
  },
  { urls: ["<all_urls>"], types: ["xmlhttprequest", "object", "websocket"] }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getNetworkData") {
    const tabId = message.tabId;
    sendResponse(networkData[tabId] || []);
  } else if (message.action === "logFetch") {
    const tabId = sender.tab.id;
    if (!networkData[tabId]) {
      networkData[tabId] = [];
    }
    networkData[tabId].push(message.data);
  } else if (message.action === "clearNetworkData") {
    const tabId = message.tabId;
    if (networkData[tabId]) {
      networkData[tabId] = [];
    }
  }
});
