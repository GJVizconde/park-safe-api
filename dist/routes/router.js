"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../modules/auth/auth.router"));
const user_router_1 = __importDefault(require("../modules/user/user.router"));
const vechicle_router_1 = __importDefault(require("../modules/vehicle/vechicle.router"));
const collaborator_router_1 = __importDefault(require("../modules/collaborator/collaborator.router"));
const ticket_router_1 = __importDefault(require("../modules/ticket/ticket.router"));
const router = (0, express_1.Router)();
router.use('/auth', auth_router_1.default);
router.use('/user', user_router_1.default);
router.use('/collaborator', collaborator_router_1.default);
router.use('/vehicle', vechicle_router_1.default);
router.use('/ticket', ticket_router_1.default);
//TODO: create route, controller and service of parkingPlace
exports.default = router;
