const ApiController = require("../Controllers/apiController");

const Controller = require("../Controllers/Controllers");
const plantController = require("../Controllers/plantController");
const authentication = require("../Middlewares/authentication");
const errorHandler = require("../Middlewares/errorhandler");

const router = require("express").Router();




router.post("/register",Controller.register);
router.post("/login",Controller.login);
router.get("/api",ApiController.cuaca)

router.use(authentication)
router.use('/plants', require('./plant'))
router.use('/types', require('./type'))
router.use(errorHandler)
module.exports = router