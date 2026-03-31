/*
// Products Data
const products = [
    {id: 1,name:"Shoes", price:1000},
    {id: 2,name:"Bags", price:2000},
    {id: 3,name:"Watches", price:3000}
];
*/

//DOM Elements
const container = document.getElementById("product-container");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Products Data
let products = [];

// Cart Data (load from localStorage)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render Products
function renderProducts(productList) {
    
    if (productList.length === 0) {
        container.innerHTML = "<p>No products found</p>";
        return;
    }

    let html = "";

    productList.forEach(function(item)
    {   
        html += `
            <div class="card">
                <img src="${item.thumbnail}" width="100" />
                <h3>${item.title}</h3>
                <p>Price: ₹${item.price}</p>
                <button onclick="addToCart(${item.id})"> Add to Cart </button>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Add to Cart
function addToCart(id) {
    const product = products.find(function(item){
        return item.id === id;
    });

    if (!product) {
        return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    renderCart();
}

// Update Cart Count
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Render Cart
function renderCart() {
    cartItems.innerHTML = "";
    let html = "";
    cart.forEach(function(item, index) {
        html += `
            <div>
                <p>${item.title} - ₹${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartItems.innerHTML = html;

    // Calculate total using reduce
    const total = cart.reduce(function(sum, item) {
        return sum + item.price;
    }, 0);

    cartTotal.textContent = total;
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    renderCart();
}

// Search
searchInput.addEventListener("input", function(event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredProducts = products.filter(function(item) {
        return item.title.toLowerCase().includes(searchValue);
    });
    renderProducts(filteredProducts);
});

// Fetch Products from API
fetch("https://dummyjson.com/products")
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        products = data.products;
        renderProducts(products);
    })
    .catch(function(error) {
        console.log("Error fetching data:", error);
        container.innerHTML = "<p>Failed to load products</p>";
    });

// Initialize cart UI on load
updateCartCount();
renderCart();