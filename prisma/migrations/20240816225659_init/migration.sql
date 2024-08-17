/*
  Warnings:

  - Added the required column `recordingSince` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `duration` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "recordStatus" AS ENUM ('paused', 'ongoing', 'ended');

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "recordingSince" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "recordStatus" NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL;
