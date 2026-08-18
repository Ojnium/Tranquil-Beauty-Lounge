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
    {
        id: 1,
        title: 'Bridal Hair Style 1',
        category: 'bridal',
        image: 'Bridal hair1.jpeg'
    },
    {
        id: 2,
        title: 'Bridal Hair Style 2',
        category: 'bridal',
        image: 'Bridal hair2.jpeg'
    },
    {
        id: 3,
        title: 'Bridal Makeup Look 1',
        category: 'bridal',
        image: 'Bridal makeup1.jpeg'
    },
    {
        id: 4,
        title: 'Bridal Makeup Look 2',
        category: 'bridal',
        image: 'Bridal makeup2.jpeg'
    },
    {
        id: 5,
        title: 'Deep Curly Deep Wave Human Hair',
        category: 'hair',
        image: 'wig5.jpeg'
    },
    {
        id: 6,
        title: 'Fulani Braids with Boho Curls',
        category: 'hair',
        image: 'Fulani braids with boho curls.jpeg'
    },
    {
        id: 7,
        title: 'Ghana Weaving with Low Braided Bun',
        category: 'hair',
        image: 'Ghana weaving with a low braided bun.jpeg'
    },
    {
        id: 8,
        title: 'Nail Design 1',
        category: 'nails',
        image: 'Nails1.jpeg'
    },
    {
        id: 9,
        title: 'Nail Design 2',
        category: 'nails',
        image: 'Nails2.jpeg'
    },
    {
        id: 10,
        title: 'Nail Design 3',
        category: 'nails',
        image: 'Nails3.jpeg'
    },
    {
        id: 11,
        title: 'Natural Hair Style 1',
        category: 'hair',
        image: 'Natural hair1.jpeg'
    },
    {
        id: 12,
        title: 'Natural Hair Style 2',
        category: 'hair',
        image: 'Natural hair2.jpeg'
    },
    {
        id: 13,
        title: 'Raw Human Hair Body Wave',
        category: 'hair',
        image: 'Raw human hair natural body wave.jpeg'
    },
    {
        id: 14,
        title: 'Straight Raw Hair',
        category: 'hair',
        image: 'Straight raw hair.jpeg'
    },
    {
        id: 15,
        title: 'Weave Installation 1',
        category: 'hair',
        image: 'Weaves1.jpeg'
    },
    {
        id: 16,
        title: 'Weave Installation 2',
        category: 'hair',
        image: 'Weaves2.jpeg'
    },
    {
        id: 17,
        title: 'Premium Wig 1',
        category: 'hair',
        image: 'Wigs1.jpeg'
    },
    {
        id: 18,
        title: 'Premium Wig 2',
        category: 'hair',
        image: 'Wigs2.jpeg'
    },
    {
        id: 19,
        title: 'Premium Wig 3',
        category: 'hair',
        image: 'Wigs3.jpeg'
    },
    {
        id: 20,
        title: 'Knotless Boho Braids',
        category: 'hair',
        image: 'knotless boho braids with curlywavy end.jpeg'
    },
    {
        id: 21,
        title: 'Sleek Low Bun',
        category: 'hair',
        image: 'sleek low bun.jpeg'
    }
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
            window.open(`https://wa.me/2347010692088?text=${whatsappMessage}`, '_blank');
            
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
