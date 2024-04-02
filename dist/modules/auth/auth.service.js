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
            data: Object.assign(Object.assign({}, body), { id: Number(body.id) })
        });
        console.log(newUser);
        return newUser;
    }
    catch (error) {
        (0, errorResponse_1.handleError)(error, 'ERROR_REGISTER_NEW_USER');
    }
});
exports.newUser = newUser;
const loginUser = (_a, role_1) => __awaiter(void 0, [_a, role_1], void 0, function* ({ email, password }, role) {
    if (role === 'USER') {
        const checkIs = yield prisma_1.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!checkIs)
            throw new Error('NOT_FOUND_USER');
        const passwordHash = checkIs.password;
        if (password !== passwordHash)
            throw new Error('Credentials are invalid');
        const token = (0, jwt_handle_1.generateToken)(checkIs.email, checkIs.role, checkIs.id);
        const data = {
            token,
            user: checkIs
        };
        return data;
    }
    else {
        const checkIsCollaborator = yield prisma_1.prisma.collaborator.findUnique({
            where: {
                email
            }
        });
        if (!checkIsCollaborator)
            throw new Error('NOT_FOUND_USER');
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
