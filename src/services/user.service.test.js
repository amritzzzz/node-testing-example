const assert = require("chai").assert;
const UserService = require("./user.service");

describe("UserService", function() {
  const userService = new UserService();
  
  describe("getAll", function() {
    it("has length of 10", function() {
      const users = userService.getAll();
      assert.lengthOf(users, 10);
    });

    it("first user is named 'Micky'", function() {
      const users = userService.getAll();
      assert.equal(users[0].first_name, "Micky");
    });
  });

  describe("get", function() {
    it("with id 2 returns first_name = 'Jeromy'", function() {
      const user = userService.get(2);
      assert.equal(user.first_name, "Jeromy");
    });

    it("with id 5 returns last_name = 'Holliar'", function() {
      const user = userService.get(5);
      assert.equal(user.last_name, "Holliar");
    });

    it("with id 0 returns undefined", function() {
      const user = userService.get(0);
      assert.deepEqual(user, {});
    });
  });

  describe("getGenderByUserId", function() {
    it("with id 1 returns 6 users and all are male", function() {
      const users = userService.getGenderByUserId(1);
      assert.lengthOf(users, 6);
      const maleUsers = users.filter(u => u.gender == "Male");
      assert.lengthOf(maleUsers, 6);
    });

    it("with id 5 returns 4 female users", function() {
      const users = userService
        .getGenderByUserId(5)
        .filter(u => u.gender == "Female");
      assert.lengthOf(users, 4);
    });

    it("with id 0 returns empty array", function() {
      const user = userService.getGenderByUserId(0);
      assert.deepEqual(user, []);
    });
  });
});
