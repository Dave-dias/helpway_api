import { Type } from 'class-transformer';
import { LocalizacaoUpdateDto } from './update-localizacao.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

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

  @ApiPropertyOptional({ type: LocalizacaoUpdateDto })
  @Type(() => LocalizacaoUpdateDto)
  localizacao?: LocalizacaoUpdateDto;
}
