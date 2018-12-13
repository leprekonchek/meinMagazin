import './scss/main.scss';
import $ from 'jquery';
import './modules/cart';

window.jQuery = $;
window.$ = $;

let _htmlIt = require('./modules/product-html');
let _mod = require('./modules/module');
let _text = require('./modules/whoWeAre');
let _empty = require('./modules/empty');
let cartInits = require('./modules/cart');

//filling the product grid
function _fillAllProducts() {
    $.get('https://nit.tron.net.ua/api/product/list', json => {
        json.forEach(product => $('.product-grid').append(_htmlIt._makeProduct(product)));
    });
};

_fillAllProducts();

//filling the categories list
$.get('https://nit.tron.net.ua/api/category/list', json => {
    json.forEach(category => $('.dropdown-menu').append(_htmlIt._makeCategory(category)));
});

//when we click on home button
$(document).on('click', '.home', function () {
    _empty._emptyPage();
    _fillAllProducts();
});

//when we click on info about company
$(document).on('click', '.we', function () {
    ($(_text())).appendTo('#mainPage');
    _empty._emptyPage();
    ($(_text())).appendTo('#mainPage');
});

// when we click on products for more info
$(document).on('click', '.showMod', function () {
    let num = $(this).attr('id');
    $.get('https://nit.tron.net.ua/api/product/' + num, json => {
        _empty._emptyModalData();
       // cartInits._fillCartModal(json, 1);
        _mod(json);
    });
});

//when we click on categories
$(document).on('click', '.dropdown-item', function () {
    let data_id = $(this).attr('id');
    $.get('https://nit.tron.net.ua/api/product/list/category/' + data_id, json => {
        _empty._emptyPage();
        json.forEach(product => $('.product-grid').append(_htmlIt._makeProduct(product)));
    });
});

cartInits.initCart();