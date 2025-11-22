/*
  Warnings:

  - Added the required column `dogSize` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DogSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "dogSize" "DogSize" NOT NULL;
