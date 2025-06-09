import { CreateLocalizacaoDto } from './create-localizacao.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class LocalizacaoUpdateOnlyDto implements Partial<CreateLocalizacaoDto> {
  @ApiPropertyOptional({ example: -23.55, description: 'Latitude' })
  latitude?: number;

  @ApiPropertyOptional({ example: -46.63, description: 'Longitude' })
  longitude?: number;
}

export class LocalizacaoUpdateDto {
  @ApiPropertyOptional({
    type: LocalizacaoUpdateOnlyDto,
    description: 'Dados para atualizar a localização existente',
  })
  @Type(() => LocalizacaoUpdateOnlyDto)
  update?: Partial<CreateLocalizacaoDto>;

  @ApiPropertyOptional({
    type: CreateLocalizacaoDto,
    description: 'Dados para criar uma nova localização',
  })
  create?: CreateLocalizacaoDto;

  @ApiPropertyOptional({
    example: true,
    description: 'Se verdadeiro, deleta a localização associada',
  })
  delete?: boolean;
}
