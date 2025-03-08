// Canvas background setup
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId;
let isWalletConnected = false;
let mouse = {
    x: undefined,
    y: undefined,
    radius: 150
};

// Set canvas to full window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Track mouse position
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Initialize particles
function initParticles() {
    particles = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            baseX: Math.random() * canvas.width,
            baseY: Math.random() * canvas.height,
            density: (Math.random() * 30) + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
        });
    }
}

// Draw network lines between particles
function drawNetworkLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update particles
    particles.forEach(particle => {
        // Basic movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY *= -1;
        }
        
        // Mouse interaction
        if (mouse.x !== undefined && mouse.y !== undefined) {
            // Calculate distance between particle and mouse
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                
                const directionX = forceDirectionX * force * particle.density;
                const directionY = forceDirectionY * force * particle.density;
                
                particle.x += directionX;
                particle.y += directionY;
            }
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
    });
    
    drawNetworkLines();
    
    animationFrameId = requestAnimationFrame(animate);
}

// Initialize canvas and animation
function initCanvas() {
    resizeCanvas();
    initParticles();
    animate();
}

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// Simulate wallet connection
document.getElementById('connectWalletBtn').addEventListener('click', () => {
    // In a real implementation, this would show the wallet selection modal
    simulateWalletConnection();
});

function simulateWalletConnection() {
    console.log("Connecting wallet...");
    
    // Simulate connection delay
    setTimeout(() => {
        isWalletConnected = true;
        
        // Show connected state
        document.getElementById('walletNotConnected').style.display = 'none';
        document.getElementById('walletConnected').style.display = 'block';
        
        // Update connect button
        const connectBtn = document.getElementById('connectWalletBtn');
        connectBtn.textContent = 'Disconnect';
        connectBtn.className = 'disconnect-btn';
        
        // Update button event listener
        connectBtn.removeEventListener('click', simulateWalletConnection);
        connectBtn.addEventListener('click', disconnectWallet);
        
        console.log("Wallet connected!");
    }, 1000);
}

function disconnectWallet() {
    console.log("Disconnecting wallet...");
    
    // Simulate disconnection delay
    setTimeout(() => {
        isWalletConnected = false;
        
        // Show disconnected state
        document.getElementById('walletNotConnected').style.display = 'block';
        document.getElementById('walletConnected').style.display = 'none';
        
        // Update connect button
        const connectBtn = document.getElementById('connectWalletBtn');
        connectBtn.textContent = 'Select Wallet';
        connectBtn.className = 'connect-btn';
        
        // Update button event listener
        connectBtn.removeEventListener('click', disconnectWallet);
        connectBtn.addEventListener('click', simulateWalletConnection);
        
        console.log("Wallet disconnected!");
    }, 500);
}

// Function to start the experience
function startExperience() {
    console.log("Starting experience...");
    window.location.href = 'surprise.html';
}

// Approach 1: Use event delegation on the document body
document.body.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'startExperienceBtn') {
        console.log("Button clicked via delegation");
        startExperience();
    }
});

// Approach 2: Direct event listener added repeatedly to handle dynamic elements
function attachButtonListener() {
    const startBtn = document.getElementById('startExperienceBtn');
    if (startBtn) {
        // Remove any existing listeners first to avoid duplicates
        startBtn.removeEventListener('click', startExperience);
        // Add the listener
        startBtn.addEventListener('click', startExperience);
        console.log("Event listener attached directly to button");
    }
}

// Attach on DOMContentLoaded
document.addEventListener('DOMContentLoaded', attachButtonListener);

// Attach immediately in case DOMContentLoaded already fired
attachButtonListener();

// Approach 3: Add onclick attribute directly to the button through code
setTimeout(function() {
    const startBtn = document.getElementById('startExperienceBtn');
    if (startBtn) {
        startBtn.onclick = startExperience;
        console.log("Onclick property set directly");
    }
}, 500);

// Approach 4: Add a polling mechanism to keep checking for the button
let checkCount = 0;
const buttonCheckInterval = setInterval(function() {
    const startBtn = document.getElementById('startExperienceBtn');
    if (startBtn) {
        startBtn.onclick = startExperience;
        console.log("Button found and handler attached via polling");
        clearInterval(buttonCheckInterval);
    }
    checkCount++;
    if (checkCount > 20) {
        clearInterval(buttonCheckInterval);
    }
}, 100);

// Initialize the canvas when the page loads
window.addEventListener('load', initCanvas);