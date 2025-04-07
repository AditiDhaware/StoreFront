const productsContainer = document.getElementById('products');
const categoryFilter = document.getElementById('categoryFilter');
const sortBy = document.getElementById('sortBy');

let productsData = [];

// Fetch Products from backend API
fetch('../backend/products.php')
  .then(res => res.json())
  .then(data => {
    productsData = data;
    displayProducts(productsData);
    populateCategories(productsData);
  });

// Display Products
function displayProducts(products) {
  productsContainer.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="assets/${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productsContainer.appendChild(productCard);
  });
}

// Populate Categories in Filter Dropdown
function populateCategories(products) {
  const categories = ['All', ...new Set(products.map(item => item.category))];

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Filter by Category
categoryFilter.addEventListener('change', () => {
  const selectedCategory = categoryFilter.value;

  if (selectedCategory === 'All') {
    displayProducts(productsData);
  } else {
    const filteredProducts = productsData.filter(product => product.category === selectedCategory);
    displayProducts(filteredProducts);
  }
});

// Sort by Price
sortBy.addEventListener('change', () => {
  let sortedProducts = [...productsData];

  if (sortBy.value === 'low-to-high') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'high-to-low') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(sortedProducts);
});

// Add to Cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const product = productsData.find(product => product.id === id);

  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
}
