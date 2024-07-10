// Input only numbers
function inputAmount(event) {
    var theEvent = event;
    var key = theEvent.keyCode;
    key = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

// Amount between min and max
function checkAmount(event) {
    if (Number(event.target.value) < Number(event.target.min)) event.target.value = event.target.min;
    if (event.target.max && (Number(event.target.value) > Number(event.target.max))) event.target.value = event.target.max;
}

// Product info
const color_input = document.getElementById('color');
const size_input = document.getElementById('size');
const amount_input = document.getElementById('amount');

// Change amount of product
document.querySelector('.product__info-reduce').addEventListener('click', () => {amount_input.stepDown()});
document.querySelector('.product__info-increase').addEventListener('click', () => {amount_input.stepUp()});

// Select color
for (let color of document.querySelectorAll('.product__info-tag span')) {
    color.addEventListener('click', (e) => {
        var prev_color = document.querySelector('.product__info-tag span[data-color="'+color_input.value+'"]');
        if (color.dataset.available == 'true' && prev_color.dataset.color != color.dataset.color) {
            prev_color.parentElement.classList.remove('active');
            color_input.value = color.dataset.color;
            color.parentElement.classList.add('active');
            size_input.value = '';
            for (let size of document.querySelectorAll('.product__info-size')) size.remove();
            var sizes = JSON.parse(color.dataset.sizes);
            if (sizes?.length) {
                if (sizes.find(s => s.available)) size_input.value = sizes.find(s => s.available)._id;
                for (let size of sizes) {
                    const div = document.createElement('div');
                    div.classList.add('product__info-size');
                    if (size._id == size_input.value) div.classList.add('active');
                    const span = document.createElement('span');
                    span.dataset.size = size._id;
                    span.dataset.available = size.available;
                    span.appendChild(document.createTextNode(size.name));
                    span.addEventListener('click', selectSize);
                    div.appendChild(span);
                    document.querySelector('.product__info-sizes').appendChild(div);
                    document.querySelector('.product__info-sizes').style.display = 'flex';
                }
            } else document.querySelector('.product__info-sizes').style.display = 'none';
        }
    });
}

// Select size
for (let size of document.querySelectorAll('.product__info-size span')) {
    size.addEventListener('click', selectSize);
}

function selectSize(e) {
    var prev_size = document.querySelector('.product__info-size span[data-size="'+size_input.value+'"]');
    if (e.target.dataset.available == 'true' && prev_size.dataset.size != e.target.dataset.size) {
        prev_size.parentElement.classList.remove('active');
        size_input.value = e.target.dataset.size;
        e.target.parentElement.classList.add('active');
    }
}

// Adding product to cart
function addToCart(target) {
    fetch('/api/product/get', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: target.dataset.product,
            color: color_input.value,
            size: size_input.value
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res != false) {
            var cart = getCart();
            if (!cart[res.product]) {
                cart[res.product] = amount_input.value;
                target.innerHTML = 'In shopping bag';
            } else window.location.href = '/cart';
            setCart(cart);
        }
    })
}