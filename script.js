// ===== Gallery Data Store =====
// Each image gets: { id, src, title, likes, liked, comments[] }
const galleryData = [];
let nextId = 1;

// ===== DOM Elements =====
const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxLikeBtn = document.getElementById('lightbox-like-btn');
const lightboxLikeCount = document.getElementById('lightbox-like-count');
const commentsList = document.getElementById('comments-list');
const commentsCountBadge = document.getElementById('comments-count');
const commentInput = document.getElementById('comment-input');
const commentSendBtn = document.getElementById('comment-send-btn');

// ===== Upload Modal Elements =====
const uploadModal = document.getElementById('upload-modal');
const uploadDropzone = document.getElementById('upload-dropzone');
const uploadFileInput = document.getElementById('upload-file-input');
const uploadPreview = document.getElementById('upload-preview');
const uploadPreviewImg = document.getElementById('upload-preview-img');
const uploadTitleInput = document.getElementById('upload-title');
const btnUploadSubmit = document.getElementById('btn-upload-submit');
const btnUploadCancel = document.getElementById('btn-upload-cancel');
const btnAddPhoto = document.getElementById('btn-add-photo');

// ===== Unsplash Images for Default Gallery =====
const unsplashIds = [
    '1550133730-695473e544be',
    '1518837695005-2083093ee35b',
    '1494438639946-1ebd1d20bf85',
    '1506744626753-1fa00d1e3a5a',
    '1472214103451-9374bd1c798e',
    '1493246507139-91e8fad9978e',
    '1511497584788-876760111969',
    '1444464666168-49d116a8b792',
    '1461696114087-397271a7aedc',
    '1470071131384-001b85755b36',
    '1501854140801-50d01698950b',
    '1469474968028-56623f02e42e',
    '1433086966358-54859d0ed716',
    '1490730141103-6cac27aaab94',
    '1505144808419-1957a94ca61e',
    '1475924156734-496f6cac6ec1',
    '1486312338219-ce68d2c6f44d',
    '1500462918059-b1a0cb512f1d',
    '1534447677768-be436bb09401',
    '1524169358666-79f325da508f'
];

const categories = ["Portrait", "Nature", "Architecture", "Abstract"];
const sampleCommenters = ["Alex", "Maya", "Ravi", "Sana", "Leo", "Priya", "Jin", "Aisha"];
const sampleComments = [
    "Absolutely stunning shot! 📸",
    "Love the colors in this one.",
    "Beautiful composition!",
    "This is incredible work.",
    "The lighting is perfect here.",
    "Wow, this takes my breath away!",
    "Great perspective 👏",
    "So moody and atmospheric."
];

