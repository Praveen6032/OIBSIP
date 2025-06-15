let cart = [];
let total = 0;

// Add item to cart
function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    total += price;
     localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total.toString());
    updateCartDisplay();
}

// Update cart display on screen
function updateCartDisplay() {
    const cartList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');

    if (!cartList || !totalDisplay) return;

    cartList.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
        cartList.appendChild(li);
    });

    totalDisplay.textContent = `Total: ₹${total.toFixed(2)}`;
}

// Called on form submit in payment.html
function handlePayment(event) {
    event.preventDefault();
    alert("✅ Payment Successful! 🍽️ Your order is on its way!");
    cart = [];
    total = 0;
    updateCartDisplay();
    event.target.reset(); // Reset form
}

// Redirects to payment page if cart is not empty
function goToPayment() {
    if (cart.length === 0) {
        alert("🛒 Please add items to your cart before proceeding to payment!");
    } else {
        window.location.href = "payment.html";
    }
}
