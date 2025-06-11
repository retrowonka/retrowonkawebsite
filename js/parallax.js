const bgClasses = [
  { selector: ".parallax-bg", factor: -0.3 },
  { selector: ".parallax-bg-about", factor: -0.5 },
  { selector: ".parallax-bg-contact", factor: -0.5 },
  { selector: ".parallax-bg-shop", factor: -0.5 },
  { selector: ".parallax-bg-terms", factor: -0.5 }
];

// Only run parallax on desktop
const isMobile = window.innerWidth < 910;

function updateParallax() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  bgClasses.forEach(({ selector, factor }) => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.transform = `translate3d(0, ${scrollTop * factor}px, 0)`;
    }
  });
}

if (!isMobile) {
  window.addEventListener("scroll", updateParallax);
  window.addEventListener("load", updateParallax);
}