/*
  Warnings:

  - The primary key for the `Meet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Meet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[uuid]` on the table `Meet` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `Meet` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `A` on the `_MeetToUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_MeetToUser" DROP CONSTRAINT "_MeetToUser_A_fkey";

-- AlterTable
ALTER TABLE "Meet" DROP CONSTRAINT "Meet_pkey",
ADD COLUMN     "uuid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Meet_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_MeetToUser" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "meetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meet_uuid_key" ON "Meet"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "_MeetToUser_AB_unique" ON "_MeetToUser"("A", "B");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_meetId_fkey" FOREIGN KEY ("meetId") REFERENCES "Meet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetToUser" ADD CONSTRAINT "_MeetToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Meet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
