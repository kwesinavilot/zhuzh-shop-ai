# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.1.1] - 2025-04-20

### Added

-   Basic project structure.
-   `README.md` with detailed project description, features, tech stack, getting started guide, directory structure, and how it works section including user flow diagram.
-   `manifest.json` configuring the Chrome/Firefox extension, including permissions, icons, background service worker, content scripts, web accessible resources, options page, and side panel.
-   `background.js` handling extension installation/update events, message listeners for API key storage/retrieval, and (optional) tab update listeners for content script logic.
-   `contentScript.js` with functions to detect supported e-commerce sites, inject React root container, dynamically load the React sidepanel bundle, and  extract product data.
-   `options.html` for future extension settings (currently displays a placeholder).
-   `popup.html` for setting the Perplexity Sonar API key, with storage and display functionality implemented.
-   `sidepanel.css` for styling, including Tailwind CSS import.
-   `sidepanel.html` containing the React sidepanel root.
-   `sidepanel.jsx` implementing the React components for the side panel, including tabs for Price Compare, Coupons, and Chat, utilizing Perplexity Sonar API (stubbed endpoints in this version).  The component handles API key retrieval, data fetching, and UI updates.
-   `.vscode/settings.json` configuring VS Code settings to enable GitHub Copilot Chat codesearch and thinking tool.

### Changed
-   `README.md` significantly improved and expanded to contain a detailed description of the project, functionality, technical aspects, and usage instructions.


## [0.1.0] - 2025-04-20
### Added
- Project initialization.
- Basic project structure created.