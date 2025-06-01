import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
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

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  senha: string;

  @ApiProperty({
    example: 1,
    description: 'Tipo de usuário (1 - Admin, 2 - Comum)',
  })
  tp_usuario: number;
}
