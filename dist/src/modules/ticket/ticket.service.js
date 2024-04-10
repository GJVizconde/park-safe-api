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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicketById = exports.softDeleteTicketStatus = exports.getTicket = exports.generateNewTicket = exports.getAllTickets = void 0;
const prisma_1 = require("../prisma");
const errorResponse_1 = require("../../utils/errorResponse");
const vehicle_service_1 = require("../vehicle/vehicle.service");
const DateTime_1 = require("../../utils/DateTime");
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('es');
const getAllTickets = (active, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tickets = yield prisma_1.prisma.ticket.findMany({
            where: Object.assign(Object.assign({}, (active === true && {
                isDelete: false
            })), (userId && {
                user: {
                    id: userId
                }
            })),
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                collaborators: {
                    select: {
                        name: true
                    }
                },
                vehicle: {}
            }
        });
        tickets = tickets.map((ticket) => {
            return Object.assign(Object.assign({}, ticket), { checkInFormatted: (0, moment_1.default)(ticket.checkIn).format('LLLL') });
        });
        return tickets;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_GET_TICKETS');
    }
});
exports.getAllTickets = getAllTickets;
const generateNewTicket = (body, timeZoneOffset) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const localDateTime = (0, DateTime_1.localTime)(timeZoneOffset);
    try {
        const user = yield prisma_1.prisma.ticket.findFirst({
            where: {
                userId: body.userId,
                isDelete: false
            }
        });
        if (user)
            throw new Error('User already has a ticket');
        const vehicle = yield (0, vehicle_service_1.getAllVehicles)(body.vehicleId);
        const isExistVehicle = yield prisma_1.prisma.ticket.findFirst({
            where: {
                vehicle: {
                    licensePlate: vehicle ? (_a = vehicle[0]) === null || _a === void 0 ? void 0 : _a.licensePlate : ''
                },
                isDelete: false
            }
        });
        if (isExistVehicle)
            throw new Error('Vehicle is already assign to a ticket');
        const newTicket = yield prisma_1.prisma.ticket.create({
            data: {
                userId: body.userId,
                vehicleId: body.vehicleId,
                parkingId: body.parkingId,
                checkIn: localDateTime,
                collaborators: {
                    connect: {
                        id: Number(body.collaboratorId) // ID del usuario que deseas conectar al vehículo
                    }
                }
            }
        });
        const statusParking = yield prisma_1.prisma.parking.update({
            where: {
                id: body.parkingId
            },
            data: {
                available: false
            }
        });
        return {
            newTicket,
            statusParking
        };
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_REGISTER_TICKET');
    }
});
exports.generateNewTicket = generateNewTicket;
const getTicket = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield prisma_1.prisma.ticket.findFirst({
            where: {
                userId: id,
                isDelete: false
            },
            include: {
                user: {},
                vehicle: {},
                collaborators: {}
            }
        });
        return ticket;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_GET_TICKET_ID');
    }
});
exports.getTicket = getTicket;
const softDeleteTicketStatus = (id, timeZoneOffset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const localDateTime = (0, DateTime_1.localTime)(timeZoneOffset);
        let ticket = yield prisma_1.prisma.ticket.update({
            where: {
                id: id
            },
            data: {
                isDelete: true,
                checkOut: localDateTime,
                parking: {
                    update: {
                        available: true
                    }
                }
            }
        });
        ticket = Object.assign(Object.assign({}, ticket), { checkOutFormatted: (0, moment_1.default)(ticket.checkOut).format('LLLL') });
        return ticket;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_LOGIC_DELETE_TICKET');
    }
});
exports.softDeleteTicketStatus = softDeleteTicketStatus;
const deleteTicketById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //TODO:Verificar si existe el ticket, manejar ese error
        const ticket = yield prisma_1.prisma.ticket.delete({
            where: {
                id
            }
        });
        return ticket;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_DELETE_TICKET');
    }
});
exports.deleteTicketById = deleteTicketById;
