let _fillModal = ({
                      id,
                      name,
                      description,
                      image_url,
                      price,
                      special_price,
                  }) => {
    $(`<div></div>`).text(name).appendTo(".modal-title");
    $(`<img src="${image_url}" alt="${name}" class="w-100 modImg">`).appendTo(".modal-image");
    if (special_price !== null) {
        $(`<div class="discount">`).text(price + " hrn.").appendTo(".modal-price");
        $(`<div class="price_discount">`).text("Price: " + special_price + " грн.").appendTo(".modal-price");
    } else {
        $(`<div class="">⠀</div>`).appendTo(".modal-price");
        $(`<div class="price">`).text("Price: " + price + " hrn.").appendTo(".modal-price");
    }
    $(`<button type="button" class="btn btn-link" data-toggle="collapse" data-target="#descrp">Description</button>`).appendTo(".modal-description");
    $(`<div class="collapse description" id="descrp"></div>`).text(description).appendTo(".modal-description");
    $(`<button type="button" class="btn buy mr-auto" id="${id}">BUY</button>`).appendTo(".modal-footer");
    $(`<button type="button" class="btn btn-outline-danger" data-dismiss="modal">Close</button>`).appendTo('.modal-footer');
};

module.exports = _fillModal;