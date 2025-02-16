const adSelectors = [
  "iframe", // Ads embedded in iframes
  ".adsbygoogle", // Google AdSense ads
  "[id^=google_ads]", // Elements with IDs that start with "google_ads"

  // Generic ad classes
  ".ad-banner",
  ".ad-container",
  ".sponsored",
];

async function replaceAds() {
  // Finds all ads on the page
  document.querySelectorAll(adSelectors.join(", ")).forEach((ad) => {
    const widget = document.createElement("div");
    widget.className = "adfriend-widget p-3 border rounded bg-light text-dark";

    // Fetches a quote and inserts it into the widget
    fetchQuote(widget);

    ad.replaceWith(widget);
  });
}

async function fetchQuote(widget: HTMLElement) {
  chrome.runtime.sendMessage({ action: "fetchQuote" }, (response) => {
    if (response.success) {
      const quote = response.quote[0];
      widget.innerHTML = `<p class="fs-5 fw-bold">"${quote.q}"</p><p class="text-muted">— ${quote.a}</p>`;
    } else {
      widget.innerHTML = `<p class="fs-5 fw-bold">"Stay positive and keep going!"</p>`;
      console.error("Failed to fetch quote:", response.error);
    }
  });
}

window.addEventListener("load", replaceAds);
