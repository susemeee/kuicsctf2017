const crypto = require('crypto');
const _ = require('lodash');

const db = require('./model').database;

module.exports.login = async function login(ctx) {

  const [ id, pw ] = [ ctx.request.body.id, ctx.request.body.password ];
  if (!id || !pw) {
    return ctx.body = '<script>alert(\'아이디와 비밀번호를 모두 입력해 주세요.\');history.go(-1);</script>';
  }

  const _user = _.find(db, (data) => data.id === id && data.pw === pw);
  if (!_user) {
    return ctx.body = '<script>alert(\'아이디 또는 비밀번호가 일치하지 않습니다.\');history.go(-1);</script>';
  }

  const _hashKey = crypto.createHash('sha256')
  .update(Buffer.from(`${_user.id}|${_user.pw}`, 'utf8'))
  .digest('hex');

  ctx.cookies.set('session', _hashKey);
  return await ctx.redirect('/me');

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