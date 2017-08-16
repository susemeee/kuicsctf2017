

import './vendor.js';
import './app/app.scss';

import * as component from './components';
import * as view from './app/views';
import * as route from './app/route';
import * as filter from './app/filter';
import * as service from './services';


angular.module('CoinBit', [
  'ui.router',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngMaterial',
  'restangular',
  'nvd3',
  'CoinBitService',
  'CoinBitComponent',
  'CoinBitView',
  'CoinBitRoute',
])
// base configuration
.config(function($urlRouterProvider, $locationProvider, $mdThemingProvider, RestangularProvider) {

  RestangularProvider.setBaseUrl('/api/v1');

  $mdThemingProvider.theme('default');
  $locationProvider.html5Mode(true);

  $urlRouterProvider.rule(function($injector, $location) {
    const _path = $location.path();

    // 마지막 글자가 '/' 이면
    if (_path.slice(-1) === '/') {
      // 마지막 글자 제거 후 리턴.
      return _path.slice(0, -1);
    }

  });
})
.filter('currencyFormat', filter.convertNumberToCurrency)
.run(function() {


});
