import { DoacaoResponseDto } from '../dto/doacao-response.dto';
import { Doacao } from '@prisma/client';

export function toDoacaoResponseDto(doacao: Doacao): DoacaoResponseDto {
  return {
    id: doacao.id,
    id_usuario: doacao.id_usuario,
    id_campanha: doacao.id_campanha,
    valor: doacao.valor.toNumber(),
    tp_doacao: doacao.tp_doacao,
  };
}
