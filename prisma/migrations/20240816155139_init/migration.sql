-- AlterTable
ALTER TABLE "Meet" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ongoing';
