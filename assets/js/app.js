const preloader = document.getElementById('preloader');
const video = document.querySelector('#intro_video');

function hidePreloader() {
  preloader.classList.add('hidden');
  document.body.classList.remove('loading');
}

// когда видео готово полностью
video.addEventListener('canplaythrough', () => {
  hidePreloader();
});

let observer;

function initObserver() {
  const header = document.getElementById('header');
  const menu_icon = document.getElementById('menu-icon-mobile');
  const cart_icon = document.getElementById('cart-icon-mobile');
  const headerHeight = header.offsetHeight;
  const block = document.getElementsByClassName('preview')[0];

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      if (!entry.isIntersecting) {
        // header.classList.add('scrolled');
        header.classList.add('active');
        menu_icon.setAttribute('src', 'assets/icons/menu-icon-reverse.svg');
        cart_icon.setAttribute('src', 'assets/icons/cart-icon-reverse.svg');
      } else {
        // header.classList.remove('scrolled');
        header.classList.remove('active');
        menu_icon.setAttribute('src', 'assets/icons/menu-icon.svg');
        cart_icon.setAttribute('src', 'assets/icons/cart-icon.svg');

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

slides.forEach(slide => {
  slide.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  slide.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) nextSlide();  // свайп влево
    if (diff < -50) prevSlide(); // свайп вправо
  });
});


// ------------------------------
// Переключатель "Изнанка / Внешка"
// ------------------------------
const toggleInput = document.getElementById('mode-toggle');
const catalog = document.querySelector('.catalog');

toggleInput.addEventListener('change', () => {
  catalog.classList.toggle('active-back', toggleInput.checked);
});

const skatePositionsDesktop = [
  { x: 8, y: 38, rotate: 0 },
  { x: 45, y: 60, rotate: 15 },
  { x: 85, y: 43, rotate: -10 }
];

const skatePositionsMobile = [
  { x: 5, y: 35, rotate: 0 },
  { x: 40, y: 55, rotate: 10 },
  { x: 72, y: 32, rotate: -45 }
];

// ВАЖНО: это контейнер, а не все слайды
const skateTrack = document.querySelector('.skate-sliderTrack');
const skateSlides = document.querySelectorAll('.skate-slide');

const skateSkater = document.getElementById('skater');
const skatePrevBtn = document.getElementById('prevBtn-skater');
const skateNextBtn = document.getElementById('nextBtn-skater');

let skateCurrentIndex = 0;
const skateSlidesCount = skateSlides.length;

let skateStartX = 0;

// ------------------------------
function skateGetPositions() {
  return window.innerWidth <= 768
    ? skatePositionsMobile
    : skatePositionsDesktop;
}

// ------------------------------
function skateUpdateSlider() {
  // движение слайдов
  skateTrack.style.transform = `translateX(-${skateCurrentIndex * 100}%)`;

  // движение скейтера
  const positions = skateGetPositions();
  const pos = positions[skateCurrentIndex];

  skateSkater.style.transform =
    `translate(${pos.x}vw, ${pos.y}vh) rotate(${pos.rotate}deg)`;

  // кнопки
  skatePrevBtn.disabled = skateCurrentIndex === 0;
  skateNextBtn.disabled = skateCurrentIndex === skateSlidesCount - 1;
}

// ------------------------------
function skateNextSlide() {
  if (skateCurrentIndex < skateSlidesCount - 1) {
    skateCurrentIndex++;
    skateUpdateSlider();
  }
}

function skatePrevSlide() {
  if (skateCurrentIndex > 0) {
    skateCurrentIndex--;
    skateUpdateSlider();
  }
}

// ------------------------------
// кнопки
// ------------------------------
skateNextBtn.addEventListener('click', skateNextSlide);
skatePrevBtn.addEventListener('click', skatePrevSlide);

// ------------------------------
// свайп (ТОЛЬКО на контейнере)
// ------------------------------let skateStartX = 0;
let skateEndX = 0;
let skateIsSwiping = false;

skateTrack.addEventListener('touchstart', e => {
  skateStartX = e.touches[0].clientX;
  skateIsSwiping = true;
}, { passive: true });

skateTrack.addEventListener('touchmove', e => {
  if (!skateIsSwiping) return;

  skateEndX = e.touches[0].clientX;

  // ❗ блокируем скролл страницы во время свайпа
  e.preventDefault();
}, { passive: false });

skateTrack.addEventListener('touchend', () => {
  if (!skateIsSwiping) return;

  const diff = skateStartX - skateEndX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) skateNextSlide();
    else skatePrevSlide();
  }

  skateIsSwiping = false;
});

// ------------------------------
skateSkater.style.transition = "transform 0.5s ease-in-out";

// ------------------------------
window.addEventListener('resize', skateUpdateSlider);

// ------------------------------
skateUpdateSlider();




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


