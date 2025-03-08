// Canvas background setup (same as main.js)
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId;
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

// Navigate back to main page when button is clicked
document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('backToMainBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            console.log("Navigating back to main page...");
            window.location.href = 'index.html';
        });
    }
});

// Also add click event directly in case DOMContentLoaded has already fired
const backBtn = document.getElementById('backToMainBtn');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        console.log("Navigating back to main page...");
        window.location.href = 'index.html';
    });
}

// Initialize the canvas when the page loads
window.addEventListener('load', initCanvas);

// Make "Disconnect" button redirect to main page
document.querySelector('.disconnect-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});