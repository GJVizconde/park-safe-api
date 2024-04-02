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
exports.registerNewVehicle = exports.getAllVehicles = void 0;
const prisma_1 = require("../prisma");
const errorResponse_1 = require("../../utils/errorResponse");
const getAllVehicles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield prisma_1.prisma.vehicle.findMany({});
        return vehicles;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_GET_VEHICLES');
    }
});
exports.getAllVehicles = getAllVehicles;
const registerNewVehicle = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                id: Number(body.user_id)
            }
        });
        console.log('USER => ', user);
        if (!user)
            throw new Error('USER NOT FOUND, REGISTER NEW USER');
        const newVehicle = yield prisma_1.prisma.vehicle.create({
            data: {
                licensePlate: body.licensePlate, // Asegúrate de que este sea un ID único
                description: body.description, // Añade la descripción del vehículo aquí si es necesario
                users: {
                    connect: {
                        id: Number(body.user_id) // ID del usuario que deseas conectar al vehículo
                    }
                }
            },
            include: {
                users: {}
            }
        });
        return newVehicle;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_REGISTER_VEHICLE');
    }
});
exports.registerNewVehicle = registerNewVehicle;
