import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DoacaoModule } from './doacao/doacao.module';
import { CampanhaModule } from './campanha/campanha.module';

@Module({
  imports: [PrismaModule, UsuarioModule, DoacaoModule, CampanhaModule],
})
export class AppModule {}
