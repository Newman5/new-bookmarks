/*
 * Background service worker for Recent Bookmarks extension
 * This handles extension lifecycle events and background tasks
 */

// Listen for extension installation or updates
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Recent Bookmarks extension installed/updated:', details.reason);
  
  // Set default settings on first install
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      theme: 'auto',
      dateRange: 14,
      bookmarkLimit: 200,
    }, () => {
      console.log('Default settings initialized');
    });
  }
});

// Log when the service worker starts
console.log('Recent Bookmarks service worker loaded');
