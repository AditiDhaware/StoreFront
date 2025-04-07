let products = [];
let filteredProducts = [];

const productList = document.getElementById('product-list');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

fetch('../backend/products.php')
    .then(response => response.json())
    .then(data => {
        products = data;
        filteredProducts = products;
        displayProducts(filteredProducts);
    });

function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        productList.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.variety}</p>
                <p>₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();
    filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(value) || 
        p.variety.toLowerCase().includes(value)
    );
    displayProducts(filteredProducts);
});

sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    if (sortValue === 'low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    displayProducts(filteredProducts);
});

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += 1;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({...product, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
}
