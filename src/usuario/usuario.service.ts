import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario-dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    return this.prisma.usuario.create({ data: createUsuarioDto });
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const { senha_atual, nova_senha, ...resto } = updateUsuarioDto;

    return this.prisma.usuario.update({
      where: { id: id },
      data: {
        ...resto,
        ...(nova_senha && { senha: nova_senha }),
      },
    });
  }
}
