function toggleMenu() {
  var menu = document.querySelector('.menu');
  menu.classList.toggle('menu-open');
}
const carousel = document.querySelector('.carousel');
const carouselWidth = carousel.scrollWidth - carousel.clientWidth;
let scrollPosition = 0;

function scrollCarousel() {
  if (scrollPosition >= carouselWidth) {
    scrollPosition = 0;
    carousel.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  } else {
    scrollPosition += carousel.clientWidth; // Ahora usamos carousel.clientWidth en lugar de un valor fijo
    carousel.scrollBy({
      left: carousel.clientWidth,
      behavior: 'smooth'
    });
  }
}

setInterval(scrollCarousel, 3000);

carousel.addEventListener('scroll', () => {
  scrollPosition = carousel.scrollLeft;
});
