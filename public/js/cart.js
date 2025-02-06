document.addEventListener('DOMContentLoaded', function() {
    // Обработка изменения количества товаров
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            let value = parseInt(input.value);
            
            if (this.classList.contains('plus')) {
                value++;
            } else if (this.classList.contains('minus') && value > 1) {
                value--;
            }
            
            input.value = value;
            updateTotal();
        });
    });

    // Обработка удаления товаров
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.cart-item').remove();
            updateTotal();
        });
    });

    // Обработка чекбокса сборки
    const assemblyCheckbox = document.querySelector('input[name="assembly"]');
    assemblyCheckbox.addEventListener('change', updateTotal);

    function updateTotal() {
        const items = document.querySelectorAll('.cart-item');
        let subtotal = 0;

        items.forEach(item => {
            const price = parseInt(item.querySelector('.item-price').textContent.replace(/[^\d]/g, ''));
            const quantity = parseInt(item.querySelector('.item-quantity input').value);
            subtotal += price * quantity;
        });

        const assembly = document.querySelector('input[name="assembly"]').checked ? subtotal * 0.1 : 0;
        const total = subtotal + assembly;

        document.querySelector('.summary-item:first-child span:last-child').textContent = `${subtotal.toLocaleString()} ₽`;
        document.querySelector('.summary-item:nth-child(2) span:last-child').textContent = `${assembly.toLocaleString()} ₽`;
        document.querySelector('.summary-total span:last-child').textContent = `${total.toLocaleString()} ₽`;
    }
}); 