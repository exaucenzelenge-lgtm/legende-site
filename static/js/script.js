// ============================================================
// TOAST
// ============================================================
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast ' + type;
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================================
// PARTICULES
// ============================================================
(function() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.width = (Math.random() * 4 + 1) + 'px';
        p.style.height = p.style.width;
        p.style.animationDuration = (Math.random() * 25 + 15) + 's';
        p.style.animationDelay = (Math.random() * 25) + 's';
        container.appendChild(p);
    }
    console.log('✅ Particules chargées');
})();

// ============================================================
// ⭐ LIENS MUSIQUE - MODIFIEZ ICI ⭐
// ============================================================
const musicLinks = [
    { name: "Spotify", url: "https://open.spotify.com/artist/votre-id", icon: "fab fa-spotify", color: "#1DB954" },
    { name: "Apple Music", url: "https://music.apple.com/artist/votre-id", icon: "fab fa-apple", color: "#FA243C" },
    { name: "YouTube Music", url: "https://music.youtube.com/channel/votre-id", icon: "fab fa-youtube", color: "#FF0000" },
    { name: "Deezer", url: "https://www.deezer.com/artist/votre-id", icon: "fab fa-deezer", color: "#A238FF" },
    { name: "Audiomack", url: "https://audiomack.com/votre-nom", icon: "fas fa-headphones", color: "#FF6B00" },
    { name: "Boomplay", url: "https://www.boomplay.com/artists/votre-id", icon: "fas fa-music", color: "#00BFA5" }
];

const musicGrid = document.getElementById('musicGrid');
if (musicGrid) {
    musicGrid.innerHTML = '';
    musicLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.innerHTML = `<i class="${link.icon}" style="color:${link.color}"></i> ${link.name}`;
        musicGrid.appendChild(a);
    });
    console.log('✅ Liens musique chargés');
}

// ============================================================
// POPUP MUSIQUE
// ============================================================
const musicPopup = document.getElementById('musicPopup');
const listenBtn = document.getElementById('listenBtn');
const listenCard = document.getElementById('listenCard');
const musicPopupClose = document.getElementById('musicPopupClose');

