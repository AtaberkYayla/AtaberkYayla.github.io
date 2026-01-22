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

navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
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
    const increment = isDecimal ? 0.05 : 1;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            element.textContent = hasPlus ? targetValue + '+' : (isDecimal ? targetValue.toFixed(1) : targetValue);
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
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
    stat.setAttribute('data-target', stat.textContent);
    stat.textContent = '0';
    statsObserver.observe(stat);
});

// ===========================
// PROJECT GALLERY DATA (Ataberk'in Projeleri)
// ===========================
const projectGalleries = {
    builty: {
        title: 'Builty',
        subtitle: 'Full-Stack Web Automation Engine',
        images: [
            { url: 'images/builty-concept.png', caption: 'Automated Website Generation Engine' }
        ]
    },
    cubesat: {
        title: 'Health Risk CubeSat',
        subtitle: 'Embedded ML Simulation',
        images: [
            { url: 'images/cubesat-sim.png', caption: 'Atmospheric Data Processing Architecture' }
        ]
    },
    echonews: {
        title: 'Echo News',
        subtitle: 'Flutter Mobile News Aggregator',
        images: [
            { url: 'images/echo-news.png', caption: 'Clean UI and Category Navigation' }
        ]
    }
};

// ===========================
// MODAL & INTERACTIVE ELEMENTS
// ===========================
// Not: Modal fonksiyonları HTML'deki yapıya uygun olarak korunmuştur.
// Ataberk'in projeleri henüz 'In-Progress' olduğu için görsel yoksa modal açılmayacak şekilde güncellenebilir.

// ===========================
// CONSOLE EASTER EGG (Kişiselleştirilmiş)
// ===========================
console.log('%c👨‍💻 Ataberk Yayla', 'color: #00F5A0; font-size: 24px; font-weight: bold;');
console.log('%cFull-Stack Developer | Technical Marketing Specialist', 'color: #A0A0AB; font-size: 14px;');
console.log('%cLooking for an intern? Reach out at ata1903berk@gmail.com', 'color: #8338EC; font-size: 12px;');