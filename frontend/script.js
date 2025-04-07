let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

fetch('../backend/products.php')
  .then(response => response.json())
  .then(data => {
    products = data;
    displayProducts(products);
    populateCategoryFilter(products);
  });

function displayProducts(items) {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';

    items.forEach(product => {
        let varietiesOptions = product.varieties.map(v =>
            `<option value="${v.price}">${v.name} - ₹${v.price}</option>`).join('');

        productContainer.innerHTML += `
        <div class="product-card">
            <img src="${product.image_url}" width="150">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <select onchange="addToCart(${product.id}, this)">
                <option>Select Variety</option>
                ${varietiesOptions}
            </select>
        </div>`;
    });
}

function populateCategoryFilter(products) {
    let categories = [...new Set(products.map(p => p.category))];
    let filter = document.getElementById('categoryFilter');
    filter.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(c => {
        filter.innerHTML += `<option value="${c}">${c}</option>`;
    });
}

document.getElementById('search').addEventListener('input', function(){
    const searchValue = this.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchValue));
    displayProducts(filtered);
});

document.getElementById('categoryFilter').addEventListener('change', function(){
    const cat = this.value;
    const filtered = cat ? products.filter(p => p.category === cat) : products;
    displayProducts(filtered);
});

document.getElementById('sortPrice').addEventListener('change', function(){
    const sort = this.value;
    let sorted = [...products];
    if (sort === 'low-high')
        sorted.sort((a, b) => a.varieties[0].price - b.varieties[0].price);
    else if (sort === 'high-low')
        sorted.sort((a, b) => b.varieties[0].price - a.varieties[0].price);

    displayProducts(sorted);
});

function addToCart(productId, select) {
    const selectedPrice = select.value;
    if (selectedPrice === "Select Variety") return;

    const item = {
        id: productId,
        name: products.find(p => p.id === productId).name,
        price: parseInt(selectedPrice),
        qty: 1
    };

    const existing = cart.find(c => c.id === item.id && c.price === item.price);
    if (existing) existing.qty++;
    else cart.push(item);

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '<h3>Cart</h3>';

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        cartContainer.innerHTML += `
        <div class="cart-item">
            ${item.name} - ₹${item.price} x ${item.qty}
        </div>`;
    });

    cartContainer.innerHTML += `<h4>Total: ₹${total}</h4>
        <button onclick="checkout()">Checkout</button>`;
}

function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

displayCart();