function openMusicPopup() {
    if (musicPopup) {
        musicPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
function closeMusicPopup() {
    if (musicPopup) {
        musicPopup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (listenBtn) listenBtn.addEventListener('click', openMusicPopup);
if (listenCard) listenCard.addEventListener('click', function(e) {
    e.preventDefault();
    openMusicPopup();
});
if (musicPopupClose) musicPopupClose.addEventListener('click', closeMusicPopup);
if (musicPopup) {
    musicPopup.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeMusicPopup();
    });
}

// ============================================================
// ⭐ RÉSEAUX SOCIAUX - MODIFIEZ ICI ⭐
// ============================================================
const socialLinks = [
    { name: "Instagram", url: "https://instagram.com/votre-compte", icon: "fa-instagram", color: "#E4405F" },
    { name: "TikTok", url: "https://tiktok.com/@votre-compte", icon: "fa-tiktok", color: "#000000" },
    { name: "Snapchat", url: "https://snapchat.com/add/votre-compte", icon: "fa-snapchat-ghost", color: "#FFFC00" },
    { name: "Facebook", url: "https://facebook.com/votre-compte", icon: "fa-facebook-f", color: "#1877F2" },
    { name: "YouTube", url: "https://youtube.com/@votre-compte", icon: "fa-youtube", color: "#FF0000" },
    { name: "X (Twitter)", url: "https://twitter.com/votre-compte", icon: "fa-x-twitter", color: "#000000" },
    { name: "WhatsApp", url: "https://wa.me/243XXXXXXXXX", icon: "fa-whatsapp", color: "#25D366" },
    { name: "Spotify", url: "https://open.spotify.com/artist/votre-id", icon: "fa-spotify", color: "#1DB954" },
    { name: "Threads", url: "https://threads.net/@votre-compte", icon: "fa-threads", color: "#000000" }
];

const socialContainer = document.getElementById('socialIcons');
if (socialContainer) {
    socialContainer.innerHTML = '';
    socialLinks.forEach(s => {
        const a = document.createElement('a');
        a.href = s.url;
        a.target = '_blank';
        a.title = s.name;
        a.style.color = s.color || '';
        a.innerHTML = `<i class="fab ${s.icon}"></i>`;
        socialContainer.appendChild(a);
    });
    console.log('✅ Réseaux sociaux chargés :', socialLinks.length);
}

// ============================================================
// GALERIE
// ============================================================
const galleryImages = [
    '🎤', '🎵', '🎶', '🎹', '🎸', '🎧', '🎭', '🌟',
    '🎵', '🎤', '🎶', '🎹', '🎸', '🎧', '🎭', '🌟',
    '🎤', '🎵', '🎶', '🎹', '🎸', '🎧', '🎭', '🌟',
    '🎵', '🎤', '🎶', '🎹', '🎸', '🎧'
];

const galleryContainer = document.getElementById('galleryGrid');
if (galleryContainer) {
    galleryContainer.innerHTML = '';
    galleryImages.forEach((emoji, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <span style="font-size:3rem;">${emoji}</span>
            <div class="overlay">Photo ${index + 1}</div>
        `;
        item.onclick = () => openGalleryModal(emoji);
        galleryContainer.appendChild(item);
    });
    console.log('✅ Galerie chargée');
}

function openGalleryModal(content) {
    const modal = document.getElementById('galleryModal');
    const img = document.getElementById('modalImage');
    if (!modal || !img) return;
    img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'%3E%3Crect width='500' height='500' fill='%230a0806'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23f5b81b' font-size='100'%3E${encodeURIComponent(content)}%3C/text%3E%3C/svg%3E`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

const modalClose = document.getElementById('modalClose');
if (modalClose) {
    modalClose.addEventListener('click', () => {
        const modal = document.getElementById('galleryModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
const galleryModal = document.getElementById('galleryModal');
if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================================
// NEWSLETTER (localStorage)
// ============================================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value.trim();
        if (email && email.includes('@')) {
            let subscribers = JSON.parse(localStorage.getItem('rockm_newsletter') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('rockm_newsletter', JSON.stringify(subscribers));
                document.getElementById('newsletterStatus').innerHTML = '✅ Abonnement confirmé !';
                document.getElementById('newsletterEmail').value = '';
                showToast('✅ Vous êtes abonné(e) !', 'success');
            } else {
                showToast('📧 Vous êtes déjà abonné(e)', 'info');
            }
        } else {
            showToast('⚠️ Email valide requis', 'error');
        }
    });
}

// ============================================================
// BOUTONS
// ============================================================
const playBtn = document.getElementById('playBtn');
if (playBtn) playBtn.addEventListener('click', openMusicPopup);

const outNowBtn = document.getElementById('outNowBtn');
if (outNowBtn) {
    outNowBtn.addEventListener('click', function() {
        openMusicPopup();
    });
}

const managerLink = document.getElementById('managerLink');
if (managerLink) {
    managerLink.addEventListener('click', function(e) {
        e.preventDefault();
        showToast('📧 Manager : contact@rockm-music.com', 'info');
    });
}

// ============================================================
// NAVIGATION DOUCE
// ============================================================
document.querySelectorAll('.nav-links a, .feature-card a, .btn-outline[href]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .bio-section, .gallery-grid, .newsletter-box, .social-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
document.getElementById('whatsappBtn').addEventListener('click', function() {
    const message = `Bonjour ROCK M, je suis intéressé(e) par votre musique !`;
    window.open(`https://wa.me/243999888777?text=${encodeURIComponent(message)}`, '_blank');
});

console.log('🎵 ROCK M - Page chargée avec succès !');