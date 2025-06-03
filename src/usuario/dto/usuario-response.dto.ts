import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UsuarioResponseDto {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  id: number;

  @ApiProperty({
    example: 'Ana Paula De Souza',
    description: 'Nome do usuário',
  })
  nome: string;

  @ApiProperty({
    example: 'exemplo@gmail.com',
    description: 'Email do usuário',
  })
  email: string;

  @Exclude()
  senha: string;

  @ApiProperty({
    example: 1,
    description: 'Tipo de usuário (1 - Doador, 2 - Destinatario)',
  })
  tp_usuario: number;

  constructor(partial: Partial<UsuarioResponseDto>) {
    Object.assign(this, partial);
  }
}
