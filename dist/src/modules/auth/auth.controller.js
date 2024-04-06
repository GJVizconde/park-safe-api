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
exports.login = exports.register = void 0;
const errorResponse_1 = require("../../utils/errorResponse");
const auth_service_1 = require("./auth.service");
const register = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ body }, res) {
    try {
        console.log('Body en controller', body);
        const registerUser = yield (0, auth_service_1.newUser)(body);
        res.status(200).send(registerUser);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.register = register;
const login = (_b, res_2) => __awaiter(void 0, [_b, res_2], void 0, function* ({ body }, res) {
    try {
        console.log('Body en controller', body);
        const user = yield (0, auth_service_1.loginUser)(body);
        res.status(200).send(user);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.login = login;
