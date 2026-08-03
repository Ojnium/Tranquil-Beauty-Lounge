// ============================================
// TRANQUIL BEAUTY LOUNGE - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // ============================================
    // GALLERY DATA
    // ============================================
    const galleryData = [
        { id: 1, title: 'Elegant Braids', category: 'hair', image: 'https://placehold.co/600x600/A8B5A0/FFFFFF?text=Braids' },
        { id: 2, title: 'Luxury Wig', category: 'hair', image: 'https://placehold.co/600x600/A8B5A0/FFFFFF?text=Wig' },
        { id: 3, title: 'Bridal Hair', category: 'bridal', image: 'https://placehold.co/600x600/A8B5A0/FFFFFF?text=Bridal+Hair' },
        { id: 4, title: 'Bridal Makeup', category: 'bridal', image: 'https://placehold.co/600x600/A8B5A0/FFFFFF?text=Bridal+Makeup' },
        { id: 5, title: 'Glowing Makeup', category: 'makeup', image: 'https://placehold.co/600x600/A8B5A0/FFFFFF?text=Makeup' },
        { id: 6, title: 'Elegant Nails', category: 'nails', image: 'https://placehold.co/600x600/A8B5A0/FFFFFF?text=Nails' },
        { id: 7, title: 'Weave Installation', category: 'hair', image: 'https://placehold.co/600x600/A8B5A0/FFFFFF?text=Weave' },
        { id: 8, title: 'Natural Hair', category: 'hair', image: 'https://placehold.co/600x600/A8B5A0/FFFFFF?text=Natural+Hair' },
    ];

    const galleryGrid = document.getElementById('galleryGrid');
    const loadMoreBtn = document.getElementById('loadMoreGallery');
    let visibleCount = 6;
    let currentFilter = 'all';

    function renderGalleryItems(filter = 'all', count = visibleCount) {
        const filtered = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);
        const itemsToShow = filtered.slice(0, count);
        
        galleryGrid.innerHTML = itemsToShow.map(item => `
            <div class="gallery-item" data-category="${item.category}" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <span class="category-badge">${item.category}</span>
                <div class="gallery-item-overlay">
                    <h4>${item.title}</h4>
                    <span>${item.category}</span>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const index = galleryData.findIndex(g => g.id === id);
                if (index !== -1) openLightbox(index);
            });
        });

        if (loadMoreBtn) {
            const totalFiltered = filter === 'all' ? galleryData.length : galleryData.filter(item => item.category === filter).length;
            loadMoreBtn.style.display = count >= totalFiltered ? 'none' : 'inline-flex';
        }
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            visibleCount = 6;
            renderGalleryItems(currentFilter, visibleCount);
        });
    });

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visibleCount += 6;
            renderGalleryItems(currentFilter, visibleCount);
        });
    }

    renderGalleryItems('all', visibleCount);

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const item = galleryData[currentIndex];
        lightboxImage.src = item.image;
        lightboxCaption.textContent = `${item.title} · ${item.category}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        const filtered = currentFilter === 'all' ? galleryData : galleryData.filter(item => item.category === currentFilter);
        const currentItem = galleryData[currentIndex];
        const filteredIndex = filtered.findIndex(item => item.id === currentItem.id);
        let newFilteredIndex = filteredIndex + direction;
        if (newFilteredIndex < 0) newFilteredIndex = filtered.length - 1;
        if (newFilteredIndex >= filtered.length) newFilteredIndex = 0;
        const newItem = filtered[newFilteredIndex];
        const newGlobalIndex = galleryData.findIndex(item => item.id === newItem.id);
        if (newGlobalIndex !== -1) {
            currentIndex = newGlobalIndex;
            const item = galleryData[currentIndex];
            lightboxImage.src = item.image;
            lightboxCaption.textContent = `${item.title} · ${item.category}`;
        }
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', function(e) { e.stopPropagation(); navigateLightbox(-1); });
    lightboxNext.addEventListener('click', function(e) { e.stopPropagation(); navigateLightbox(1); });
    lightbox.addEventListener('click', function(e) { if (e.target === this) closeLightbox(); });
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') navigateLightbox(-1);
        else if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const service = document.getElementById('contactService').value;
            const message = document.getElementById('contactMessage').value.trim();
            
            if (!name || !phone || !message) {
                alert('Please fill in all required fields (Name, Phone, and Message)');
                return;
            }
            
            // Build WhatsApp message
            const whatsappMessage = `Hello Tranquil Beauty Lounge!%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email || 'Not provided'}%0A*Service Interested In:* ${service || 'Not specified'}%0A*Message:* ${message}`;
            
            // Open WhatsApp with the message
            window.open(`https://wa.me/234XXXXXXXXX?text=${whatsappMessage}`, '_blank');
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'review-success show';
            successMessage.style.cssText = 'text-align: center; padding: 1rem; background: #A8B5A0; color: white; border-radius: 12px; margin-top: 1rem;';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle" style="font-size: 2rem; margin-right: 0.5rem;"></i>
                Thank you! Your message has been sent. We'll get back to you soon.
            `;
            
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 10 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 10000);
        });
    }

    console.log('Tranquil Beauty Lounge loaded successfully 🌿');
});