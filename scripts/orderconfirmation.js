function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomizeOrderNumber() {
    const orderNumber = document.querySelector(".order-number")
    orderNumber.innerHTML = '#' + random(1000, 9999)

    return orderNumber
}