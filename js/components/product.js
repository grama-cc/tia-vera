var Product = function(dom) {

  var product = $(dom);
  var codes = attrToArray(product.attr('code'));
  var price = product.attr('price');
  var quantity = 1;

  $('[remove]', product).click(function() {
    quantity--;
    if (quantity < 1) {
      quantity = 1;
    }
    render();
  });

  $('[add]', product).click(function() {
    quantity++;
    if (quantity > 3) {
      quantity = 3;
    }
    render();
  });

  $('[buy]', product).click(function() {
    Pagseguro.buy(codes[quantity-1]);
  });

  function render() {
    $('[quantity]', product).text(quantity);
    $('[price]', product).text(formatMoney(price*quantity));
  }

  function formatMoney(value) {
    return Number(value).toFixed(2).replace('.', ',')
  }

  function attrToArray(attr) {
    var array = [];
    attr.split(',').map(function(item, index) {
      array.push(item.replace(/\s/g, ''));
    });
    return array;
  }
};