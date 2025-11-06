import { Injectable } from '@nestjs/common';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import { CampanhaEntity } from './entity/campanha.entity';
import { UpdateLocalizacaoDto } from './dto/update-localizacao.dto';
import { toCampanhaEntity } from './mapper/campanha.mapper';

@Injectable()
export class CampanhaService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCampanhaDto: CreateCampanhaDto,
  ): Promise<CampanhaEntity | null> {
    const { localizacao, ...campanhaData } = createCampanhaDto;

    const campanha = await this.prisma.campanha.create({
      data: {
        ...campanhaData,
        localizacao: {
          create: localizacao,
        },
      },
      include: { localizacao: true },
    });

    return toCampanhaEntity(campanha);
  }

  async findAll(): Promise<(CampanhaEntity | null)[]> {
    const campanhas = await this.prisma.campanha.findMany({
      include: { localizacao: true },
    });

    return campanhas.map((campanha) => toCampanhaEntity(campanha));
  }

  async findByIdOrganizador(
    idOrganizador: number,
  ): Promise<(CampanhaEntity | null)[]> {
    const campanhas = await this.prisma.campanha.findMany({
      where: { id_organizador: idOrganizador },
      include: { localizacao: true },
    });

    return campanhas.map((campanha) => toCampanhaEntity(campanha));
  }

  async findOne(id: number): Promise<CampanhaEntity | null> {
    const campanha = await this.prisma.campanha.findUnique({
      where: { id },
      include: { localizacao: true },
    });

    if (!campanha) return null;

    return toCampanhaEntity(campanha);
  }

  async updateDoacao(
    id: number,
    data: UpdateCampanhaDto,
  ): Promise<CampanhaEntity | null> {
    const campanha = await this.prisma.campanha.update({
      where: { id },
      data: data,
      include: { localizacao: true },
    });

    return toCampanhaEntity(campanha);
  }

  async updateLocalizacao(
    id: number,
    data: UpdateLocalizacaoDto,
  ): Promise<CampanhaEntity | null> {
    const campanha = await this.prisma.campanha.update({
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

    return toCampanhaEntity(campanha);
  }

  async deleteLocalizacao(id: number): Promise<CampanhaEntity | null> {
    const campanha = await this.prisma.campanha.update({
      where: { id },
      data: {
        localizacao: {
          delete: true,
        },
      },
      include: { localizacao: true },
    });

    return toCampanhaEntity(campanha);
  }
}
