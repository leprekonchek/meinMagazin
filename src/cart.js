import $ from "jquery";

function _emptyModalData() {
    $('.modal-title').empty();
    $('#myCont').empty();
    $('.modal-image').empty();
    $('.modal-price').empty();
    $('.modal-description').empty();
    $('.modal-footer').empty();
};

let fillCartModal = ({
                         id,
                         name,
                         image_url,
                         description,
                         price,
                         special_price,
                     }) => {
    $(".modal-title").append($('<div>Your cart</div>'));
    let $row = $(`<div class="row"></div>`);
    $row.append($(`<img src="${image_url}" class="col-md-3 imagg">`));
    $row.append($(`<div class="col-md-3"></div>`).text(name));
    if (special_price !== null) {
        let $price = parseFloat(special_price) * parseInt(localStorage.getItem('prod-' + id));
        $row.append($(`<div class="text-center price col-md-3">`).text($price + " hrn."));
    } else {
        let $price = parseFloat(price) * parseInt(localStorage.getItem('prod-' + id));
        $row.append($(`<div class="text-center price col-md-3">`).text($price + " hrn."));
    }
    let $quantity = $(`<div class="col-md-3""></div>`);
    $quantity.append($(`<button type="button" class="btn btn-min about text-center" id="${id}">-</button>`));
    $quantity.append($('<span class="quantity">').text(localStorage.getItem('prod-' + id)));
    $quantity.append($(`<button type="button" class="btn btn-plus about text-center" id="${id}">+</button>`));
    $row.append($quantity);
    $row.append($(`<button type="button" class="btn btn-del about text-center col-md-3" id="${id}">×</button>`));
};

function fillCart() {

    if (!localStorage.cart) {
        localStorage.cart = '';
    }

    let $myCart = localStorage.cart.split('|');

    if ($myCart.length === 1) {
        $(`<div>Your cart is empty</div>`).appendTo(".modal-title");
        $(`<div class="description">But it is never too late to change this...</div>`).appendTo("#myCont");
        $(`<button type="button" class="btn btn-outline-success" data-dismiss="modal">Continue shopping</button>`).appendTo('.modal-footer');
        return;
    }

    $myCart.forEach(product_id => {
        if (product_id === '') return;

        $.get('https://nit.tron.net.ua/api/product/' + product_id, json => {
            fillCartModal(json);
        });
    });
}

//add to cart
function _addToCart(product_id, quantity) {
    if (localStorage.cart == null) {
        localStorage.cart = product_id + "|";
        localStorage.cart.setItem('prod-' + product_id, '1');
    } else if (localStorage.cart.includes(product_id + "|")) {
        let $quant = parseInt(sessionStorage.getItem('prod-' + product_id));
        $quant += quantity;
        localStorage.cart.setItem('prod-' + product_id, $quant + '');
    } else {
        localStorage.cart.setItem('prod-' + product_id, '1');
    }
    console.log(localStorage.cart);
}


//when we click on cart
$(document).on('click', '.mycart', function () {
    _emptyModalData();
    fillCart();
});


//when we click on button 'buy'
$(document).on('click', '.buy', function () {
    let product_id = $(this).attr('id');
    console.log(product_id);
    $.get('https://nit.tron.net.ua/api/product/' + product_id, json => {
        _addToCart('prod-' + product_id, '1');
    });
});