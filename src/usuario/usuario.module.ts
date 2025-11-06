import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { DoacaoModule } from '../doacao/doacao.module';
import { CampanhaModule } from '../campanha/campanha.module';

@Module({
  imports: [PrismaModule, DoacaoModule, CampanhaModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
