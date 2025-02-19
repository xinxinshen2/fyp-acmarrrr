        // Logout function
        window.logout = function () {
            signOut(auth).then(() => {
                console.log("User signed out successfully.");
                window.location.href = "login.html";
            }).catch(error => {
                console.error("Error logging out:", error);
            });
        };
    
        // Long Press Logic with Progress Bar
    const logoutButton = document.getElementById("logoutButton");
    const progressRect = document.querySelector(".progress-ring-rect");
    let pressTimer;
    let progressInterval;

    const startProgress = () => {
        let time = 0;
        const totalTime = 3000; // 3 seconds
        const circumference = 284; // 矩形周长 (2 * (width + height) - 8 * rx)

        progressInterval = setInterval(() => {
            time += 10; // Update every 10ms
            const progress = (time / totalTime) * circumference;
            progressRect.style.strokeDashoffset = circumference - progress;

            if (time >= totalTime) {
                clearInterval(progressInterval);
                logout(); // Call logout after 3 seconds
            }
        }, 10);
    };

    const resetProgress = () => {
        clearInterval(progressInterval);
        progressRect.style.strokeDashoffset = 284; // Reset progress
    };

    // Mouse Events
    logoutButton.addEventListener("mousedown", startProgress);
    logoutButton.addEventListener("mouseup", resetProgress);
    logoutButton.addEventListener("mouseleave", resetProgress);

    // Touch Events
    logoutButton.addEventListener("touchstart", startProgress);
    logoutButton.addEventListener("touchend", resetProgress);