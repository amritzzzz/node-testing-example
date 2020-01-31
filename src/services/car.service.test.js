const assert = require("chai").assert;
const CarService = require("./car.service");

describe("CarService", function() {
  const carService = new CarService();

  describe("getAll", function() {
    it("has length of 15", async function() {
      const cars = await carService.getAll();
      assert.lengthOf(cars, 15);
    });

    it("car with id 14 to be a BMW", async function() {
      const cars = await carService.getAll();
      assert.equal(cars[13].make, "BMW");
    });
  });

  describe("get", async function() {
    it("with id 4 returns a red 1997 Suzuki Swift with vin: SCFEBBAK0CG063107", async function() {
      const car = await carService.get(4);
      const mockCar = {
        id: 4,
        make: "Suzuki",
        model: "Swift",
        year: 1997,
        color: "Red",
        vin: "SCFEBBAK0CG063107"
      };

      assert.deepEqual(car, mockCar);
    });

    it("with id 7 is not a Audi RS3", function() {
      const car = carService.get(7);
      assert.notEqual(car.make, "Audi");
      assert.notEqual(car.model, "RS3");
    });

    it("with id 0 returns undefined", async function() {
      const car = await carService.get(0);
      assert.deepEqual(car, {});
    });
  });

  describe("getGenderByUserId", function() {
    it("with id 5 returns 1 record and year is 2013 - not using async/await", function() {
      return carService.getCarsYearsGreaterThanCarId(5).then(cars => {
        assert.lengthOf(cars, 1);
        assert.equal(cars[0].year, 2013);
      });
    });

    it("with id 10 returns 14 records - not using async/await", function() {
      return carService.getCarsYearsGreaterThanCarId(10).then(cars => {
        assert.lengthOf(cars, 14);
      });
    });

    it("with id 0 returns empty array - not using async/await", function() {
      return carService.getCarsYearsGreaterThanCarId(0).then(cars => {
        assert.deepEqual(cars, []);
      });
    });
  });
});
