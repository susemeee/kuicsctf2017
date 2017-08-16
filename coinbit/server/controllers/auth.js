

module.exports.login = async function login(ctx) {

};


module.exports.logout = async function logout(ctx) {
  ctx.session = null;
};
