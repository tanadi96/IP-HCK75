const Controller = require("../Controllers/Controllers");
const authentication = require("../middlewares/authentication");

const request = require("express").Router();

Controller

router.post("/register",Controller.register);
router.post("/login",Controller.login);

router.use(authentication)
router.use('/plants', require('./plant'))
router.use('/types', require('./type'))

module.exports = router