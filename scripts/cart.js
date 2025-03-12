
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById("cart-container");
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kontrollera om varukorgen är tom
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
    } else {
        let totalPrice = 0; // För att hålla koll på den totala summan

        cart.forEach(item => {
            const itemTotal = item.price * item.count; // Beräkna priset för varje vara
            totalPrice += itemTotal; // Lägg till det till totalen

            cartContainer.innerHTML += `
                <div class="cart-item">
                    <h3 class="name-item">${item.name}</h3>
                    <p>Pris: ${item.price} SEK</p>
                    <p>Antal: ${item.count}</p>

                </div>
            `;
        });

        // Visa totalen
        cartContainer.innerHTML += `
        <div class="cart-item">
            <h3 class="name-item">Att betala:</h3>
            <p>${totalPrice} SEK</p>
        </div>
        `;
    }
});
