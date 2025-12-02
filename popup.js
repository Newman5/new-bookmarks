// const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // one week in milliseconds
const TWO_WEEK = 2 * 7 * 24 * 60 * 60 * 1000; // two weeks in milliseconds
const startDate = new Date(Date.now() - TWO_WEEK); // one week ago, by substracting one week from the current date

// Get the bookmarks that were added in the last week
browser.bookmarks.getRecent(200).then((bookmarkItems) => {
  // Filter the bookmarks to only get the ones that were added in the last week
  //The filter method returns an array of all the items with dateAdded greater than or equal to the start date.
  const recentBookmarks = bookmarkItems.filter((item) => item.dateAdded >= startDate.getTime());

  // Get the bookmarks list element
  const bookmarksList = document.getElementById('bookmarks-list');

  recentBookmarks.forEach((bookmark) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = bookmark.url;
    a.textContent = `${bookmark.title} (${getTimeAgo(bookmark.dateAdded)})`; // Display title and dateAdded
    li.appendChild(a);
    bookmarksList.appendChild(li);
  });

  function getTimeAgo(timestamp) {
    const currentDate = new Date();
    const bookmarkDate = new Date(timestamp);
    const timeDifference = currentDate - bookmarkDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return `${daysDifference} days ago`;
  }
});
