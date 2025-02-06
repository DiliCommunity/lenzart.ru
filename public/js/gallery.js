document.addEventListener('DOMContentLoaded', function() {
    // Получаем категорию из URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    // Обновляем заголовок и фильтры в зависимости от категории
    if (category) {
        const categoryTitles = {
            'kitchen': 'Кухни',
            'hallway': 'Прихожие',
            'wardrobe': 'Шкафы-купе',
            'living': 'Гостиные',
            'cabinets': 'Шкафы и тумбы'
        };

        const categoryFilters = {
            'kitchen': ['modern', 'classic', 'minimalist'],
            'hallway': ['modern', 'classic'],
            'wardrobe': ['sliding', 'hinged'],
            'living': ['modern', 'classic', 'minimalist'],
            'cabinets': ['wardrobes', 'dressers', 'nightstands']
        };

        // Обновляем заголовок
        document.querySelector('.category-title').textContent = categoryTitles[category] || 'Все товары';

        // Обновляем фильтры
        const filtersContainer = document.querySelector('.gallery-filters');
        filtersContainer.innerHTML = '<button class="filter-btn active" data-filter="all">Все</button>';
        
        if (categoryFilters[category]) {
            categoryFilters[category].forEach(filter => {
                const filterName = {
                    'modern': 'Современные',
                    'classic': 'Классические',
                    'minimalist': 'Минимализм',
                    'sliding': 'Раздвижные',
                    'hinged': 'Распашные',
                    'wardrobes': 'Шкафы',
                    'dressers': 'Комоды',
                    'nightstands': 'Тумбочки'
                }[filter];

                filtersContainer.innerHTML += `
                    <button class="filter-btn" data-filter="${filter}">${filterName}</button>
                `;
            });
        }

        // Загружаем соответствующие товары
        loadProducts(category);
    }

    // Функция загрузки товаров
    function loadProducts(category) {
        const galleryGrid = document.querySelector('.gallery-grid');
        galleryGrid.innerHTML = ''; // Очищаем текущие товары

        // Здесь должна быть логика загрузки товаров в зависимости от категории
        // Пример добавления товара:
        const productTemplate = `
            <div class="product-card" data-category="modern">
                <div class="product-image">
                    <img src="images/products/${category}/product1.jpg" alt="Товар">
                    <div class="product-overlay">
                        <button class="quick-view-btn">
                            <i class="fas fa-eye"></i>
                            Быстрый просмотр
                        </button>
                        <button class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i>
                            В корзину
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>Название товара</h3>
                    <p class="product-description">Описание товара</p>
                    <div class="product-price">85 000 ₽</div>
                </div>
            </div>
        `;

        // Добавляем несколько товаров для примера
        for (let i = 0; i < 6; i++) {
            galleryGrid.innerHTML += productTemplate;
        }

        // Переинициализируем обработчики событий
        initEventHandlers();
    }

    // Фильтрация товаров
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            button.classList.add('active');

            const filterValue = button.dataset.filter;

            products.forEach(product => {
                if (filterValue === 'all' || product.dataset.category === filterValue) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Быстрый просмотр
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const modal = document.querySelector('.quick-view-modal');
    const closeModal = document.querySelector('.close-modal');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const product = button.closest('.product-card');
            
            // Заполняем модальное окно данными о товаре
            const modalImage = modal.querySelector('.main-image');
            const modalTitle = modal.querySelector('.product-details h2');
            const modalDescription = modal.querySelector('.description');
            const modalPrice = modal.querySelector('.price');

            modalImage.src = product.querySelector('.product-image img').src;
            modalTitle.textContent = product.querySelector('h3').textContent;
            modalDescription.textContent = product.querySelector('.product-description').textContent;
            modalPrice.textContent = product.querySelector('.product-price').textContent;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Закрытие модального окна при клике вне его
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Добавление в корзину
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const product = button.closest('.product-card');
            
            // Здесь будет логика добавления в корзину
            // Например, можно сохранять в localStorage
            const productData = {
                id: Date.now(), // временный ID
                name: product.querySelector('h3').textContent,
                price: product.querySelector('.product-price').textContent,
                image: product.querySelector('.product-image img').src
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(productData);
            localStorage.setItem('cart', JSON.stringify(cart));

            // Анимация добавления в корзину
            const cartButton = document.querySelector('.cart-button');
            cartButton.classList.add('added');
            setTimeout(() => cartButton.classList.remove('added'), 1000);
        });
    });

    function initEventHandlers() {
        // Переинициализация обработчиков событий для новых элементов
        const filterButtons = document.querySelectorAll('.filter-btn');
        const products = document.querySelectorAll('.product-card');
        const quickViewButtons = document.querySelectorAll('.quick-view-btn');
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

        // Код обработчиков событий из предыдущей версии
        // ...
    }
}); 