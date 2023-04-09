//I'm sure I can do this with GitHub, but I'm not sure how to do it yet. 
//This is a 'basecamp' version of the popup.js file. I can use this to come back if something goes wrong. 

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // one week in milliseconds
const startDate = new Date(Date.now() - ONE_WEEK); // one week ago, by substracting one week from the current date

// Get the bookmarks that were added in the last week
browser.bookmarks.getRecent(25).then((bookmarkItems) => {
  // Filter the bookmarks to only get the ones that were added in the last week
  //The filter method returns an array of all the items with dateAdded greater than or equal to the start date.
  const recentBookmarks = bookmarkItems.filter(item => item.dateAdded >= startDate.getTime());
  
  // Get the bookmarks list element
  const bookmarksList = document.getElementById('bookmarks-list');

  /* The code below does the following, explained in English:
1. Create an <li> element.
2. Create an <a> element.
3. Set the href attribute of the <a> element to bookmark.url.
4. Set the text content of the <a> element to bookmark.title.
5. Append the <a> element as a child of the <li> element.
6. Append the <li> element as a child of the bookmarksList element. */
  recentBookmarks.forEach((bookmark) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = bookmark.url;
    a.textContent = bookmark.title;
    //Todo: add dateAdded to the list
    a.textContent = bookmark.dateAdded;
    //test bookmark.dateAdded to see if it works in the console
    console.log(bookmark.dateAdded);
    li.appendChild(a);
    bookmarksList.appendChild(li);
  });
});


