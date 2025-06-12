import { ApiProperty } from '@nestjs/swagger';
import { LocalResponseDto } from './local-response.dto';

export class DoacaoResponseDto {
  @ApiProperty({ example: 1, description: 'ID da doação' })
  id: number;

  @ApiProperty({
    example: 'Campanha contra a fome',
    description: 'Título da doação',
  })
  titulo: string;

  @ApiProperty({
    example: 'Ajude famílias em situação de vulnerabilidade',
    description: 'Subtítulo da doação',
  })
  subtitulo: string;

  @ApiProperty({
    example: 'Estamos arrecadando para distribuir cestas básicas...',
    description: 'Descrição detalhada da doação',
  })
  descricao: string;

  @ApiProperty({
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
    description: 'Imagem em base64 codificada como string',
  })
  imagem_base64: string;

  @ApiProperty({ example: 1000.0, description: 'Meta de doações em reais' })
  meta_doacoes: number;

  @ApiProperty({ example: 250.5, description: 'Valor já arrecadado em reais' })
  valor_levantado: number;

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

  @ApiProperty({
    type: LocalResponseDto,
    description: 'Localização da doação',
    required: false,
  })
  localizacao?: LocalResponseDto;
}
