function animateCounter(el, target, suffix) {
  let current = 0;
  const duration = 2000;
  const step = Math.ceil(target / (duration / 16));
  const update = () => {
    current += step;
    if (current >= target) {
      current = target;
      el.textContent = current + suffix;
      return;
    }
    el.textContent = current + suffix;
    requestAnimationFrame(update);
  };
  update();
}

function parseStatValue(text) {
  const num = parseFloat(text.replace(/[^0-9.]/g, ''));
  const suffix = text.replace(/[0-9.,]/g, '');
  return { num, suffix };
}

function initCounters() {
  const sections = document.querySelectorAll('.hero__stats, .stats');
  sections.forEach(section => {
    const numbers = section.querySelectorAll('.hero__stat-number, .stats__number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const { num, suffix } = parseStatValue(el.textContent);
          animateCounter(el, num, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    numbers.forEach(el => observer.observe(el));
  });
}

document.addEventListener('DOMContentLoaded', initCounters);
