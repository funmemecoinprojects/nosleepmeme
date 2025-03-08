// Play the unicorn sound
const audio = document.getElementById('unicornSound');

// Make sure audio plays
audio.play().catch(error => {
    console.error("Audio playback failed:", error);
});

// Navigate to congratulations page after 4.5 seconds
setTimeout(() => {
    window.location.href = 'congratulations.html';
}, 4500);