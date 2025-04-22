import { resolve } from 'path';
import { writeFileSync } from 'fs';
import packageJson from './package.json';

const getManifest = () => {
  const manifest = {
    manifest_version: 3,
    name: 'Zhuzh Shop Assistant',
    version: packageJson.version,
    description: packageJson.description,
    action: {
      default_popup: 'popup.html',
      default_icon: {
        '16': 'icons/icon16.png',
        '32': 'icons/icon32.png',
        '48': 'icons/icon48.png',
        '128': 'icons/icon128.png',
      },
    },
    icons: {
      '16': 'icons/icon16.png',
      '32': 'icons/icon32.png',
      '48': 'icons/icon48.png',
      '128': 'icons/icon128.png',
    },
    permissions: [
      'storage',
      'activeTab',
      'scripting',
      'sidePanel'
    ],
    host_permissions: [
      "*://*.amazon.com/*",
      "*://*.ebay.com/*",
      "*://*.walmart.com/*",
      // Add other e-commerce sites
    ],
    background: {
      service_worker: 'background.js',
      type: 'module'
    },
    content_scripts: [
      {
        matches: [
          "*://*.amazon.com/*",
          "*://*.ebay.com/*",
          "*://*.walmart.com/*",
          // Add other e-commerce sites
        ],
        js: ['content.js'],
      },
    ],
    side_panel: {
      default_path: 'sidepanel.html'
    },
    options_page: 'options.html',
    web_accessible_resources: [
      {
        resources: ['icons/*'],
        matches: ['<all_urls>'],
      },
    ],
  };

  // Firefox-specific adjustments
  if (process.env.BROWSER === 'firefox') {
    // Firefox doesn't support service_worker type: module
    manifest.background = {
      scripts: ['background.js']
    };
    
    // Firefox uses browser_specific_settings
    manifest.browser_specific_settings = {
      gecko: {
        id: 'zhuzh-shop-assistant@example.com'
      }
    };
  }

  return manifest;
};

export default function makeManifest() {
  return {
    name: 'make-manifest',
    buildEnd() {
      const manifest = getManifest();
      writeFileSync(
        resolve(__dirname, 'dist/manifest.json'),
        JSON.stringify(manifest, null, 2)
      );
    },
  };
}
