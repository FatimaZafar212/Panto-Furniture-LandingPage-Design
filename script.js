document.addEventListener('DOMContentLoaded', function () {
  const mobileToggle = document.getElementById('m');
  const mobileMenu = document.querySelector('.mobile');
  if (mobileToggle && mobileMenu) {
    mobileMenu.style.display = mobileToggle.checked ? 'block' : 'none';
    mobileToggle.addEventListener('change', () => {
      mobileMenu.style.display = mobileToggle.checked ? 'block' : 'none';
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileToggle.checked = false;
      mobileMenu.style.display = 'none';
    }));
  }
  const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
  const productCards = Array.from(document.querySelectorAll('.product-card'));
  const searchInput = document.querySelector('.search input');
  window.filterProducts = function (category) {
    const cat = (category || '').toLowerCase();
    productCards.forEach(card => {
      const cardCat = (card.dataset.category || '').toLowerCase();
      card.style.display = (!cat || cat === 'all' || cardCat === cat) ? '' : 'none';
    });
    tabButtons.forEach(btn => {
      const text = btn.textContent.trim().toLowerCase();
      btn.classList.toggle('active', text === cat);
    });
  };
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.textContent.trim().toLowerCase();
      window.filterProducts(category);
    });
  });
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      productCards.forEach(card => {
        const nameEl = card.querySelector('.product-name');
        const categoryEl = card.querySelector('.product-category');
        const txt = ((nameEl && nameEl.textContent) || '') + ' ' + ((categoryEl && categoryEl.textContent) || '');
        card.style.display = (!q || txt.toLowerCase().includes(q)) ? '' : 'none';
      });
      if (q.length) tabButtons.forEach(b => b.classList.remove('active'));
    });
  }
  const badge = document.querySelector('.badge');
  let cartCount = Number(badge ? badge.textContent.trim() : 0) || 0;
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount += 1;
      if (badge) {
        badge.textContent = cartCount;
        badge.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 250 });
      }
      btn.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-4px)' }, { transform: 'translateY(0)' }], { duration: 200 });
    });
  });
  const testimonialsSlider = document.querySelector('.testimonial-slider');
  const testimonialsContainer = document.querySelector('.testimonials-container');
  const testimonialCards = Array.from(document.querySelectorAll('.testimonial-card'));
  let currentTestimonial = 0;
  function showTestimonial(index) {
    if (!testimonialsContainer || testimonialCards.length === 0) return;
    currentTestimonial = ((index % testimonialCards.length) + testimonialCards.length) % testimonialCards.length; // wrap
    testimonialCards.forEach((c, i) => c.classList.toggle('active', i === currentTestimonial));
    const card = testimonialCards[currentTestimonial];
    const sliderRect = testimonialsSlider.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const containerRect = testimonialsContainer.getBoundingClientRect();
    const leftOfCard = card.offsetLeft;
    const sliderVisibleWidth = sliderRect.width;
    const cardWidth = cardRect.width;
    const desiredLeft = leftOfCard - (sliderVisibleWidth - cardWidth) / 2;
    testimonialsContainer.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1)';
    testimonialsContainer.style.transform = `translateX(${-Math.max(0, desiredLeft)}px)`;
  }
  window.nextTestimonial = function () { showTestimonial(currentTestimonial + 1); };
  window.previousTestimonial = function () { showTestimonial(currentTestimonial - 1); };
  showTestimonial(0);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') window.nextTestimonial();
    if (e.key === 'ArrowLeft') window.previousTestimonial();
  });
  window.addEventListener('resize', () => showTestimonial(currentTestimonial));
  testimonialCards.forEach((c, i) => c.addEventListener('click', () => showTestimonial(i)));
});