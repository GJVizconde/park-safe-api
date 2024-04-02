import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectToDatabase() {
  try {
    await prisma.$connect();
    return prisma;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error; // Puedes elegir lanzar el error para manejarlo en otro lugar
  }
}

async function disconnectPrisma() {
  await prisma.$disconnect();
}

export { prisma, disconnectPrisma, connectToDatabase };