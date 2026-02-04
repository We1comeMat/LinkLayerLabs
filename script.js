// Generate project cards from projects.js
document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid && typeof projects !== 'undefined') {
        projectsGrid.innerHTML = '';

        // Find the featured project (GlowLink) and other projects
        const featuredProject = projects.find(p => p.title === 'GlowLink');
        const otherProjects = projects.filter(p => p.title !== 'GlowLink');

        // Create featured project card (wide format)
        if (featuredProject) {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card featured';

            let imageHTML = '';
            if (featuredProject.images && Array.isArray(featuredProject.images) && featuredProject.images.length > 0) {
                imageHTML = `
                    <div class="project-image project-image-grid">
                        ${featuredProject.images.map(img => `<img src="${img}" alt="${featuredProject.title}">`).join('')}
                        ${featuredProject.model ? `
                            <button class="view-3d-btn" data-model="${featuredProject.model}" data-title="${featuredProject.title}">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                </svg>
                                3D View
                            </button>
                        ` : ''}
                    </div>
                `;
            }

            projectCard.innerHTML = `
                ${imageHTML}
                <div class="project-content">
                    <h3>${featuredProject.title}</h3>
                    <p>${featuredProject.description}</p>
                    <div class="project-tags">
                        ${featuredProject.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    ${featuredProject.projectPage ? `
                        <a href="${featuredProject.projectPage}" class="project-link">
                            <span>View Project</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                    ` : ''}
                </div>
            `;

            projectsGrid.appendChild(projectCard);
        }

        // Create file explorer section for other projects
        if (otherProjects.length > 0) {
            const explorerSection = document.createElement('div');
            explorerSection.className = 'projects-explorer';

            const explorerHeader = document.createElement('div');
            explorerHeader.className = 'explorer-header';
            explorerHeader.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Other Projects</span>
            `;
            explorerSection.appendChild(explorerHeader);

            const explorerList = document.createElement('div');
            explorerList.className = 'explorer-list';

            otherProjects.forEach(project => {
                const explorerItem = document.createElement('div');
                explorerItem.className = 'explorer-item';

                // Use OBD-II plug icon for CANcast, default icon for others
                let iconSVG = '';
                if (project.title === 'CANcast') {
                    // OBD-II connector / diagnostic plug icon
                    iconSVG = `
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M4 8h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z"></path>
                            <path d="M7 8V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2"></path>
                            <circle cx="6" cy="12" r="0.7" fill="currentColor"></circle>
                            <circle cx="9" cy="12" r="0.7" fill="currentColor"></circle>
                            <circle cx="12" cy="12" r="0.7" fill="currentColor"></circle>
                            <circle cx="15" cy="12" r="0.7" fill="currentColor"></circle>
                            <circle cx="18" cy="12" r="0.7" fill="currentColor"></circle>
                            <circle cx="7.5" cy="15" r="0.7" fill="currentColor"></circle>
                            <circle cx="10.5" cy="15" r="0.7" fill="currentColor"></circle>
                            <circle cx="13.5" cy="15" r="0.7" fill="currentColor"></circle>
                            <circle cx="16.5" cy="15" r="0.7" fill="currentColor"></circle>
                        </svg>
                    `;
                } else {
                    iconSVG = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                    `;
                }

                explorerItem.innerHTML = `
                    <div class="explorer-icon">
                        ${iconSVG}
                    </div>
                    <div class="explorer-info">
                        <span class="explorer-name">${project.title}</span>
                        <span class="explorer-desc">${project.description}</span>
                    </div>
                    <a href="${project.projectPage}" class="explorer-btn">
                        View Project
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                `;
                explorerList.appendChild(explorerItem);
            });

            explorerSection.appendChild(explorerList);
            projectsGrid.appendChild(explorerSection);
        }

        // Re-apply hover effects to newly created cards
        applyProjectCardEffects();
        applyCS50CardEffect();

        // Add 3D viewer functionality
        setup3DViewer();
    }
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
document.addEventListener('DOMContentLoaded', () => {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach(el => observer.observe(el));
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(255, 255, 255, 0.2)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(255, 255, 255, 0.2)';
    }

    lastScrollTop = scrollTop;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroGradient = document.querySelector('.hero-gradient');
    const pcbBackground = document.querySelector('.pcb-background');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }

    if (heroGradient && scrolled < window.innerHeight) {
        heroGradient.style.opacity = 1 - (scrolled / 600);
    }

    // Animate PCB elements on scroll
    if (pcbBackground && scrolled < window.innerHeight) {
        const scrollPercent = scrolled / window.innerHeight;

        // Move PCB background with parallax effect
        pcbBackground.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrollPercent * 2}deg)`;

        // Adjust opacity based on scroll
        const baseOpacity = 0.5;
        pcbBackground.style.opacity = baseOpacity - (scrollPercent * 0.2);
    }
});

// Project card hover effect enhancement
function applyProjectCardEffects() {
    document.querySelectorAll('.project-card').forEach(card => {
        let animationFrame;

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'box-shadow 0.3s ease, transform 0.1s ease-out';
        });

        card.addEventListener('mousemove', (e) => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }

            animationFrame = requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 200;
                const rotateY = (centerX - x) / 200;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
        });

        card.addEventListener('mouseleave', () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// CS50 card hover effect (same 3D tilt as project cards)
function applyCS50CardEffect() {
    const card = document.querySelector('.cs50-card');
    if (!card) return;

    let animationFrame;

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'box-shadow 0.3s ease, transform 0.1s ease-out';
    });

    card.addEventListener('mousemove', (e) => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }

        animationFrame = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 200;
            const rotateY = (centerX - x) / 200;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
    });

    card.addEventListener('mouseleave', () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Add your form submission logic here
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Sending...';
        submitButton.style.backgroundColor = '#6e6e73';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.backgroundColor = '#34c759';

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Add staggered animation delays to grid items
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Additional scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Preload images for better performance
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.loading !== 'lazy') {
            img.loading = 'lazy';
        }
    });
});

// Add smooth hover effect to navigation items
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animate stats on scroll
const animateStats = () => {
    const stats = document.querySelectorAll('.stat h3');

    stats.forEach(stat => {
        // Skip animation for infinity symbol
        if (stat.textContent.includes('∞') || stat.textContent.includes('&infin;')) {
            return;
        }

        const target = parseInt(stat.textContent);

        // Skip if target is not a valid number
        if (isNaN(target)) {
            return;
        }

        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateStat = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
            }
        };

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateStat();
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statObserver.observe(stat.parentElement);
    });
};

document.addEventListener('DOMContentLoaded', animateStats);

// Animate PCB decorations on scroll
const pcbDecorationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const decoration = entry.target;
            const traces = decoration.querySelectorAll('.trace-decoration');
            const vias = decoration.querySelectorAll('.via-decoration');
            const smds = decoration.querySelectorAll('.smd-decoration');

            traces.forEach((trace, index) => {
                setTimeout(() => {
                    trace.style.strokeDashoffset = '0';
                }, index * 200);
            });

            vias.forEach((via, index) => {
                setTimeout(() => {
                    via.style.opacity = '1';
                    via.style.transform = 'scale(1)';
                }, 500 + index * 100);
            });

            smds.forEach((smd, index) => {
                setTimeout(() => {
                    smd.style.opacity = '1';
                    smd.style.transform = 'translateY(0)';
                }, 700 + index * 100);
            });
        }
    });
}, { threshold: 0.2 });

// Observe all PCB decorations
document.addEventListener('DOMContentLoaded', () => {
    const pcbDecorations = document.querySelectorAll('.pcb-decoration');
    pcbDecorations.forEach(decoration => {
        pcbDecorationObserver.observe(decoration);
    });
});

// Add subtle floating animation to vias on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const vias = document.querySelectorAll('.via-inner');

    vias.forEach((via, index) => {
        const speed = 0.5 + (index % 3) * 0.2;
        const offset = Math.sin(scrolled * 0.01 + index) * 3;
        via.style.transform = `translate(${offset * speed}px, ${offset * speed}px)`;
    });
});
