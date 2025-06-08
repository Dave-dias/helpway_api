import { Injectable } from '@nestjs/common';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';
import { Doacao } from '@prisma/client';

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

  update(id: number, data: UpdateDoacaoDto): Promise<Doacao> {
    return this.prisma.doacao.update({
      where: { id },
      data,
    });
  }
}
