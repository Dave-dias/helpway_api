import { Type } from 'class-transformer';
import { LocalizacaoUpdateDto } from './update-localizacao.dto';

export class UpdateDoacaoDto {
  titulo?: string;
  subtitulo?: string;
  descricao?: string;
  imagem_url?: string;
  meta_doacoes?: number;
  valor_levantado?: number;
  fg_dinheiro?: boolean;
  fg_alimentacao?: boolean;
  fg_vestuario?: boolean;
  @Type(() => LocalizacaoUpdateDto)
  localizacao?: LocalizacaoUpdateDto;
}
