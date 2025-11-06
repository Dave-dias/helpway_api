import { Injectable } from '@nestjs/common';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';
import { DoacaoEntity } from './entity/doacao.entity';
import { toDoacaoEntity } from './mapper/doacao.mapper';

@Injectable()
export class DoacaoService {
  constructor(private prisma: PrismaService) {}

  async create(createDoacaoDto: CreateDoacaoDto): Promise<DoacaoEntity | null> {
    const { ...doacaoData } = createDoacaoDto;

    const doacao = await this.prisma.doacao.create({
      data: {
        ...doacaoData,
      },
    });

    return toDoacaoEntity(doacao);
  }

  async findAll(): Promise<(DoacaoEntity | null)[]> {
    const doacoes = await this.prisma.doacao.findMany();

    return doacoes.map((doacao) => toDoacaoEntity(doacao));
  }

  async findByIdDoador(
    idDoador: number,
  ): Promise<(DoacaoEntity | null)[]> {
    const doacoes = await this.prisma.doacao.findMany({
      where: { id_doador: idDoador },
    });

    return doacoes.map((doacao) => toDoacaoEntity(doacao));
  }

  async findOne(id: number): Promise<DoacaoEntity | null> {
    const doacao = await this.prisma.doacao.findUnique({
      where: { id },
    });

    if (!doacao) return null;

    return toDoacaoEntity(doacao);
  }

  async updateDoacao(
    id: number,
    data: UpdateDoacaoDto,
  ): Promise<DoacaoEntity | null> {
    const doacao = await this.prisma.doacao.update({
      where: { id },
      data: data,
    });

    return toDoacaoEntity(doacao);
  }
}
