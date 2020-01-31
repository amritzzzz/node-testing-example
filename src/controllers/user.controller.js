class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  get(req, res) {
    res.send(this.userService.get(req.params._id));
  }

  getAll(req, res) {
    res.send(this.userService.getAll());
  }

  getAllGendersById(req, res) {
    res.send(this.userService.getGenderByUserId(req.params._id));
  }
}

module.exports = UserController;
