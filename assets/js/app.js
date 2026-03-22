
const header = document.querySelector('.header');
const marquee = document.querySelector('.marquee');
const preview = document.querySelector('.preview');


const observer = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];

    if (entry.isIntersecting) {
      // header.classList.add('scrolled');
      marquee.classList.add('scrolled');
    } else {
      // header.classList.remove('scrolled');
      marquee.classList.remove('scrolled');
    }
  },
  {
    threshold: 0.3
  }
);

observer.observe(preview);



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
const catalog = document.querySelector('.catalog');

toggleInput.addEventListener('change', () => {
    if (toggleInput.checked) {
        // Если выбрали "Изнанка"
        catalog.classList.add('active-back');
    } else {
        // Если выбрали "Внешка"
        catalog.classList.remove('active-back');
    }
});