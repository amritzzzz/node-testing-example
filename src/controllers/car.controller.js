const carService = require("../services/car.service");

class CarController {
  constructor(carService) {
    this.carService = carService;
  }

  async get(req, res) {
    res.send(await this.carService.get(req.params._id));
  }

  async getAll(req, res) {
    res.send(await this.carService.getAll());
  }

  getCarsYearsGreaterThanCarId(req, res) {
    this.carService.getCarsYearsGreaterThanCarId(req.params._id).then(data => {
      res.send(data);
    });
  }
}
module.exports = CarController;
