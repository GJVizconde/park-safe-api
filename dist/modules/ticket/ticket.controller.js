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
exports.deleteTicket = exports.getTicketByUserId = exports.generateTicket = exports.getTickets = void 0;
const errorResponse_1 = require("../../utils/errorResponse");
const ticket_service_1 = require("./ticket.service");
const getTickets = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield (0, ticket_service_1.getAllTickets)();
        res.status(200).send(tickets);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getTickets = getTickets;
const generateTicket = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ body }, res) {
    try {
        const ticket = yield (0, ticket_service_1.generateNewTicket)(body);
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
        console.log('Saliendo', ticket);
        res.status(200).send(ticket);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getTicketByUserId = getTicketByUserId;
const deleteTicket = (_b, res_2) => __awaiter(void 0, [_b, res_2], void 0, function* ({ params }, res) {
    const { id } = params;
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
