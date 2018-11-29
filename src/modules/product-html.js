let _makeProduct = ({
                        id,
                        name,
                        image_url,
                        description,
                        price,
                        special_price,
                    }) => {
    let $product = $(`<div class="prod col-xs-12 col-sm-4 col-md-3" data-product-id="${id}">`);
    $product.append($(`<div class="imagg"><img src="${image_url}" alt="${name}" class="w-100 h-100"></div>`));
    $product.append($(`<div class="name"><div class="text-center"></div></div>`).text(name));
    if (special_price !== null) {
        $product.append($(`<div class="text-center discount">`).text(price + " грн."));
        $product.append($(`<div class="text-center price_discount">`).text(special_price + " грн."));
    } else {
        $product.append($(`<div class="text-center">⠀</div>`));
        $product.append($(`<div class="text-center price">`).text(price + " грн."));
    }
    $product.append($(`<a href="#" class="btn buy text-center" id="${id}">BUY</a>`));
    $product.append($(`<button type="button" class="btn about text-center" data-toggle="modal" data-target="#myModal" id="${id}">More about...</button>`));
    return $product;
};

let _makeCategory = ({id, name}) => {
   return ($(`<a class="dropdown-item" href="#" id="${id}" ></a>`).text(name));
};

module.exports = {_makeProduct, _makeCategory};