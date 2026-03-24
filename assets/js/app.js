let observer;

function initObserver() {
  const header = document.getElementById('header');
  const menu_icon = document.getElementById('menu-icon-mobile');
  const cart_icon = document.getElementById('cart-icon-mobile');
  const headerHeight=header.offsetHeight;
  const block = document.getElementsByClassName('preview')[0];

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      if (!entry.isIntersecting) {
        // header.classList.add('scrolled');
        header.classList.add('active');
        menu_icon.setAttribute('src','assets/icons/menu-icon-reverse.svg');
        cart_icon.setAttribute('src','assets/icons/cart-icon-reverse.svg');
      } else {
        // header.classList.remove('scrolled');
        header.classList.remove('active');
        menu_icon.setAttribute('src','assets/icons/menu-icon.svg');
        cart_icon.setAttribute('src','assets/icons/cart-icon.svg');

      }
    },
    {
  rootMargin: `-${headerHeight}px 0px 0px 0px`

    }
  );

  observer.observe(block);

}

function destroyObserver() {
  if (observer) observer.disconnect();
}

const media = window.matchMedia("(max-width: 768px)");

if (media.matches) {
  initObserver();
}

media.addEventListener("change", (e) => {
  if (e.matches) {
    initObserver();   // включили
  } else {
    destroyObserver(); // выключили
  }
});





// ------------------------------
// Слайдер
// ------------------------------
const track = document.getElementById('track');
let slides = Array.from(track.children);

// Клонируем первый и последний слайд для бесконечности
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.prepend(lastClone);

// Пересобираем массив слайдов с клонами
slides = Array.from(track.children);

let index = 1; // начинаем с 1, потому что на 0 теперь клон последнего
let startX = 0;
let endX = 0;

// ------------------------------
// Адаптивная ширина слайдов
// ------------------------------
function setSlideWidth() {
  slides.forEach(slide => {
    slide.style.minWidth = `${100}%`;
  });
  moveSlider(false);
}

window.addEventListener('resize', setSlideWidth);
setSlideWidth();

// ------------------------------
// Функция движения слайдера
// ------------------------------
function moveSlider(withTransition = true) {
  if (withTransition) {
    track.style.transition = 'transform 0.5s ease-in-out';
  } else {
    track.style.transition = 'none';
  }
  track.style.transform = `translateX(-${index * 100}%)`;
}

// ------------------------------
// Функции для кнопок / свайпа
// ------------------------------
function nextSlide() {
  if (index >= slides.length - 1) return;
  index++;
  moveSlider();
}

function prevSlide() {
  if (index <= 0) return;
  index--;
  moveSlider();
}

// ------------------------------
// Кнопки
// ------------------------------
const btnLeft = document.querySelectorAll('.slide-button-left');
const btnRight = document.querySelectorAll('.slide-button-right');

btnRight.forEach(btn => btn.addEventListener('click', nextSlide));
btnLeft.forEach(btn => btn.addEventListener('click', prevSlide));

// ------------------------------
// Бесконечность
// ------------------------------
track.addEventListener('transitionend', () => {
  if (slides[index] === firstClone) {
    index = 1;
    moveSlider(false);
  }
  if (slides[index] === lastClone) {
    index = slides.length - 2;
    moveSlider(false);
  }
});

// ------------------------------
// Свайп для мобилки
// ------------------------------
track.addEventListener('touchstart', e => {
  if (window.innerWidth > 768) return;
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', e => {
  if (window.innerWidth > 768) return;
  endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 50) nextSlide();  // свайп влево
  if (diff < -50) prevSlide(); // свайп вправо
});

// ------------------------------
// Переключатель "Изнанка / Внешка"
// ------------------------------
const toggleInput = document.getElementById('mode-toggle');
const catalog = document.querySelector('.catalog');

toggleInput.addEventListener('change', () => {
  catalog.classList.toggle('active-back', toggleInput.checked);
});




const skate_track = document.getElementById('skate-sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const slidesCount = 3;

function updateSlider() {
  // Сдвигаем ленту
  skate_track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Блокируем кнопки на границах
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === slidesCount - 1;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < slidesCount - 1) {
    currentIndex++;
    updateSlider();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

// Инициализация кнопок при загрузке
updateSlider();



document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Закрываем все открытые (если хочешь, чтобы одновременно был открыт только один)
      faqItems.forEach(el => el.classList.remove('active'));

      // Если кликнули по закрытому — открываем
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});