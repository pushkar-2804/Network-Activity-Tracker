document.addEventListener("DOMContentLoaded", () => {
  const refreshButton = document.getElementById("refresh-button");
  const clearButton = document.getElementById("clear-button");
  const activityList = document.getElementById("activity-list");

  const loadNetworkData = (tabId) => {
    chrome.runtime.sendMessage(
      { action: "getNetworkData", tabId: tabId },
      (response) => {
        activityList.innerHTML = "";
        response.forEach((activity) => {
          const listItem = document.createElement("tr");

          const methodCell = document.createElement("td");
          methodCell.textContent = activity.method;
          listItem.appendChild(methodCell);

          const urlCell = document.createElement("td");
          urlCell.textContent = activity.url;
          listItem.appendChild(urlCell);

          const speedCell = document.createElement("td");
          const timeTaken = activity.endTime
            ? activity.endTime - new Date(activity.timeStamp).getTime()
            : "N/A";
          speedCell.textContent = timeTaken;
          listItem.appendChild(speedCell);

          const statusCell = document.createElement("td");
          statusCell.textContent = activity.status || "N/A";
          listItem.appendChild(statusCell);

          activityList.appendChild(listItem);
        });
      }
    );
  };

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0].id;
    loadNetworkData(activeTab);

    // Refresh button functionality
    refreshButton.addEventListener("click", () => {
      loadNetworkData(activeTab);
    });

    // Clear button functionality
    clearButton.addEventListener("click", () => {
      activityList.innerHTML = "";
      chrome.runtime.sendMessage({
        action: "clearNetworkData",
        tabId: activeTab,
      });
    });
  });
});
