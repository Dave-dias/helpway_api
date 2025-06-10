import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto {
  @ApiProperty({
    example: 'Ana Paula De Souza',
    description: 'Nome do usuário',
  })
  nome?: string;

  @ApiProperty({
    example: 'exemplo@gmail.com',
    description: 'Email do usuário',
  })
  email?: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha atual do usuário',
  })
  senha_atual?: string;

  @ApiProperty({
    example: '654321',
    description: 'Nova senha do usuário',
  })
  nova_senha?: string;

  @ApiProperty({
    description: 'Imagem do usuario como string',
  })
  img_usuario?: string;

  @ApiProperty({
    example: '2025-06-01T15:00:00Z',
    description: 'Data de nascimento em formato ISO 8601',
  })
  dt_nascimento?: Date;

  @ApiProperty({
    example: 1,
    description: 'Tipo de usuário (1 - Doador, 2 - Destinatario)',
  })
  tp_usuario?: number;
}
