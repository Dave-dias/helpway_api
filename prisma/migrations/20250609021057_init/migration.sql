/*
  Warnings:

  - You are about to drop the column `tp_doacao` on the `Doacao` table. All the data in the column will be lost.
  - Added the required column `fg_alimentacao` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fg_dinheiro` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fg_vestuario` to the `Doacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doacao" DROP COLUMN "tp_doacao",
ADD COLUMN     "fg_alimentacao" BOOLEAN NOT NULL,
ADD COLUMN     "fg_dinheiro" BOOLEAN NOT NULL,
ADD COLUMN     "fg_vestuario" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Local" (
    "id_doacao" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id_doacao")
);

-- AddForeignKey
ALTER TABLE "Local" ADD CONSTRAINT "Local_id_doacao_fkey" FOREIGN KEY ("id_doacao") REFERENCES "Doacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
