

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
