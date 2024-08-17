/*
  Warnings:

  - The values [endded] on the enum `meetStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "meetStatus_new" AS ENUM ('ongoing', 'ended');
ALTER TABLE "Meet" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Meet" ALTER COLUMN "status" TYPE "meetStatus_new" USING ("status"::text::"meetStatus_new");
ALTER TYPE "meetStatus" RENAME TO "meetStatus_old";
ALTER TYPE "meetStatus_new" RENAME TO "meetStatus";
DROP TYPE "meetStatus_old";
ALTER TABLE "Meet" ALTER COLUMN "status" SET DEFAULT 'ongoing';
COMMIT;
