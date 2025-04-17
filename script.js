// Enhanced Portfolio Animations and Interactivity

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    initSkillBars();
    
    // Add smooth scrolling to all links
    addSmoothScrolling();
    
    // Add dark mode toggle functionality
    setupDarkModeToggle();
});

// Scroll animations for elements with fade-in class
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Initial check for elements in viewport
    checkFadeElements();
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        checkFadeElements();
    });
    
    // Function to check if elements are in viewport
    function checkFadeElements() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
}

// Initialize skill progress bars
function initSkillBars() {
    // Add skill progress bars to the DOM
    addSkillProgressBars();
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress div');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const elementTop = bar.getBoundingClientRect().top;
            if (elementTop < window.innerHeight) {
                setTimeout(() => {
                    bar.style.width = bar.getAttribute('data-width');
                }, 300);
            }
        });
    }
    
    // Initial check and add scroll listener
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
}

// Add skill progress bars to the DOM
function addSkillProgressBars() {
    const skills = document.querySelectorAll('#hanging-icons .col');
    
    skills.forEach(skill => {
        const skillName = skill.querySelector('h3').textContent;
        let skillPercent = '85%'; // Default
        
        // Customize percentages based on skill name
        if (skillName.includes('Web Development')) {
            skillPercent = '90%';
        } else if (skillName.includes('Python')) {
            skillPercent = '85%';
        } else if (skillName.includes('DSA')) {
            skillPercent = '80%';
        }
        
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'skill-progress';
        const progressInner = document.createElement('div');
        progressInner.setAttribute('data-width', skillPercent);
        progressBar.appendChild(progressInner);
        
        // Insert after the ul element
        const targetElement = skill.querySelector('ul') || skill.querySelector('p');
        if (targetElement) {
            targetElement.parentNode.insertBefore(progressBar, targetElement.nextSibling);
        }
    });
}

// Add smooth scrolling to all links
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup dark mode toggle
function setupDarkModeToggle() {
    // Create dark mode toggle button
    const darkModeBtn = document.createElement('button');
    darkModeBtn.id = 'dark-mode-toggle';
    darkModeBtn.innerHTML = '🌙';
    darkModeBtn.setAttribute('title', 'Toggle Dark Mode');
    darkModeBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(darkModeBtn);
    
    // Toggle dark mode on button click
    darkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '☀️';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            this.innerHTML = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '☀️';
    }
}

// Add some interactive TypeWriter effect to the intro section
function initTypeWriter() {
    const nameElement = document.querySelector('.name-dv');
    if (!nameElement) return;
    
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    const typeSpeed = 100; // milliseconds
    
    function type() {
        if (i < originalText.length) {
            nameElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, typeSpeed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

// Add animated background particles
function initParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    `;
    
    // Insert canvas as first child of hero section
    heroSection.insertBefore(canvas, heroSection.firstChild);
    
    // Make sure content is above canvas
    const content = heroSection.querySelector('.title-photo');
    if (content) {
        content.style.position = 'relative';
        content.style.zIndex = '2';
    }
    
    const intro = heroSection.querySelector('.intro');
    if (intro) {
        intro.style.position = 'relative';
        intro.style.zIndex = '2';
    }
    
    // Initialize particles.js (would require particles.js library)
    // This is commented out as it would require external library
    // if (typeof particlesJS !== 'undefined') {
    //     particlesJS('particles-canvas', {
    //         particles: {
    //             number: { value: 80 },
    //             color: { value: '#3a86ff' },
    //             opacity: { value: 0.5 },
    //             size: { value: 3 },
    //             line_linked: {
    //                 enable: true,
    //                 distance: 150,
    //                 color: '#3a86ff',
    //                 opacity: 0.4,
    //                 width: 1
    //             },
    //             move: { enable: true, speed: 2 }
    //         }
    //     });
    // }
}

// Add hover effects to project cards
function addProjectCardEffects() {
    const projectCards = document.querySelectorAll('.card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize elements with fade-in class
function initFadeElements() {
    const elementsToAnimate = [
        '.heading',
        '.card',
        '.col',
        '.table',
        'ul li',
        '.contact-section p'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            if (!element.classList.contains('fade-in')) {
                element.classList.add('fade-in');
            }
        });
    });
}

// Initialize all interactive features
window.addEventListener('load', function() {
    initTypeWriter();
    initParticles();
    addProjectCardEffects();
    initFadeElements();
    
    // Add some additional classes for animations
    document.querySelectorAll('.heading').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});