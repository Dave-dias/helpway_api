import { ApiProperty } from '@nestjs/swagger';
import { CreateLocalizacaoDto } from './create-localizacao.dto';

export class CreateCampanhaDto {
  @ApiProperty({
    example: '1',
    description: 'ID usuário organizador',
  })
  id_organizador: number;

  @ApiProperty({
    example: 'Campanha contra a fome',
    description: 'Título da campanha',
  })
  titulo: string;

  @ApiProperty({
    example: 'Ajude famílias em situação de vulnerabilidade',
    description: 'Subtítulo da campanha',
  })
  subtitulo: string;

  @ApiProperty({
    example: 'Estamos arrecadando para distribuir cestas básicas...',
    description: 'Descrição detalhada da campanha',
  })
  descricao: string;

  @ApiProperty({
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
    description: 'Imagem em base64 codificada como string',
  })
  imagem_base64: string;

  @ApiProperty({ example: 1000.0, description: 'Meta de doações em reais' })
  meta_doacoes: number;

  @ApiProperty({
    example: true,
    description: 'Indica se é campanha em dinheiro',
  })
  fg_dinheiro: boolean;

  @ApiProperty({
    example: false,
    description: 'Indica se é campanha de alimentação',
  })
  fg_alimentacao: boolean;

  @ApiProperty({
    example: false,
    description: 'Indica se é campanha de vestuário',
  })
  fg_vestuario: boolean;

  @ApiProperty({
    type: CreateLocalizacaoDto,
    description: 'Localização da campanha',
    required: false,
  })
  localizacao: CreateLocalizacaoDto;
}
