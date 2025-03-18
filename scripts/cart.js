document.addEventListener('DOMContentLoaded', async () => {
    const cartContainer = document.getElementById("cart-container");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kontrollera om varukorgen är tom
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Din beställning är tom</p>';
        return;
    }

    let totalPrice = 0; // Totalt pris

    // Loopa igenom produkterna i varukorgen och skapa HTML
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.count;
        totalPrice += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <h3 class="cart-item__name">${item.name}</h3>
                <div class="cart-item__price">${item.price} SEK</div>
                <div class="cart-item__quantity">
                    <img src="/assets/images/ta bort meny.png" alt="Minska antal" class="remove-from-cart" data-index="${index}">
                    <span>${item.count}</span>
                    <img src="/assets/images/lägg till meny.png" alt="Öka antal" class="add-to-cart" data-index="${index}">
                </div>
            </div>
        `;
    });

    // Visa totalpris
    cartContainer.innerHTML += `
        <div class="cart-total">
            <h3>Att betala:</h3>
            <p>${totalPrice} SEK</p>
        </div>
    `;

    // Lägg till event listeners för att uppdatera antal
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            cart[index].count++;
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload(); // Uppdaterar sidan
        });
    });

    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            if (cart[index].count > 1) {
                cart[index].count--;
            } else {
                cart.splice(index, 1); // Tar bort produkten om antal blir 0
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload(); // Uppdaterar sidan
        });
    });
});
