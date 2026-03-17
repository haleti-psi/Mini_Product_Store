const products = [
    {name:"Shoes", price:1000},
    {name:"Watches", price:3000}
];

const container = document.getElementById("product-container");

products.forEach(function(item)
{
    const card=`
        <div class="card">
            <h2>${item.name}</h2>
            <p>Price: ₹${item.price}</p>
        </div>
    `;
    container.innerHTML += card;
});