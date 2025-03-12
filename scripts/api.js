async function getProducts() {
    const response = await fetch("https://santosnr6.github.io/Data/yumyumproducts.json");
    const data = await response.json();

    const container = document.getElementById("main-content");
    const productCounts = {}; // För att hålla reda på produkternas antal

    // Kontrollera om items finns och är en array
    if (data.items && Array.isArray(data.items)) {
        // Filtrera produkterna med type 'wonton'
        const wontonItems = data.items.filter(item => item.type === 'wonton');
        if (wontonItems.length > 0) {
            container.innerHTML += `<h5 class="menu-section" id="wontons">WONTONS</h5>`;
            wontonItems.forEach((item, index) => {
                container.innerHTML += `
                <section class="menu-item">
                <div class="name-ingredients">
                    <h3 class="name-item">${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-add">
                    <img src="/assets/images/ta bort meny.png" alt="remove" class="remove-from-cart" data-index="${index}">
                    <p class="add-number">0</p>
                    <img src="/assets/images/lägg till meny.png" alt="add" class="add-to-cart" data-index="${index}">
                </div>
                </div>
                <div class="price"><h3>${item.price} SEK</h3></div>
            </section>
                `;
            });
        }

        // Dips produkter
        const dipItems = data.items.filter(item => item.type === 'dip');
        if (dipItems.length > 0) {
            container.innerHTML += `<h5 class="menu-section" id="dip">DIPS</h5>`;
            dipItems.forEach(item => {
                container.innerHTML += `
                <section class="menu-item">
                <div class="name-ingredients">
                    <h3 class="name-item">${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-add">
                    <img src="/assets/images/ta bort meny.png" alt="remove" class="remove-from-cart" data-index="${data.items.indexOf(item)}">
                    <p class="add-number">0</p>
                    <img src="/assets/images/lägg till meny.png" alt="add" class="add-to-cart" data-index="${data.items.indexOf(item)}">
                </div>
                </div>
                <div class="price"><h3>${item.price} SEK</h3></div>
            </section>
                `;
            });
        }

        // Dryck produkter
        const drinkItems = data.items.filter(item => item.type === 'drink');
        if (drinkItems.length > 0) {
            container.innerHTML += `<h5 class="menu-section" id="dryck">DRYCK</h5>`;
            drinkItems.forEach(item => {
                container.innerHTML += `
                <section class="menu-item">
                <div class="name-ingredients">
                    <h3 class="name-item">${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-add">
                    <img src="/assets/images/ta bort meny.png" alt="remove" class="remove-from-cart" data-index="${data.items.indexOf(item)}">
                    <p class="add-number">0</p>
                    <img src="/assets/images/lägg till meny.png" alt="add" class="add-to-cart" data-index="${data.items.indexOf(item)}">
                </div>
                </div>
                <div class="price"><h3>${item.price} SEK</h3></div>
            </section>
                `;
            });
        }
    }

    // Lägg till event listeners för knapparna
    const addButtons = document.querySelectorAll('.add-to-cart');
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    const numberDisplays = document.querySelectorAll('.add-number');

    // Hämta varukorgens innehåll från localStorage och uppdatera räknarna
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Uppdatera productCounts med de värden som finns i localStorage
    cart.forEach(item => {
        const index = data.items.findIndex(product => product.id === item.id);
        if (index !== -1) {
            productCounts[index] = item.count; // Uppdatera räknaren för denna produkt
            numberDisplays[index].textContent = item.count; // Uppdatera visningen
        }
    });

    addButtons.forEach((button, index) => {
        // Sätt räknaren till det som finns i localStorage, annars sätt till 0
        productCounts[index] = productCounts[index] || 0;

        button.addEventListener('click', () => {
            productCounts[index]++;
            numberDisplays[index].textContent = productCounts[index];

            // Uppdatera localStorage när produkten läggs till
            if (productCounts[index] === 1) {
                addToLocalStorage(data.items[index], productCounts[index]);
            } else {
                updateLocalStorage(data.items[index], productCounts[index]);
            }
        });
    });

    removeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (productCounts[index] > 0) {
                productCounts[index]--;
                numberDisplays[index].textContent = productCounts[index];

                // Ta bort produkten från localStorage om antalet är 0
                if (productCounts[index] === 0) {
                    removeFromLocalStorage(data.items[index]);
                } else {
                    updateLocalStorage(data.items[index], productCounts[index]);
                }
            }
        });
    });
}

function addToLocalStorage(product, count) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex === -1) {
        cart.push({ ...product, count });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateLocalStorage(product, count) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].count = count;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromLocalStorage(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(cart));
}

getProducts();
