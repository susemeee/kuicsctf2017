
import Template from './tmpl.html';
import Controller from './controller';

const ChartComponent = {
  bindings: {
    priceType: '@',
  },
  templateUrl: Template,
  controller: Controller,
};

export default ChartComponent;
