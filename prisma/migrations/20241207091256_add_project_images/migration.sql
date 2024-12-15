/*
  Warnings:

  - You are about to drop the column `totalPageViewPerMonth` on the `VisitorViewPerMonth` table. All the data in the column will be lost.
  - Added the required column `images` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalViews` to the `VisitorViewPerMonth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "images" JSONB NOT NULL,
ADD COLUMN     "status" VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE "VisitorViewPerMonth" DROP COLUMN "totalPageViewPerMonth",
ADD COLUMN     "totalViews" INTEGER NOT NULL;
