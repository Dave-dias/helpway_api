import { Injectable } from '@nestjs/common';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';
import { DoacaoEntity } from './entity/doacao.entity';
import { toDoacaoEntity } from './mapper/doacao.mapper';
import { UpdateLocalizacaoDto } from './dto/update-localizacao.dto';

@Injectable()
export class DoacaoService {
  constructor(private prisma: PrismaService) {}

  async create(createDoacaoDto: CreateDoacaoDto): Promise<DoacaoEntity | null> {
    const { localizacao, ...doacaoData } = createDoacaoDto;

    const doacao = await this.prisma.doacao.create({
      data: {
        ...doacaoData,
        localizacao: {
          create: localizacao,
        },
      },
      include: { localizacao: true },
    });

    return toDoacaoEntity(doacao);
  }

  async findAll(): Promise<(DoacaoEntity | null)[]> {
    const doacoes = await this.prisma.doacao.findMany({
      include: { localizacao: true },
    });

    return doacoes.map((doacao) => toDoacaoEntity(doacao));
  }

  async findByOrganizadorId(
    idOrganizador: number,
  ): Promise<(DoacaoEntity | null)[]> {
    const doacoes = await this.prisma.doacao.findMany({
      where: { id_organizador: idOrganizador },
      include: { localizacao: true },
    });

    return doacoes.map((doacao) => toDoacaoEntity(doacao));
  }

  async findOne(id: number): Promise<DoacaoEntity | null> {
    const doacao = await this.prisma.doacao.findUnique({
      where: { id },
      include: { localizacao: true },
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
      include: { localizacao: true },
    });

    return toDoacaoEntity(doacao);
  }

  async updateLocalizacao(
    id: number,
    data: UpdateLocalizacaoDto,
  ): Promise<DoacaoEntity | null> {
    const doacao = await this.prisma.doacao.update({
      where: { id },
      data: {
        localizacao: {
          upsert: {
            update: {
              latitude: data.latitude,
              longitude: data.longitude,
            },
            create: {
              latitude: data.latitude,
              longitude: data.longitude,
            },
          },
        },
      },
      include: { localizacao: true },
    });

    return toDoacaoEntity(doacao);
  }

  async deleteLocalizacao(id: number): Promise<DoacaoEntity | null> {
    const doacao = await this.prisma.doacao.update({
      where: { id },
      data: {
        localizacao: {
          delete: true,
        },
      },
      include: { localizacao: true },
    });

    return toDoacaoEntity(doacao);
  }
}
