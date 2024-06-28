/*
  Warnings:

  - Changed the type of `dayOfWeek` on the `offered_course_class_schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WeekDays" AS ENUM ('SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');

-- AlterTable
ALTER TABLE "offered_course_class_schedule" DROP COLUMN "dayOfWeek",
ADD COLUMN     "dayOfWeek" "WeekDays" NOT NULL;

-- DropEnum
DROP TYPE "dayOfWeeks";
