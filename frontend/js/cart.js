const cartItemsContainer = document.getElementById('cart-items');
const totalAmount = document.getElementById('totalAmount');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

displayCart();

// Display Cart Items
function displayCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your Cart is Empty!</p>';
    totalAmount.textContent = '₹0';
    return;
  }

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <img src="assets/${item.image}" alt="${item.name}">
      <div class="item-details">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: 
          <button onclick="decreaseQty(${item.id})">-</button>
          ${item.quantity}
          <button onclick="increaseQty(${item.id})">+</button>
        </p>
        <button onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  updateTotal();
}

// Increase Quantity
function increaseQty(id) {
  const item = cart.find(item => item.id === id);
  item.quantity++;
  updateCart();
}

// Decrease Quantity
function decreaseQty(id) {
  const item = cart.find(item => item.id === id);
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeItem(id);
  }
  updateCart();
}

// Remove Item
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Update Cart
function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Calculate Total Amount
function updateTotal() {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  totalAmount.textContent = `₹${total}`;
}

// Clear Cart after Checkout
function checkout() {
  if (cart.length === 0) {
    alert('Cart is Empty!');
    return;
  }
  alert('Order Placed Successfully!');
  localStorage.removeItem('cart');
  window.location.href = 'index.html';
}
