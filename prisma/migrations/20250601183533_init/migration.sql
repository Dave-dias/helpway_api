-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tp_usuario" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campanha" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "img_logotipo" TEXT NOT NULL,
    "img_banner" TEXT NOT NULL,
    "meta_doacoes" BIGINT NOT NULL,
    "tp_campanha" INTEGER NOT NULL,
    "tp_localidade" INTEGER NOT NULL,

    CONSTRAINT "Campanha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doacao" (
    "id" SERIAL NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_campanha" INTEGER NOT NULL,

    CONSTRAINT "Doacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_id_campanha_fkey" FOREIGN KEY ("id_campanha") REFERENCES "Campanha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
