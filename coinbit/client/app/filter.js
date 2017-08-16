
function _convertNumberToCurrency(number) {

  let negative = false;
  let currency = number.toString();

  if (currency < 0) {
    negative = true;
    currency = currency.replace(/\-/g, '');
  }

  currency = currency.replace(/(?!^)(?=(?:\d{3})+$)/g, ',');

  return negative ? `-${currency}` : currency;
}

export function convertNumberToCurrency() {
  return function (input, float = false) {
    if (float) {
      input = Math.floor(input);
    }

    return angular.isDefined(input) ? _convertNumberToCurrency(input) : '';
  };
}
