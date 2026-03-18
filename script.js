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
            <button onclick="addToCart(${item.id})"> Add to Cart    </button>
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
}

function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

