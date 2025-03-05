let hasScrolled = false;

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Alert on page load
window.addEventListener('load', () => {
    console.log('Page fully loaded!');
});

// Chat modal functionality
const chatButton = document.getElementById('chatButton');
const chatModal = document.getElementById('chatModal');

// Функция закрытия модального окна
const closeChatModal = () => {
    if (chatModal.classList.contains('closing')) return; // Избегаем дублирования
    chatModal.classList.add('closing'); // Анимация закрытия
    chatModal.addEventListener(
        'transitionend',
        () => {
            chatModal.classList.remove('active', 'closing'); // Удаляем классы после завершения анимации
        },
        { once: true } // Срабатывает один раз
    );
};

// Обработчик для кнопки чата
chatButton.addEventListener('click', () => {
    if (chatModal.classList.contains('active')) {
        closeChatModal(); // Закрыть, если открыто
        hasScrolled = false;
    } else {
        chatModal.classList.add('active'); // Открыть
        chatLabel.style.opacity = 0;
        hasScrolled = true;
    }
});

// Закрытие при клике за пределами модального окна
document.addEventListener('click', (event) => {
    // Проверяем, был ли клик за пределами модального окна и кнопки
    if (
        !chatModal.contains(event.target) && // Если клик не на модальном окне
        !chatButton.contains(event.target) && // Если клик не на кнопке открытия
        chatModal.classList.contains('active') // Если модальное окно открыто
    ) {
        closeChatModal();
        hasScrolled = false;
    }
});

let currentIndex = 0;
const itemsToShow = window.innerWidth < 768 ? 1 : 3; // Показываем одно видео на мобильных
const carousel = document.querySelector('.carousel');
const totalItems = document.querySelectorAll('.carousel-item').length;


function moveCarousel(direction) {
    const maxIndex = totalItems - itemsToShow;
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    const offset = -currentIndex * (100 / itemsToShow);
    carousel.style.transform = `translateX(${offset}%)`;
}

// Пересчёт количества видимых элементов при изменении размера окна
window.addEventListener('resize', () => {
    const newItemsToShow = window.innerWidth < 768 ? 1 : 3;
    if (newItemsToShow !== itemsToShow) {
        currentIndex = 0; // Сбрасываем индекс для корректного отображения
        moveCarousel(0); // Перерисовка
    }
});

const header = document.querySelector('.hidden-header');
const progressBar = document.querySelector('.progress-bar');
let lastScrollTop = 0;

// Показ хедера на первом экране
window.addEventListener('load', () => {
    if (window.scrollY === 0) {
        header.classList.add('show'); // Показать хэдер
    }
});

const chatLabel = document.querySelector('.chat-label');
// Управление хэдером при скролле
window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY;

    // Прогресс-бар
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (currentScrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';

    // Хэдер
    if (currentScrollTop === 0) {
        header.classList.add('show'); // Показать хэдер, если в самом верху
    } else if (currentScrollTop > lastScrollTop) {
        header.classList.remove('show'); // Скрыть хэдер при прокрутке вниз
    } else {
        header.classList.add('show'); // Показать хэдер при прокрутке вверх
    }

    lastScrollTop = currentScrollTop; // Обновить последнее значение скролла

    if (!hasScrolled && currentScrollTop > 30) {
        chatLabel.style.opacity = '1';
        chatLabel.style.transform = 'translateX(0)';
    }
});

