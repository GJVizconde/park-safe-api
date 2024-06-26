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
exports.getVehicleByLicensePlate = exports.getVehicleByUserId = exports.registerVehicle = exports.getVehicles = void 0;
const errorResponse_1 = require("../../utils/errorResponse");
const vehicle_service_1 = require("./vehicle.service");
const getVehicles = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ query: { id } }, res) {
    try {
        const vehicles = yield (0, vehicle_service_1.getAllVehicles)(String(id));
        res.status(200).send(vehicles);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getVehicles = getVehicles;
const registerVehicle = (_b, res_2) => __awaiter(void 0, [_b, res_2], void 0, function* ({ body }, res) {
    try {
        const vehicle = yield (0, vehicle_service_1.registerNewVehicle)(body);
        res.status(200).send(vehicle);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.registerVehicle = registerVehicle;
const getVehicleByUserId = (_c, res_3) => __awaiter(void 0, [_c, res_3], void 0, function* ({ params }, res) {
    try {
        const { userId } = params;
        const vehicle = yield (0, vehicle_service_1.getVehicleByUser)(Number(userId));
        res.status(200).send(vehicle);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getVehicleByUserId = getVehicleByUserId;
const getVehicleByLicensePlate = (_d, res_4) => __awaiter(void 0, [_d, res_4], void 0, function* ({ params }, res) {
    try {
        const { licenseId } = params;
        const vehicle = yield (0, vehicle_service_1.getVehicleByLicense)(licenseId);
        res.status(200).send(vehicle);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getVehicleByLicensePlate = getVehicleByLicensePlate;
