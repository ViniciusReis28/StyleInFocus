let cart = [];
let total = 0;

const cartContainer = document.getElementById("cart-container");
const totalElement = document.getElementById("total");

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        
        addToCart(name, price);
    });
});

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    updateCart();
}

function updateCart() {
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('p');
        cartItem.textContent = `${item.name} - R$${item.price}`;
        cartContainer.appendChild(cartItem);
    });

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Carrinho está vazio</p>';
    }

    totalElement.textContent = total.toFixed(2);
}
