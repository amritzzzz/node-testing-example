const data = require("../../data");

class UserService {
  get(_id) {
    const allUsers = this.getAll();
    const user = allUsers.find(user => user.id == _id);
    return user ? user : {};
  }

  getAll() {
    return data.Users;
  }

  getGenderByUserId(_id) {
    const allUsers = this.getAll();
    const user = this.get(_id);

    return allUsers.filter(u => u.gender === user.gender);
  }
}
module.exports = UserService;
