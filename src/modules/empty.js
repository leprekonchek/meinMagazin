//empty functions
function _emptyModalData() {
    $('.modal-title').empty();
  /*  $('#myCont').empty();
    $('.modal-image').empty();
    $('.modal-price').empty();
    $('.modal-description').empty();
    $('.modal-form').empty();*/
    $('.modal-footer').empty();
    $('.modal-body').empty()
};

function _emptyPage() {
    $('.product-grid').empty();
    $('#weare').empty();
};

module.exports = {_emptyPage, _emptyModalData};