
export default class LoginController {

  static get $inject() { return ['Restangular']; }
  constructor(Restangular) {
    Object.assign(this, { Restangular });

    this.resource = Restangular.one('users');
    this.loginData = {
      id: '',
      password: '',
    };
  }

  async doLogin() {

    try {
      const loginResult = await this.resource.customPOST(this.loginData);
    } catch (err) {

    }

  }

}
