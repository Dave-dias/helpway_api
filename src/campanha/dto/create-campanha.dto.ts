import { ApiProperty } from '@nestjs/swagger';

export class CreateCampanhaDto {
  @ApiProperty({
    example: 'Campanha de Natal',
    description: 'Título da campanha',
  })
  titulo: string;

  @ApiProperty({
    example: 'Ajude as famílias carentes neste Natal',
    description: 'Subtítulo da campanha',
  })
  subtitulo: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: 'URL do logotipo da campanha',
  })
  img_logotipo: string;

  @ApiProperty({
    example: 'https://example.com/banner.png',
    description: 'URL do banner da campanha',
  })
  img_banner: string;

  @ApiProperty({
    example: 100000,
    description: 'Meta de doações para a campanha',
  })
  meta_doacoes: number;

  @ApiProperty({
    example: 1,
    description: 'Tipo da campanha (1 - Online, 2 - Local)',
  })
  tp_campanha: number;

  @ApiProperty({
    example: 1,
    description: 'Tipo da doção (1 - Dinheiro, 2 - Alimento, 3 - Vestimentas)',
  })
  tp_doacao: number;

  @ApiProperty({
    example: 2,
    description:
      'Tipo de localidade da campanha (1 - Regional, 2 - Nacional, 3 - Mundial)',
  })
  tp_localidade: number;
}
