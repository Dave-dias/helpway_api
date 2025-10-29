/*
  Warnings:

  - Added the required column `id_organizador` to the `Doacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doacao" ADD COLUMN     "id_organizador" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_id_organizador_fkey" FOREIGN KEY ("id_organizador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
