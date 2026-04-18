/* ============================================================
   BONZ REALTOR — script.js
   ============================================================ */

(function () {
  'use strict';

  // ── HEADER SCROLL SHADOW ──────────────────────────────────
  const header = document.getElementById('header');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });


  // ── MOBILE MENU ───────────────────────────────────────────
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden',  String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!header.contains(e.target)) closeMenu();
    });
  }

  function closeMenu() {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }


  // ── SMOOTH ANCHOR SCROLL ──────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id     = this.getAttribute('href').slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height'), 10) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ── SCROLL ANIMATIONS ─────────────────────────────────────
  const animEls = document.querySelectorAll(
    '.metric-card, .review-card, .service-card, ' +
    '.hero-content, .hero-media, .jna-intro, ' +
    '.section-header, .booking-content'
  );

  animEls.forEach(el => el.classList.add('anim-fade'));

  // Add stagger delays to grouped siblings
  document.querySelectorAll('.metrics-grid, .reviews-grid, .services-grid').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      if (i > 0) child.classList.add(`anim-delay-${Math.min(i, 4)}`);
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animEls.forEach(el => observer.observe(el));

}());
