
export default class TradeController {

  static get $inject() { return ['$scope']; }

  constructor($scope) {
    Object.assign(this, { $scope });
    // $scope.$watch('$ctrl.priceType', () => this.currentPrice = 0);

    this.priceType = 'BTC';

    this.buyAmount = 0;
    this.currentPrice = 4000;
  }

  updateBTCPrice(price) {
    this.currentPrice = price;
  }

}
