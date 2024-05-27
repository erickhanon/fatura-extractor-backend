/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Fatura` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Fatura` table. All the data in the column will be lost.
  - You are about to alter the column `energia_eletrica_valor` on the `Fatura` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `energia_scee_valor` on the `Fatura` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `energia_compensada_valor` on the `Fatura` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `contrib_ilum_valor` on the `Fatura` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - Added the required column `installation_number` to the `Fatura` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fatura" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "installation_number" TEXT NOT NULL,
ALTER COLUMN "energia_eletrica_valor" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "energia_scee_valor" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "energia_compensada_valor" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "contrib_ilum_valor" SET DATA TYPE DECIMAL(65,30);
