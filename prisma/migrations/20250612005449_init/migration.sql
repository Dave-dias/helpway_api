/*
  Warnings:

  - You are about to drop the column `imagem_url` on the `Doacao` table. All the data in the column will be lost.
  - Added the required column `imagem_base64` to the `Doacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doacao" DROP COLUMN "imagem_url",
ADD COLUMN     "imagem_base64" TEXT NOT NULL;
