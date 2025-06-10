import { CreateLocalizacaoDto } from './create-localizacao.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateLocalizacaoDto {
  @ApiProperty({ example: -23.55052, description: 'Latitude da localização' })
  latitude: number;

  @ApiProperty({ example: -46.633308, description: 'Longitude da localização' })
  longitude: number;
}
