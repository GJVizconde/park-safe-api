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
exports.getAllUsers = void 0;
const prisma_1 = require("../prisma");
const errorResponse_1 = require("../../utils/errorResponse");
const getAllUsers = (userId, ticket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.prisma.user.findMany({
            where: Object.assign(Object.assign({ id: userId ? userId : undefined }, (ticket === true && {
                tickets: { some: {} }
            })), { role: 'USER' }),
            include: Object.assign(Object.assign({}, (ticket !== true && {
                // No incluir vehicles si ticket es verdadero
                vehicles: {}
            })), { tickets: {
                    include: {
                        collaborators: {}
                    }
                } })
        });
        return users;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_GET_USERS');
    }
});
exports.getAllUsers = getAllUsers;
