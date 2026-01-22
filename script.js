// ===========================
// MOBILE MENU TOGGLE
// ===========================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// ===========================
// SKILL BARS ANIMATION
// ===========================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';

            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);

            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===========================
// FLOATING CARDS PARALLAX
// ===========================
const floatingCards = document.querySelectorAll('.floating-card');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatingCards.forEach((card, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;

        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===========================
// ACTIVE NAV LINK HIGHLIGHT
// ===========================
const navLinksArray = document.querySelectorAll('.nav-link');
const sectionsArray = Array.from(sections);

window.addEventListener('scroll', () => {
    let current = '';

    sectionsArray.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - navbar.offsetHeight - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// STATS COUNTER ANIMATION
// ===========================
const stats = document.querySelectorAll('.stat-value');

const countUp = (element, target) => {
    const hasPlus = target.toString().includes('+');
    const targetValue = parseFloat(target.toString().replace('+', ''));
    const isDecimal = targetValue.toString().includes('.');
    const duration = 2000;
    const increment = isDecimal ? 0.01 : 1;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;

        if (current >= targetValue) {
            element.textContent = hasPlus ? targetValue + '+' : (isDecimal ? targetValue.toFixed(2) : targetValue);
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
        }
    }, duration / (targetValue / increment));
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target.getAttribute('data-target');
            countUp(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    const originalValue = stat.textContent;
    stat.setAttribute('data-target', originalValue);
    stat.textContent = '0';
    statsObserver.observe(stat);
});

// ===========================
// PROJECT CARDS STAGGER ANIMATION
// ===========================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
});

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// ===========================
// ADD LOADING ANIMATION
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// MOUSE TRACKING VISUAL EFFECT
// ===========================
if (window.innerWidth > 768) {
    // Create cursor follower
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);

    // Add styles dynamically
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        .cursor-dot {
            width: 8px;
            height: 8px;
            background: var(--primary);
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.15s ease-out, opacity 0.15s ease-out;
            mix-blend-mode: difference;
        }
        
        .cursor-outline {
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary);
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease-out, width 0.3s ease-out, height 0.3s ease-out, opacity 0.15s ease-out;
            opacity: 0.5;
        }
        
        .cursor-dot.hidden,
        .cursor-outline.hidden {
            opacity: 0;
        }
        
        .cursor-outline.expand {
            width: 60px;
            height: 60px;
            opacity: 0.3;
        }
        
        /* Hide default cursor on interactive elements */
        a, button, .btn, .project-card, .skill-category, .contact-card, .learning-card, .nav-link {
            cursor: pointer;
        }
    `;
    document.head.appendChild(cursorStyles);

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth outline following
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = (outlineX - 20) + 'px';
        cursorOutline.style.top = (outlineY - 20) + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Expand effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category, .contact-card, .learning-card, .nav-link, .soft-skill, .tech-badge');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('expand');
            cursorDot.style.transform = 'scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('expand');
            cursorDot.style.transform = 'scale(1)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.classList.add('hidden');
        cursorOutline.classList.add('hidden');
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.classList.remove('hidden');
        cursorOutline.classList.remove('hidden');
    });

    // Create particle trail effect
    const particles = [];
    const maxParticles = 15;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.life = 1;

            this.element = document.createElement('div');
            this.element.style.position = 'fixed';
            this.element.style.width = this.size + 'px';
            this.element.style.height = this.size + 'px';
            this.element.style.background = 'var(--primary)';
            this.element.style.borderRadius = '50%';
            this.element.style.pointerEvents = 'none';
            this.element.style.zIndex = '9998';
            this.element.style.opacity = '0.6';
            this.element.style.boxShadow = '0 0 10px var(--primary)';
            document.body.appendChild(this.element);
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.02;

            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
            this.element.style.opacity = this.life * 0.6;
            this.element.style.transform = `scale(${this.life})`;

            if (this.life <= 0) {
                this.element.remove();
                return false;
            }
            return true;
        }
    }

    let particleTimer = 0;
    document.addEventListener('mousemove', (e) => {
        particleTimer++;
        if (particleTimer % 3 === 0) { // Create particle every 3 mouse moves
            particles.push(new Particle(e.clientX, e.clientY));

            if (particles.length > maxParticles) {
                const removed = particles.shift();
                if (removed && removed.element) {
                    removed.element.remove();
                }
            }
        }
    });

    function animateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            if (!particles[i].update()) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ===========================
// CONSOLE EASTER EGG
// ===========================
console.log('%c👨‍💻 Ataberk Yayla', 'color: #00F5A0; font-size: 24px; font-weight: bold;');
console.log('%cSoftware Engineering Student | Full-Stack Developer', 'color: #A0A0AB; font-size: 14px;');
console.log('%cInterested in collaboration? Reach out at ata1903berk@gmail.com', 'color: #6E6E78; font-size: 12px;');