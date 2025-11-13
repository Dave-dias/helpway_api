import { Campanha, Doacao, Local, Usuario } from '@prisma/client';
import { toLocalResponseDto } from './local.mapper';
import { CampanhaEntity } from '../entity/campanha.entity';
import { CampanhaResponseDto } from '../dto/campanha-response.dto';
import {
  toDoacaoEntity,
  toDoacaoResponseDto,
} from '../../doacao/mapper/doacao.mapper';

export function toCampanhaResponseDto(
  campanha: CampanhaEntity,
): CampanhaResponseDto {
  return {
    ...campanha,
    meta_doacoes: campanha.meta_doacoes,
    localizacao: toLocalResponseDto(campanha.localizacao),
    doacoes: campanha.doacoes?.map(toDoacaoResponseDto),
    valor_levantado:
      campanha.doacoes?.reduce((total, doacao) => total + doacao.valor, 0) ?? 0,
  };
}

export function toCampanhaEntity(
  campanha?: Campanha & {
    Doacao?: Doacao[];
    localizacao?: Local | null;
    usuario: Usuario;
  },
): CampanhaEntity | null {
  if (!campanha) return null;

  return {
    id: campanha.id,
    id_organizador: campanha.id_organizador,
    titulo: campanha.titulo,
    subtitulo: campanha.titulo,
    descricao: campanha.descricao,
    imagem_base64: campanha.imagem_base64,
    chave_pix: campanha.chave_pix,
    fg_dinheiro: campanha.fg_dinheiro,
    fg_alimentacao: campanha.fg_alimentacao,
    fg_vestuario: campanha.fg_vestuario,
    meta_doacoes: campanha.meta_doacoes.toNumber(),
    localizacao: campanha.localizacao ?? undefined,
    doacoes:
      campanha.Doacao?.map((doacao) =>
        toDoacaoEntity({
          ...doacao,
          campanha: {
            ...campanha,
            usuario: campanha.usuario, // include user if loaded
          },
        }),
      ) ?? undefined,
  };
}
