const Controller = require("../Controllers/Controllers");
const authentication = require("../Middlewares/authentication");
const errorHandler = require("../Middlewares/errorhandler");

const router = require("express").Router();

Controller

router.post("/register",Controller.register);
router.post("/login",Controller.login);

router.use(authentication)
router.use('/plants', require('./plant'))
router.use('/types', require('./type'))
router.use(errorHandler)
module.exports = router