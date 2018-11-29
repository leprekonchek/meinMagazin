let initCart = () => {
    ($(`<div>Your cart is empty</div>`)).appendTo(".modal-title");
    ($(`<div class="description">But it is never too late to change this...</div>`)).appendTo(".modal-body");
};

module.exports = initCart;