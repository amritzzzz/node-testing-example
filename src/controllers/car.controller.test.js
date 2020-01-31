const assert = require("chai").assert;
const sinon = require("sinon");
const CarController = require("./car.controller");
const CarService = require("../services/car.service");
const carData = require("../../data").Cars;

describe("CarController", function() {
  let res;
  let carService;
  let carController;

  this.beforeEach(() => {
    res = { send: function() {} };
    carService = new CarService();
    carController = new CarController(carService);
  });

  describe("get", function() {
    let getStub;
    let mock;
    
    beforeEach(() => {
      mock = sinon.mock(res);
      getStub = sinon.stub(carService, "get").callThrough();
    });

    it("should return 1997 Suzuki with id 4", async function() {
      const mockValue = {
        id: 4,
        make: "Suzuki",
        model: "Swift",
        year: 1997,
        color: "Red",
        vin: "SCFEBBAK0CG063107"
      };
      mock
        .expects("send")
        .once()
        .withExactArgs(mockValue);

      const req = { params: { _id: 4 } };

      await carController.get(req, res);
      const results = await getStub.returnValues[0];
      assert.isTrue(getStub.calledOnce);
      assert.equal(results.make, "Suzuki");
      assert.equal(results.year, "1997");

      mock.verify();
    });

    it("car with id 20 returns empty object", async function() {
      mock
        .expects("send")
        .once()
        .withExactArgs({});

      const req = { params: { _id: 20 } };

      carController = new CarController(carService);
      await carController.get(req, res);
      assert.isTrue(getStub.calledOnce);
      assert.deepEqual(await getStub.returnValues[0], {});
      mock.verify();
    });
  });

  describe("getAll", function() {
    it("should return 15 total cars", async function() {
      const mock = sinon.mock(res);
      mock
        .expects("send")
        .once()
        .withExactArgs(carData);

      const req = {};

      const getAllStub = sinon.stub(carService, "getAll").callThrough();
      await carController.getAll(req, res);

      assert.isTrue(getAllStub.calledOnce);
      assert.lengthOf(await getAllStub.returnValues[0], 15);

      mock.verify();
    });
  });
});
