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
exports.getUsers = void 0;
const errorResponse_1 = require("../../utils/errorResponse");
const user_service_1 = require("./user.service");
const getUsers = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ query }, res) {
    const { userId, ticket, hasVehicle } = query;
    try {
        const users = yield (0, user_service_1.getAllUsers)(Number(userId), String(ticket), String(hasVehicle));
        res.status(200).send(users);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getUsers = getUsers;
