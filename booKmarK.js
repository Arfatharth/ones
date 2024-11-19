// Open the add bookmark modal
document.getElementById('addBookmarkBtn').addEventListener('click', function() {
    document.getElementById('bookmarkModal').style.display = 'block';
  });
  
  // Close the modal when the close button is clicked
  document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('bookmarkModal').style.display = 'none';
  });
  
  // Close the modal when clicked outside of it
  window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('bookmarkModal')) {
      document.getElementById('bookmarkModal').style.display = 'none';
    }
  });
  
  // Handle bookmark form submission
  document.getElementById('bookmarkForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const description = document.getElementById('description').value;
  
    if (title && url) {
      // Create a new bookmark item
      const bookmarkItem = {
        title,
        url,
        description
      };
  
      // Get existing bookmarks from localStorage
      let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  
      // Add the new bookmark to the array
      bookmarks.push(bookmarkItem);
  
      // Save the updated bookmarks back to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
      // Close the modal
      document.getElementById('bookmarkModal').style.display = 'none';
  
      // Reset form fields
      document.getElementById('bookmarkForm').reset();
  
      // Refresh the bookmark list
      loadBookmarks();
    }
  });
  
  // Function to load bookmarks from localStorage and display them
  function loadBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmarkList = document.querySelector('.bookmark-list');
    bookmarkList.innerHTML = '';  // Clear existing list
  
    bookmarks.forEach((bookmark, index) => {
      const bookmarkItem = document.createElement('div');
      bookmarkItem.classList.add('bookmark-item');
      bookmarkItem.innerHTML = `
        <div class="bookmark-info">
          <h3 class="bookmark-title">${bookmark.title}</h3>
          <p class="bookmark-description">${bookmark.description}</p>
          <a href="${bookmark.url}" class="bookmark-link" target="_blank">Visit</a>
        </div>
        <div class="bookmark-actions">
          <button class="edit-btn" onclick="editBookmark(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteBookmark(${index})">Delete</button>
        </div>
      `;
      bookmarkList.appendChild(bookmarkItem);
    });
  }
  
  // Function to delete a bookmark
  function deleteBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.splice(index, 1);  // Remove the bookmark at the specified index
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));  // Save the updated list
    loadBookmarks();  // Reload the bookmark list
  }
  
  // Function to edit a bookmark
  function editBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmark = bookmarks[index];
  
    // Populate the modal with the current bookmark values
    document.getElementById('title').value = bookmark.title;
    document.getElementById('url').value = bookmark.url;
    document.getElementById('description').value = bookmark.description;
  
    // Change the submit button to "Update Bookmark"
    const form = document.getElementById('bookmarkForm');
    form.removeEventListener('submit', handleAddBookmark);
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      updateBookmark(index);
    });
  
    document.getElementById('bookmarkModal').style.display = 'block';
  }
  
  // Function to update a bookmark
  function updateBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const updatedBookmark = {
      title: document.getElementById('title').value,
      url: document.getElementById('url').value,
      description: document.getElementById('description').value
    };
  
    bookmarks[index] = updatedBookmark;  // Replace the old bookmark with the updated one
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));  // Save the updated bookmarks list
  
    document.getElementById('bookmarkModal').style.display = 'none';  // Close the modal
    loadBookmarks();  // Reload the bookmarks list
  
    // Reset the form and revert the submit button back to "Add Bookmark"
    document.getElementById('bookmarkForm').reset();
    const form = document.getElementById('bookmarkForm');
    form.removeEventListener('submit', updateBookmark);
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      addBookmark();
    });
  }
  
  // Load bookmarks when the page loads
  document.addEventListener('DOMContentLoaded', loadBookmarks);
  