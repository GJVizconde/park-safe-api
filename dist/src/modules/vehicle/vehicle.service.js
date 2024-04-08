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
exports.getVehicleByLicense = exports.getVehicleByUser = exports.registerNewVehicle = exports.getAllVehicles = void 0;
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
        console.log('Nuevo Registro');
        console.log('licensePlate => ', body.licensePlate);
        if (yield getVehicleByUser(body === null || body === void 0 ? void 0 : body.user_id, body === null || body === void 0 ? void 0 : body.licensePlate))
            throw new Error('CAR_ALREADY_REGISTER_BY_THIS_USER');
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
                users: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return newVehicle;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_REGISTER_VEHICLE');
    }
});
exports.registerNewVehicle = registerNewVehicle;
const getVehicleByUser = (userId, licensePlate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicle = yield prisma_1.prisma.vehicle.findMany({
            where: Object.assign(Object.assign({}, (licensePlate && {
                licensePlate: licensePlate
            })), { users: {
                    every: {
                        id: Number(userId)
                    }
                } })
        });
        return vehicle[0];
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_GET_VEHICLE_BY_USER_ID');
    }
});
exports.getVehicleByUser = getVehicleByUser;
const getVehicleByLicense = (licenseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicle = yield prisma_1.prisma.vehicle.findMany({
            where: {
                licensePlate: licenseId
            }
        });
        return vehicle[0];
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_GET_VEHICLE_BY_license');
    }
});
exports.getVehicleByLicense = getVehicleByLicense;
