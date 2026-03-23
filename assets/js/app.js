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
        menu_icon.setAttribute('src','/assets/icons/menu-icon-reverse.svg');
        cart_icon.setAttribute('src','/assets/icons/cart-icon-reverse.svg');
      } else {
        // header.classList.remove('scrolled');
        header.classList.remove('active');
        menu_icon.setAttribute('src','/assets/icons/menu-icon.svg');
        cart_icon.setAttribute('src','/assets/icons/cart-icon.svg');

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


const track = document.getElementById('track');
const slides = Array.from(track.children);
const btnLeft = document.getElementsByClassName('slide-button-left');
const btnRight = document.getElementsByClassName('slide-button-right');

let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchStartX - touchEndX > 50) {
    // Свайп влево -> следующий слайд
    btnRight.click();
  }
  if (touchEndX - touchStartX > 50) {
    // Свайп вправо -> предыдущий слайд
    btnLeft.click();
  }
}

// 1. Клонируем элементы
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// 2. Добавляем клоны в начало и конец
track.appendChild(firstClone);
track.prepend(lastClone);

// 3. Начальные настройки
let index = 1; // Начинаем с 1, так как на 0 позиции теперь клон последнего слайда
const slideWidth = 100; // в процентах

// Устанавливаем начальную позицию на настоящий первый слайд
track.style.transform = `translateX(-${index * slideWidth}%)`;

function moveSlider(withTransition = true) {
  if (withTransition) {
    track.style.transition = "transform 0.5s ease-in-out";
  } else {
    track.style.transition = "none";
  }
  track.style.transform = `translateX(-${index * slideWidth}%)`;
}

// 4. Обработка кнопок
for (const btn of btnRight) {
  btn.addEventListener('click', () => {
    if (index >= track.children.length - 1) return; // Защита от лишних кликов
    index++;
    moveSlider();
  });

}

for (const btn of btnLeft) {

  btn.addEventListener('click', () => {
    if (index <= 0) return;
    index--;
    moveSlider();
  });
}

// 5. Магия бесконечности: следим за окончанием анимации
track.addEventListener('transitionend', () => {
  // Если мы на последнем клоне (копия первого)
  if (track.children[index] === firstClone) {
    index = 1; // Прыгаем на настоящий первый
    moveSlider(false); // Прыгаем без анимации
  }

  // Если мы на первом клоне (копия последнего)
  if (track.children[index] === lastClone) {
    index = track.children.length - 2; // Прыгаем на настоящий последний
    moveSlider(false); // Прыгаем без анимации
  }
});

const toggleInput = document.getElementById('mode-toggle');
const buyButton = document.getElementById('catalog-buy-button');
const catalog = document.querySelector('.catalog');

toggleInput.addEventListener('change', () => {
  if (toggleInput.checked) {
    // Если выбрали "Изнанка"
    catalog.classList.add('active-back');
    buyButton.classList.add('active-back');
  } else {
    // Если выбрали "Внешка"
    catalog.classList.remove('active-back');
    buyButton.classList.remove('active-back');
  }
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