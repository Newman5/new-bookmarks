// Use chrome API with browser fallback for Firefox compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// State management
let allBookmarks = [];
let filteredBookmarks = [];
let currentSettings = {
  theme: 'auto',
  dateRange: 14,
  bookmarkLimit: 200,
};

// Initialize the popup
document.addEventListener('DOMContentLoaded', async () => {
  // Load settings
  await loadSettings();
  
  // Apply theme
  applyTheme();
  
  // Set up event listeners
  setupEventListeners();
  
  // Load and display bookmarks
  await loadBookmarks();
});

// Load settings from storage
async function loadSettings() {
  return new Promise((resolve) => {
    browserAPI.storage.sync.get(['theme', 'dateRange', 'bookmarkLimit'], (result) => {
      currentSettings = {
        theme: result.theme || 'auto',
        dateRange: result.dateRange || 14,
        bookmarkLimit: result.bookmarkLimit || 200,
      };

      // Set the date range select value
      const dateRangeSelect = document.getElementById('date-range');
      if (dateRangeSelect) {
        dateRangeSelect.value = currentSettings.dateRange;
      }

      resolve();
    });
  });
}

// Save settings to storage
async function saveSettings() {
  return new Promise((resolve) => {
    browserAPI.storage.sync.set(currentSettings, () => {
      console.log('Settings saved');
      resolve();
    });
  });
}

// Apply theme based on settings
function applyTheme() {
  let theme = currentSettings.theme;
  
  // Auto theme detection
  if (theme === 'auto') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  document.documentElement.setAttribute('data-theme', theme);
}

// Toggle theme
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // Save preference
  currentSettings.theme = newTheme;
  saveSettings();
}

// Setup event listeners
function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', toggleTheme);
  
  // Search input
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', handleSearch);
  
  // Date range filter
  const dateRangeSelect = document.getElementById('date-range');
  dateRangeSelect.addEventListener('change', handleDateRangeChange);
}

// Load bookmarks from browser API
async function loadBookmarks() {
  const loadingEl = document.getElementById('loading');
  const bookmarksListEl = document.getElementById('bookmarks-list');
  const emptyStateEl = document.getElementById('empty-state');
  
  try {
    loadingEl.style.display = 'block';
    bookmarksListEl.style.display = 'none';
    emptyStateEl.style.display = 'none';
    
    // Get recent bookmarks
    const bookmarkItems = await browserAPI.bookmarks.getRecent(currentSettings.bookmarkLimit);
    
    // Calculate date cutoff
    const dateRangeDays = currentSettings.dateRange;
    const dateRangeMs = dateRangeDays * 24 * 60 * 60 * 1000;
    const startDate = Date.now() - dateRangeMs;
    
    // Filter bookmarks by date and remove folders
    allBookmarks = bookmarkItems.filter((item) =>
      item.url && item.dateAdded >= startDate,
    );
    
    // Initial filter (no search query)
    filteredBookmarks = [...allBookmarks];
    
    // Display bookmarks
    displayBookmarks();
    
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    loadingEl.textContent = 'Error loading bookmarks';
  } finally {
    loadingEl.style.display = 'none';
  }
}

// Display bookmarks in the list
function displayBookmarks(searchQuery = '') {
  const bookmarksListEl = document.getElementById('bookmarks-list');
  const emptyStateEl = document.getElementById('empty-state');
  
  // Clear existing bookmarks
  bookmarksListEl.innerHTML = '';
  
  if (filteredBookmarks.length === 0) {
    bookmarksListEl.style.display = 'none';
    emptyStateEl.style.display = 'block';
    return;
  }
  
  bookmarksListEl.style.display = 'block';
  emptyStateEl.style.display = 'none';
  
  // Create list items for each bookmark
  filteredBookmarks.forEach(bookmark => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = bookmark.url;
    a.target = '_blank';
    
    // Create favicon
    const faviconEl = createFavicon(bookmark.url);
    
    // Create content container
    const contentEl = document.createElement('div');
    contentEl.className = 'bookmark-content';
    
    // Create title
    const titleEl = document.createElement('div');
    titleEl.className = 'bookmark-title';
    titleEl.innerHTML = highlightText(bookmark.title || 'Untitled', searchQuery);
    
    // Create meta info
    const metaEl = document.createElement('div');
    metaEl.className = 'bookmark-meta';
    const timeAgo = getTimeAgo(bookmark.dateAdded);
    let hostname = 'Unknown';
    try {
      hostname = new URL(bookmark.url).hostname;
    } catch (error) {
      console.warn('Invalid URL for bookmark:', bookmark.url);
    }
    metaEl.textContent = `${hostname} • ${timeAgo}`;
    
    contentEl.appendChild(titleEl);
    contentEl.appendChild(metaEl);
    
    a.appendChild(faviconEl);
    a.appendChild(contentEl);
    li.appendChild(a);
    bookmarksListEl.appendChild(li);
  });
}

// Create favicon element
function createFavicon(url) {
  try {
    const domain = new URL(url).hostname;
    const favicon = document.createElement('img');
    favicon.className = 'favicon';
    favicon.src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`;
    favicon.alt = '';
    
    // Fallback if favicon fails to load
    favicon.onerror = function() {
      const placeholder = document.createElement('div');
      placeholder.className = 'favicon-placeholder';
      placeholder.textContent = domain && domain.length > 0 ? domain[0].toUpperCase() : '?';
      this.parentNode.replaceChild(placeholder, this);
    };
    
    return favicon;
  } catch (error) {
    const placeholder = document.createElement('div');
    placeholder.className = 'favicon-placeholder';
    placeholder.textContent = '?';
    return placeholder;
  }
}

// Handle search input
function handleSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  
  if (query === '') {
    filteredBookmarks = [...allBookmarks];
  } else {
    filteredBookmarks = allBookmarks.filter(bookmark => {
      const title = (bookmark.title || '').toLowerCase();
      const url = (bookmark.url || '').toLowerCase();
      return title.includes(query) || url.includes(query);
    });
  }
  
  displayBookmarks(query);
}

// Handle date range change
function handleDateRangeChange(event) {
  const newDateRange = parseInt(event.target.value);
  currentSettings.dateRange = newDateRange;
  saveSettings();
  loadBookmarks();
}

// Highlight search terms in text
function highlightText(text, query) {
  if (!query) return escapeHtml(text);
  
  const escapedText = escapeHtml(text);
  const escapedQuery = escapeRegex(escapeHtml(query));
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  return escapedText.replace(regex, '<span class="highlight">$1</span>');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Escape regex special characters
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Get relative time string
function getTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 60) {
    return minutes <= 1 ? 'Just now' : `${minutes} minutes ago`;
  } else if (hours < 24) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (days < 7) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  }
}
