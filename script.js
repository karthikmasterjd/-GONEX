// ================================
// GoNex Tours - Main JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // Navigation Toggle (Mobile)
    // ================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // ================================
    // Sticky Navigation on Scroll
    // ================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ================================
    // Scroll Reveal Animation
    // ================================
    const reveals = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // ================================
    // Testimonials Slider
    // ================================
    const testimonialTrack = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (testimonialTrack && prevBtn && nextBtn) {
        let currentSlide = 0;
        const slides = testimonialTrack.querySelectorAll('.testimonial-card');
        const totalSlides = slides.length;
        
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
        
        // Auto-play slider
        setInterval(function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
    }

    // ================================
    // Package Filter System
    // ================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const packageCards = document.querySelectorAll('.package-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter packages
            packageCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Re-trigger animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ================================
    // Gallery Modal
    // ================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    
    if (galleryModal) {
        let currentImageIndex = 0;
        const images = Array.from(galleryItems).map(item => item.querySelector('img').src);
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentImageIndex = index;
                showImage(currentImageIndex);
                galleryModal.classList.add('active');
            });
        });
        
        function showImage(index) {
            modalImage.src = images[index];
        }
        
        modalClose.addEventListener('click', function() {
            galleryModal.classList.remove('active');
        });
        
        modalPrev.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        });
        
        modalNext.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        });
        
        // Close modal on background click
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                galleryModal.classList.remove('active');
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (galleryModal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    galleryModal.classList.remove('active');
                } else if (e.key === 'ArrowLeft') {
                    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                    showImage(currentImageIndex);
                } else if (e.key === 'ArrowRight') {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    showImage(currentImageIndex);
                }
            }
        });
    }

    // ================================
    // Contact Form Validation
    // ================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            let isValid = true;
            
            // Name validation
            const name = document.getElementById('name').value.trim();
            if (name === '') {
                document.getElementById('nameError').textContent = 'Name is required';
                isValid = false;
            } else if (name.length < 2) {
                document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
                isValid = false;
            }
            
            // Email validation
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            // Mobile validation
            const mobile = document.getElementById('mobile').value.trim();
            const mobileRegex = /^[0-9]{10}$/;
            if (mobile === '') {
                document.getElementById('mobileError').textContent = 'Mobile number is required';
                isValid = false;
            } else if (!mobileRegex.test(mobile)) {
                document.getElementById('mobileError').textContent = 'Please enter a valid 10-digit mobile number';
                isValid = false;
            }
            
            // Travel Type validation
            const travelType = document.getElementById('travelType').value;
            if (travelType === '') {
                document.getElementById('travelTypeError').textContent = 'Please select a travel type';
                isValid = false;
            }
            
            // Number of People validation
            const people = document.getElementById('people').value;
            if (people === '' || people < 1) {
                document.getElementById('peopleError').textContent = 'Please enter number of people';
                isValid = false;
            }
            
            // Date validation
            const date = document.getElementById('date').value;
            if (date === '') {
                document.getElementById('dateError').textContent = 'Please select a date';
                isValid = false;
            } else {
                const selectedDate = new Date(date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    document.getElementById('dateError').textContent = 'Please select a future date';
                    isValid = false;
                }
            }
            
            // If all validations pass
            if (isValid) {
                // Hide form and show success message
                contactForm.style.display = 'none';
                document.getElementById('formSuccess').classList.add('active');
                
                // In a real application, you would send the form data to a server here
                console.log('Form submitted successfully:', {
                    name,
                    email,
                    mobile,
                    travelType,
                    people,
                    date,
                    message: document.getElementById('message').value
                });
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    document.getElementById('formSuccess').classList.remove('active');
                }, 5000);
            }
        });
        
        // Real-time validation on blur
        const formInputs = contactForm.querySelectorAll('input, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                // Clear error when user starts typing again
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement && this.value.trim() !== '') {
                    errorElement.textContent = '';
                }
            });
        });
    }

    // ================================
    // Stats Counter Animation
    // ================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        let hasAnimated = false;
        
        function animateStats() {
            if (hasAnimated) return;
            
            const statsSection = document.querySelector('.stats-section');
            if (!statsSection) return;
            
            const sectionTop = statsSection.getBoundingClientRect().top;
            
            if (sectionTop < window.innerHeight - 100) {
                hasAnimated = true;
                
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60 FPS
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
                        }
                    };
                    
                    updateCounter();
                });
            }
        }
        
        window.addEventListener('scroll', animateStats);
        animateStats(); // Check on load
    }

    // ================================
    // Smooth Scroll for Anchor Links
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ================================
    // Update Copyright Year
    // ================================
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ================================
    // Set Minimum Date for Date Input
    // ================================
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }

    // ================================
    // Hero Scroll Button
    // ================================
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const nextSection = document.querySelector('.about-intro, .section');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ================================
    // Add Loading State to Buttons
    // ================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a subtle scale effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // ================================
    // Image Lazy Loading Fallback
    // ================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ================================
    // Print Friendly Contact Info
    // ================================
    const printBtn = document.querySelector('.print-contact');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // ================================
    // Form Field Focus Effects
    // ================================
    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // ================================
    // Detect if User is on Mobile
    // ================================
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Adjust floating buttons for mobile
        const floatBtns = document.querySelectorAll('.float-btn');
        floatBtns.forEach(btn => {
            btn.style.width = '50px';
            btn.style.height = '50px';
        });
    }

    // ================================
    // Back to Top Button (Optional)
    // ================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 180px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--royal-blue);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ================================
    // Console Welcome Message
    // ================================
    console.log('%c Welcome to GoNex Tours! ', 'background: #003F7D; color: #FFCC00; font-size: 20px; padding: 10px;');
    console.log('%c We Plan. You Enjoy. ', 'color: #003F7D; font-size: 14px;');

    // ================================
    // Performance: Preload Images
    // ================================
    const criticalImages = [
        'https://images.unsplash.com/photo-1534443274343-c6200874852c',
        'https://images.unsplash.com/photo-1552249352-02a0817a2d95'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // ================================
    // Accessibility: Skip to Main Content
    // ================================
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--royal-blue);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // ================================
    // End of Script
    // ================================
    console.log('GoNex Tours website loaded successfully!');
    
});

// ================================
// Service Worker Registration (Optional - for PWA)
// ================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment below to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ================================
// Error Handling
// ================================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ================================
// Online/Offline Detection
// ================================
window.addEventListener('online', function() {
    console.log('Back online!');
    // You could show a notification to the user
});

window.addEventListener('offline', function() {
    console.log('Connection lost!');
    // You could show a notification to the user
});
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Form data collect pannrathu
    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        travelType: document.getElementById("travelType").value,
        people: document.getElementById("people").value,
        date: document.getElementById("date").value,
        message: document.getElementById("message").value
    };

    // EmailJS config
    const SERVICE_ID = "service_1ze4lyo"; 
    const TEMPLATE_ID = "template_imcyz5a"; 
    const PUBLIC_KEY = "sauLgrXjhPdjbJW5d"; 

    emailjs.init(PUBLIC_KEY);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
    .then(() => {
        document.getElementById("contactForm").reset();
        alert("✅ Thank you! Your request has been submitted successfully. Our team will contact you soon.");
    })
    .catch((error) => {
        console.error("❌ Error:", error);
        alert("❌ Something went wrong. Please try again.");
    });
});
