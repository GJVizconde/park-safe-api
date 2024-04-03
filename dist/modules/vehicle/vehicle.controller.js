"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleByUserId = exports.registerVehicle = exports.getVechicles = void 0;
const errorResponse_1 = require("../../utils/errorResponse");
const vehicle_service_1 = require("./vehicle.service");
const getVechicles = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Estoy en getVechiclesController');
        const vehicles = yield (0, vehicle_service_1.getAllVehicles)();
        res.status(200).send(vehicles);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getVechicles = getVechicles;
const registerVehicle = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ body }, res) {
    try {
        const vehicle = yield (0, vehicle_service_1.registerNewVehicle)(body);
        res.status(200).send(vehicle);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.registerVehicle = registerVehicle;
const getVehicleByUserId = (_b, res_2) => __awaiter(void 0, [_b, res_2], void 0, function* ({ params }, res) {
    try {
        const { id } = params;
        console.log('Estoy en getVehicleByUserId');
        const vehicle = yield (0, vehicle_service_1.getVehicle)(Number(id));
        res.status(200).send(vehicle);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getVehicleByUserId = getVehicleByUserId;
