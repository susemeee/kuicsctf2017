const crypto = require('crypto');
const _ = require('lodash');

const db = require('./model').database;

module.exports.login = async function login(ctx) {

  if (ctx.header['X-Requested-With'.toLowerCase()] !== 'XMLHttpRequest') {
    return ctx.body = JSON.stringify({ success: false, message: 'I need ajax' });
  }

  const [ id, pw ] = [ ctx.request.body.id, ctx.request.body.password ];
  if (!id || !pw) {
    return ctx.body = JSON.stringify({ success: false, message: '아이디와 비밀번호를 모두 입력해 주세요.' });
  }

  const _user = _.find(db, (data) => data.id === id && data.pw === pw);
  if (!_user) {
    return ctx.body = JSON.stringify({ success: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
  }

  const _hashKey = crypto.createHash('sha256')
  .update(Buffer.from(`${_user.id}|${_user.pw}`, 'utf8'))
  .digest('hex');

  return ctx.body = JSON.stringify({ success: true, s: _hashKey });
};


module.exports.logout = async function logout(ctx) {

  ctx.cookies.set('session', '');
  return await ctx.redirect('/');
  
}


module.exports.me = async function me(ctx) {

  if (!ctx._user) {
    return await ctx.redirect('/');
  }

  ctx.state = {
    user: ctx._user,
  };
  return await ctx.render('me.ejs');

};