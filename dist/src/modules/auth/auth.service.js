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
exports.loginUser = exports.newUser = void 0;
const errorResponse_1 = require("../../utils/errorResponse");
const jwt_handle_1 = require("../../utils/jwt.handle");
const prisma_1 = require("../prisma");
const newUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('BODY QUE LLEGA', body);
        console.log(body.id);
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                id: Number(body.id)
            }
        });
        if (user)
            throw new Error('User already exist');
        const isEmailExist = yield prisma_1.prisma.user.findFirst({
            where: {
                email: body.email
            }
        });
        if (isEmailExist)
            throw new Error('Email already registered');
        const newUser = yield prisma_1.prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
                role: body.role,
                id: Number(body.id)
            }
        });
        console.log(newUser);
        return newUser;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_REGISTER_NEW_USER');
    }
});
exports.newUser = newUser;
const loginUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, password }) {
    var _b;
    const checkIs = yield prisma_1.prisma.user.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            tickets: {
                where: {
                    isDelete: false
                },
                select: { id: true }
            }
        }
    });
    const checkIsCollaborator = yield prisma_1.prisma.collaborator.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!checkIs && !checkIsCollaborator)
        throw new Error('NOT_FOUND_USER');
    if (checkIs) {
        const passwordHash = checkIs.password;
        if (password !== passwordHash)
            throw new Error('Credentials are invalid');
        console.log('USUARIO  =>', checkIs);
        const token = (0, jwt_handle_1.generateToken)(checkIs.email, checkIs.role, checkIs.id);
        const data = {
            token,
            user: {
                id: checkIs.id,
                name: checkIs.name,
                email: checkIs.email,
                role: checkIs.role,
                hasTicket: ((_b = checkIs === null || checkIs === void 0 ? void 0 : checkIs.tickets[0]) === null || _b === void 0 ? void 0 : _b.id) ? true : false
            }
        };
        return data;
    }
    else if (checkIsCollaborator) {
        const passwordHash = checkIsCollaborator.password;
        if (password !== passwordHash)
            throw new Error('Credentials are invalid');
        const token = (0, jwt_handle_1.generateToken)(checkIsCollaborator.email, checkIsCollaborator.role, checkIsCollaborator.id);
        const data = {
            token,
            user: checkIsCollaborator
        };
        return data;
    }
});
exports.loginUser = loginUser;
