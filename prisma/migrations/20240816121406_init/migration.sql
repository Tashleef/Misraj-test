-- CreateEnum
CREATE TYPE "meetStatus" AS ENUM ('ongoing', 'endded');

-- CreateTable
CREATE TABLE "Meet" (
    "id" TEXT NOT NULL,
    "status" "meetStatus" NOT NULL,

    CONSTRAINT "Meet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MeetToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MeetToUser_AB_unique" ON "_MeetToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MeetToUser_B_index" ON "_MeetToUser"("B");

-- AddForeignKey
ALTER TABLE "_MeetToUser" ADD CONSTRAINT "_MeetToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Meet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetToUser" ADD CONSTRAINT "_MeetToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
