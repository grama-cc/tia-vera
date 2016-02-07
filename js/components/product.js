var Product = function(dom) {

  var product = $(dom);
  var code = product.attr('code');
  var price = product.attr('price');
  var quantity = 10;

  $('[remove]', product).click(function() {
    quantity--;
    if (quantity < 10) {
      quantity = 10;
    }
    updateQuantity();
  });

  $('[add]', product).click(function() {
    quantity++;
    updateQuantity();
  });

  $('[buy]', product).click(function() {
    Pagseguro.buy(code);
  });

  function updateQuantity() {
    $('[quantity]', product).text(quantity);
    $('[price]', product).text(formatMoney(price*quantity));
  }

  function formatMoney(value) {
    return Number(value).toFixed(2).replace('.', ',')
  }
};