import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    nome: string;
    email: string;
    senha: string;
    tp_usuario: number;
  }) {
    return this.prisma.usuario.create({ data });
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }
}
