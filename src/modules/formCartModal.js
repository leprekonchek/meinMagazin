let _emptyInitCart = () => {
    $(`<div>Your cart is empty</div>`).appendTo(".modal-title");
    $(`<div class="modal-desc">`).appendTo('.modal-body');
    $(`<div class="description">But it is never too late to change this... <br></div>`).appendTo(".modal-desc");
    $(`<video height="200" autoplay loop><source src="https://i.imgur.com/CHoofMM.mp4" type="video/mp4">`).appendTo('.modal-desc');
    $(`<button type="button" class="btn btn-outline-success" data-dismiss="modal">Continue shopping</button>`).appendTo('.modal-footer');
};

let _fillCartModal = ({
                          prod,
                          quantity
                      }) => {
        let $price = 0;
        let $row = $(`<div class="row"></div>`);
        $row.append($(`<img src="${prod.image_url}" class="col-md-3 cartImage">`));
        $row.append($(`<div class="col-md-3 align-middle"></div>`).text(prod.name));
        $price = ((prod.special_price !== null) ? parseFloat(prod.special_price) : parseFloat(prod.price));
        $row.append($(`<div class="text-center col-md-3">`).text($price + " hrn."));
        let $quantity = $(`<div class="col-md-3 reduce_produce_${prod.id}"></div>`);
        $quantity.append($(`<button type="button" class="btn btn-min plus-minus btn-sm" id="${prod.id}">-</button>`));
        $quantity.append($('<span class="quantity">').text(quantity));
        $quantity.append($(`<button type="button" class="btn btn-plus plus-minus btn-sm" id="${prod.id}">+</button>`));
        $quantity.append($(`<button type="button" class="btn btn-del closeIt btn-sm col-md-3" id="${prod.id}">×</button>`));
        $row.append($quantity);
        $row.append(`<br>`);
        $(`<div class="container" id="myCont"></div>`).appendTo('.modal-body');
        $row.appendTo('#myCont');
    }
;

let _initForm = () => {
    $('.modal-title').append($(`<div>Your data</div>`));
    let $form = $(`<div class="form">`);
    let $row1 = $(`<div class="form-group">`);
    $row1.append($(`<label for="inputName" class="col-form-label">Your name</label>`));
    $row1.append($(`<div class=""><input type="text" class="form-control" id="inputName" placeholder="Name"></div>`));
    let $row2 = $(`<div class="form-group">`);
    $row2.append($(`<label for="inputPhone" class="col-form-label">Phone number</label>`));
    $row2.append($(`<div class=""><input type="email" class="form-control" id="inputPhone" placeholder="+380.."></div>`));
    let $row3 = $(`<div class="form-group">`);
    $row3.append($(`<label for="inputEmail" class="col-form-label">Email</label>`));
    $row3.append($(`<div class=""><input type="email" class="form-control" id="inputEmail" placeholder="Email"></div>`));
    let $row4 = $(`<div class="form-group">`);
    $form.append($row1);
    $form.append($row2);
    $form.append($row3);
    $form.append($row4);
    $(`<div class="modal-form"></div>`).appendTo('.modal-body');
    $('.modal-form').append($form);
    $('.modal-body').append(`<div class="errors_here">`);
    $('.modal-footer').append($(`<button type="button" class="btn back-btn">Back</button>`));
    $('.modal-footer').append($(`<button type="submit" class="btn btn-finally-order btn-success ml-auto">Confirm the order</button>`));
};

let _successOrder = () => {
    $(`.modal-title`).append(`<div>Success</div>`);
    $(`.modal-body`).append(`<div>Your order was successfully received! <br> We will get in touch with you soon.</div>`);
    $(`.modal-body`).append(`<video height="200" autoplay loop><source src="https://i.imgur.com/b3vbqzR.mp4" type="video/mp4">`);
};

module.exports = {_emptyInitCart, _fillCartModal, _initForm, _successOrder};