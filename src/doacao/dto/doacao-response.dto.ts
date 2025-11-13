import { ApiProperty } from '@nestjs/swagger';

export class DoacaoResponseDto {
  @ApiProperty({ example: 1, description: 'ID da doação' })
  id: number;

  @ApiProperty({
    example: '1',
    description: 'ID da campanha',
  })
  id_campanha: number;

  @ApiProperty({
    example: '1',
    description: 'ID usuário organizador',
  })
  id_doador: number;

  @ApiProperty({
    example: 'Campanha contra a fome',
    description: 'Título da campanha',
  })
  titulo_campanha?: string;

  @ApiProperty({
    example: 'Ana Paula',
    description: 'Nome do organizador da campanha',
  })
  nome_organizador?: string;

  @ApiProperty({ example: 250.5, description: 'Valor já arrecadado em reais' })
  valor: number;

  @ApiProperty({ example: true, description: 'Indica se é doação em dinheiro' })
  fg_dinheiro: boolean;

  @ApiProperty({
    example: false,
    description: 'Indica se é doação de alimentação',
  })
  fg_alimentacao: boolean;

  @ApiProperty({
    example: false,
    description: 'Indica se é doação de vestuário',
  })
  fg_vestuario: boolean;
}
