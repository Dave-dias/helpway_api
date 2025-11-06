import { Campanha, Local } from '@prisma/client';
import { LocalEntity } from '../entity/local.entity';
import { LocalResponseDto } from '../dto/local-response.dto';
import { CampanhaEntity } from '../entity/campanha.entity';

export function toLocalResponseDto(
  local?: LocalEntity,
): LocalResponseDto | undefined {
  if (!local) return undefined;

  return {
    latitude: local.latitude,
    longitude: local.longitude,
  };
}

export function toCampanhaEntity(
  campanha: Campanha,
  local?: Local,
): CampanhaEntity {
  return {
    ...campanha,
    meta_doacoes: campanha.meta_doacoes.toNumber(),
    localizacao: local,
  };
}
