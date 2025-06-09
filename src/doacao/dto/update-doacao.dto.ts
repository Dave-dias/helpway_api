import { CreateLocalizacaoDto } from './create-localizacao.dto';

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

  localizacao?: {
    update?: Partial<CreateLocalizacaoDto>;
    create?: CreateLocalizacaoDto;
    delete?: boolean;
  };
}
