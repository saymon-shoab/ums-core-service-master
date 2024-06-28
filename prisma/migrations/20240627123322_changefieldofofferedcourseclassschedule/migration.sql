/*
  Warnings:

  - Added the required column `endTime` to the `offered_course_class_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offered_course_class_schedule" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;
