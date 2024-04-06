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
exports.registerNewPlace = exports.getParkingPlaces = void 0;
const errorResponse_1 = require("../../utils/errorResponse");
const parking_service_1 = require("./parking.service");
const getParkingPlaces = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ query: { available } }, res) {
    try {
        const parkigPlaces = yield (0, parking_service_1.getAllPlaces)(Boolean(available));
        res.status(200).send(parkigPlaces);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getParkingPlaces = getParkingPlaces;
const registerNewPlace = (_b, res_2) => __awaiter(void 0, [_b, res_2], void 0, function* ({ body }, res) {
    try {
        const newPlace = yield (0, parking_service_1.registerParkingPlace)(body);
        res.status(200).send(newPlace);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.registerNewPlace = registerNewPlace;