// Логика бургер-меню
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const openMenuBtn = document.querySelector('.menu-icon'); // Убедись, что этот класс у иконки в хедере
const closeMenuBtn = document.getElementById('closeMenu');
const menuLinks = document.querySelectorAll('.menu-link');

function toggleMenu() {
  sideMenu.classList.toggle('open');
  menuOverlay.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
}

// Открытие по клику на иконку
if (openMenuBtn) {
  openMenuBtn.addEventListener('click', toggleMenu);
}
if (openMenuBtn[1]) {
  openMenuBtn.addEventListener('click', toggleMenu);
}

// Закрытие по кнопке "крестик" или по клику на оверлей
closeMenuBtn.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Закрытие при клике на любую ссылку в меню
menuLinks.forEach(link => {
  link.addEventListener('click', toggleMenu);
});

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('menuMobileOverlay');
  const openBtn = document.getElementById('menu-icon-mobile'); // Твой существующий ID
  const closeBtn = document.getElementById('closeMobileMenu');
  const mobLinks = document.querySelectorAll('.mob-link');

  function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.classList.toggle('stop-scrolling');
  }

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMobileMenu();
    });
  }

  // Закрытие при клике на крестик, оверлей или ссылку
  [closeBtn, mobileOverlay, ...mobLinks].forEach(el => {
    if (el) {
      el.addEventListener('click', toggleMobileMenu);
    }
  });
});

/**
 * Функция для настройки плавного скролла
 * @param {Object} scrollMap - Объект, где ключ это ID кнопки, а значение - ID блока
 */
function setupSmoothScroll(scrollMap) {
  const header = document.getElementById('header');
  const headerHeight = header ? header.offsetHeight : 0;

  Object.entries(scrollMap).forEach(([buttonId, sectionId]) => {
    const btn = document.getElementById(buttonId);
    const section = document.getElementById(sectionId);

    if (btn && section) {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); // Предотвращаем резкий прыжок по якорю

        // Вычисляем позицию с учетом высоты шапки
        const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = sectionPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Если меню открыто (мобильное), закрываем его при клике (опционально)
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          // вызываем функцию закрытия, которую мы писали ранее
          toggleMobileMenu();
        }
      });
    }
  });
}

// ИСПОЛЬЗОВАНИЕ:
// Просто перечисли ID своих кнопок и куда им скроллить
const myScrolls = {
  'who-is': 'about-us',
  'who-is-mobile': 'about-us',
  'na': 'mode-toggle',
  'na-mobile': 'catalg',
  'delivery': 'deliv',
  'delivery-mobile': 'deliv',
  'cont': 'obratka',
  'cont-mobile': 'obratka',
  'question': 'faq',
  'question-mobile': 'faq',
  'mne_nado': 'catalg',
  // Можно добавлять сколько угодно
};

setupSmoothScroll(myScrolls);




const skateMenu = document.querySelector('.side-menu');
const skateMenu2 = document.querySelector('.menu-overlay');
const skateMobileMenu = document.querySelector('.mobile-side-menu');
const skateMobileMenu2 = document.querySelector('.mobile-overlay ');

const skateMenuLinks = document.querySelectorAll('.side-menu a, .mobile-side-menu a');

skateMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    skateMenu.classList.remove('active');
    skateMenu.classList.remove('open');
    skateMenu2.classList.remove('active');
    skateMobileMenu.classList.remove('active');
    skateMobileMenu.classList.remove('open');
    skateMobileMenu2.classList.remove('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const buyButtons = document.querySelectorAll('.catalog-buy-wrapper');

  buyButtons.forEach(btn => {
    btn.style.cursor = 'pointer';

    btn.addEventListener('click', () => {
      window.location.href = 'page_not_found.html';
    });
  });
});



const cartModal = document.querySelector('#cartModal');
const cartOverlay = document.querySelector('#cartOverlay');
const closeCartBtn = document.querySelector('#closeCart');
const openCartBtns = document.querySelectorAll('.cart-button'); // Выбирает иконку корзины

// Функция открытия
function openCart() {
    cartModal.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Запрещаем скролл сайта
}

// Функция закрытия
function closeCart() {
    cartModal.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Возвращаем скролл
}

// Слушатели событий
openCartBtns.forEach(btn=>{
  if(btn) {
      btn.addEventListener('click', (e) => {
          e.preventDefault();
          openCart();
      });
  }

})

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart); // Закрытие по клику вне окна



document.addEventListener('DOMContentLoaded', () => {
  const introVideo = document.querySelector('.video-wrap video');
  const header = document.getElementById('header');
  const preview = document.querySelector('.preview');

  if (introVideo) {
    // Когда видео закончилось
    introVideo.onended = function () {
      header.classList.add('visible');
      preview.classList.add('visible');

      // Если нужно, чтобы видео после проигрывания плавно исчезло:
      // document.querySelector('.intro').style.display = 'none';
    };

    setTimeout(() => {
      header.classList.add('visible');
      preview.classList.add('visible');
    }, 20000);
  }
});
