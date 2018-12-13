let cartInits = require('./formCartModal');
let whatToOrder = [];
let $totalPrice = 0;

let _emptyModalData = require('./empty');

function initCart() {
    if (localStorage.getItem("cart") != null) {
        whatToOrder = JSON.parse(localStorage.getItem("cart"));
    }
}

function countProducts() {
    $('.itemsInCart').empty();
    let $count = 0;
    for (let i in whatToOrder) {
        $count += whatToOrder[i].quantity;
    }
    $('.itemsInCart').text($count);
}

function countTotalSum() {
    $totalPrice = 0;
    for (let i in whatToOrder) {
        $totalPrice += Number(whatToOrder[i].prod.special_price === null ? whatToOrder[i].prod.price : whatToOrder[i].prod.special_price) * Number(whatToOrder[i].quantity);
    }

    $('.totPrice').remove();
    if (whatToOrder.length !== 0)
        $('.modal-total').append($(`<div class="totPrice">`).text("Total: " + $totalPrice + " hrn."));
}

function updateLocalCart() {
    localStorage.setItem("cart", JSON.stringify(whatToOrder));
}

function fillCart() {
    if (whatToOrder.length === 0) {
        cartInits._emptyInitCart();
    } else {
        $('.modal-title').append($(`<div>Your cart</div>`));
        whatToOrder.forEach(order => {
            cartInits._fillCartModal(order);
        });
        $('.modal-footer').append($(`<button type="button" class="btn ml-auto check" data-toggle="#myModal" data-target="#myModal">CHECK OUT</button>`));
        countTotalSum();
        countProducts();
    }
    updateLocalCart();
}

//add to cart
function _addToCart(product, prid) {
    let alreadyNotAdded = true;
    for (let i = 0; i < whatToOrder.length; i++) {
        if (prid === whatToOrder[i].prod.id) {
            whatToOrder[i].quantity++;
            alreadyNotAdded = false;
            break;
        }
    }
    if (alreadyNotAdded)
        whatToOrder.push({prod: product, quantity: 1});
    countProducts();
    updateLocalCart();
}

//when we click on cart
$(document).on('click', '.mycart', function () {
    _emptyModalData._emptyModalData();
    fillCart();
});

//when we click on button 'buy'
$(document).on('click', '.buy', function () {
    let product_id = $(this).attr('id');
    $.get('https://nit.tron.net.ua/api/product/' + product_id, json => {
        _addToCart(json, product_id);
    });
});

//when we click on 'check out' button
$(document).on('click', '.check', function () {
    _emptyModalData._emptyModalData();
    cartInits._initForm();
});

//when we click on 'back' button
$(document).on('click', '.back-btn', function () {
    _emptyModalData._emptyModalData();
    fillCart();
});


//when we click on plus button
$(document).on('click', '.btn-plus', function () {
    let product_id = ($(this).attr('id'));
    let $quan = 0;
    for (let i in whatToOrder)
        if (whatToOrder[i].prod.id === product_id) {
            whatToOrder[i].quantity += 1;
            $quan = whatToOrder[i].quantity;
        }
    let $that = '.reduce_produce_' + product_id;
    $($that).find('.quantity').text($quan);
    countProducts();
    countTotalSum();
    updateLocalCart();
});

//when we click on minus button
$(document).on('click', '.btn-min', function () {
    let product_id = ($(this).attr('id'));
    let $quan = 0;
    for (let i in whatToOrder)
        if (whatToOrder[i].prod.id === product_id) {
            whatToOrder[i].quantity -= 1;
            if (whatToOrder[i].quantity === 0) {
                $(this).closest('.row').remove();
                whatToOrder.splice(i, 1);
                if (whatToOrder.length === 0) {
                    _emptyModalData._emptyModalData();
                    cartInits._emptyInitCart();
                }
            }
            $quan = whatToOrder[i].quantity;
        }
    let $that = '.reduce_produce_' + product_id;
    $($that).find('.quantity').text($quan);
    countProducts();
    countTotalSum();
    updateLocalCart();
});

//when we click on remove button
$(document).on('click', '.btn-del', function () {
    $(this).closest('.row').remove();
    let product_id = ($(this).attr('id'));
    for (let i in whatToOrder)
        if (whatToOrder[i].prod.id === product_id)
            whatToOrder.splice(i, 1);
    countProducts();
    if (whatToOrder.length === 0) {
        _emptyModalData._emptyModalData();
        cartInits._emptyInitCart();
    }
    countTotalSum();
    updateLocalCart();
});

//when we click on 'confirm the order' button
$(document).on('click', '.btn-finally-order', function () {
    let $name = $('#inputName').val();
    let $email = $('#inputEmail').val();
    let $tel = $('#inputPhone').val();
    let $data = {
        token: 'GO2BUP8afCBLq-InINzE',
        name: $name,
        phone: $tel,
        email: $email,
    };
    whatToOrder.forEach(order => {
        $data[`products[${order.prod.id}]`] = order.quantity;
    });

    $.post('https://nit.tron.net.ua/api/order/add', $data, json => {
        if (json.status === 'success') {
            whatToOrder.length = 0;
            localStorage.removeItem("cart");
            countTotalSum();
            _emptyModalData._emptyModalData();
            cartInits._successOrder();
        } else {
            $('.errors_here').empty().append($(`<span class="price_discount">ERROR</span>`));
            for (let i in json.errors) {
                json.errors[i].forEach(err => $('.errors_here').append($(`<span class="d-block my-2">`).text(err)));
            }
        }
    });
});

module.exports = {initCart, countProducts};