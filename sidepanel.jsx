import React, { useState, useEffect } from "react";

// Utility: Extract product info from the page (basic version)
function extractProductInfo() {
  // Try common selectors for product name and price
  const name =
    document.querySelector("#productTitle, .product-title, [itemprop='name']")?.textContent?.trim() ||
    document.title;
  const price =
    document.querySelector("#priceblock_ourprice, .price, [itemprop='price']")?.textContent?.trim() ||
    "";
  return { name, price };
}

// --- Price Compare Tab ---
function PriceCompareTab() {
  const [loading, setLoading] = useState(false);
  const [comparisons, setComparisons] = useState([]);
  const [error, setError] = useState(null);

  const product = extractProductInfo();

  async function fetchComparisons() {
    setLoading(true);
    setError(null);
    setComparisons([]);
    try {
      const apiKey = await window.zhuzhGetApiKey();
      // Query Perplexity Sonar API (stubbed endpoint)
      const response = await fetch("https://api.perplexity.ai/sonar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "sonar",
          query: `Find the best prices for "${product.name}" across Amazon, eBay, Walmart.`,
        }),
      });
      const data = await response.json();
      setComparisons(data.results || []);
    } catch (e) {
      setError("Failed to fetch price comparisons.");
    }
    setLoading(false);
  }

  return (
    <div className="p-4">
      <div className="mb-2 font-semibold">Product: {product.name}</div>
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        onClick={fetchComparisons}
        disabled={loading}
      >
        {loading ? "Comparing..." : "Compare Prices"}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      <ul className="mt-4 space-y-2">
        {comparisons.map((item, idx) => (
          <li key={idx} className="border p-2 rounded">
            <div className="font-bold">{item.retailer}</div>
            <div>Price: {item.price}</div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Coupons Tab ---
function CouponsTab() {
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [applied, setApplied] = useState(null);
  const [error, setError] = useState(null);

  async function fetchCoupons() {
    setLoading(true);
    setError(null);
    setCoupons([]);
    try {
      const apiKey = await window.zhuzhGetApiKey();
      // Query Perplexity Sonar API for coupons (stubbed endpoint)
      const response = await fetch("https://api.perplexity.ai/sonar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "sonar",
          query: `Find valid coupon codes for this site: ${window.location.hostname}`,
        }),
      });
      const data = await response.json();
      setCoupons(data.coupons || []);
    } catch (e) {
      setError("Failed to fetch coupons.");
    }
    setLoading(false);
  }

  async function applyCoupon(code) {
    // Stub: In real use, would inject code into checkout form and test
    setApplied(code);
  }

  return (
    <div className="p-4">
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        onClick={fetchCoupons}
        disabled={loading}
      >
        {loading ? "Finding..." : "Find Coupons"}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      <ul className="mt-4 space-y-2">
        {coupons.map((coupon, idx) => (
          <li key={idx} className="border p-2 rounded flex items-center justify-between">
            <span className="font-mono">{coupon.code}</span>
            <button
              className="ml-2 bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
              onClick={() => applyCoupon(coupon.code)}
              disabled={applied === coupon.code}
            >
              {applied === coupon.code ? "Applied" : "Apply"}
            </button>
          </li>
        ))}
      </ul>
      {applied && (
        <div className="mt-2 text-green-700">Coupon <b>{applied}</b> applied (simulated).</div>
      )}
    </div>
  );
}

// --- Chat Tab ---
function ChatTab() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! How can I help you with your shopping today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setLoading(true);
    try {
      const apiKey = await window.zhuzhGetApiKey();
      // Query Perplexity Sonar Reasoning Pro (stubbed endpoint)
      const response = await fetch("https://api.perplexity.ai/sonar-reasoning-pro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "sonar-reasoning-pro",
          messages: [
            ...messages.map((m) => ({
              role: m.from === "ai" ? "assistant" : "user",
              content: m.text,
            })),
            { role: "user", content: input },
          ],
        }),
      });
      const data = await response.json();
      setMessages((msgs) => [
        ...msgs,
        { from: "ai", text: data.reply || "Sorry, I couldn't find an answer." },
      ]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { from: "ai", text: "Sorry, there was an error contacting the AI." },
      ]);
    }
    setInput("");
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.from === "ai" ? "text-left" : "text-right"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded ${
                msg.from === "ai"
                  ? "bg-gray-200 text-gray-900"
                  : "bg-blue-600 text-white"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          className="flex-1 border rounded-l px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about this product..."
          disabled={loading}
        />
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded-r hover:bg-blue-700"
          type="submit"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}

const TABS = [
  { name: "Price Compare", component: PriceCompareTab },
  { name: "Coupons", component: CouponsTab },
  { name: "Chat", component: ChatTab },
];

export default function ZhuzhSidePanel() {
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  // Expose API key getter to window for use in tab components
  useEffect(() => {
    window.zhuzhGetApiKey = () =>
      new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: "getApiKey" }, (resp) => {
          resolve(resp?.apiKey || "");
        });
      });
  }, []);

  const ActiveComponent = TABS[activeTab].component;

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg border-l border-gray-200 transition-transform duration-300 z-[2147483647] ${
        open ? "translate-x-0" : "translate-x-full"
      } w-[400px]`}
      style={{ pointerEvents: "auto" }}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white">
        <span className="font-bold text-lg">Zhuzh Shop Assistant</span>
        <button
          className="ml-2 text-white hover:text-gray-200"
          onClick={() => setOpen(false)}
          title="Close panel"
        >
          ×
        </button>
      </div>
      <div className="flex border-b border-gray-200 bg-gray-50">
        {TABS.map((tab, idx) => (
          <button
            key={tab.name}
            className={`flex-1 py-2 px-2 text-sm font-medium ${
              activeTab === idx
                ? "border-b-2 border-blue-600 text-blue-600 bg-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="overflow-y-auto flex-1" style={{ minHeight: "calc(100vh - 96px)" }}>
        <ActiveComponent />
      </div>
      {!open && (
        <button
          className="fixed top-1/2 right-0 bg-blue-600 text-white px-2 py-1 rounded-l shadow-lg z-[2147483647]"
          style={{ transform: "translateY(-50%)" }}
          onClick={() => setOpen(true)}
          title="Open Zhuzh Shop Assistant"
        >
          &lt;
        </button>
      )}
    </div>
  );
}

// Mount the panel if running in content script context
if (typeof window !== "undefined" && document.getElementById("zhuzh-root")) {
  const root = document.getElementById("zhuzh-root");
  import("react-dom/client")
    .then(({ createRoot }) => {
      createRoot(root).render(<ZhuzhSidePanel />);
    })
    .catch(() => {
      import("react-dom").then((ReactDOM) => {
        ReactDOM.render(<ZhuzhSidePanel />, root);
      });
    });
}
