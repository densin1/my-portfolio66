/**
 * DK PORTFOLIO — APP LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 0. SCROLL REVEAL OBSERVER (єдиний інстанс на всю сторінку)
  // ============================================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  function observeReveal() {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(item => revealObserver.observe(item));
  }

  // ============================================================
  // 1. РЕНДЕР КОНТЕНТУ
  // ============================================================

  // 1.1. Навігація
  const navList = document.getElementById('navList');
  DK_CONTENT.nav.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#${item.id}" class="nav__link" data-scroll>${item.label}</a>`;
    navList.appendChild(li);
  });

  // 1.2. Hero Media — статична картинка, однакова для десктопа й мобільних
  const heroMediaBox = document.getElementById('heroMediaBox');
  const heroOffer = document.getElementById('heroOffer');
  if (heroOffer && DK_CONTENT.hero.offer) heroOffer.textContent = DK_CONTENT.hero.offer;

  function renderHeroMedia() {
    const { mediaPoster } = DK_CONTENT.hero;
    heroMediaBox.innerHTML = `<img src="${mediaPoster}" alt="DK Showreel" loading="eager" fetchpriority="high" decoding="async">`;
  }

  renderHeroMedia();

  // 1.2.1 Легкий параллакс декоративного світіння на фоні hero
  const heroAtmosphere = document.getElementById('heroAtmosphere');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroAtmosphere && !prefersReducedMotion) {
    let parallaxTicking = false;
    window.addEventListener('scroll', () => {
      if (parallaxTicking) return;
      parallaxTicking = true;
      requestAnimationFrame(() => {
        const offset = Math.min(window.pageYOffset, 800) * 0.15;
        heroAtmosphere.style.transform = `translateY(${offset}px)`;
        parallaxTicking = false;
      });
    }, { passive: true });
  }

  // 1.3. Фільтри Відеомонтажа
  const videoFilter = document.getElementById('videoFilter');
  const categories = [
    { key: 'all', label: 'Всі' },
    { key: 'reels', label: 'Reels / Shorts' },
    { key: 'youtube', label: 'YouTube' }
  ];
  categories.forEach((cat, idx) => {
    const btn = document.createElement('button');
    btn.className = 'filter__btn' + (idx === 0 ? ' is-active' : '');
    btn.dataset.filter = cat.key;
    btn.textContent = cat.label;
    videoFilter.appendChild(btn);
  });

  // 1.4. Карточки відео
  const videoGrid = document.getElementById('videoGrid');
  function renderVideoProjects(filter = 'all') {
    videoGrid.innerHTML = '';
    DK_CONTENT.videoProjects.forEach(proj => {
      if (filter !== 'all' && proj.category !== filter) return;

      const item = document.createElement('article');
      let sizeClass = proj.category === 'youtube' ? 'bento__item--youtube' : 'bento__item--reels';

      item.className = `bento__item ${sizeClass} reveal`;
      item.dataset.id = proj.id;

      let mediaHtml = `<img src="${proj.thumb}" alt="${proj.title}" loading="lazy" decoding="async">`;
      if (proj.video) {
        mediaHtml = `
          <img src="${proj.thumb}" alt="${proj.title}" loading="lazy" decoding="async">
          <video class="bento-hover-video" muted loop playsinline preload="none" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity 0.4s;">
            <source src="${proj.video}" type="video/mp4">
          </video>
        `;
      }
      const playButtonHtml = `
        <div class="project-card__play" aria-hidden="true">
          <span class="project-card__play-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </span>
        </div>
      `;

      item.innerHTML = `
        <div class="project-card">
          <div class="project-card__media">${mediaHtml}${playButtonHtml}</div>
          <div class="project-card__body">
            <h3 class="project-card__title">${proj.title}</h3>
            <div class="project-card__tags">
              ${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
      videoGrid.appendChild(item);

      if (proj.video) {
        const vid = item.querySelector('.bento-hover-video');
        item.addEventListener('mouseenter', () => { vid.style.opacity = '1'; vid.play().catch(() => {}); });
        item.addEventListener('mouseleave', () => { vid.style.opacity = '0'; vid.pause(); });
      }

      item.addEventListener('click', () => openModal(proj));
    });
    observeReveal();
  }
  renderVideoProjects();

  // 1.5. Карточки дизайну
  const designGrid = document.getElementById('designGrid');
  DK_CONTENT.designProjects.forEach((proj, index) => {
    const item = document.createElement('article');
    let shapeClass = (index < 2) ? 'design-card--wide' : 'design-card--square';

    item.className = `design-card ${shapeClass} reveal`;
    item.dataset.id = proj.id;
    item.innerHTML = `
      <div class="design-card__media">
        <img src="${proj.thumb}" alt="${proj.title}" loading="lazy" decoding="async">
      </div>
      <div class="design-card__info">
        <h3 class="design-card__title">${proj.title}</h3>
        <span class="design-card__tool">${proj.tool}</span>
      </div>
    `;
    designGrid.appendChild(item);
  });

  // 1.6. Навички
  const skillsGrid = document.getElementById('skillsGrid');
  DK_CONTENT.skills.forEach(skill => {
    const item = document.createElement('article');
    item.className = 'skill-card reveal';
    item.innerHTML = `
      <h3 class="skill-card__name">${skill.name}</h3>
      <ul class="skill-card__features">
        ${skill.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    `;
    skillsGrid.appendChild(item);
  });

  // 1.7. Відгуки — слайдер у стилі Telegram-переписки
  const testimonialsTrack = document.getElementById('testimonialsTrack');
  const testimonialsDots = document.getElementById('testimonialsDots');
  const testimPrev = document.getElementById('testimPrev');
  const testimNext = document.getElementById('testimNext');
  const testimonialsSlider = document.getElementById('testimonialsSlider');

  let testimIndex = 0;
  let testimAutoplayTimer = null;
  const testimCount = DK_CONTENT.testimonials.length;

  DK_CONTENT.testimonials.forEach((t, i) => {
    const slide = document.createElement('div');
    slide.className = 'testimonial-slide';
    slide.innerHTML = `
      <article class="tg-bubble reveal">
        <header class="tg-bubble__header">
          <div class="tg-bubble__avatar">${t.author.charAt(0)}</div>
          <div class="tg-bubble__meta">
            <cite class="tg-bubble__name">${t.author}</cite>
            <p class="tg-bubble__role">${t.role}</p>
          </div>
          <div class="tg-bubble__stars" aria-label="Оцінка ${t.rating} з 5">${'★'.repeat(t.rating)}</div>
        </header>
        <div class="tg-bubble__msg">
          <p class="tg-bubble__text">${t.text}</p>
          <div class="tg-bubble__footer">
            <span class="tg-bubble__time">Telegram</span>
            <svg class="tg-bubble__check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 12l5 5L14 8"/><path d="M9 12l5 5L23 8"/></svg>
          </div>
        </div>
      </article>
    `;
    testimonialsTrack.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'testimonials-dots__dot';
    dot.setAttribute('aria-label', `Відгук: ${t.author}`);
    dot.addEventListener('click', () => { goToTestimonial(i); stopTestimAutoplay(); startTestimAutoplay(); });
    testimonialsDots.appendChild(dot);
  });

  const testimDots = [...testimonialsDots.children];

  function goToTestimonial(index) {
    testimIndex = (index + testimCount) % testimCount;
    testimonialsTrack.style.transform = `translateX(-${testimIndex * 100}%)`;
    testimDots.forEach((d, i) => d.classList.toggle('is-active', i === testimIndex));
  }

  function startTestimAutoplay() {
    if (prefersReducedMotion || testimCount <= 1) return;
    stopTestimAutoplay();
    testimAutoplayTimer = setInterval(() => goToTestimonial(testimIndex + 1), 6000);
  }
  function stopTestimAutoplay() {
    if (testimAutoplayTimer) clearInterval(testimAutoplayTimer);
  }

  if (testimCount > 0) {
    goToTestimonial(0);
    startTestimAutoplay();
  }
  if (testimCount <= 1) {
    testimPrev.style.display = 'none';
    testimNext.style.display = 'none';
    testimonialsDots.style.display = 'none';
  }

  testimPrev.addEventListener('click', () => { goToTestimonial(testimIndex - 1); stopTestimAutoplay(); startTestimAutoplay(); });
  testimNext.addEventListener('click', () => { goToTestimonial(testimIndex + 1); stopTestimAutoplay(); startTestimAutoplay(); });
  testimonialsSlider.addEventListener('mouseenter', stopTestimAutoplay);
  testimonialsSlider.addEventListener('mouseleave', startTestimAutoplay);
  testimonialsSlider.addEventListener('focusin', stopTestimAutoplay);
  testimonialsSlider.addEventListener('focusout', startTestimAutoplay);

  // Свайп на мобільних
  let testimTouchStartX = null;
  testimonialsTrack.addEventListener('touchstart', (e) => { testimTouchStartX = e.touches[0].clientX; stopTestimAutoplay(); }, { passive: true });
  testimonialsTrack.addEventListener('touchend', (e) => {
    if (testimTouchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - testimTouchStartX;
    if (Math.abs(deltaX) > 40) goToTestimonial(testimIndex + (deltaX < 0 ? 1 : -1));
    testimTouchStartX = null;
    startTestimAutoplay();
  });

  // 1.8. Прайсінг
  const pricingGrid = document.getElementById('pricingGrid');
  DK_CONTENT.pricing.forEach(p => {
    const item = document.createElement('article');
    item.className = `pricing-card reveal ${p.popular ? 'pricing-card--popular' : ''}`;
    item.innerHTML = `
      ${p.popular ? '<div class="pricing-card__badge">Популярне</div>' : ''}
      <h3 class="pricing-card__name">${p.name}</h3>
      <div class="pricing-card__price">${p.price}</div>
      <ul class="pricing-card__features">
        ${p.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <a href="https://t.me/des1n" target="_blank" rel="noopener" class="btn ${p.popular ? 'btn--primary' : 'btn--outline'} btn--block">Обговорити в Telegram</a>
    `;
    pricingGrid.appendChild(item);
  });

  // ============================================================
  // 2. ЛОГІКА ФІЛЬТРІВ
  // ============================================================
  videoFilter.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter__btn')) {
      videoFilter.querySelectorAll('.filter__btn').forEach(b => b.classList.remove('is-active'));
      e.target.classList.add('is-active');
      renderVideoProjects(e.target.dataset.filter);
    }
  });

  // ============================================================
  // 3. МОДАЛЬНЕ ВІКНО
  // ============================================================
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalMedia = document.getElementById('modalMedia');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTools = document.getElementById('modalTools');
  const modalCategory = document.getElementById('modalCategory');
  const modalCta = document.getElementById('modalCta');
  let lastFocusedElement = null;

  function openModal(proj) {
    lastFocusedElement = document.activeElement;

    if (proj.video) {
      // muted навмисно НЕ ставимо — відкриття по кліку користувача дозволяє autoplay зі звуком.
      // controls дає паузу/перемотку/фулскрін "з коробки".
      modalMedia.innerHTML = `
        <video autoplay controls playsinline preload="auto">
          <source src="${proj.video}" type="video/mp4">
        </video>
      `;
    } else {
      modalMedia.innerHTML = `<img src="${proj.thumb}" alt="${proj.title}">`;
    }

    modalTitle.textContent = proj.title;
    modalDesc.textContent = proj.desc;
    modalCategory.textContent = proj.category.charAt(0).toUpperCase() + proj.category.slice(1);
    modalTools.innerHTML = proj.tags.map(t => `<span class="tag">${t}</span>`).join('');
    modalCta.href = proj.link;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => modalClose.focus(), 100);
  }

  function closeModal() {
    // Явно зупиняємо відтворення ДО очищення DOM, щоб звук гарантовано не грав у фоні.
    // src живе на <source>, а не на самому <video>, тож спершу прибираємо джерело,
    // і лише потім викликаємо load(), щоб гарантовано скинути буфер завантаження.
    const activeVideo = modalMedia.querySelector('video');
    if (activeVideo) {
      activeVideo.pause();
      activeVideo.innerHTML = '';
      activeVideo.load();
    }

    modal.hidden = true;
    document.body.style.overflow = '';
    modalMedia.innerHTML = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  modalClose.addEventListener('click', closeModal);
  document.querySelector('.modal__overlay').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
    if (e.key === 'Tab' && !modal.hidden) {
      const focusable = modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  // ============================================================
  // 4. SCROLL ANIMATIONS
  // ============================================================
  // Спостерігач вже створений і використаний у розділі 0 / під час рендеру карток.
  // Тут лише фінальний прохід — на випадок елементів, доданих поза renderVideoProjects.
  observeReveal();

  // ============================================================
  // 5. HEADER & SCROLL
  // ============================================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // ============================================================
  // 6. MOBILE MENU
  // ============================================================
  const navToggle = document.getElementById('navToggle');
  const navListEl = document.getElementById('navList');
  navToggle.addEventListener('click', () => {
    const isOpen = navListEl.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navListEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav__link')) {
      navListEl.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

});