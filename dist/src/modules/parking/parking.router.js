"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parking_controller_1 = require("./parking.controller");
const ParkingRouter = (0, express_1.Router)();
ParkingRouter.get('/', parking_controller_1.getParkingPlaces);
ParkingRouter.post('/register', parking_controller_1.registerNewPlace);
exports.default = ParkingRouter;
