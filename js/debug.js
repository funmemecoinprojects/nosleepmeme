// This debug script will help identify why the button isn't working
// Add this at the top of your index.html before any other scripts

function debugButtonIssue() {
    console.log("Debug script running");
    
    // Check if the button exists
    const startBtn = document.getElementById('startExperienceBtn');
    if (startBtn) {
        console.log("Button exists:", startBtn);
        console.log("Button inner HTML:", startBtn.innerHTML);
        console.log("Button onclick:", startBtn.onclick);
        console.log("Button is visible:", startBtn.offsetParent !== null);
        
        // Add a guaranteed event listener
        startBtn.addEventListener('click', function(e) {
            console.log("Button clicked through debug handler!");
            e.preventDefault();
            e.stopPropagation();
            alert("Debug button click detected! Redirecting to surprise.html in 2 seconds...");
            setTimeout(function() {
                window.location.href = 'surprise.html';
            }, 2000);
        });
        
        // Force button to be clickable
        startBtn.style.zIndex = "9999";
        startBtn.style.position = "relative";
        startBtn.style.cursor = "pointer";
        startBtn.style.border = "3px solid red"; // Make it obvious
    } else {
        console.error("Button doesn't exist!");
        
        // Check if the wallet connected div is visible
        const walletConnected = document.getElementById('walletConnected');
        if (walletConnected) {
            console.log("walletConnected div:", walletConnected);
            console.log("walletConnected display style:", walletConnected.style.display);
        } else {
            console.error("walletConnected div doesn't exist!");
        }
    }
}

// Run immediately
debugButtonIssue();

// Also run after DOM is fully loaded
document.addEventListener('DOMContentLoaded', debugButtonIssue);

// And run after a short delay to ensure everything is loaded
setTimeout(debugButtonIssue, 1000);

// Run again after wallet connection simulation should be complete
setTimeout(debugButtonIssue, 3000);