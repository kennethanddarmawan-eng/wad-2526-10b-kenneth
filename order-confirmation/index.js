let cart = [];

loadCart();

function loadCart() {
    const params = new URLSearchParams(window.location.search);
    cart = JSON.parse(params.get('cart'));

    let display = '';
    let total = 0;

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];

        for (let j = 0; j < menu.variants.length; j++) {
            const variant = menu.variants[j];
            const quantity = cart[i][j];

            if (quantity > 0) {
                const itemTotal = quantity * variant.price;
                total += itemTotal;

                let itemName = menu.name;
                if (variant.description) {
                    itemName += ' - ' + variant.description;
                }

                display += itemName + ' x' + quantity + ' = ' + itemTotal + '<br>';
            }
        }
    }

    document.getElementById('cart').innerHTML = display;
    document.getElementById('total').innerHTML = 'Total: ' + total;
}