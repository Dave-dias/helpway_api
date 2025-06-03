import { Campanha } from '@prisma/client';
import { CampanhaResponseDto } from '../dto/campanha-response.dto';

export function toCampanhaResponseDto(campanha: Campanha): CampanhaResponseDto {
  return {
    id: campanha.id,
    titulo: campanha.titulo,
    subtitulo: campanha.subtitulo,
    img_logotipo: campanha.img_logotipo,
    img_banner: campanha.img_banner,
    meta_doacoes: campanha.meta_doacoes.toNumber(),
    tp_doacao: campanha.tp_doacao,
    tp_campanha: campanha.tp_campanha,
    tp_localidade: campanha.tp_localidade,
  };
}
