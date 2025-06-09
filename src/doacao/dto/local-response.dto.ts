import { ApiProperty } from '@nestjs/swagger';

export class LocalResponseDto {
  @ApiProperty({ example: -23.55052, description: 'Latitude da localização' })
  latitude: number;

  @ApiProperty({ example: -46.633308, description: 'Longitude da localização' })
  longitude: number;
}
