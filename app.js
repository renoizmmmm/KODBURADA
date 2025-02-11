// DOM Elements
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.querySelector('.music-control');
const header = document.querySelector('header');
let isMusicPlaying = false;

// Loading screen
window.addEventListener('load', () => {
    document.querySelector('.loader').classList.add('fade-out');
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
    }, 500);
});

// Scroll effect for header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Gallery and Video items delay animation
function animateItems(items) {
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 * index);
    });
}

// Section navigation
function showSection(sectionId) {
    const parallaxBg = document.querySelector('.parallax-bg');
    parallaxBg.style.opacity = sectionId === 'home' ? '0.3' : '0.1';

    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    targetSection.classList.add('active');

    if (sectionId === 'gallery') {
        animateItems(document.querySelectorAll('.gallery-item'));
    } else if (sectionId === 'videos') {
        animateItems(document.querySelectorAll('.video-item'));
    }

    navLinks.classList.remove('active');

    if (sectionId === 'home' && !isMusicPlaying) {
        playMusic();
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Music controls
function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicControl.classList.remove('playing');
        document.querySelector('.music-control i').style.color = '#fff';
    } else {
        playMusic();
    }
}

function playMusic() {
    bgMusic.play().catch(error => {
        console.log("Müzik otomatik başlatılamadı:", error);
    });
    isMusicPlaying = true;
    musicControl.classList.add('playing');
    document.querySelector('.music-control i').style.color = '#ff2d55';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');

    // Add delay to gallery and video items
    const items = document.querySelectorAll('.gallery-item, .video-item');
    items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Handle mobile menu clicks outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Preload images and videos
window.addEventListener('load', () => {
    // Preload images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });

    // Preload videos
    const videos = document.querySelectorAll('video source');
    videos.forEach(video => {
        const src = video.getAttribute('src');
        if (src) {
            const preloadVideo = document.createElement('link');
            preloadVideo.rel = 'preload';
            preloadVideo.as = 'video';
            preloadVideo.href = src;
            document.head.appendChild(preloadVideo);
        }
    });
});