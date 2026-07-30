// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initMobileNav();
    initStickyHeader();
    initStatsCounter();
    initCurrentYear();
});

// Mobile Navigation Toggle
function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-navigation');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (toggleBtn && mainNav) {
        toggleBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            
            // Toggle icon menu / close
            if (mainNav.classList.contains('active')) {
                toggleBtn.innerHTML = '<i data-lucide="x"></i>';
            } else {
                toggleBtn.innerHTML = '<i data-lucide="menu"></i>';
            }
            lucide.createIcons();
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    toggleBtn.innerHTML = '<i data-lucide="menu"></i>';
                    lucide.createIcons();
                }
            });
        });
    }
}

// Sticky Header effect on scroll
function initStickyHeader() {
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active link tracking
        trackActiveLink();
    });
}

// Track and update the active menu item based on page scroll
function trackActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Auto-update copyright year
function initCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Stats Counter Animation
function initStatsCounter() {
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    if (statsNumbers.length === 0) return;
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    };

    // Intersection Observer to trigger counter when visible
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach(num => countUp(num));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-bar-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}
