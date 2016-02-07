var Pagseguro = function() {

  var form = $('#form-checkout');

  form.submit(function(){
    PagSeguroLightbox(this);
    return false;
  })

  function buy(code) {
    $('[name=itemCode]', form).val(code);
    form.submit();
  }


  //public
  this.buy = buy;

};