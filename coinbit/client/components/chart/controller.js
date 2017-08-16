export default class ChartController {

  static get $inject() { return ['$scope', 'Restangular']; }
  constructor($scope, Restangular) {
    Object.assign(this, { $scope, Restangular });

    this.chartOptions = {
      chart: {
        type: 'candlestickBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 60
        },
        x: function (d) {
          return d['date'];
        },
        y: function (d) {
          return d['close'];
        },
        duration: 100,

        xAxis: {
          tickFormat: function (d) {
            return moment(d).format('MM.DD HH:mm:ss');
          },
          showMaxMin: false
        },

        yAxis: {
          tickFormat: function (d) {
            return '$' + d3.format(',.1f')(d);
          },
          showMaxMin: false
        },
        zoom: {
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }
      }
    };

  }

  $onChanges() {
    this.resource = this.Restangular.one(`prices/${this.priceType}`);
    this.load();
  }

  async load() {

    const _data = await this.resource.get();

    this.chartData = [{
      values: _data,
    }];

    this.$scope.$apply();
  }

}
