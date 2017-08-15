
const path = require('path');

// key is located in kuicsctf2017/.env
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '.env'),
});

const Koa = require('koa');
const route = require('koa-route');
const bodyparser = require('koa-bodyparser');
const views = require('koa-views');

const middleware = require('./middleware');
const ctrl = require('./controller');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(require('koa-static')('client'));

// bodyparser
app.use(bodyparser());
// templates
app.use(views(path.join(__dirname, '..', 'client'), {
  map: {
    ejs: 'ejs',
  },
}));


// session middleware
app.use(middleware.getUserFromDB);

// controllers
app.use(route.post('/login', ctrl.login));
app.use(route.get('/logout', ctrl.logout));
app.use(route.get('/me', ctrl.me));


app.listen(process.env.PORT_WEB_EASY_PLUS);