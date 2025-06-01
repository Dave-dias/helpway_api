import { ApiProperty } from '@nestjs/swagger';

export class CreateDoacaoDto {
  @ApiProperty({ example: 150.75, description: 'Valor da doação' })
  valor: number;

  @ApiProperty({ example: 1, description: 'ID do usuário que fez a doação' })
  id_usuario: number;

  @ApiProperty({
    example: 2,
    description: 'ID da campanha que recebeu a doação',
  })
  id_campanha: number;
}
