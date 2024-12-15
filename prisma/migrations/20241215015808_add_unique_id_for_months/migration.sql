/*
  Warnings:

  - The primary key for the `VisitorViewPerMonth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `short_description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `VisitorViewPerMonth` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "short_description" VARCHAR(256) NOT NULL;

-- AlterTable
ALTER TABLE "VisitorViewPerMonth" DROP CONSTRAINT "VisitorViewPerMonth_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "VisitorViewPerMonth_pkey" PRIMARY KEY ("id");
