/*
  Warnings:

  - You are about to alter the column `profilePicture` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profilePicture" SET DATA TYPE VARCHAR(30);

-- CreateTable
CREATE TABLE "Message" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fromId" UUID NOT NULL,
    "toId" UUID NOT NULL,
    "text" VARCHAR(240) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
