// ======================================================
// SPIDER-MAN: BRAND NEW DAY THEME
// Portfolio JavaScript - Abhishek Verma
// ======================================================

// ===== Preloader =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2000);
});

// ===== Initialize AOS =====
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
});

// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .tool-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
            follower.style.borderColor = 'var(--spidey-gold)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = 'var(--spidey-red)';
        });
    });
}

// ===== Navigation =====
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        if (section.offsetTop <= scrollPos && 
            section.offsetTop + section.offsetHeight > scrollPos) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme === 'dark' ? '' : 'light');
        if (newTheme === 'dark') {
            body.removeAttribute('data-theme');
        } else {
            body.setAttribute('data-theme', 'light');
        }
        
        localStorage.setItem('theme', newTheme === 'dark' ? '' : 'light');
        updateThemeIcon(newTheme === 'dark' ? '' : 'light');
    });
}

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-spider';
    }
}

// ===== Typing Effect =====
const typingText = document.getElementById('typingText');
const phrases = [
    'Assistant Engineer @ Edubuddy',
    'Frontend Developer',
    '.NET Blazor Developer',
    'Python Enthusiast',
    'SEO Specialist',
    'Your Friendly Neighborhood Dev! 🕷️',
    'C# / .NET Developer',
    'Problem Solver & Quick Learner'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    if (!typingText) return;

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 300;
    }

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// ===== Skill Progress Bars Animation =====
const skillBars = document.querySelectorAll('.skill-progress');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = progress + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===== Project Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.display = '';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== Back to Top =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const btn = this.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span>Sending... 🕸️</span><i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        // The form submits to Formspree, so we just update the UI
        setTimeout(() => {
            btn.innerHTML = '<span>Web Signal Sent! ✓</span><i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = '';
            }, 3000);
        }, 1000);
    });
}

// ===== Web Canvas Animation =====
const canvas = document.getElementById('webCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Web particles
    class WebParticle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.5 ? '#d32f2f' : '#1565c0';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width || 
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    const particles = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new WebParticle());
    }

    function drawWebLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(211, 47, 47, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawWebLines();
        requestAnimationFrame(animateCanvas);
    }

    animateCanvas();
}

// ===== Smooth Reveal Animations =====
const revealElements = document.querySelectorAll('.about-card, .contact-card, .activity-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    revealObserver.observe(el);
});

// ===== Easter Egg: Konami Code =====
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateSpiderSense();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateSpiderSense() {
    document.body.style.animation = 'spiderSense 0.5s ease 3';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spiderSense {
            0%, 100% { filter: none; }
            50% { filter: hue-rotate(180deg) saturate(2); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 1500);
    
    // Show spider-sense alert
    const alert = document.createElement('div');
    alert.innerHTML = '🕷️ SPIDER-SENSE ACTIVATED! 🕷️';
    alert.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #d32f2f, #1565c0);
        color: white;
        padding: 20px 40px;
        border-radius: 12px;
        font-family: 'Bangers', cursive;
        font-size: 2rem;
        letter-spacing: 5px;
        z-index: 99999;
        animation: fadeInOut 2s ease forwards;
        box-shadow: 0 0 60px rgba(211, 47, 47, 0.5);
    `;
    
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            30% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            70% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(fadeStyle);
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
        fadeStyle.remove();
    }, 2000);
}

// ===== Console Message =====
console.log(`
%c🕷️ SPIDER-MAN: BRAND NEW DAY 🕷️
%cAbhishek Verma's Portfolio
%c"With great power comes great responsibility"
%cTry the Konami Code for a surprise! ↑↑↓↓←→←→BA
`, 
    'color: #d32f2f; font-size: 24px; font-weight: bold; font-family: "Bangers", cursive;',
    'color: #1565c0; font-size: 16px; font-weight: bold;',
    'color: #ffd600; font-size: 14px; font-style: italic;',
    'color: #666; font-size: 12px;'
);