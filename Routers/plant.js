const express = require("express");
const plant = require("express").Router();
const plantController= require('../Controllers/plantController')
const authorization = require("../Middlewares/authorization")
const guardAdmin = require("../Middlewares/guardAdmin");
const authentication = require("../Middlewares/authentication");




// lodging.use(authorization)

plant.get("/", plantController.getallPlant);
plant.post("/", plantController.postallPlant);
plant.get("/:id", plantController.plantById);
plant.put("/:id",authorization,plantController.editPlant);

plant.delete("/:id",authorization, plantController.deletePlant);

module.exports = plant;