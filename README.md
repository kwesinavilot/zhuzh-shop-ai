# Zhuzh Shop Assistant

A browser extension that transforms online shopping with real-time price comparisons, coupon finding, and AI-powered shopping assistance using Perplexity's Sonar API.

---

## Features

- **Automatic activation** on e-commerce sites (Amazon, eBay, Walmart, and more)
- **Non-intrusive UI overlays** and collapsible side panel
- **Real-time price comparisons** across major retailers
- **Coupon finder** and (simulated) auto-apply at checkout
- **AI shopping assistant chat** powered by Perplexity Sonar API
- **User preferences** and secure API key storage

---

## Tech Stack

- Manifest V3 Chrome/Firefox extension
- React + TailwindCSS for UI
- Service worker for background tasks
- Perplexity Sonar API integration

---

## Getting Started

1. **Clone the repo**
2. **Install dependencies** and build React assets (`sidepanel.js`, `sidepanel.css`)
3. **Load as unpacked extension** in Chrome/Firefox from the `zhuzh-shop-ai/zhuzh-shop-ai` directory
4. **Set your Perplexity Sonar API key** in extension options

---

## Directory Structure

```
zhuzh-shop-ai/
└── zhuzh-shop-ai/
    ├── manifest.json
    ├── background.js
    ├── contentScript.js
    ├── sidepanel.jsx
    ├── sidepanel.html
    ├── sidepanel.js      # built from sidepanel.jsx by Vite
    ├── sidepanel.css
    ├── popup.html
    ├── options.html
    ├── icons/
    ├── assets/
    ├── src/              # Vite React source code
    ├── dist/             # Vite build output
    └── README.md
```

---

## How It Works

### Extension Icon & Initial State

- Appears as a small, stylish icon in the browser toolbar (e.g., shopping bag with "Z" or sparkle).
- Subtle but recognizable.

### User Flow & UI Overview

![Zhuzh Shop Assistant User Flow](https://github.com/zhuzh-shop-ai/raw/main/docs/user-flow.png)

#### 1. Installation
- Install from Chrome/Firefox Extension Store.
- Onboarding overlay introduces features and asks for preferences.
- User grants necessary permissions.

#### 2. Activation & Detection
- Extension sits quietly in the toolbar with a "Z" icon.
- Icon animates/glows purple on e-commerce sites.
- Background analyzes page structure for product info.

#### 3. Browsing Experience
- Subtle indicators near prices show if better deals exist.
- "Zhuzh" badges highlight significant savings.
- Side panel remains collapsed by default.

#### 4. Product Page Enhancement
- On product pages:
  - Top banner alerts if better price found elsewhere.
  - Overlay tooltips with extra info.
  - Side panel auto-activates with price comparison tab.

#### 5. Interactive Side Panel
- Expand/collapse with one click.
- Three tabs:
  - **Price Compare**: Product prices across retailers.
  - **Coupons**: Available coupon codes, sorted by savings.
  - **Chat**: AI assistant for product questions.

#### 6. Checkout Optimization
- On checkout:
  - Automatic coupon testing in background.
  - Overlay shows progress ("Testing coupons...").
  - Best coupon auto-applied with notification.
  - Suggests alternative payment methods for savings.

#### 7. Post-Purchase
- After purchase:
  - Price protection monitoring starts.
  - Delivery tracking info extracted and monitored.
  - Return policy details saved for reference.

---

## Technical Implementation

- **Frontend**: React, TailwindCSS, HTML/CSS/JS (or TS)
- **Extension Structure**:  
  - `manifest.json` for config  
  - Background script for state/API  
  - Content scripts for DOM/page injection  
  - Popup for user settings/preferences
- **API Integration**:  
  - Background worker for Sonar API  
  - Service workers for auth/data caching  
  - Streaming for chat
- **Data Flow**:  
  - DOM scraping → Structure product data → Sonar API  
  - Sonar response → UI update  
  - User actions → Preferences → Recommendations
- **Security & Privacy**:  
  - Local storage encryption  
  - Minimal data collection  
  - User controls for data usage

---

## License

MIT