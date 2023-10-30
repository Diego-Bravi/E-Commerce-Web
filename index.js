const productListDiv = document.getElementById('product-list');
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.categories button');

    categoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            currentCategory = button.getAttribute('data-category');
            fetchAndDisplayProducts(currentCategory);
        });
    });

    productListDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-button')) {
            const productDiv = event.target.closest('.card');
            const product = {
                title: productDiv.querySelector('h2').textContent,
                price: parseFloat(productDiv.querySelector('p').textContent.replace('Price: $', '')), 
            };
            const quantity = parseInt(productDiv.querySelector('.quantity-input').value, 10);
            addToCart(product, quantity);
        }
    });

    fetchAndDisplayProducts(currentCategory);
});

const addToCart = (product, quantity) => {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cartItems.findIndex(item => item.title === product.title);

    if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity += quantity;
    } else {
        cartItems.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
}

const fetchAndDisplayProducts = (category) => {
    let apiUrl = 'https://fakestoreapi.com/products';

    if (category !== 'all') {
        apiUrl += `/category/${category}`;
    }

    fetch(apiUrl)
        .then(res => res.json())
        .then(products => {
            productListDiv.innerHTML = '';

            let rowDiv;

            products.forEach((product, index) => {
                if (index % 3 === 0) {
                    rowDiv = document.createElement('div');
                    rowDiv.classList.add('row');
                    productListDiv.appendChild(rowDiv);
                }

                const productDiv = document.createElement('div');
                productDiv.classList.add('card');
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" />
                    <h2>${product.title}</h2>
                    <h4>Category: ${product.category}</h4>
                    <p>Price: $${product.price}</p>
                    <label for="quantity">Quantity:</label>
                    <input type="number" class="quantity-input" id="quantity" value="1" min="1">
                    <button class="add-to-cart-button"></button>
                `;
                rowDiv.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error:', error));
};