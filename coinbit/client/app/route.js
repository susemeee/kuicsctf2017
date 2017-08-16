
import * as views from './views';

export function routeConfig($stateProvider) {

  $stateProvider
  .state('root', { abstract: true })
  .state('root.main', {
    url: '/',
    views: views.MainView,
  })
  .state('root.login', {
    url: '/login',
    views: views.LoginView,
  })
  .state('root.trades', {
    url: '/trades',
    abstract: true,
  })
  .state('root.trades.btc', {
    url: '/btc',
    component: 'tradeView',
  })
  .state('root.trades.eth', {
    url: '/eth',
    component: 'tradeView',
  })
  .state('root.trades.etc', {
    url: '/etc',
    component: 'tradeView',
  })
  .state('root.trades.xrp', {
    url: '/xrp',
    component: 'tradeView',
  })

}

angular.module('CoinBitRoute', [])
.config(routeConfig);
