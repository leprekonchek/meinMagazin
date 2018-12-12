let cartInits = require('./formCartModal');
let whatToOrder = [];
let $totalPrice = 0;

let _emptyModalData = require('./empty');

function initCart(){
    if (localStorage.getItem("cart") != null) {
        whatToOrder = JSON.parse(localStorage.getItem("cart"));
    }
}

function countProducts() {
    $('.itemsInCart').empty();
    $('.itemsInCart').append(`<span>`).text(whatToOrder.length);
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
        $totalPrice = cartInits.$totalSum;
        $('.modal-body').append($(`<div>`).text("Total: " + $totalPrice + " hrn."));
        $('.modal-footer').append($(`<button type="button" class="btn ml-auto check" data-toggle="#myModal" data-target="#myModal">CHECK OUT</button>`));
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
    let $count = $(this).closest('.quantity');
    //$(this).parent.replaceChild('.quantity', $count + 1);
});

//when we click on minus button
$(document).on('click', '.btn-min', function () {

});

//when we click on remove button
$(document).on('click', '.btn-del', function () {
    $(this).closest('.row').remove();
    whatToOrder.splice(whatToOrder.indexOf(($(this).attr('id'))), 1);
    countProducts();
    if (whatToOrder.length === 0) {
        _emptyModalData._emptyModalData();
        cartInits._emptyInitCart();
    }
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
    $.post('https://nit.tron.net.ua/api/order/add',
        {
            token: 'GO2BUP8afCBLq-InINzE',
            name: $name,
            phone: $tel,
            email: $email,
        },
        function (json, status) {
            if (json.status === 'success') {
                console.log(json);
                console.log('Success');
                whatToOrder.length = 0;
                localStorage.removeItem("cart");
                _emptyModalData._emptyModalData();
                cartInits._sucessOrder();
            } else {
                console.log('Error, try again!' + status + json);
            }
        });
});

module.exports = {initCart, countProducts};