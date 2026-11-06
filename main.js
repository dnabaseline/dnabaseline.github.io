// ── Baseline Genomics — Web Animation & Interaction Controller ──
// Adheres strictly to Emil Kowalski's Animations on the Web guidelines

document.addEventListener('DOMContentLoaded', () => {
  // Mark JavaScript as active for progressive enhancement
  document.documentElement.classList.add('js-ready');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 1. Scroll Reveal Observer (GPU Accelerated) ──
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .stagger-group');

  if (prefersReducedMotion) {
    // If user prefers reduced motion, immediately reveal everything without transition
    revealElements.forEach(el => el.classList.add('is-revealed'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not available
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // ── 2. Header Scroll Elevation ──
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── 3. Mobile Navigation Drawer & Hamburger Morphing ──
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    nav.classList.remove('open');
    document.body.classList.remove('nav-locked');
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.classList.toggle('active', !isOpen);
      nav.classList.toggle('open', !isOpen);
      document.body.classList.toggle('nav-locked', !isOpen);
    });

    // Close on navigation link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !header.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // ── 4. Interactive Test Spotlight Tabs ──
  const tabs = document.querySelectorAll('.test-tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      const targetId = `pane-${targetTab}`;

      // Update active tab buttons
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update pane with smooth entrance
      panes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // ── 5. Smooth Accordion for Native <details> FAQ ──
  // Native details opens smoothly with grid-template-rows, but closing snaps.
  // This lightweight interceptor animates closing smoothly in 200ms.
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const summary = item.querySelector('.faq-quest');
    const wrapper = item.querySelector('.faq-ans-wrapper');

    if (!summary || !wrapper || prefersReducedMotion) return;

    summary.addEventListener('click', (e) => {
      if (item.hasAttribute('open')) {
        e.preventDefault();
        item.classList.add('is-closing');
        wrapper.style.gridTemplateRows = '0fr';

        setTimeout(() => {
          item.removeAttribute('open');
          item.classList.remove('is-closing');
          wrapper.style.gridTemplateRows = '';
        }, 210);
      }
    });
  });

  // ── 6. Prefill Form from Test Spotlight Buttons ──
  const prefillButtons = document.querySelectorAll('[data-prefill]');
  const testSelect = document.getElementById('test');
  const messageInput = document.getElementById('message');
  const contactSection = document.getElementById('contact');

  prefillButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prefillVal = btn.getAttribute('data-prefill');
      if (testSelect) {
        if (prefillVal.includes('Exome')) testSelect.value = 'exome';
        else if (prefillVal.includes('Cancer')) testSelect.value = 'cancer';
        else if (prefillVal.includes('Pediatric')) testSelect.value = 'pediatric';
        else if (prefillVal.includes('Doctor')) testSelect.value = 'doctor';
        else if (prefillVal.includes('Research')) testSelect.value = 'other';
      }
      if (messageInput) {
        messageInput.placeholder = `I am interested in ${prefillVal}...`;
        messageInput.focus();
      }
    });
  });

  // ── 7. Dynamic Form Guidance by Selected Role ──
  const roleSelect = document.getElementById('role');
  if (roleSelect && messageInput) {
    roleSelect.addEventListener('change', (e) => {
      const role = e.target.value;
      if (role === 'doctor') {
        messageInput.placeholder = 'Please share patient indication, suspected phenotype, or custom panel inquiry...';
        if (testSelect) testSelect.value = 'doctor';
      } else if (role === 'patient') {
        messageInput.placeholder = 'Tell us briefly about what you or your family are seeking answers for...';
        if (testSelect && testSelect.value === 'doctor') testSelect.value = 'exome';
      } else if (role === 'researcher') {
        messageInput.placeholder = 'Describe your sample cohort, sequencing requirements, or bioinformatics goals...';
      } else {
        messageInput.placeholder = 'How can our clinical team help you today?';
      }
    });
  }

  // ── 8. Formspree Submission Handling ──
  const form = document.getElementById('consultation-form');
  const feedback = document.getElementById('form-feedback');

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      const action = form.getAttribute('action') || '';
      if (action.includes('your-form-id')) {
        e.preventDefault();
        feedback.style.display = 'block';
        feedback.innerHTML = `
          <strong>Inquiry Prepared</strong><br>
          To receive requests by email, replace <code>your-form-id</code> in <code>index.html</code> with your free endpoint from <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: inherit;">Formspree.io</a>.<br>
          <small style="margin-top: 6px; display: block;">You can also chat directly via WhatsApp or email <a href="mailto:info@baseline.pk" style="text-decoration: underline; color: inherit;">info@baseline.pk</a>.</small>
        `;
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
});
