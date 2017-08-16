
const getChartData = require('../helpers/cryptowatch').getChartData;

module.exports.btc = async function btc(ctx) {

  ctx.body = await getChartData();

};
