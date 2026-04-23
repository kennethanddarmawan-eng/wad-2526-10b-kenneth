// e.g. When there are 4 menus with 2 variants each,
// then the cart variable will be like this: 
// [[0, 0], [0, 0], [0, 0], [0, 0]]
let cart = [];

setupCart();

function checkout() {
    let total = 0;
    let hasItems = false;

    for (let i = 0; i < menus.length; i++) {
        for (let j = 0; j < menus[i].variants.length; j++) {
            const qty = cart[i][j];
            if (qty > 0) {
                total += qty * menus[i].variants[j].price;
                hasItems = true;
            }
        }
    }

    if (!hasItems) {
        alert('Cart is empty');
        return;
    }

    alert(`Total: $${total}`);

    for (let i = 0; i < menus.length; i++) {
        for (let j = 0; j < menus[i].variants.length; j++) {
            cart[i][j] = 0;
            document.getElementById(`qty-${i}-${j}`).innerHTML = 0;
        }
    }
}

renderMenus();

function substractQty(menuIndex, variantIndex) {
    cart[menuIndex][variantIndex] -= 1;

    if (cart[menuIndex][variantIndex] < 0) {
        cart[menuIndex][variantIndex] = 0;

        const menuName = menus[menuIndex].name;
        const variantName = menus[menuIndex].variants[variantIndex].description;
        alert(`${menuName} - ${variantName} cannot be less than 0`);
    }

    const id = `qty-${menuIndex}-${variantIndex}`;

    document.getElementById(id).innerHTML = cart[menuIndex][variantIndex];
}

function addQty(menuIndex, variantIndex) {
    cart[menuIndex][variantIndex] += 1;

    const id = `qty-${menuIndex}-${variantIndex}`;

    document.getElementById(id).innerHTML = cart[menuIndex][variantIndex];
}

function setupCart() {
    for (let i = 0; i < menus.length; i++) {
        let variantCart = [];
        for (let j = 0; j < menus[i].variants.length; j++) {
            variantCart.push(0);
        }
        cart.push(variantCart);
    }
}

function renderMenus() {
    let menuGrid = '';

    for (let i = 0; i < menus.length; i++) {
        let menuVariantList = '';
        for (let j = 0; j < menus[i].variants.length; j++) {

            const qtyId = `qty-${i}-${j}`;

            menuVariantList += `
                <div class="menu-price-row">
                    <div class="price-description">${menus[i].variants[j].description}</div>
                    <div class="price-and-qty">
                        <h3 class="price">${menus[i].variants[j].price}</h3>
                        <button onclick="substractQty(${i}, ${j})">
                            <span class="material-symbols-outlined">
                                do_not_disturb_on
                            </span>
                        </button>
                        <span class="qty" id="${qtyId}">0</span>
                        <button onclick="addQty(${i}, ${j})">
                            <span class="material-symbols-outlined">
                                add_circle
                            </span>
                        </button>
                    </div>
                </div>
            `;
        }

        menuGrid += `
            <div class="menu-card">
                <img src="${menus[i].photoUrl}" alt="${menus[i].name}" id="pic">
                <h3 class="menu-name">${menus[i].name}</h3>
                <p class="menu-description">${menus[i].description}</p>
                ${menuVariantList}
            </div>
        `;
    }

    document.getElementById('menu-grid').innerHTML = menuGrid;
}