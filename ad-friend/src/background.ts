chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "fetchQuote") {
    fetch("https://zenquotes.io/api/random")
      .then((response) => response.json())
      .then((data) => sendResponse({ success: true, quote: data }))
      .catch((error) => sendResponse({ success: false, error: error.message }));

    return true; // Required for async `sendResponse`
  }
});
