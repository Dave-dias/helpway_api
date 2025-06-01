import { ApiProperty } from '@nestjs/swagger';

export class DoacaoResponseDto {
  @ApiProperty({ example: 1, description: 'ID da doação' })
  id: number;

  @ApiProperty({ example: 100.5, description: 'Valor da doação em reais' })
  valor: number;

  @ApiProperty({
    example: 10,
    description: 'ID do usuário que realizou a doação',
  })
  id_usuario: number;

  @ApiProperty({
    example: 5,
    description: 'ID da campanha que recebeu a doação',
  })
  id_campanha: number;
}
