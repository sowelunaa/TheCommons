// Smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Shrinking header on home page
if (document.querySelector('.home-hero')) {
    // Create sticky nav element
    const stickyNav = document.createElement('nav');
    stickyNav.className = 'sticky-nav';
    stickyNav.innerHTML = `
        <div class="nav-container">
            <a href="index.html" class="nav-logo">The Commons</a>
            <ul class="nav-links">
                <li><a href="index.html" class="active">Map</a></li>
                <li><a href="coliving.html">Co-Living</a></li>
                <li><a href="about.html">About Me</a></li>
                <li><a href="add-group.html">Add A Group</a></li>
                <li><a href="acknowledgments.html">Acknowledgments</a></li>
            </ul>
        </div>
    `;
    document.body.insertBefore(stickyNav, document.body.firstChild);

    const homeHero = document.querySelector('.home-hero');
    const mainContainer = document.querySelector('.container');
    const heroHeight = 450; // Fixed height to prevent jumping

    // Handle scroll event with threshold
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Only transition when crossing the threshold, not continuously
        if (scrollPosition > heroHeight * 0.7 && lastScroll <= heroHeight * 0.7) {
            homeHero.classList.add('scrolled');
            stickyNav.classList.add('visible');
            if (mainContainer) {
                mainContainer.style.paddingTop = '120px';
            }
        } else if (scrollPosition <= heroHeight * 0.7 && lastScroll > heroHeight * 0.7) {
            homeHero.classList.remove('scrolled');
            stickyNav.classList.remove('visible');
            if (mainContainer) {
                mainContainer.style.paddingTop = '5rem';
            }
        }
        
        lastScroll = scrollPosition;
    });
}

// Add fade-in animation on scroll
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

// Observe elements for fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.map-section, .video-container, .form-container');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle (if needed in future)
const handleResize = () => {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    }
};

window.addEventListener('resize', handleResize);
handleResize();
