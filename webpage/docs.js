// Documentation Page Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const toggle = item.querySelector('.accordion-toggle');
        
        // Set initial state
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease-in-out';
        
        header.addEventListener('click', function() {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherHeader = otherItem.querySelector('.accordion-header');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    const otherToggle = otherItem.querySelector('.accordion-toggle');
                    
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherContent.style.maxHeight = '0px';
                    otherToggle.textContent = '+';
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isExpanded) {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0px';
                toggle.textContent = '+';
                item.classList.remove('active');
            } else {
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
                toggle.textContent = '−';
                item.classList.add('active');
            }
        });
        
        // Handle keyboard navigation
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    });
    
    // Auto-expand first item on page load
    if (accordionItems.length > 0) {
        const firstItem = accordionItems[0];
        const firstHeader = firstItem.querySelector('.accordion-header');
        const firstContent = firstItem.querySelector('.accordion-content');
        const firstToggle = firstItem.querySelector('.accordion-toggle');
        
        firstHeader.setAttribute('aria-expanded', 'true');
        firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        firstToggle.textContent = '−';
        firstItem.classList.add('active');
    }
    
    // Handle window resize to recalculate heights
    window.addEventListener('resize', function() {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});

// Add smooth scroll behavior for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add loading animation for documentation page
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation for accordion items
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100); // Stagger the animations
    });
    
    // Add animation for the docs header
    const docsHeader = document.querySelector('.docs-header');
    if (docsHeader) {
        docsHeader.style.opacity = '0';
        docsHeader.style.transform = 'translateY(-20px)';
        docsHeader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            docsHeader.style.opacity = '1';
            docsHeader.style.transform = 'translateY(0)';
        }, 200);
    }
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects for paper links
    const paperLinks = document.querySelectorAll('.paper-link');
    paperLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects for suggestion items
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    suggestionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-medium)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Add search functionality (placeholder for future enhancement)
document.addEventListener('DOMContentLoaded', function() {
    // This could be expanded to add search functionality across documentation
    console.log('Documentation page loaded successfully');
}); 