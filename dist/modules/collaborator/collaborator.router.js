"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collaborator_controller_1 = require("./collaborator.controller");
const collaboratorRouter = (0, express_1.Router)();
collaboratorRouter.get('/', collaborator_controller_1.getCollaborators);
collaboratorRouter.post('/register', collaborator_controller_1.registerCollaborator);
exports.default = collaboratorRouter;
