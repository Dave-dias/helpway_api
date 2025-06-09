import { Doacao, Local } from '@prisma/client';
import { DoacaoEntity } from '../entity/doacao.entity';
import { LocalEntity } from '../entity/local.entity';
import { LocalResponseDto } from '../dto/local-response.dto';

export function toLocalResponseDto(
  local?: LocalEntity,
): LocalResponseDto | undefined {
  if (!local) return undefined;

  return {
    latitude: local.latitude,
    longitude: local.longitude,
  };
}

export function toDoacaoEntity(doacao: Doacao, local?: Local): DoacaoEntity {
  return {
    ...doacao,
    meta_doacoes: doacao.meta_doacoes.toNumber(),
    valor_levantado: doacao.valor_levantado.toNumber(),
    localizacao: local,
  };
}
