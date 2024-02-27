const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 1; // Comenzar desde el primer slide clonado
const totalSlides = slides.length;

// Clonar las diapositivas para hacer el carrusel infinito
const clonedSlidesStart = Array.from(slides).map(slide => slide.cloneNode(true));
const clonedSlidesEnd = Array.from(slides).map(slide => slide.cloneNode(true));
carousel.prepend(...clonedSlidesEnd);
carousel.append(...clonedSlidesStart);

// Función para avanzar al siguiente slide
function nextSlide() {
  currentIndex++;
  updateCarousel();
}

// Función para retroceder al slide anterior
function prevSlide() {
  currentIndex--;
  updateCarousel();
}

// Función para actualizar la posición del carrusel
function updateCarousel() {
  const offset = -currentIndex * slides[0].clientWidth;
  carousel.style.transition = 'transform 0.5s ease-in-out'; // Agregar transición suave al desplazamiento
  carousel.style.transform = `translateX(${offset}px)`;

  // Resaltar la diapositiva del medio
  slides.forEach(slide => {
    slide.classList.remove('active'); // Remover la clase 'active' de todas las diapositivas
  });
  slides[(currentIndex % totalSlides)].classList.add('active'); // Agregar la clase 'active' a la diapositiva del medio
}

// Agregar eventos de clic para los botones de navegación
prevBtn.addEventListener('click', () => {
  prevSlide();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
});

// Iniciar carrusel automáticamente al cargar la página
let intervalId = setInterval(nextSlide, 3000); // Cambiar de slide automáticamente cada 3 segundos

// Detener el carrusel al hacer clic en los botones de navegación
prevBtn.addEventListener('click', () => {
  clearInterval(intervalId);
});

nextBtn.addEventListener('click', () => {
  clearInterval(intervalId);
});

// Agregar evento de transición al final del carrusel para hacerlo infinito
carousel.addEventListener('transitionend', () => {
  if (currentIndex <= 0) {
    carousel.style.transition = 'none';
    currentIndex = totalSlides;
    carousel.style.transform = `translateX(-${totalSlides * slides[0].clientWidth}px)`;
  } else if (currentIndex >= totalSlides * 2) {
    carousel.style.transition = 'none';
    currentIndex = totalSlides;
    carousel.style.transform = `translateX(-${totalSlides * slides[0].clientWidth}px)`;
  }
});

// Resaltar la diapositiva del medio al cargar la página
updateCarousel();