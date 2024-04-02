"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicle_controller_1 = require("./vehicle.controller");
const vehicleRouter = (0, express_1.Router)();
vehicleRouter.get('/', vehicle_controller_1.getVechicles);
vehicleRouter.post('/', vehicle_controller_1.registerVehicle);
exports.default = vehicleRouter;
