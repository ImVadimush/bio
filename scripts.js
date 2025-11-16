// Loading screen
const loading = document.getElementById('loading');

// Canvas animation
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height, particles = [];
let animationId;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }

    draw() {
        ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, width, height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 255, 136, ${0.2 - distance / 500})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        });
    });

    animationId = requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    init();
});

// Typing animation
const statusTexts = [
    'Crafting digital experiences',
    'Building innovative solutions',
    'Writing clean, efficient code',
    'Creating the future, one line at a time',
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const statusElement = document.getElementById('status');

function type() {
    const currentText = statusTexts[textIndex];

    if (!isDeleting) {
        if (charIndex < currentText.length) {
            statusElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, 50);
        } else {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 2000);
        }
    } else {
        if (charIndex > 0) {
            statusElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, 30);
        } else {
            isDeleting = false;
            textIndex = (textIndex + 1) % statusTexts.length;
            setTimeout(type, 500);
        }
    }
}

// Stats counter animation
let statsAnimationInProgress = false;

function resetStats() {
    const projects = document.getElementById('statProjects');
    const years = document.getElementById('statYears');
    const satisfaction = document.getElementById('statSatisfaction');
    
    projects.textContent = '0+';
    years.textContent = '0+';
    satisfaction.textContent = '0%';
    statsAnimationInProgress = false;
}

function animateStats() {
    if (statsAnimationInProgress) return;
    statsAnimationInProgress = true;
    
    const projects = document.getElementById('statProjects');
    const years = document.getElementById('statYears');
    const satisfaction = document.getElementById('statSatisfaction');
    
    let projectsCount = 0;
    let yearsCount = 0;
    let satisfactionCount = 0;
    
    const projectsTarget = 50;
    const yearsTarget = 3;
    const satisfactionTarget = 99;
    
    const animate = () => {
        if (projectsCount < projectsTarget) {
            projectsCount++;
            projects.textContent = projectsCount + '+';
        }
        
        if (yearsCount < yearsTarget) {
            yearsCount++;
            years.textContent = yearsCount + '+';
        }
        
        if (satisfactionCount < satisfactionTarget) {
            satisfactionCount++;
            satisfaction.textContent = satisfactionCount + '%';
        }
        
        if (projectsCount < projectsTarget || yearsCount < yearsTarget || satisfactionCount < satisfactionTarget) {
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}

// Card flip with stats animation
const card = document.getElementById('card');
const flipBtn = document.getElementById('flipBtn');

flipBtn.addEventListener('click', () => {
    card.classList.toggle('flipped');
    
    if (card.classList.contains('flipped')) {
        setTimeout(() => {
            resetStats();
            animateStats();
        }, 500);
    } else {
        resetStats();
    }
});

// Single music player
const audio = document.getElementById('audioElement');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const currentTimeElement = document.getElementById('currentTime');
const durationElement = document.getElementById('duration');
const songNameElement = document.getElementById('songName');

// Set song info
songNameElement.textContent = "Lil Peep - fucked up";

// Set initial volume
audio.volume = 0.8;

// Set audio source
audio.src = "songs/Lil Peep.mp3";

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgress() {
    if (audio.duration && !isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
        currentTimeElement.textContent = formatTime(audio.currentTime);
    }
}

function setProgress(e) {
    if (audio.duration && !isNaN(audio.duration)) {
        const rect = progressContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    }
}

// Play button
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().then(() => {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }).catch(e => {
            console.log("Play error:", e);
        });
    } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
});

progressContainer.addEventListener('click', setProgress);

// Audio events
audio.addEventListener('loadedmetadata', () => {
    if (audio.duration && !isNaN(audio.duration)) {
        durationElement.textContent = formatTime(audio.duration);
    }
});

audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener('ended', () => {
    // Restart the same song
    audio.currentTime = 0;
    audio.play();
});

// Audio error handling
audio.addEventListener('error', (e) => {
    console.log("Audio error:", e);
    songNameElement.textContent = "Error loading music";
});

