/*
  Warnings:

  - The values [COMMENT] on the enum `ReactionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isComment` on the `Post` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReactionType_new" AS ENUM ('LIKE', 'RETWEET');
ALTER TABLE "Reaction" ALTER COLUMN "reactionType" TYPE "ReactionType_new" USING ("reactionType"::text::"ReactionType_new");
ALTER TYPE "ReactionType" RENAME TO "ReactionType_old";
ALTER TYPE "ReactionType_new" RENAME TO "ReactionType";
DROP TYPE "ReactionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "isComment";

-- CreateTable
CREATE TABLE "CommentInfo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "postId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "commentId" UUID NOT NULL,

    CONSTRAINT "CommentInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentInfo" ADD CONSTRAINT "CommentInfo_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
