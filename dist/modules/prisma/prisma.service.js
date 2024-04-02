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
exports.connectToDatabase = exports.disconnectPrisma = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect();
            return prisma;
        }
        catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw error; // Puedes elegir lanzar el error para manejarlo en otro lugar
        }
    });
}
exports.connectToDatabase = connectToDatabase;
function disconnectPrisma() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.$disconnect();
    });
}
exports.disconnectPrisma = disconnectPrisma;
