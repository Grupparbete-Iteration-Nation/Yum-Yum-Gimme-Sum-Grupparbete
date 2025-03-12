async function getProducts() {
    const response = await fetch("https://santosnr6.github.io/Data/yumyumproducts.json");
    const data = await response.json();
    
    console.log(data); // Kolla vad datan innehåller i konsolen

    const container = document.getElementById("main-content");

    // Kontrollera om items finns och är en array
    if (data.items && Array.isArray(data.items)) {
        // Filtrera produkterna med type 'wontons'
        const wontonItems = data.items.filter(item => item.type === 'wonton');
        
        // Om det finns wontons-produkter, visa dem
        if (wontonItems.length > 0) {
            container.innerHTML += `<h5 class="menu-section" id="wontons">WONTONS</h5>`;
            wontonItems.forEach(item => {

                container.innerHTML += `
                <section class="menu-item">
                <div class="name-ingredients">
                    <h3 class="name-item">${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-add">
                    <img src="/assets/images/ta bort meny.png" alt="remove" class="remove-from-cart">
                    <p class="add-number">0</p>
                    <img src="/assets/images/lägg till meny.png" alt="add" class="add-to-cart">
                </div>
                </div>
                <div class="price"><h3>9 SEK</h3></div>
            </section>
                `;
            });
        } else {
            container.innerHTML = "<p>No wontons found.</p>"; // Om inga produkter hittas
        } 
    } else {
        console.error("Data format is incorrect or missing 'items' key.");
    }

        // Kontrollera om items finns och är en array
    if (data.items && Array.isArray(data.items)) {
        // Filtrera produkterna med type 'wontons'
        const dipItems = data.items.filter(item => item.type === 'dip');
        
        // Om det finns wontons-produkter, visa dem
        if (dipItems.length > 0) {
            container.innerHTML += `<h5 class="menu-section" id="dip">DIPS</h5>`;
            dipItems.forEach(item => {
                container.innerHTML += `
                <section class="menu-item">
                <div class="name-ingredients">
                    <h3 class="name-item">${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-add">
                    <img src="/assets/images/ta bort meny.png" alt="remove" class="remove-from-cart">
                    <p class="add-number">0</p>
                    <img src="/assets/images/lägg till meny.png" alt="add" class="add-to-cart">
                </div>
                </div>
                <div class="price"><h3>9 SEK</h3></div>
            </section>
                `;
            });
        } else {
            container.innerHTML = "<p>No dips found.</p>"; // Om inga produkter hittas
        }
    } else {
        console.error("Data format is incorrect or missing 'items' key.");
    }

            // Kontrollera om items finns och är en array
            if (data.items && Array.isArray(data.items)) {
                // Filtrera produkterna med type 'wontons'
                const drinkItems = data.items.filter(item => item.type === 'drink');
                
                // Om det finns wontons-produkter, visa dem
                if (drinkItems.length > 0) {
                    container.innerHTML += `<h5 class="menu-section" id="dryck">DRYCK</h5>`;
                    drinkItems.forEach(item => {
                        container.innerHTML += `
                        <section class="menu-item">
                        <div class="name-ingredients">
                            <h3 class="name-item">${item.name}</h3>
                            <p>${item.description}</p>
                            <div class="menu-add">
                            <img src="/assets/images/ta bort meny.png" alt="remove" class="remove-from-cart">
                            <p class="add-number">0</p>
                            <img src="/assets/images/lägg till meny.png" alt="add" class="add-to-cart">
                        </div>
                        </div>
                        <div class="price"><h3>9 SEK</h3></div>
                    </section>
                        `;

                    });
                } else {
                    container.innerHTML = "<p>No drinks found.</p>"; // Om inga produkter hittas
                }
            } else {
                console.error("Data format is incorrect or missing 'items' key.");
            }


    // Skapa en objekt för att hålla reda på räknarna
    const productCounts = {};

    // Lägg till event listeners för att uppdatera siffran för varje produkt
    const addButtons = document.querySelectorAll('.add-to-cart');
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    const numberDisplays = document.querySelectorAll('.add-number');

    addButtons.forEach((button, index) => {
        productCounts[index] = 0; // Initiera räknaren för varje produkt
        button.addEventListener('click', () => {
            productCounts[index]++;  // Öka räknaren för denna produkt
            numberDisplays[index].textContent = productCounts[index];  // Uppdatera siffran för denna produkt
        });
    });

    removeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (productCounts[index] > 0) {
                productCounts[index]--;  // Minska räknaren för denna produkt
                numberDisplays[index].textContent = productCounts[index];  // Uppdatera siffran för denna produkt
            }
        });
    });
}


getProducts();

