(function () {
  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const startTime = Date.now();
    const response = await originalFetch.apply(this, args);
    const endTime = Date.now();

    const data = {
      url: args[0],
      method: (args[1] && args[1].method) || "GET",
      timeStamp: new Date(startTime).toISOString(),
      endTime: endTime,
      status: response.status,
    };

    chrome.runtime.sendMessage({ action: "logFetch", data });
    return response;
  };
})();
