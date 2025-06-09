import { DoacaoResponseDto } from '../dto/doacao-response.dto';
import { Doacao, Local } from '@prisma/client';
import { DoacaoEntity } from '../entity/doacao.entity';
import { toLocalResponseDto } from './local.mapper';

export function toDoacaoResponseDto(doacao: DoacaoEntity): DoacaoResponseDto {
  return {
    ...doacao,
    meta_doacoes: doacao.meta_doacoes,
    valor_levantado: doacao.valor_levantado,
    localizacao: toLocalResponseDto(doacao.localizacao),
  };
}

export function toDoacaoEntity(
  doacao?: Doacao & { localizacao?: Local | null },
): DoacaoEntity | null {
  if (!doacao) return null;

  return {
    ...doacao,
    meta_doacoes: doacao.meta_doacoes.toNumber(),
    valor_levantado: doacao.valor_levantado.toNumber(),
    localizacao: doacao.localizacao ?? undefined,
  };
}
