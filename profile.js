// Profile Picture Upload
document.getElementById("profilePicUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("previewImage").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Save Profile Changes
function saveChanges() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let course = document.getElementById("course").value;

    document.getElementById("displayName").innerText = name;
    document.getElementById("displayEmail").innerText = email;
    document.getElementById("displayCourse").innerText = course;

    alert("Profile Updated Successfully!");
}

// Password Change
function changePassword() {
    let currentPassword = document.getElementById("currentPassword").value;
    let newPassword = document.getElementById("newPassword").value;

    if (currentPassword && newPassword.length >= 6) {
        alert("Password updated successfully!");
    } else {
        alert("Please enter a valid password (6+ characters).");
    }
}

// Notification Preferences
function savePreferences() {
    let emailNotif = document.getElementById("emailNotif").checked;
    let smsNotif = document.getElementById("smsNotif").checked;

    alert("Preferences saved:\n" +
          "Email Notifications: " + (emailNotif ? "On" : "Off") + "\n" +
          "SMS Notifications: " + (smsNotif ? "On" : "Off"));
}

