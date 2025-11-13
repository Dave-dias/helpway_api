import { DoacaoResponseDto } from '../dto/doacao-response.dto';
import { Campanha, Doacao, Usuario } from '@prisma/client';
import { DoacaoEntity } from '../entity/doacao.entity';

export function toDoacaoResponseDto(doacao: DoacaoEntity): DoacaoResponseDto {
  return {
    ...doacao,
    valor: doacao.valor,
  };
}

export function toDoacaoEntity(
  doacao: Doacao & {
    campanha: Campanha & { usuario: Usuario };
  },
): DoacaoEntity {
  return {
    id: doacao.id,
    id_campanha: doacao.id_campanha,
    id_doador: doacao.id_doador,
    valor: doacao.valor ? Number(doacao.valor) : 0,
    fg_dinheiro: doacao.fg_dinheiro,
    fg_alimentacao: doacao.fg_alimentacao,
    fg_vestuario: doacao.fg_vestuario,
    // Safe access for optional relation:
    titulo_campanha: doacao.campanha.titulo,
    nome_organizador: doacao.campanha.usuario?.nome,
  };
}