// Volume control
const volumeArea = document.getElementById('volumeArea');
const volumeControl = document.getElementById('volumeControl');
const volumeContainer = document.getElementById('volumeContainer');
const volumeFill = document.getElementById('volumeFill');
const volumeIconContainer = document.getElementById('volumeIconContainer');
const volumeIcon = document.querySelector('.volume-icon');

let isDragging = false;

// Toggle volume slider
const musicPlayer = document.getElementById('musicPlayer');

volumeIconContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    volumeArea.classList.toggle('expanded');
    musicPlayer.classList.toggle('volume-expanded');
});

// Hide volume slider when clicking outside
document.addEventListener('click', (e) => {
    if (!volumeArea.contains(e.target)) {
        volumeArea.classList.remove('expanded');
        musicPlayer.classList.remove('volume-expanded');
    }
});

// Keep volume slider visible when interacting with it
volumeContainer.addEventListener('click', (e) => {
    e.stopPropagation();
});

function setVolume(e) {
    const rect = volumeContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const volume = Math.max(0, Math.min(1, percent));
    
    audio.volume = volume;
    volumeFill.style.width = (volume * 100) + '%';
    updateVolumeIcon(volume);
}

function updateVolumeIcon(volume) {
    let newIconPath = '';
    
    if (volume === 0) {
        newIconPath = 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z';
    } else if (volume < 0.3) {
        newIconPath = 'M3 9v6h4l5 5V4L7 9H3z';
    } else if (volume < 0.7) {
        newIconPath = 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z';
    } else {
        newIconPath = 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z';
    }
    
    volumeIcon.innerHTML = `<path d="${newIconPath}"/>`;
}

// Mouse events
volumeContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    setVolume(e);
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        setVolume(e);
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Touch events for mobile
volumeContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    setVolume(e.touches[0]);
    e.preventDefault();
});

document.addEventListener('touchmove', (e) => {
    if (isDragging) {
        setVolume(e.touches[0]);
        e.preventDefault(); 
    }
});

document.addEventListener('touchend', () => {
    isDragging = false;
});

// Click event
volumeContainer.addEventListener('click', (e) => {
    setVolume(e);
});

// Initialize everything
window.addEventListener('load', () => {
    resize();
    init();
    animate();
    type();
    
    // Initialize volume
    audio.volume = 0.8;
    volumeFill.style.width = '80%';
    updateVolumeIcon(0.8);
    
    // Try to play immediately
    const playAudio = () => {
        audio.play().then(() => {
            console.log("Music started successfully");
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }).catch(e => {
            console.log("Autoplay blocked, waiting for user interaction:", e);
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            
            // Add click event to document to enable playback
            document.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play().then(() => {
                        playIcon.style.display = 'none';
                        pauseIcon.style.display = 'block';
                    });
                }
            }, { once: true });
            
            // Also try on any keypress
            document.addEventListener('keydown', () => {
                if (audio.paused) {
                    audio.play().then(() => {
                        playIcon.style.display = 'none';
                        pauseIcon.style.display = 'block';
                    });
                }
            }, { once: true });
        });
    };
    
    // Try to play immediately
    playAudio();
    
    // Wait for audio to be ready
    audio.addEventListener('canplaythrough', () => {
        playAudio();
    }, { once: true });
    
    // Hide loading screen
    loading.classList.add('hidden');
});

window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationId);
});

if (window.DeviceOrientationEvent) {
    window.addEventListener('orientationchange', function() {
        const card = document.getElementById('card');
        const currentTransform = card.style.transform;
        
        card.style.transition = 'none';
        setTimeout(() => {
            card.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }, 100);
    });
}

document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
}, { passive: false });

document.addEventListener('gesturechange', function(e) {
    e.preventDefault();
}, { passive: false });

document.addEventListener('gestureend', function(e) {
    e.preventDefault();
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });
