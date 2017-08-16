
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env'),
});


const ejs = require('ejs');
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const session = require('koa-session');
const views = require('koa-views');


const app = new Koa();

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// bodyparser
app.use(bodyparser());
// templates
app.use(views(path.join(__dirname, '..', 'client'), {
  map: {
    ejs: 'ejs',
  },
}));

// session middleware
const sessionConfig = {
  key: 'koa:sess',
  maxAge: 86400000,
};
app.use(session(sessionConfig, app));



// route
const route = require('koa-route');
const authCtrl = require('./controllers/auth');
const priceCtrl = require('./controllers/price');

app.use(route.post('/api/v1/auth/local', authCtrl.login));
app.use(route.delete('/api/v1/auth/local', authCtrl.logout));

app.use(route.get('/api/v1/prices/btc', priceCtrl.btc));


// route:resource
const resourceRouter = require('koa-rest-router')({ prefix: '/api/v1' });
const orderRouter = require('./resources/order');

resourceRouter.resource(orderRouter.path, orderRouter);


// views
switch (process.env.NODE_ENV) {
  case 'production':
    app.use(require('koa-static')('client'));
    break;
  default: {
    app.use(require('koa-static')(path.join(__dirname, '..', 'dist', 'client')));

    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config.js');

    const { hotMiddleware, devMiddleware } = require('koa-webpack-middleware');

    const compiler = webpack(webpackConfig);
    const middleware = devMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    });

    app.use(middleware);
    app.use(hotMiddleware(compiler));

    app.use(route.get('*', async (ctx) => {

      const filename = path.join(compiler.outputPath, 'index.ejs');

      const file = await new Promise((resolve, reject) => {
        compiler.outputFileSystem.readFile(filename, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      ctx.set('Content-Type', 'text/html');
      ctx.response.body = ejs.render(file.toString(), {});
    }));


  } break;
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening... to ${PORT}`));
