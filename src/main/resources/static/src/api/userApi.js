import axios from 'axios';

class UserApi {
  static loadUser() {
    return axios.get('rest/user/info');
  }

  static loadAllUsers() {
    return axios.get('rest/user/all');
  }

  static addUser(user) {
    return axios.post('rest/user/addUser', user);
  }
}

export default UserApi;
