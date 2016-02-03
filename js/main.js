(function(){

  var form = $('#form-checkout');

  form.submit(function(){
    PagSeguroLightbox(this);
    return false;
  })

  $('.product').each(function(){
    var product = $(this);
    var code = product.attr('code');
    console.log(code)

    $('button', product).click(function() {
      $('[name=itemCode]').val(code);
      form.submit();
    })
  })

})();