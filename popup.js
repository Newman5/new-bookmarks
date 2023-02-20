const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // one week in milliseconds
const startDate = new Date(Date.now() - ONE_WEEK);

browser.bookmarks.getRecent(25).then((bookmarkItems) => {
  const recentBookmarks = bookmarkItems.filter(item => item.dateAdded >= startDate.getTime());
  const bookmarksList = document.getElementById('bookmarks-list');

  recentBookmarks.forEach((bookmark) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = bookmark.url;
    a.textContent = bookmark.title;
    li.appendChild(a);
    bookmarksList.appendChild(li);
  });
});