import { ApiProperty } from '@nestjs/swagger';

export class LoginUsuarioDto {
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
}
