(() => {
  'use strict';

  function initializeAtmosphere() {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const canvas = document.createElement('canvas');
    canvas.className = 'starfield';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.hidden = true;
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    cursor.append(dot, ring);
    document.body.append(cursor);

    // The rest of the page and native pointer remain usable without canvas.
    const context = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let stars = [];
    let frameId = 0;
    let previousTime = 0;
    let pointerVisible = false;
    let pointerX = 0;
    let pointerY = 0;
    let ringX = 0;
    let ringY = 0;

    function hidePointer() {
      pointerVisible = false;
      cursor.hidden = true;
      root.classList.remove('custom-cursor-ready');
    }

    function drawStars(delta = 0) {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.phase += star.speed * delta;
        const alpha = star.opacity * (0.5 + 0.5 * Math.sin(star.phase));
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(200, 220, 255, ${alpha})`;
        context.fill();
      }
    }

    function resize() {
      if (!context) return;
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const count = Math.min(220, Math.max(60, Math.round(width * height / 6500)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.85 + 0.25,
        opacity: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.36 + 0.06,
        phase: Math.random() * Math.PI * 2
      }));
      drawStars();
    }

    function animate(time) {
      frameId = 0;
      if (document.hidden || reducedMotion.matches) return;
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      drawStars(delta);
      if (pointerVisible) {
        const easing = 1 - Math.exp(-delta / 0.06);
        ringX += (pointerX - ringX) * easing;
        ringY += (pointerY - ringY) * easing;
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      frameId = window.requestAnimationFrame(animate);
    }

    function updateAnimation() {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = 0;
      if (document.hidden || reducedMotion.matches) {
        hidePointer();
        if (!document.hidden) drawStars();
        return;
      }
      frameId = window.requestAnimationFrame(animate);
    }

    window.addEventListener('pointermove', (event) => {
      if (!finePointer.matches || reducedMotion.matches || document.hidden || event.pointerType === 'touch') {
        hidePointer();
        return;
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.style.left = `${pointerX}px`;
      dot.style.top = `${pointerY}px`;
      if (!pointerVisible) {
        ringX = pointerX;
        ringY = pointerY;
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
        pointerVisible = true;
        cursor.hidden = false;
        root.classList.add('custom-cursor-ready');
      }
    }, { passive: true });

    root.addEventListener('pointerleave', hidePointer);
    window.addEventListener('blur', hidePointer);
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', updateAnimation);
    reducedMotion.addEventListener('change', updateAnimation);
    finePointer.addEventListener('change', hidePointer);
    window.addEventListener('pagehide', () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      hidePointer();
    });
    window.addEventListener('pageshow', updateAnimation);

    resize();
    updateAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAtmosphere, { once: true });
  } else {
    initializeAtmosphere();
  }
})();
