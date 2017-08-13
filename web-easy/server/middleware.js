const crypto = require('crypto');
const _ = require('lodash');

const db = require('./model').database;

// gets user from session key, if exists
module.exports.getUserFromDB = async function getUserFromDB(ctx, next) {

  const _sessionKey = ctx.cookies.get('session');
  if (_sessionKey) {

    const _user = _.find(db, (data) => {

      if (!data._hashKey) {
        const _hashKey = crypto.createHash('sha256')
        .update(Buffer.from(`${data.id}|${data.pw}`, 'utf8'))
        .digest('hex');
        
        data._hashKey = _hashKey;
      }

      return data._hashKey === _sessionKey;
    });

    ctx._user = _user;
    await next();

  } else {
    await next();
  }

};
