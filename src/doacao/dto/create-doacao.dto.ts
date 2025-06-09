import { ApiProperty } from '@nestjs/swagger';
import { CreateLocalizacaoDto } from './create-localizacao.dto';

export class CreateDoacaoDto {
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
    example: 'https://exemplo.com/imagem.jpg',
    description: 'URL da imagem ilustrativa da doação',
  })
  imagem_url: string;

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
    type: CreateLocalizacaoDto,
    description: 'Localização da doação',
    required: false,
  })
  localizacao: CreateLocalizacaoDto;
}
