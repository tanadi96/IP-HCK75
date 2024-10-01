const express = require("express");
const plant = require("express").Router();
const plantController= require('../controllers/lodgingController')
const authorization = require("../middlewares/authorization")
const guardAdmin = require("../middlewares/guardAdmin");
const authentication = require("../middlewares/authentication");


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// lodging.use(authorization)

plant.get("/", lodgingController.getallPlant);
plant.post("/", plantController.postallPlant);
plant.get("/:id", plantController.plantById);
plant.put("/:id",authorization,plantController.editPlant);
plant.patch("/:id/",authorization, upload.single('imageUrl'), plantController.pathPlant)
plant.delete("/:id",authorization, plantController.deletePlant);

module.exports = plant;