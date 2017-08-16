
import LoginTemplate from './login/tmpl.html';
import LoginController from './login/controller';

import TradeTemplate from './trade/tmpl.html';
import TradeController from './trade/controller';

import MainTemplate from './main/tmpl.html';
import MainController from './main/controller';


export const LoginView = {
  bindings: {},
  templateUrl: LoginTemplate,
  controller: LoginController,
};

export const TradeView = {
  bindings: {},
  templateUrl: TradeTemplate,
  controller: TradeController,
};

export const MainView = {
  bindings: {},
  templateUrl: MainTemplate,
  controller: MainController,
};

angular.module('CoinBitView', [])
.component('loginView', LoginView)
.component('tradeView', TradeView)
.component('mainView', MainView);
