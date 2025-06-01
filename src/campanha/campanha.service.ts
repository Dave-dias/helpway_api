import { Injectable } from '@nestjs/common';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CampanhaService {
  constructor(private prisma: PrismaService) {}

  create(createCampanhaDto: CreateCampanhaDto) {
    return this.prisma.campanha.create({ data: createCampanhaDto });
  }

  findAll() {
    return this.prisma.campanha.findMany();
  }

  findOne(id: number) {
    return this.prisma.campanha.findUnique({ where: { id: id } });
  }

  findAllByLocalidade(tpLocalidade: number) {
    return this.prisma.campanha.findMany({
      where: { tp_localidade: tpLocalidade },
    });
  }

  update(id: number, updateCampanhaDto: UpdateCampanhaDto) {
    return this.prisma.campanha.update({
      where: { id: id },
      data: updateCampanhaDto,
    });
  }
}
