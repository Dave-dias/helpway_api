import { DoacaoResponseDto } from '../dto/doacao-response.dto';
import { Doacao } from '@prisma/client';
import { DoacaoEntity } from '../entity/doacao.entity';

export function toDoacaoResponseDto(doacao: DoacaoEntity): DoacaoResponseDto {
  return {
    ...doacao,
    valor: doacao.valor,
  };
}

export function toDoacaoEntity(doacao?: Doacao): DoacaoEntity | null {
  if (!doacao) return null;

  return {
    ...doacao,
    valor: doacao.valor ? Number(doacao.valor) : 0,
  };
}