// ===== Initialize Gallery =====
function initGallery() {
    // Generate 20 default images with data
    const totalImages = 20;

    for (let i = 0; i < totalImages; i++) {
        const photoId = unsplashIds[i % unsplashIds.length];
        const imgSrc = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=80`;
        const category = categories[Math.floor(Math.random() * categories.length)];
        const likeCount = Math.floor(Math.random() * 120) + 5;

        // Generate 0-3 random comments for some images
        const numComments = Math.floor(Math.random() * 4);
        const comments = [];
        for (let c = 0; c < numComments; c++) {
            comments.push({
                author: sampleCommenters[Math.floor(Math.random() * sampleCommenters.length)],
                text: sampleComments[Math.floor(Math.random() * sampleComments.length)],
                time: getRandomTimeAgo()
            });
        }

        const imageData = {
            id: nextId++,
            src: imgSrc,
            title: `${category} ${i + 1}`,
            likes: likeCount,
            liked: false,
            comments: comments
        };

        galleryData.push(imageData);
        galleryGrid.appendChild(createGalleryCard(imageData));
    }
}

function getRandomTimeAgo() {
    const times = ['2m ago', '15m ago', '1h ago', '3h ago', '5h ago', '12h ago', '1d ago', '2d ago', '3d ago'];
    return times[Math.floor(Math.random() * times.length)];
}

// ===== Create Gallery Card Element =====
function createGalleryCard(data) {
    const card = document.createElement('div');
    card.className = 'break-inside-avoid gallery-card relative rounded-DEFAULT overflow-hidden bg-surface-container-low border border-surface-variant shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] cursor-pointer';
    card.setAttribute('data-id', data.id);

    card.innerHTML = `
        <img src="${data.src}" loading="lazy" alt="${data.title}" class="w-full h-full object-cover aspect-square sm:aspect-auto sm:h-64 bg-surface-container" />
        
        <!-- Action Buttons (top-right) -->
        <div class="card-actions">
            <button class="card-like-btn ${data.liked ? 'liked' : ''}" onclick="toggleCardLike(event, ${data.id})" title="Like">
                <span class="material-symbols-outlined">favorite</span>
            </button>
            <button class="card-comment-btn" onclick="openLightboxById(event, ${data.id})" title="Comment">
                <span class="material-symbols-outlined">chat_bubble</span>
            </button>
        </div>

        <!-- Hover Overlay -->
        <div class="gallery-overlay absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]" onclick="openLightboxById(event, ${data.id})">
            <span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings: 'FILL' 1;">visibility</span>
        </div>

        <!-- Bottom Info Bar -->
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end pointer-events-none">
            <p class="font-label-sm text-label-sm text-white">${data.title}</p>
            <div class="flex items-center gap-3">
                <span class="flex items-center gap-1 text-white/80" style="font-size: 12px;">
                    <span class="material-symbols-outlined" style="font-size: 14px; font-variation-settings: 'FILL' 1;">favorite</span>
                    <span class="card-like-counter" data-id="${data.id}">${data.likes}</span>
                </span>
                <span class="flex items-center gap-1 text-white/80" style="font-size: 12px;">
                    <span class="material-symbols-outlined" style="font-size: 14px;">chat_bubble</span>
                    ${data.comments.length}
                </span>
            </div>
        </div>
    `;

    return card;
}

// ===== Like on Card =====
function toggleCardLike(event, id) {
    event.stopPropagation();

    const data = galleryData.find(d => d.id === id);
    if (!data) return;

    data.liked = !data.liked;
    data.likes += data.liked ? 1 : -1;

    // Update card button
    const card = galleryGrid.querySelector(`[data-id="${id}"]`);
    if (card) {
        const likeBtn = card.querySelector('.card-like-btn');
        likeBtn.classList.toggle('liked', data.liked);

        // Pop animation
        likeBtn.classList.remove('pop');
        void likeBtn.offsetWidth; // trigger reflow
        likeBtn.classList.add('pop');

        // Update counter
        const counter = card.querySelector(`.card-like-counter[data-id="${id}"]`);
        if (counter) counter.textContent = data.likes;
    }

    // Update lightbox if open for same image
    if (currentImageData && currentImageData.id === id) {
        updateLightboxLike();
    }
}

// ===== Lightbox =====
let currentImageData = null;

function openLightboxById(event, id) {
    event.stopPropagation();

    const data = galleryData.find(d => d.id === id);
    if (!data) return;

    currentImageData = data;

    // Set image (higher res)
    let src = data.src;
    if (src.includes('images.unsplash.com')) {
        src = src.replace('w=800', 'w=1600');
    }
    lightboxImg.src = src;

    // Update like state
    updateLightboxLike();

    // Render comments
    renderComments();

    // Show lightbox
    lightbox.classList.remove('hidden');
    setTimeout(() => {
        lightbox.classList.add('visible');
    }, 10);
    document.body.style.overflow = 'hidden';

    // Focus comment input
    setTimeout(() => commentInput.focus(), 400);
}

function closeLightbox() {
    lightbox.classList.remove('visible');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
        currentImageData = null;
    }, 300);
    document.body.style.overflow = '';
}

function updateLightboxLike() {
    if (!currentImageData) return;
    lightboxLikeBtn.classList.toggle('liked', currentImageData.liked);
    lightboxLikeCount.textContent = currentImageData.likes;
}

function toggleLightboxLike() {
    if (!currentImageData) return;

    currentImageData.liked = !currentImageData.liked;
    currentImageData.likes += currentImageData.liked ? 1 : -1;

    updateLightboxLike();

    // Sync card
    const card = galleryGrid.querySelector(`[data-id="${currentImageData.id}"]`);
    if (card) {
        const likeBtn = card.querySelector('.card-like-btn');
        likeBtn.classList.toggle('liked', currentImageData.liked);
        const counter = card.querySelector(`.card-like-counter[data-id="${currentImageData.id}"]`);
        if (counter) counter.textContent = currentImageData.likes;
    }
}

// ===== Navigate Lightbox =====
function nextImage(event) {
    event.stopPropagation();
    if (!currentImageData) return;

    const idx = galleryData.findIndex(d => d.id === currentImageData.id);
    const nextIdx = (idx + 1) % galleryData.length;
    const nextData = galleryData[nextIdx];

    // Simulate click to open
    currentImageData = nextData;
    let src = nextData.src;
    if (src.includes('images.unsplash.com')) {
        src = src.replace('w=800', 'w=1600');
    }
    lightboxImg.src = src;
    updateLightboxLike();
    renderComments();
}

function prevImage(event) {
    event.stopPropagation();
    if (!currentImageData) return;

    const idx = galleryData.findIndex(d => d.id === currentImageData.id);
    const prevIdx = (idx - 1 + galleryData.length) % galleryData.length;
    const prevData = galleryData[prevIdx];

    currentImageData = prevData;
    let src = prevData.src;
    if (src.includes('images.unsplash.com')) {
        src = src.replace('w=800', 'w=1600');
    }
    lightboxImg.src = src;
    updateLightboxLike();
    renderComments();
}

// ===== Comments =====
function renderComments() {
    if (!currentImageData) return;

    const comments = currentImageData.comments;
    commentsCountBadge.textContent = `${comments.length} comment${comments.length !== 1 ? 's' : ''}`;

    if (comments.length === 0) {
        commentsList.innerHTML = `
            <div class="no-comments">
                <span class="material-symbols-outlined">chat_bubble</span>
                No comments yet.<br>Be the first to comment!
            </div>
        `;
        return;
    }

    commentsList.innerHTML = comments.map(c => `
        <div class="comment-item">
            <div class="comment-avatar">${c.author.charAt(0).toUpperCase()}</div>
            <div class="comment-body">
                <div class="comment-author">${c.author}</div>
                <div class="comment-text">${escapeHtml(c.text)}</div>
                <div class="comment-time">${c.time}</div>
            </div>
        </div>
    `).join('');

    // Scroll to bottom
    commentsList.scrollTop = commentsList.scrollHeight;
}

function addComment() {
    if (!currentImageData) return;

    const text = commentInput.value.trim();
    if (!text) return;

    currentImageData.comments.push({
        author: 'You',
        text: text,
        time: 'Just now'
    });

    commentInput.value = '';
    renderComments();
    showToast('Comment added! 💬');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Upload Photo =====
let uploadedFileData = null;

function openUploadModal() {
    resetUploadModal();
    uploadModal.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeUploadModal() {
    uploadModal.classList.remove('visible');
    document.body.style.overflow = '';
    resetUploadModal();
}

function resetUploadModal() {
    uploadedFileData = null;
    uploadPreview.style.display = 'none';
    uploadDropzone.style.display = '';
    uploadTitleInput.value = '';
    uploadFileInput.value = '';
    btnUploadSubmit.disabled = true;
}

function handleFileSelect(file) {
    if (!file || !file.type.startsWith('image/')) {
        showToast('Please select an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedFileData = e.target.result;
        uploadPreviewImg.src = uploadedFileData;
        uploadPreview.style.display = 'block';
        uploadDropzone.style.display = 'none';
        btnUploadSubmit.disabled = false;
    };
    reader.readAsDataURL(file);
}

function submitUpload() {
    if (!uploadedFileData) return;

    const title = uploadTitleInput.value.trim() || 'My Photo';

    const imageData = {
        id: nextId++,
        src: uploadedFileData,
        title: title,
        likes: 0,
        liked: false,
        comments: []
    };

    galleryData.unshift(imageData);
    galleryGrid.prepend(createGalleryCard(imageData));

    closeUploadModal();
    showToast('Photo uploaded successfully! 🎉');

    // Scroll to top to see new photo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Toast Notification =====
function showToast(message) {
    // Remove existing
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// ===== Event Listeners =====

// Upload modal
if (btnAddPhoto) btnAddPhoto.addEventListener('click', openUploadModal);
if (btnUploadCancel) btnUploadCancel.addEventListener('click', closeUploadModal);
if (btnUploadSubmit) btnUploadSubmit.addEventListener('click', submitUpload);

// File input
if (uploadFileInput) {
    uploadFileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) handleFileSelect(e.target.files[0]);
    });
}

// Dropzone click
if (uploadDropzone) {
    uploadDropzone.addEventListener('click', () => uploadFileInput.click());

    uploadDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadDropzone.classList.add('dragover');
    });

    uploadDropzone.addEventListener('dragleave', () => {
        uploadDropzone.classList.remove('dragover');
    });

    uploadDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadDropzone.classList.remove('dragover');
        if (e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
    });
}

// Upload modal backdrop click
if (uploadModal) {
    uploadModal.addEventListener('click', (e) => {
        if (e.target === uploadModal) closeUploadModal();
    });
}

// Lightbox backdrop click
lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Lightbox like button
if (lightboxLikeBtn) lightboxLikeBtn.addEventListener('click', toggleLightboxLike);

// Comment send
if (commentSendBtn) commentSendBtn.addEventListener('click', addComment);

// Enter to send comment
if (commentInput) {
    commentInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addComment();
        }
    });
}

// ===== Category Filter Tabs =====
const categoryTabs = document.querySelectorAll('.category-tab');
let activeCategory = 'all';

categoryTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active tab styling
        categoryTabs.forEach(t => {
            t.classList.remove('text-primary', 'border-b-2', 'border-primary');
            t.classList.add('text-on-surface-variant');
        });
        tab.classList.remove('text-on-surface-variant');
        tab.classList.add('text-primary', 'border-b-2', 'border-primary');

        activeCategory = tab.dataset.category;
        filterGallery();
    });
});

function filterGallery() {
    const cards = galleryGrid.querySelectorAll('.gallery-card');
    cards.forEach(card => {
        const id = parseInt(card.dataset.id);
        const data = galleryData.find(d => d.id === id);
        if (!data) return;

        if (activeCategory === 'all' || data.title.startsWith(activeCategory)) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Inject fadeIn keyframe
(function() {
    const s = document.createElement('style');
    s.textContent = `@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`;
    document.head.appendChild(s);
})();

// ===== Filter / Sort Dropdown =====
const btnFilter = document.getElementById('btn-filter');
const filterDropdown = document.getElementById('filter-dropdown');

if (btnFilter && filterDropdown) {
    btnFilter.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close profile dropdown if open
        const profileDD = document.getElementById('profile-dropdown');
        if (profileDD) profileDD.classList.add('hidden');

        filterDropdown.classList.toggle('hidden');
    });

    // Sort options
    filterDropdown.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', () => {
            const sortBy = option.dataset.sort;
            sortGallery(sortBy);
            filterDropdown.classList.add('hidden');
            showToast(`Sorted by: ${option.textContent.trim()} ✓`);
        });
    });
}

function sortGallery(sortBy) {
    let sorted;
    switch (sortBy) {
        case 'newest':
            sorted = [...galleryData].sort((a, b) => b.id - a.id);
            break;
        case 'oldest':
            sorted = [...galleryData].sort((a, b) => a.id - b.id);
            break;
        case 'most-liked':
            sorted = [...galleryData].sort((a, b) => b.likes - a.likes);
            break;
        case 'most-commented':
            sorted = [...galleryData].sort((a, b) => b.comments.length - a.comments.length);
            break;
        default:
            sorted = galleryData;
    }

    // Re-order DOM
    galleryGrid.innerHTML = '';
    sorted.forEach(data => {
        galleryGrid.appendChild(createGalleryCard(data));
    });
}

// ===== Account / Profile Dropdown =====
const btnAccount = document.getElementById('btn-account');
const profileDropdown = document.getElementById('profile-dropdown');

if (btnAccount && profileDropdown) {
    btnAccount.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close filter dropdown if open
        if (filterDropdown) filterDropdown.classList.add('hidden');

        profileDropdown.classList.toggle('hidden');
    });

    // Profile menu actions
    document.getElementById('btn-profile')?.addEventListener('click', () => {
        profileDropdown.classList.add('hidden');
        showToast('👤 Profile page coming soon!');
    });

    document.getElementById('btn-my-uploads')?.addEventListener('click', () => {
        profileDropdown.classList.add('hidden');
        // Filter to show only user-uploaded photos (those without unsplash URLs)
        const cards = galleryGrid.querySelectorAll('.gallery-card');
        let uploadCount = 0;
        cards.forEach(card => {
            const id = parseInt(card.dataset.id);
            const data = galleryData.find(d => d.id === id);
            if (!data) return;
            const isUpload = !data.src.includes('unsplash.com');
            card.style.display = isUpload ? '' : 'none';
            if (isUpload) uploadCount++;
        });
        if (uploadCount === 0) {
            showToast('No uploads yet. Click "Add Photo" to upload! 📸');
            // Show all again
            cards.forEach(card => card.style.display = '');
        } else {
            showToast(`Showing ${uploadCount} upload${uploadCount !== 1 ? 's' : ''} 📸`);
        }
    });

    document.getElementById('btn-liked-photos')?.addEventListener('click', () => {
        profileDropdown.classList.add('hidden');
        // Filter to show only liked photos
        const cards = galleryGrid.querySelectorAll('.gallery-card');
        let likedCount = 0;
        cards.forEach(card => {
            const id = parseInt(card.dataset.id);
            const data = galleryData.find(d => d.id === id);
            if (!data) return;
            card.style.display = data.liked ? '' : 'none';
            if (data.liked) likedCount++;
        });
        if (likedCount === 0) {
            showToast('No liked photos yet. Start liking! ❤️');
            cards.forEach(card => card.style.display = '');
        } else {
            showToast(`Showing ${likedCount} liked photo${likedCount !== 1 ? 's' : ''} ❤️`);
        }
    });

    document.getElementById('btn-settings')?.addEventListener('click', () => {
        profileDropdown.classList.add('hidden');
        showToast('⚙️ Settings page coming soon!');
    });
}

// ===== Sidebar Navigation =====
const sidebarLinks = document.querySelectorAll('.sidebar-link');

sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active state
        sidebarLinks.forEach(l => {
            l.classList.remove('active', 'bg-secondary-container', 'text-on-secondary-container', 'font-bold');
            l.classList.add('text-on-surface-variant');
            l.querySelector('.material-symbols-outlined').style.fontVariationSettings = "'FILL' 0";
        });

        link.classList.add('active', 'bg-secondary-container', 'text-on-secondary-container', 'font-bold');
        link.classList.remove('text-on-surface-variant');
        link.querySelector('.material-symbols-outlined').style.fontVariationSettings = "'FILL' 1";

        const view = link.dataset.view;

        // Show all cards first
        const cards = galleryGrid.querySelectorAll('.gallery-card');
        cards.forEach(card => card.style.display = '');

        switch (view) {
            case 'gallery':
                showToast('📷 Gallery — All Photos');
                break;
            case 'curated':
                // Show only photos with 50+ likes
                let curatedCount = 0;
                cards.forEach(card => {
                    const id = parseInt(card.dataset.id);
                    const data = galleryData.find(d => d.id === id);
                    if (data && data.likes < 50) {
                        card.style.display = 'none';
                    } else {
                        curatedCount++;
                    }
                });
                showToast(`✨ Curated — ${curatedCount} top photos`);
                break;
            case 'collections':
                // Group by category — show toast with counts
                const counts = {};
                galleryData.forEach(d => {
                    const cat = d.title.split(' ')[0];
                    counts[cat] = (counts[cat] || 0) + 1;
                });
                const summary = Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(', ');
                showToast(`📁 Collections — ${summary}`);
                break;
            case 'archive':
                // Show only photos with 0 comments (no activity)
                let archiveCount = 0;
                cards.forEach(card => {
                    const id = parseInt(card.dataset.id);
                    const data = galleryData.find(d => d.id === id);
                    if (data && data.comments.length > 0) {
                        card.style.display = 'none';
                    } else {
                        archiveCount++;
                    }
                });
                showToast(`📂 Archive — ${archiveCount} photos with no comments`);
                break;
        }
    });
});

// ===== Close Dropdowns on Outside Click =====
document.addEventListener('click', (e) => {
    // Close filter dropdown
    if (filterDropdown && !filterDropdown.classList.contains('hidden')) {
        if (!filterDropdown.contains(e.target) && e.target !== btnFilter) {
            filterDropdown.classList.add('hidden');
        }
    }
    // Close profile dropdown
    if (profileDropdown && !profileDropdown.classList.contains('hidden')) {
        if (!profileDropdown.contains(e.target) && e.target !== btnAccount) {
            profileDropdown.classList.add('hidden');
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage(new Event('click'));
        if (e.key === 'ArrowLeft') prevImage(new Event('click'));
    }
    // Escape upload modal
    if (uploadModal && uploadModal.classList.contains('visible') && e.key === 'Escape') {
        closeUploadModal();
    }
    // Escape dropdowns
    if (e.key === 'Escape') {
        if (filterDropdown) filterDropdown.classList.add('hidden');
        if (profileDropdown) profileDropdown.classList.add('hidden');
    }
});

// ===== Start =====
document.addEventListener('DOMContentLoaded', initGallery);

