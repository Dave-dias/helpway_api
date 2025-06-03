/*
  Warnings:

  - Added the required column `tp_doacao` to the `Campanha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tp_doacao` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dt_nascimento` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_usuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campanha" ADD COLUMN     "tp_doacao" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Doacao" ADD COLUMN     "tp_doacao" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "dt_nascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "img_usuario" TEXT NOT NULL;
