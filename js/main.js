/**
 * AutoWash Landing Page Interactive Logic
 * Features:
 * 1. Automatic Infinite Reel / Carousel for Partner Cards with drag/touch & pause support
 * 2. Interactive FAQ Accordion
 * 3. Functional Modals (Subscribe, Contact Us, Download App, Locations Directory, Partner Details)
 * 4. Smooth Scrolling Navigation
 * 5. Toast Feedback System
 */

document.addEventListener('DOMContentLoaded', () => {
  initReel();
  initFaqAccordion();
  initModals();
  initSmoothScroll();
  initFormHandlers();
  initLocationsDirectory();
});

/* ========================================================
   1. Automatic Infinite Reel for Partner Cards
   ======================================================== */
function initReel() {
  const reelTrack = document.getElementById('reelTrack');
  const reelWrapper = document.getElementById('reelWrapper');
  const prevBtn = document.getElementById('reelPrevBtn');
  const nextBtn = document.getElementById('reelNextBtn');
  const togglePlayBtn = document.getElementById('reelTogglePlayBtn');

  if (!reelTrack) return;

  // Clone children to ensure seamless continuous infinite scrolling
  const originalCards = Array.from(reelTrack.children);
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    reelTrack.appendChild(clone);
  });

  // Manual Prev / Next Controls
  let manualOffset = 0;
  const cardWidth = 408; // width + gap

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      manualOffset += cardWidth;
      reelTrack.style.animation = 'none';
      reelTrack.style.transform = `translateX(${manualOffset}px)`;
      reelTrack.style.transition = 'transform 0.4s ease';
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      manualOffset -= cardWidth;
      reelTrack.style.animation = 'none';
      reelTrack.style.transform = `translateX(${manualOffset}px)`;
      reelTrack.style.transition = 'transform 0.4s ease';
    });
  }

  if (togglePlayBtn) {
    let isPlaying = true;
    togglePlayBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        reelTrack.classList.remove('paused');
        togglePlayBtn.innerHTML = '❚❚';
        showToast('Carousel resumed');
      } else {
        reelTrack.classList.add('paused');
        togglePlayBtn.innerHTML = '▶';
        showToast('Carousel paused');
      }
    });
  }

  // Add click listener on all cards (including clones) to open detail modal
  reelTrack.addEventListener('click', (e) => {
    const card = e.target.closest('.partner-card');
    if (!card) return;

    const name = card.querySelector('.partner-title')?.textContent || 'AutoWash Partner';
    const address = card.querySelector('.partner-address')?.textContent || '1640 Lincoln Blvd, Santa Monica, CA';
    const desc = card.querySelector('.partner-desc')?.textContent || 'Premium car wash facility with high-pressure wash and eco-friendly solutions.';
    const badge = card.querySelector('.partner-badge')?.textContent || 'SUPER WASHER';
    const rating = card.querySelector('.partner-rating')?.textContent || '⭐ 4.9 (420+ reviews)';
    const bgImage = card.querySelector('.partner-card-media')?.style.backgroundImage || '';

    openPartnerDetailModal({ name, address, desc, badge, rating, bgImage });
  });
}

/* ========================================================
   2. Interactive FAQ Accordion
   ======================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Optional: close other open items for clean single-open accordion feel
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ========================================================
   3. Modal Management
   ======================================================== */
function initModals() {
  // Open modal buttons
  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });

  // Close modal buttons
  document.querySelectorAll('[data-close-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });

  // Close on overlay backdrop click
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach((overlay) => {
        overlay.classList.remove('open');
      });
      document.body.style.overflow = '';
    }
  });

  // Plan picker cards interaction
  document.querySelectorAll('.plan-card-option').forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.plan-card-option').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      const planInput = document.getElementById('selectedPlanInput');
      if (planInput) {
        planInput.value = card.getAttribute('data-plan') || 'Premium';
      }
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input, select, textarea, button:not(.modal-close-btn)');
    if (firstInput) setTimeout(() => firstInput.focus(), 150);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function openPartnerDetailModal(data) {
  const modal = document.getElementById('modalPartnerDetail');
  if (!modal) return;

  const titleEl = document.getElementById('modalPartnerName');
  const addressEl = document.getElementById('modalPartnerAddress');
  const descEl = document.getElementById('modalPartnerDesc');
  const badgeEl = document.getElementById('modalPartnerBadge');
  const ratingEl = document.getElementById('modalPartnerRating');
  const mediaEl = document.getElementById('modalPartnerMedia');

  if (titleEl) titleEl.textContent = data.name;
  if (addressEl) addressEl.textContent = data.address;
  if (descEl) descEl.textContent = data.desc;
  if (badgeEl) badgeEl.textContent = data.badge;
  if (ratingEl) ratingEl.textContent = data.rating;
  if (mediaEl && data.bgImage) mediaEl.style.backgroundImage = data.bgImage;

  openModal('modalPartnerDetail');
}

/* ========================================================
   4. Smooth Scrolling
   ======================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // AutoWash logo click scrolls to top
  document.querySelectorAll('.autowash, .autowash1, .clip-path-group-parent').forEach((logo) => {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/* ========================================================
   5. Form Handlers & Toast System
   ======================================================== */
