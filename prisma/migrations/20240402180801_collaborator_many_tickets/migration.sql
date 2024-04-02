/*
  Warnings:

  - You are about to drop the column `collaboratorId` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_collaboratorId_fkey";

-- DropIndex
DROP INDEX "Ticket_collaboratorId_key";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "collaboratorId";

-- CreateTable
CREATE TABLE "_CollaboratorToTicket" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollaboratorToTicket_AB_unique" ON "_CollaboratorToTicket"("A", "B");

-- CreateIndex
CREATE INDEX "_CollaboratorToTicket_B_index" ON "_CollaboratorToTicket"("B");

-- AddForeignKey
ALTER TABLE "_CollaboratorToTicket" ADD CONSTRAINT "_CollaboratorToTicket_A_fkey" FOREIGN KEY ("A") REFERENCES "Collaborator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollaboratorToTicket" ADD CONSTRAINT "_CollaboratorToTicket_B_fkey" FOREIGN KEY ("B") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
