// Utility: Detect supported e-commerce sites
function isSupportedEcommerceSite() {
  const host = window.location.hostname;
  return (
    host.includes('amazon.com') ||
    host.includes('ebay.com') ||
    host.includes('walmart.com') ||
    document.querySelector('[itemtype*="Product"], [data-product-id], .product-title, .product-price')
  );
}

// Inject React root container if not present
function injectRootContainer() {
  if (document.getElementById('zhuzh-root')) return;
  const root = document.createElement('div');
  root.id = 'zhuzh-root';
  root.style.position = 'fixed';
  root.style.top = '0';
  root.style.right = '0';
  root.style.zIndex = '2147483647';
  root.style.height = '100vh';
  root.style.width = '400px';
  root.style.pointerEvents = 'none'; // Allow overlays to be non-intrusive by default
  document.body.appendChild(root);
}

// Dynamically load the React sidepanel bundle
function loadReactSidepanel() {
  if (document.getElementById('zhuzh-sidepanel-script')) return;
  const script = document.createElement('script');
  script.id = 'zhuzh-sidepanel-script';
  script.src = chrome.runtime.getURL('sidepanel.js');
  script.type = 'text/javascript';
  script.onload = () => {
    // Optionally, you can trigger a custom event here
  };
  document.body.appendChild(script);
}

// Main logic
if (isSupportedEcommerceSite()) {
  injectRootContainer();
  loadReactSidepanel();
  // ...future: extract product data, trigger overlays, etc.
}
