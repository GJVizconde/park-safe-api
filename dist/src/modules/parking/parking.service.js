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
exports.registerParkingPlace = exports.getAllPlaces = void 0;
const prisma_1 = require("../prisma");
const errorResponse_1 = require("../../utils/errorResponse");
const getAllPlaces = (available) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.prisma.parking.findMany({
            where: Object.assign({}, (available && {
                available: available
            }))
        });
        return users;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_GET_PARKING_PLACES');
    }
});
exports.getAllPlaces = getAllPlaces;
const registerParkingPlace = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExist = yield prisma_1.prisma.parking.findFirst({
            where: {
                id: body.id
            }
        });
        if (isExist)
            throw new Error('Parking Place already exist');
        const newParkingPlace = yield prisma_1.prisma.parking.create({
            data: {
                id: body.id
            }
        });
        console.log('Generado nuevo ParkingPlace', newParkingPlace);
        return newParkingPlace;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_REGISTER_NEW_PARKING_PLACE');
    }
});
exports.registerParkingPlace = registerParkingPlace;