function initFormHandlers() {
  // Subscribe Form
  const subscribeForm = document.getElementById('subscribeForm');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('subscribeEmail')?.value;
      if (!email) {
        showToast('Please enter your email address');
        return;
      }
      closeModal('modalSubscribe');
      showToast(`🎉 Subscription confirmed for ${email}! Welcome to AutoWash.`);
      subscribeForm.reset();
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || 'Friend';
      closeModal('modalContact');
      showToast(`📬 Thank you ${name}, your message has been sent! We will reply within 2 hours.`);
      contactForm.reset();
    });
  }

  // App Download SMS Form
  const smsForm = document.getElementById('smsAppForm');
  if (smsForm) {
    smsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('smsPhone')?.value;
      if (!phone) {
        showToast('Please enter a valid phone number');
        return;
      }
      closeModal('modalDownload');
      showToast(`📲 App download link sent to ${phone}! Check your messages.`);
      smsForm.reset();
    });
  }

  // Wash here button in partner detail modal
  const washHereBtn = document.getElementById('modalWashHereBtn');
  if (washHereBtn) {
    washHereBtn.addEventListener('click', () => {
      closeModal('modalPartnerDetail');
      openModal('modalSubscribe');
      showToast('Select a plan to start washing immediately!');
    });
  }
}

/* ========================================================
   6. Locations Directory Live Search & Filter
   ======================================================== */
const locationsData = [
  { name: 'Lincoln Super Washer', neighborhood: 'Santa Monica', address: '1640 Lincoln Blvd, Santa Monica, CA', hours: '6:00 AM - 10:00 PM', rating: '⭐ 4.9', status: 'Open Now' },
  { name: 'Ocean Avenue Express', neighborhood: 'Santa Monica', address: '2200 Ocean Ave, Santa Monica, CA', hours: '24/7 Touchless', rating: '⭐ 4.8', status: 'Open Now' },
  { name: 'Venice Boardwalk Auto Spa', neighborhood: 'Venice', address: '850 Venice Blvd, Venice, CA', hours: '7:00 AM - 9:00 PM', rating: '⭐ 4.9', status: 'Open Now' },
  { name: 'Abbot Kinney Eco Wash', neighborhood: 'Venice', address: '1410 Abbot Kinney Blvd, Venice, CA', hours: '8:00 AM - 8:00 PM', rating: '⭐ 4.7', status: 'Open Now' },
  { name: 'Culver City Touchless Hub', neighborhood: 'Culver City', address: '9800 Washington Blvd, Culver City, CA', hours: '24/7 Touchless', rating: '⭐ 4.9', status: 'Open Now' },
  { name: 'Sepulveda Pro Detail', neighborhood: 'Culver City', address: '4450 Sepulveda Blvd, Culver City, CA', hours: '7:00 AM - 9:00 PM', rating: '⭐ 4.8', status: 'Open Now' },
  { name: 'Rodeo Clean Salon', neighborhood: 'Beverly Hills', address: '9400 Wilshire Blvd, Beverly Hills, CA', hours: '8:00 AM - 8:00 PM', rating: '⭐ 5.0', status: 'Open Now' },
  { name: 'Sunset Strip Eco Shine', neighborhood: 'Beverly Hills', address: '8600 Sunset Blvd, West Hollywood, CA', hours: '7:00 AM - 11:00 PM', rating: '⭐ 4.9', status: 'Open Now' },
  { name: 'Downtown Grand AutoWash', neighborhood: 'Downtown LA', address: '500 S Grand Ave, Los Angeles, CA', hours: '6:00 AM - 11:00 PM', rating: '⭐ 4.8', status: 'Open Now' },
  { name: 'Arts District Clean Center', neighborhood: 'Downtown LA', address: '720 E 3rd St, Los Angeles, CA', hours: '24/7 Express', rating: '⭐ 4.9', status: 'Open Now' },
];

function initLocationsDirectory() {
  const grid = document.getElementById('locationsGrid');
  const searchInput = document.getElementById('locationsSearchInput');
  const filterTabs = document.querySelectorAll('.filter-tab-btn');

  if (!grid) return;

  let currentFilter = 'All';
  let searchQuery = '';

  function renderLocations() {
    grid.innerHTML = '';
    const filtered = locationsData.filter((loc) => {
      const matchesFilter = currentFilter === 'All' || loc.neighborhood.toLowerCase() === currentFilter.toLowerCase();
      const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            loc.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 30px;">No partner locations found matching your search.</div>';
      return;
    }

    filtered.forEach((loc) => {
      const card = document.createElement('div');
      card.className = 'location-item-card';
      card.innerHTML = `
        <div class="loc-card-top">
          <h4>${loc.name}</h4>
          <span class="loc-status">${loc.status}</span>
        </div>
        <p class="loc-address">📍 ${loc.address}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #475569;">
          <span>🕒 ${loc.hours}</span>
          <strong style="color: #d69e2e;">${loc.rating}</strong>
        </div>
        <button style="margin-top: 8px; padding: 8px 12px; background: #e7f0ef; color: #0c6d61; border: none; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#0c6d61'; this.style.color='#fff';" onmouseout="this.style.background='#e7f0ef'; this.style.color='#0c6d61';" onclick="window.open('https://maps.google.com/?q=${encodeURIComponent(loc.address)}', '_blank')">Get Directions ↗</button>
      `;
      grid.appendChild(card);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderLocations();
    });
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-filter') || 'All';
      renderLocations();
    });
  });

  renderLocations();
}

/* ========================================================
   7. Toast Notification Utility
   ======================================================== */
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✨</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Global modal triggers for inline onclicks if needed
window.openModal = openModal;
window.closeModal = closeModal;
window.showToast = showToast;
