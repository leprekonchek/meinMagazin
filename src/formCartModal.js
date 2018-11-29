let _fillModal = ({
                      id,
                      name,
                      description,
                      image_url,
                      price,
                      special_price,
                  }) => {
    ($(`<div class="nameMod"></div>`).text(name)).appendTo(".modal-title");
    ($(`<img src="${image_url}" alt="${name}" class="w-100 h-100 imagg">`)).appendTo(".modal-body");
    ($(`<div class="description"></div>`).text(description)).appendTo(".modal-body");
    if (special_price !== null) {
        ($(`<div class="discount">`).text(price + " грн.")).appendTo("modal-body");
        ($(`<div class="price_discount">`).text(special_price + " грн.")).appendTo("modal-body");
    } else {
        ($(`<div class="">⠀</div>`)).appendTo("modal-body");
        ($(`<div class="price">`).text(price + " грн.")).appendTo("modal-body");
    }
};

module.exports = _fillModal;