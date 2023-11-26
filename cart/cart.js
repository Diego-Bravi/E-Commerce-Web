document.addEventListener('DOMContentLoaded', () => {
    
    const cartItemsTableBody = document.querySelector('#cart-items tbody');
    const cartTotalDiv = document.getElementById('cart-total');
    const completeButton = document.getElementById('complete-button');
    const cancelButton = document.getElementById('cancel-button');

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    let cartTotal = 0;

    cartItemsTableBody.innerHTML = '';

    function renderCartItem(item, index) {
        const itemPrice = item.price;
        const itemTotal = itemPrice * item.quantity;
        cartTotal += itemTotal;

        const itemRow = document.createElement('tr');
        itemRow.innerHTML = `
            <td>${item.title}</td>
            <td>${item.quantity}</td>
            <td>$${itemPrice.toFixed(2)}</td>
            <td><button class="delete-button" data-index="${index}"><img src="/assets/delete.png" style="width: 20px; height: 20px;"></button></td>
        `;

        itemRow.querySelector('.delete-button').addEventListener('click', deleteClick);

        cartItemsTableBody.appendChild(itemRow);
    }

    function deleteClick(event) {
        const indexToRemove = event.target.getAttribute('data-index');


        cartItems.splice(indexToRemove, 1);

        updateCart();

        cartTotal = calculateCartTotal(cartItems);
        cartTotalDiv.textContent = `Total: $${cartTotal.toFixed(2)}`;
    }


    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        cartItemsTableBody.innerHTML = '';
        cartItems.forEach(renderCartItem);
    }


    cartItems.forEach(renderCartItem);


    cartTotalDiv.textContent = `Total: $${cartTotal.toFixed(2)}`;


    completeButton.addEventListener('click', completeClick);


    function completeClick() {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;


        if (name === '' || address === '' || city === '' || zip === '') {
            alert('Por favor, complete todos los campos de información antes de completar la compra.');
        } else {

            cartItems.length = 0;
            updateCart();
            

            resetInputFields();

            cartTotal = 0;
            cartTotalDiv.textContent = `Total: $${cartTotal.toFixed(2)}`;
        }
    }


    cancelButton.addEventListener('click', cancelClick);


    function cancelClick() {
        cartItems.length = 0;
        updateCart();

        resetInputFields();

        cartTotal = 0;
        cartTotalDiv.textContent = `Total: $${cartTotal.toFixed(2)}`;
    }

  
    function calculateCartTotal(items) {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

   
    function resetInputFields() {
        document.getElementById('name').value = '';
        document.getElementById('address').value = '';
        document.getElementById('city').value = '';
        document.getElementById('zip').value = '';
    }
});