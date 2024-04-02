-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'COLLABORATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collaborator" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'COLLABORATOR',

    CONSTRAINT "Collaborator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "parkingPlace" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "collaboratorId" INTEGER NOT NULL,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToVehicle" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_id_key" ON "Vehicle"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Collaborator_id_key" ON "Collaborator"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Collaborator_email_key" ON "Collaborator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_id_key" ON "Ticket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_userId_key" ON "Ticket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_collaboratorId_key" ON "Ticket"("collaboratorId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_vehicleId_key" ON "Ticket"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToVehicle_AB_unique" ON "_UserToVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToVehicle_B_index" ON "_UserToVehicle"("B");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "Collaborator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVehicle" ADD CONSTRAINT "_UserToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVehicle" ADD CONSTRAINT "_UserToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
