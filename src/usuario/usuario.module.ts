import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { DoacaoService } from '../doacao/doacao.service';
import { DoacaoModule } from '../doacao/doacao.module';

@Module({
  imports: [PrismaModule, DoacaoModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
