-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "img_usuario" TEXT NOT NULL,
    "dt_nascimento" TIMESTAMP(3) NOT NULL,
    "tp_usuario" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doacao" (
    "id" SERIAL NOT NULL,
    "id_organizador" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem_base64" TEXT NOT NULL,
    "meta_doacoes" DECIMAL(65,30) NOT NULL,
    "valor_levantado" DECIMAL(65,30) NOT NULL,
    "fg_dinheiro" BOOLEAN NOT NULL,
    "fg_alimentacao" BOOLEAN NOT NULL,
    "fg_vestuario" BOOLEAN NOT NULL,

    CONSTRAINT "Doacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Local" (
    "id_doacao" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id_doacao")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_id_organizador_fkey" FOREIGN KEY ("id_organizador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Local" ADD CONSTRAINT "Local_id_doacao_fkey" FOREIGN KEY ("id_doacao") REFERENCES "Doacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
