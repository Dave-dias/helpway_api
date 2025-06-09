import { CreateLocalizacaoDto } from './create-localizacao.dto';

export class LocalizacaoUpdateDto {
  update?: Partial<CreateLocalizacaoDto>;
  create?: CreateLocalizacaoDto;
  delete?: boolean;
}
