
const request = require('request-promise');

module.exports.getBTCPrice = async function getBTCPrice() {

  const response = await request({
    url: 'https://api.cryptowat.ch/markets/poloniex/btcusd/price',
    json: true,
  });

  if (!response.result) return null;

  return response.result.price;

};


module.exports.getChartData = async function getChartData() {

  const response = await request({
    url: 'https://api.cryptowat.ch/markets/poloniex/btcusd/ohlc?periods=180',
    json: true,
  });

  return response.result['180'].map((datum) => {
    return {
      "date": datum[0],
      "open": datum[1],
      "high": datum[2],
      "low": datum[3],
      "close": datum[4],
      "volume": datum[5],
    };
  });

};
