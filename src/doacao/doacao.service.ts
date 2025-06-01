import { Injectable } from '@nestjs/common';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DoacaoService {
  constructor(private prisma: PrismaService) {}

  create(createDoacaoDto: CreateDoacaoDto) {
    return this.prisma.doacao.create({ data: createDoacaoDto });
  }

  findAll() {
    return this.prisma.doacao.findMany();
  }

  findOne(id: number) {
    return this.prisma.doacao.findUnique({ where: { id: id } });
  }

  findAllByIdUsuario(idUsuario: number) {
    return this.prisma.doacao.findMany({ where: { id_usuario: idUsuario } });
  }

  findAllByIdCampanha(idCampanha: number) {
    return this.prisma.doacao.findMany({
      where: { id_campanha: idCampanha },
    });
  }
}
