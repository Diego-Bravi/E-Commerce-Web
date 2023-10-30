document.addEventListener('DOMContentLoaded', () => {
    const cartItemsTableBody = document.querySelector('#cart-items tbody');
    const cartTotalDiv = document.getElementById('cart-total');
    const completeButton = document.getElementById('complete-button');
    const cancelButton = document.getElementById('cancel-button');


    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    let cartTotal = 0;

    cartItemsTableBody.innerHTML = '';

    cartItems.forEach(item => {
        const itemPrice = item.price;
        const itemTotal = itemPrice * item.quantity;
        cartTotal += itemTotal;

        const itemRow = document.createElement('tr');
        itemRow.innerHTML = `
            <td>${item.title}</td>
            <td>${item.quantity}</td>
            <td>$${itemPrice.toFixed(2)}</td>
            <td><button class="delete-button"><img src="/assets/delete.png" style="width: 20px; height: 20px;"></button></td>
        `;

        itemRow.querySelector('.delete-button').addEventListener('click', (event) => {
                const indexToRemove = event.target.getAttribute('data-index');

       
                cartItems.splice(indexToRemove, 1);

          
                localStorage.setItem('cart', JSON.stringify(cartItems));

          
                cartItemsTableBody.removeChild(itemRow);

                cartTotal = calculateCartTotal(cartItems);
                cartTotalDiv.textContent = `Total: $${cartTotal.toFixed(2)}`;
            });

        cartItemsTableBody.appendChild(itemRow);
    });


    cartTotalDiv.textContent = `Total: $${cartTotal.toFixed(2)}`;

    completeButton.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;

        if (name === '' || address === '' || city === '' || zip === '') {
            alert('Por favor, complete todos los campos de información antes de completar la compra.');
        } else {
        
            cartItems.length = 0;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            cartItemsTableBody.innerHTML = '';
            cartTotalDiv.textContent = `Total: $0.00`;

            document.getElementById('name').value = '';
            document.getElementById('address').value = '';
            document.getElementById('city').value = '';
            document.getElementById('zip').value = '';
        }
    });

    cancelButton.addEventListener('click', () => {

    
        cartItems.length = 0;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        cartItemsTableBody.innerHTML = '';
        cartTotalDiv.textContent = `Total: $0.00`;
    });

});

function calculateCartTotal(items) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
}