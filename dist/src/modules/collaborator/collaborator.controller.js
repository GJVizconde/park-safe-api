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
exports.registerCollaborator = exports.getCollaborators = void 0;
const errorResponse_1 = require("../../utils/errorResponse");
const collaborator_service_1 = require("./collaborator.service");
const getCollaborators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collaborators = yield (0, collaborator_service_1.getAllCollaborators)();
        res.status(200).send(collaborators);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getCollaborators = getCollaborators;
const registerCollaborator = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ body }, res) {
    try {
        const registerUser = yield (0, collaborator_service_1.newCollaborator)(body);
        res.status(200).send(registerUser);
    }
    catch (error) {
        (0, errorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.registerCollaborator = registerCollaborator;
