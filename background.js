
/*
 * Searches for bookmarks
 */
function searchBookmarks() {

  const ONE_WEEK = 1 * 24 * 60 * 60 * 1000; // one week in milliseconds
  const startDate = new Date(Date.now() - ONE_WEEK);
  let searching = browser.bookmarks.getRecent(25);
  searching.then((bookmarkItems) => {
    console.log("Found " + bookmarkItems.length + " bookmark(s):");
    const recentBookmarks = bookmarkItems.filter(item => item.dateAdded >= startDate.getTime());
    console.log("Found " + recentBookmarks.length + " recent bookmark(s):");
    console.log(recentBookmarks);
  });
}


async function main() {
  // Get the browser object
  let browser = null;
  try {
    browser = await window.browser || window.chrome;
  } catch (e) { }

  // Define the browser action
  browser.browserAction.onClicked.addListener(function (tab) {
    console.log("Browser action clicked!");
    searchBookmarks();
  });
}

// Call the main function
main();