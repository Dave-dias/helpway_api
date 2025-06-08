/*
  Warnings:

  - You are about to drop the column `id_campanha` on the `Doacao` table. All the data in the column will be lost.
  - You are about to drop the column `id_usuario` on the `Doacao` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Doacao` table. All the data in the column will be lost.
  - You are about to drop the `Campanha` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `descricao` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem_url` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meta_doacoes` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitulo` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_levantado` to the `Doacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doacao" DROP CONSTRAINT "Doacao_id_campanha_fkey";

-- DropForeignKey
ALTER TABLE "Doacao" DROP CONSTRAINT "Doacao_id_usuario_fkey";

-- AlterTable
ALTER TABLE "Doacao" DROP COLUMN "id_campanha",
DROP COLUMN "id_usuario",
DROP COLUMN "valor",
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "imagem_url" TEXT NOT NULL,
ADD COLUMN     "meta_doacoes" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "subtitulo" TEXT NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL,
ADD COLUMN     "valor_levantado" DECIMAL(65,30) NOT NULL;

-- DropTable
DROP TABLE "Campanha";
