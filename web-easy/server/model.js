
module.exports.database = [{
  // _hashKey: '',
  id: 'admin',
  pw: 'admin!123',
  data: {
    message: `key is "${process.env.KEY_WEB_EASY}"`,
  },
}, {
  id: 'guest',
  pw: 'guest',
  data: {
    message: 'I am a guest',
  },
}];