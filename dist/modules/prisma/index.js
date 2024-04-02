"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectPrisma = exports.prisma = void 0;
var prisma_service_1 = require("./prisma.service");
Object.defineProperty(exports, "prisma", { enumerable: true, get: function () { return prisma_service_1.prisma; } });
Object.defineProperty(exports, "disconnectPrisma", { enumerable: true, get: function () { return prisma_service_1.disconnectPrisma; } });
