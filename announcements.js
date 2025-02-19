// DOM Elements
const announcementList = document.getElementById("announcement-list");
const searchBar = document.getElementById("search-bar");
const unreadCount = document.getElementById("unread-count");

// Load all announcements
function loadAnnouncements() {
  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  
  // Sort by date (newest first)
  announcements.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Update the unread count
  updateUnreadCount(announcements);

  // Display announcements
  announcementList.innerHTML = announcements.map((announcement, index) => {
    return `
      <li class="announcement ${announcement.read ? 'read' : 'unread'}">
        <p>${announcement.text} <small>(${new Date(announcement.date).toLocaleString()})</small></p>
        <button onclick="markAsRead(${index})">Mark as Read</button>
        <button onclick="showComments(${index})">Show Comments</button>
        <div id="comments-${index}" style="display:none;">
          <ul>${announcement.comments.map(comment => `<li>${comment}</li>`).join('')}</ul>
          <textarea id="new-comment-${index}" placeholder="Add your comment"></textarea>
          <button onclick="postComment(${index})">Post Comment</button>
        </div>
      </li>
    `;
  }).join('');
}

// Update unread count
function updateUnreadCount(announcements) {
  const unreadCountValue = announcements.filter(announcement => !announcement.read).length;
  unreadCount.innerText = unreadCountValue;
}

// Mark an announcement as read
function markAsRead(index) {
  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  announcements[index].read = true;
  localStorage.setItem("announcements", JSON.stringify(announcements));
  loadAnnouncements();
}

// Show/Hide comments for an announcement
function showComments(index) {
  const commentSection = document.getElementById(`comments-${index}`);
  commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
}

// Post a new comment
function postComment(index) {
  const newComment = document.getElementById(`new-comment-${index}`).value.trim();
  if (newComment) {
    const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    announcements[index].comments.push(newComment);
    localStorage.setItem("announcements", JSON.stringify(announcements));
    loadAnnouncements();
  }
}

// Search announcements
function searchAnnouncements() {
  const searchTerm = searchBar.value.toLowerCase();
  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.text.toLowerCase().includes(searchTerm)
  );
  displayAnnouncements(filteredAnnouncements);
}

// Display filtered announcements
function displayAnnouncements(announcements) {
  announcementList.innerHTML = announcements.map((announcement, index) => {
    return `
      <li class="announcement ${announcement.read ? 'read' : 'unread'}">
        <p>${announcement.text} <small>(${new Date(announcement.date).toLocaleString()})</small></p>
        <button onclick="markAsRead(${index})">Mark as Read</button>
        <button onclick="showComments(${index})">Show Comments</button>
        <div id="comments-${index}" style="display:none;">
          <ul>${announcement.comments.map(comment => `<li>${comment}</li>`).join('')}</ul>
          <textarea id="new-comment-${index}" placeholder="Add your comment"></textarea>
          <button onclick="postComment(${index})">Post Comment</button>
        </div>
      </li>
    `;
  }).join('');
}

// Filter announcements based on read/unread status
function filterAnnouncements(status) {
  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  let filteredAnnouncements;

  if (status === 'read') {
    filteredAnnouncements = announcements.filter(announcement => announcement.read);
  } else if (status === 'unread') {
    filteredAnnouncements = announcements.filter(announcement => !announcement.read);
  } else {
    filteredAnnouncements = announcements;
  }

  displayAnnouncements(filteredAnnouncements);
}

// Mark all announcements as read
function markAllAsRead() {
  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  announcements.forEach(announcement => {
    announcement.read = true;
  });
  localStorage.setItem("announcements", JSON.stringify(announcements));
  loadAnnouncements();
}

// Function to handle button click and change color dynamically
function handleButtonClick(button) {
    button.classList.add("clicked"); // Add class for clicked state
    
    // Optional: Remove the class after a short time to reset the style
    setTimeout(() => {
      button.classList.remove("clicked");
    }, 200); // Remove after 200ms (time button stays blue)
  }
  
  // HTML Example: Add the onClick event handler to each button
  // <button onclick="handleButtonClick(this)">Click Me</button>
  
  // In CSS, add this class for "clicked" state
  
// Initialize page on load
window.onload = loadAnnouncements;

