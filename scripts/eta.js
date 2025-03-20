const eta = document.querySelector('.eta')

// Hämta arrayen från localStorage
let storedArray = localStorage.getItem('cart');

// Omvandla från JSON till en vanlig array
let parsedArray = JSON.parse(storedArray);

if (parsedArray && Array.isArray(parsedArray)) {
    // Summera alla "count"-värden i arrayen
    const totalCount = parsedArray.reduce((sum, item) => sum + (item.count || 0), 0);

    console.log(`Totalt antal: ${totalCount}`);

    // Beräkna tiden baserat på totalCount
    let timeEstimate;
    if (totalCount < 3) timeEstimate = '10 min';
    else if (totalCount < 5) timeEstimate = '20 min';
    else if (totalCount < 7) timeEstimate = '30 min';
    else if (totalCount < 9) timeEstimate = '40 min';
    else timeEstimate = '60 min';

    console.log(timeEstimate);
    eta.innerHTML = timeEstimate

} else {
    console.log("Arrayen finns inte eller är tom.");
}



