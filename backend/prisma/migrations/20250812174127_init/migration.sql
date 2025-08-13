-- CreateEnum
CREATE TYPE "ValueLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "waste_logs" ADD COLUMN     "area" TEXT;

-- CreateTable
CREATE TABLE "valuable_materials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "valueLevel" "ValueLevel" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "valuable_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scrap_prices" (
    "id" TEXT NOT NULL,
    "materialName" TEXT NOT NULL,
    "pricePerKg" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scrap_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "valuable_materials_name_key" ON "valuable_materials"("name");

-- CreateIndex
CREATE UNIQUE INDEX "scrap_prices_materialName_key" ON "scrap_prices"("materialName");
