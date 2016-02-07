(function(){

  window.Pagseguro = new Pagseguro();

  $('.product').each(function() {
    new Product(this)
  });

})();