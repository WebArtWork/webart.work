// Adding product to cart
function addToCart(target) {
    fetch('/api/product/get', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: target.dataset.product})
    })
    .then(res => res.json())
    .then(res => {
        if (res != false) {
            var cart = getCart();
            if (!cart[res.product]) {
                cart[res.product] = 1;
                target.innerHTML = 'In cart';
            } else window.location.href = '/cart';
            setCart(cart);
        }
    })
}
