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
exports.deleteTicket = exports.softDeleteTicket = exports.getTicketByUserId = exports.generateTicket = exports.getTickets = void 0;
const errorResponse_1 = require("../../utils/errorResponse");
const ticket_service_1 = require("./ticket.service");
const getTickets = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ query: { active, userId } }, res) {
    try {
        const tickets = yield (0, ticket_service_1.getAllTickets)(Boolean(active), Number(userId));
        res.status(200).send(tickets);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getTickets = getTickets;
const generateTicket = (_b, res_2) => __awaiter(void 0, [_b, res_2], void 0, function* ({ body, headers }, res) {
    try {
        const timeZoneOffset = headers['x-timezone-offset'];
        const ticket = yield (0, ticket_service_1.generateNewTicket)(body, String(timeZoneOffset));
        res.status(200).send(ticket);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.generateTicket = generateTicket;
const getTicketByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const ticket = yield (0, ticket_service_1.getTicket)(Number(id));
        res.status(200).send(ticket);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getTicketByUserId = getTicketByUserId;
const softDeleteTicket = (_c, res_3) => __awaiter(void 0, [_c, res_3], void 0, function* ({ params: { id }, headers }, res) {
    try {
        const timeZoneOffset = headers['x-timezone-offset'];
        const ticketStatus = yield (0, ticket_service_1.softDeleteTicketStatus)(id, String(timeZoneOffset));
        res.status(200).send(ticketStatus);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.softDeleteTicket = softDeleteTicket;
const deleteTicket = (_d, res_4) => __awaiter(void 0, [_d, res_4], void 0, function* ({ params: { id } }, res) {
    try {
        const ticket = yield (0, ticket_service_1.deleteTicketById)(id);
        res.status(200).json({
            message: 'Ticket deleted',
            ticket
        });
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.deleteTicket = deleteTicket;
