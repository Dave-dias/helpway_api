import { Campanha, Local } from '@prisma/client';
import { toLocalResponseDto } from './local.mapper';
import { CampanhaEntity } from '../entity/campanha.entity';
import { CampanhaResponseDto } from '../dto/campanha-response.dto';

export function toCampanhaResponseDto(
  campanha: CampanhaEntity,
): CampanhaResponseDto {
  return {
    ...campanha,
    meta_doacoes: campanha.meta_doacoes,
    localizacao: toLocalResponseDto(campanha.localizacao),
  };
}

export function toCampanhaEntity(
  campanha?: Campanha & { localizacao?: Local | null },
): CampanhaEntity | null {
  if (!campanha) return null;

  return {
    ...campanha,
    meta_doacoes: campanha.meta_doacoes.toNumber(),
    localizacao: campanha.localizacao ?? undefined,
  };
}
