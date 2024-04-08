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
exports.newCollaborator = exports.getAllCollaborators = void 0;
const prisma_1 = require("../prisma");
const errorResponse_1 = require("../../utils/errorResponse");
const getAllCollaborators = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.prisma.collaborator.findMany({});
        return users;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_GET_USERS');
    }
});
exports.getAllCollaborators = getAllCollaborators;
const newCollaborator = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collaborator = yield prisma_1.prisma.collaborator.findFirst({
            where: {
                id: Number(body.id)
            }
        });
        if (collaborator)
            throw new Error('User already exist');
        const isEmailExist = yield prisma_1.prisma.collaborator.findFirst({
            where: {
                email: body.email
            }
        });
        if (isEmailExist)
            throw new Error('Email already registered');
        const newCollaborator = yield prisma_1.prisma.collaborator.create({
            data: Object.assign(Object.assign({}, body), { id: Number(body.id) })
        });
        return newCollaborator;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_REGISTER_NEW_USER');
    }
});
exports.newCollaborator = newCollaborator;
