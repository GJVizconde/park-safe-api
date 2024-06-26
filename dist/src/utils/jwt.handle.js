"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || 'token.01010101';
const generateToken = (email, role, id) => {
    const jwt = (0, jsonwebtoken_1.sign)({ email, role, id }, JWT_SECRET, {
        expiresIn: '2h'
    });
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = (jwt) => {
    const isUser = (0, jsonwebtoken_1.verify)(jwt, JWT_SECRET);
    return isUser;
};
exports.verifyToken = verifyToken;
