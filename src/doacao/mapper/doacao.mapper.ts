import { DoacaoResponseDto } from '../dto/doacao-response.dto';
import { Doacao } from '@prisma/client';

export function toDoacaoResponseDto(doacao: Doacao): DoacaoResponseDto {
  return {
    id: doacao.id,
    titulo: doacao.titulo,
    subtitulo: doacao.subtitulo,
    descricao: doacao.descricao,
    imagem_url: doacao.imagem_url,
    meta_doacoes: doacao.meta_doacoes.toNumber(),
    valor_levantado: doacao.valor_levantado.toNumber(),
    tp_doacao: doacao.tp_doacao,
  };
}
