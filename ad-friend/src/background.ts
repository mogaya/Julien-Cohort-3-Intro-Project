chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  // Checks if the received message has an action field with the value "fetchQuote".
  if (request.action === "fetchQuote") {
    fetch("https://zenquotes.io/api/random")
      .then((response) => response.json()) // API response into JSON format.
      .then((data) => sendResponse({ success: true, quote: data }))
      .catch((error) => sendResponse({ success: false, error: error.message }));

    return true; // Required for async `sendResponse`
  }
});
