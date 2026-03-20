const products = [
    {id: 1,name:"Shoes", price:1000},
    {id: 2,name:"Bags", price:2000},
    {id: 3,name:"Watches", price:3000}
];

let cart=[];

const container = document.getElementById("product-container");

products.forEach(function(item)
{
    const card=`
        <div class="card">
            <h2>${item.name}</h2>
            <p>Price: ₹${item.price}</p>
            <button onclick="addToCart(${item.id})"> Add to Cart </button>
        </div>
    `;
    container.innerHTML += card;
});

function addToCart(id) {
    const product = products.find(function(item){
        return item.id === id;
    });
    cart.push(product);
    updateCartCount();

    renderCart();
}

function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(function(item, index) {
        total += item.price;

        cartItems.innerHTML += `
            <div>
                <p>${item.name} - ₹${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartTotal.textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}