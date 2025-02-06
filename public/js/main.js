document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Закрываем мобильное меню после клика
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuButton.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // Обновленные настройки слайдера
    const sliderOptions = {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        on: {
            init: function() {
                updateProductDescription();
            },
            slideChange: function() {
                updateProductDescription();
            }
        }
    };

    // Инициализация всех слайдеров
    const sliderCategories = [
        'bathroom',
        'kitchen',
        'wardrobes',
        'hallway',
        'sliding-doors'
    ];

    sliderCategories.forEach(category => {
        new Swiper(`.${category}-slider`, sliderOptions);
    });

    // Обработка переключения категорий
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            
            // Скрываем все слайдеры
            document.querySelectorAll('.slider-container').forEach(slider => {
                slider.style.display = 'none';
            });
            
            // Показываем выбранный слайдер
            document.querySelector(`.${category}-slider-container`).style.display = 'block';
            
            // Обновляем активный класс
            document.querySelectorAll('.category-item').forEach(cat => {
                cat.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Функция обновления описания товара
    function updateProductDescription() {
        const activeSlides = document.querySelectorAll('.swiper-slide-active');
        activeSlides.forEach(slide => {
            const price = slide.dataset.price;
            const description = slide.dataset.description;
            const descriptionElement = slide.querySelector('.product-description');
            if (descriptionElement) {
                descriptionElement.innerHTML = `
                    <p class="product-text">${description}</p>
                    <p class="product-price">${price} ₽</p>
                    <button class="order-button">Сделать заказ</button>
                `;
            }
        });
    }

    // Обработка кнопок заказа
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('order-button')) {
            // Здесь можно добавить логику оформления заказа
            const slide = e.target.closest('.swiper-slide');
            const productId = slide.dataset.productId;
            console.log(`Оформление заказа для продукта ${productId}`);
        }
    });

    // Получаем текущий путь страницы
    const currentPath = window.location.pathname;
    
    // Находим все ссылки в навигации
    const navLinks = document.querySelector('.nav-links');
    
    // Убираем класс active у всех ссылок
    navLinks.classList.remove('active');
    
    // Добавляем класс active для текущей страницы
    if (currentPath.split('/').pop() === 'index.html') {
        navLinks.classList.add('active');
    }

    // Видео функционал
    const video = document.getElementById('preview-video');
    const playButton = document.getElementById('playButton');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const muteButton = document.getElementById('muteButton');
    
    // Управление воспроизведением
    playButton.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playButton.querySelector('i').classList.replace('fa-play', 'fa-pause');
            playButton.style.opacity = '0';
        } else {
            video.pause();
            playButton.querySelector('i').classList.replace('fa-pause', 'fa-play');
            playButton.style.opacity = '1';
        }
    });

    // Управление полноэкранным режимом
    fullscreenButton.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            video.requestFullscreen().catch(err => {
                console.log(`Ошибка: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    // Управление звуком
    muteButton.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            muteButton.querySelector('i').classList.replace('fa-volume-mute', 'fa-volume-up');
        } else {
            video.muted = true;
            muteButton.querySelector('i').classList.replace('fa-volume-up', 'fa-volume-mute');
        }
    });

    // Показываем кнопку воспроизведения при окончании видео
    video.addEventListener('ended', () => {
        playButton.style.opacity = '1';
        playButton.querySelector('i').classList.replace('fa-pause', 'fa-play');
    });

    // Показываем/скрываем кнопку при наведении
    video.addEventListener('mouseover', () => {
        if (!video.paused) {
            playButton.style.opacity = '0.5';
        }
    });

    video.addEventListener('mouseout', () => {
        if (!video.paused) {
            playButton.style.opacity = '0';
        }
    });

    // Мобильное меню
    const mobileMenuButton = document.getElementById('mobileMenuButton');

    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Закрытие мобильного меню при клике вне его
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-button')) {
            navLinks.classList.remove('active');
            mobileMenuButton.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });
});