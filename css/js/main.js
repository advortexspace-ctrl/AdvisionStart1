// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainMenu = document.getElementById('mainMenu');

if (mobileMenuBtn && mainMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mainMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        // Toggle body scroll when menu is open
        document.body.style.overflow = mainMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mainMenu && mainMenu.classList.contains('active') && 
        !e.target.closest('nav') && 
        !e.target.closest('.mobile-menu-btn')) {
        mainMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (mainMenu && mainMenu.classList.contains('active')) {
            mainMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Free Audit Form Submission
const auditForm = document.getElementById('auditForm');

if (auditForm) {
    auditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('audit-name').value;
        const email = document.getElementById('audit-email').value;
        const business = document.getElementById('audit-business').value;
        
        // Simple form validation
        if (!name || !email || !business) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show success message
        alert(`Thank you ${name}! Your free audit request for "${business}" has been submitted. We'll email your audit report to ${email} within 48 hours.`);
        
        // Reset form
        auditForm.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    }
});

// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// Initial check
fadeInOnScroll();

// Check on scroll with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            fadeInOnScroll();
            scrollTimeout = null;
        }, 100);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            
            // Calculate offset based on header height
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without scrolling
            history.pushState(null, null, href);
        }
    });
});

// Form input validation
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = 'var(--danger)';
        } else {
            this.style.borderColor = 'var(--light-gray)';
        }
    });
    
    input.addEventListener('input', function() {
        this.style.borderColor = 'var(--light-gray)';
    });
});

// Detect touch device
const isTouchDevice = () => {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
};

// Add touch-specific optimizations
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
    
    // Increase tap targets for touch devices
    document.querySelectorAll('.btn, .contact-btn').forEach(btn => {
        btn.style.minHeight = '44px';
        btn.style.minWidth = '44px';
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('loaded');
    
    // Set current year in footer if needed
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Log page view (for analytics placeholder)
    console.log('AdVision Start website loaded successfully');
});

// Error handling for images
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Service Worker registration (progressive web app feature)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}
