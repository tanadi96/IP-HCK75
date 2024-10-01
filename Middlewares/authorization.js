const { User, Type, Lodging } = require("../models");
async function authorization(req, res, next) {
  try {
    if (req.user.role === "Admin") {
      next();
    } else {
      const user = req.user.id;
      const lodging = req.params.id;

      const data = await Lodging.findByPk(lodging);
      if (!data) {
        throw { name: "NotFound" };
      }
      if (user !== data.UserId) {
        throw { name: "Forbidden" };
      }
      next();
    }
  } catch (error) {
    console.log(error,"ini autho");
    
    next(error);
  }
}

module.exports = authorization;
