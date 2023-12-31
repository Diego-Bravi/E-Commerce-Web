const productListDiv = document.getElementById('product-list');
const paginationContainer = document.getElementById('pagination');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const pageNumberSpan = document.getElementById('page-number');

let currentCategory = 'all';
let currentPage = 1;
const productsPerPage = 3;
let totalProducts = 0;

document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.categories button');

    categoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            currentCategory = button.getAttribute('data-category');
            currentPage = 1;
            displayProducts(currentCategory, currentPage);
        });
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts(currentCategory, currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts(currentCategory, currentPage);
        }
    });

    displayProducts(currentCategory, currentPage);
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
};

const displayProducts = (category, page) => {
    let apiUrl = 'https://fakestoreapi.com/products';

    if (category !== 'all') {
        apiUrl += `/category/${category}`;
    }

    fetch(apiUrl)
        .then(res => res.json())
        .then(products => {
            totalProducts = products.length;

            const startIndex = (page - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;

            const paginatedProducts = products.slice(startIndex, endIndex);

            productListDiv.innerHTML = '';
            let rowDiv;

            paginatedProducts.forEach((product, index) => {
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

                const addToCartButton = productDiv.querySelector('.add-to-cart-button');
                addToCartButton.addEventListener('click', () => {
                    const quantityInput = productDiv.querySelector('.quantity-input');
                    const quantity = parseInt(quantityInput.value, 10);
                    addToCart(product, quantity);
                });
            });

            updatePagination();
        })
        .catch(error => console.error('Error:', error));
};

const updatePagination = () => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    pageNumberSpan.textContent = currentPage;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
};
