# Network Activity Tracker

Network Activity Tracker is a Chrome extension that tracks and displays network activity (Fetch/XHR) of the currently active tab. It allows you to view the method, API URL, speed, and status of each network request. The extension also provides functionality to clear the data, refresh the view.

## Features

- Display network activity (method, API URL, speed, status)
- Clear network activity data
- Refresh network activity data

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory where you cloned or downloaded the repository.

## Usage

1. Click on the extension icon in the Chrome toolbar to open the popup.
2. The popup will display the network activity of the current active tab.
3. Use the "Refresh" button to refresh the network activity data.
4. Use the "Clear" button to clear the network activity data.

## Files

- `manifest.json`: Configuration file for the Chrome extension.
- `background.js`: Background script to manage network activity data and handle communication.
- `content.js`: Content script injected into web pages to capture network activity data.
- `popup.html`: HTML file for the popup UI.
- `popup.js`: JavaScript file for the popup UI functionality.
- `styles.css`: CSS file for styling the popup UI.
- `devtools.html`: HTML file for the DevTools page.
- `devtools.js`: JavaScript file for the DevTools page functionality.

