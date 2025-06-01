import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CampanhaModule } from './campanha/campanha.module';
import { DoacaoModule } from './doacao/doacao.module';

@Module({
  imports: [PrismaModule, UsuarioModule, CampanhaModule, DoacaoModule],
})
export class AppModule {}
