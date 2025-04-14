/**
 * Big Taste Jewelry - Main JavaScript File
 * Author: AI Developer
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Initialize Featured Products Swiper
    const featuredSwiper = new Swiper('.featured-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }
    });
    
    // Initialize Testimonial Swiper
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 3
            }
        }
    });
    
    // Show the rating popup after 5 seconds
    setTimeout(function() {
        const ratingModal = new bootstrap.Modal(document.getElementById('ratingModal'));
        ratingModal.show();
    }, 5000);
    
    // Rating stars functionality
    const ratingStars = document.querySelectorAll('.rating-star');
    let selectedRating = 0;
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            selectedRating = rating;
            
            // Reset all stars
            ratingStars.forEach(s => {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            });
            
            // Add filled stars up to the selected rating
            for (let i = 0; i < rating; i++) {
                ratingStars[i].classList.remove('far');
                ratingStars[i].classList.add('fas', 'active');
            }
        });
        
        // Hover effect
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            // Reset all stars
            ratingStars.forEach(s => {
                s.classList.remove('fas');
                s.classList.add('far');
            });
            
            // Add filled stars up to the hovered rating
            for (let i = 0; i < rating; i++) {
                ratingStars[i].classList.remove('far');
                ratingStars[i].classList.add('fas');
            }
        });
        
        // Mouse leave effect
        star.addEventListener('mouseleave', function() {
            // Reset all stars
            ratingStars.forEach(s => {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            });
            
            // Add filled stars up to the selected rating
            for (let i = 0; i < selectedRating; i++) {
                ratingStars[i].classList.remove('far');
                ratingStars[i].classList.add('fas', 'active');
            }
        });
    });
    
    // Submit rating button
    document.getElementById('submitRating').addEventListener('click', function() {
        console.log('Rating submitted:', selectedRating);
        // You would typically send this data to your server
        if (selectedRating > 0) {
            showToast('Thank you for your rating!');
        }
    });
    
    // Contact form submission
    document.getElementById('submitContact').addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && subject && message) {
            console.log('Contact form submitted:', { name, email, subject, message });
            // You would typically send this data to your server
            showToast('Your message has been sent. We\'ll get back to you soon!');
            
            // Close the modal
            const contactModal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
            contactModal.hide();
            
            // Reset form
            document.getElementById('contactForm').reset();
        } else {
            showToast('Please fill in all required fields.', 'error');
        }
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Product image loading animation
    const productImages = document.querySelectorAll('.product-img img');
    
    productImages.forEach(img => {
        img.parentElement.classList.add('img-loading');
        
        img.addEventListener('load', function() {
            this.parentElement.classList.remove('img-loading');
        });
    });
    
    // Wishlist heart toggle
    const wishlistButtons = document.querySelectorAll('.product-wishlist');
    
    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const heart = this.querySelector('i');
            
            if (heart.classList.contains('far')) {
                heart.classList.remove('far');
                heart.classList.add('fas');
                showToast('Product added to wishlist');
            } else {
                heart.classList.remove('fas');
                heart.classList.add('far');
                showToast('Product removed from wishlist');
            }
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.product-card .btn-outline-primary');
    
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            // Update cart counter (in a real app, you'd have proper cart management)
            const cartBadge = document.querySelector('.nav-icon .badge');
            let cartCount = parseInt(cartBadge.textContent);
            cartBadge.textContent = cartCount + 1;
            
            showToast(`${productTitle} added to your cart`);
        });
    });
    
    // Quick view button functionality
    const quickViewButtons = document.querySelectorAll('.product-quick-view .btn');
    
    quickViewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            // In a real implementation, this would open a modal with product details
            console.log('Quick view:', productTitle);
            showToast(`Quick view: ${productTitle}`);
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                console.log('Newsletter subscription:', email);
                // You would typically send this data to your server
                showToast('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    }
    
    // Create and show toast notifications
    function showToast(message, type = 'success') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toastEl = document.createElement('div');
        toastEl.className = `toast align-items-center ${type === 'error' ? 'text-bg-danger' : 'text-bg-success'}`;
        toastEl.setAttribute('role', 'alert');
        toastEl.setAttribute('aria-live', 'assertive');
        toastEl.setAttribute('aria-atomic', 'true');
        
        // Toast content
        toastEl.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        // Add toast to container
        toastContainer.appendChild(toastEl);
        
        // Initialize and show toast
        const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
        toast.show();
        
        // Remove toast after it's hidden
        toastEl.addEventListener('hidden.bs.toast', function() {
            this.remove();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 90, // Account for fixed navbar
                        behavior: 'smooth'
                    });
                    
                    // If using a mobile device, close the navbar
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    
                    if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                        const bsNavbar = bootstrap.Collapse.getInstance(navbarCollapse);
                        bsNavbar.hide();
                    }
                }
            }
        });
    });
});
