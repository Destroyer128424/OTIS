(() => {
  'use strict';

  document.documentElement.classList.add('js');

  function initializeSite() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.nav-toggle');
    const navigation = document.getElementById('site-navigation');
    const productMenus = [...document.querySelectorAll('details.product-nav')];
    const mobile = window.matchMedia('(max-width: 760px)');

    function closeProductMenus() {
      productMenus.forEach((menu) => {
        menu.open = false;
      });
    }

    function setNavigationOpen(open) {
      if (!toggle || !navigation) return;

      const expanded = mobile.matches && open;
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
      navigation.inert = mobile.matches && !expanded;
      navigation.toggleAttribute('inert', mobile.matches && !expanded);

      if (!expanded) closeProductMenus();
    }

    if (toggle && navigation) {
      toggle.addEventListener('click', () => {
        setNavigationOpen(toggle.getAttribute('aria-expanded') !== 'true');
      });

      navigation.addEventListener('click', (event) => {
        if (event.target instanceof Element && event.target.closest('a[href]')) {
          closeProductMenus();
          if (mobile.matches) setNavigationOpen(false);
        }
      });

      mobile.addEventListener('change', () => setNavigationOpen(false));
      setNavigationOpen(false);
    }

    productMenus.forEach((menu) => {
      menu.addEventListener('click', (event) => {
        if (event.target instanceof Element && event.target.closest('a[href]')) {
          menu.open = false;
        }
      });
    });

    document.addEventListener('click', (event) => {
      if (!(event.target instanceof Node)) return;

      if (header && !header.contains(event.target)) setNavigationOpen(false);
      productMenus.forEach((menu) => {
        if (!menu.contains(event.target)) menu.open = false;
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;

      const openMenus = productMenus.filter((menu) => menu.open);
      const navigationWasOpen = mobile.matches && toggle?.getAttribute('aria-expanded') === 'true';
      const activeMenu = openMenus.find((menu) => menu.contains(document.activeElement));
      const focusTarget = navigationWasOpen
        ? toggle
        : (activeMenu || openMenus[0])?.querySelector('summary');

      if (!navigationWasOpen && openMenus.length === 0) return;

      event.preventDefault();
      closeProductMenus();
      setNavigationOpen(false);
      focusTarget?.focus({ preventScroll: true });
    });

    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('contact-submit');
    const formStatus = document.getElementById('form-status');
    const productInterest = document.getElementById('product-interest');
    const allowedProducts = new Set([
      'OrbitPilot',
      'HeatBank',
      'HeatRoute',
      'ThermalCore',
      'OrbitBench',
      'Not sure yet',
    ]);

    function selectRequestedProduct() {
      const requestedProduct = new URLSearchParams(window.location.search).get('product');
      if (productInterest && allowedProducts.has(requestedProduct)) {
        productInterest.value = requestedProduct;
      }
    }

    selectRequestedProduct();
    if (!form || !submitButton || !formStatus) return;

    formStatus.setAttribute('role', 'status');
    formStatus.setAttribute('aria-live', 'polite');
    let submitting = false;

    function setFormStatus(message, state) {
      formStatus.textContent = message;
      formStatus.classList.remove('success', 'error');
      if (state) formStatus.classList.add(state);
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (submitting || !form.reportValidity()) return;

      const originalLabel = submitButton.textContent;
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 20000);

      submitting = true;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
      form.setAttribute('aria-busy', 'true');
      setFormStatus('Sending your message.');

      try {
        const response = await fetch('https://formspree.io/f/xwvzaraa', {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });

        if (!response.ok) {
          setFormStatus('Your message could not be sent. Please try again or email bcruse@mit.edu.', 'error');
          return;
        }

        form.reset();
        selectRequestedProduct();
        setFormStatus('Message sent. We’ll reply by email.', 'success');
      } catch {
        setFormStatus('We couldn’t confirm that your message was sent. Please try again or email bcruse@mit.edu.', 'error');
      } finally {
        window.clearTimeout(timeout);
        submitting = false;
        submitButton.disabled = false;
        submitButton.textContent = originalLabel || 'Send message';
        form.removeAttribute('aria-busy');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSite, { once: true });
  } else {
    initializeSite();
  }
})();
