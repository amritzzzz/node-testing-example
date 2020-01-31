const data = require("../../data");

class CarService {
  async get(_id) {
    const allCars = await this.getAll();
    const car = allCars.find(car => car.id == _id);
    return car ? car : {};
  }

  async getAll() {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(data.Cars);
      }, 1000);
    });
  }

  async getCarsYearsGreaterThanCarId(_id) {
    const car = await this.get(_id);
    const allCars = await this.getAll();

    return allCars.filter(c => c.year >= car.year);
  }
}
module.exports = CarService;
