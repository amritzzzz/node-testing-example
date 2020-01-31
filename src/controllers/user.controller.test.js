const assert = require("chai").assert;
const sinon = require("sinon");
const UserController = require("./user.controller");
const UserService = require("../services/user.service");
const userData = require("../../data").Users;

describe("UserController", function() {
  let res;
  let userService;
  let userController;

  this.beforeEach(() => {
    res = { send: function() {} };
    userService = new UserService();
    userController = new UserController(userService);
  });
  
  describe("get", function() {
    let getStub;
    let mock;

    beforeEach(() => {
      mock = sinon.mock(res);
      getStub = sinon.stub(userService, "get").callThrough();
    });

    it("user with id 1 and first_name is 'Micky'", function() {
      const mockValue = {
        id: 1,
        first_name: "Micky",
        last_name: "Messruther",
        email: "mmessruther0@dmoz.org",
        gender: "Male"
      };
      mock
        .expects("send")
        .once()
        .withExactArgs(mockValue);

      const req = { params: { _id: 1 } };

      userController.get(req, res);
      assert.isTrue(getStub.calledOnce);
      assert.equal(getStub.returnValues[0].first_name, "Micky");
      mock.verify();
    });
    
    it("user with id 0 returns empty object", function() {
      mock
        .expects("send")
        .once()
        .withExactArgs({});

      const req = { params: { _id: 0 } };

      userController = new UserController(userService);
      userController.get(req, res);
      assert.isTrue(getStub.calledOnce);
      assert.deepEqual(getStub.returnValues[0], {});
      mock.verify();
    });
  });

  describe("getAll", function() {
    it("should return 10 total users", function() {
      const mock = sinon.mock(res);
      mock
        .expects("send")
        .once()
        .withExactArgs(userData);

      const req = {};

      const getAllStub = sinon.stub(userService, "getAll").callThrough();
      userController.getAll(req, res);

      assert.isTrue(getAllStub.calledOnce);
      assert.lengthOf(getAllStub.returnValues[0], 10);

      mock.verify();
    });
  });

  describe("getAllGendersById", function() {
    let genderStub;
    let mock;

    beforeEach(() => {
      mock = sinon.mock(res);
      genderStub = sinon.stub(userService, "getGenderByUserId").callThrough();
    });

    it("should return 6 users which are all 'Male' when id is 2", function() {
      mock
        .expects("send")
        .once()
        .withExactArgs(userData.filter(u => u.gender == "Male"));

      const req = { params: { _id: 2 } };

      userController.getAllGendersById(req, res);

      assert.isTrue(genderStub.calledOnce);
      assert.lengthOf(genderStub.returnValues[0], 6);

      mock.verify();
    });

    it("should return empty array when id is 0", function() {
      mock
        .expects("send")
        .once()
        .withExactArgs([]);

      const req = { params: { _id: 0 } };

      userController.getAllGendersById(req, res);

      assert.isTrue(genderStub.calledOnce);
      assert.lengthOf(genderStub.returnValues[0], 0);
      assert.typeOf(genderStub.returnValues[0], "Array");

      mock.verify();
    });
  });
});
