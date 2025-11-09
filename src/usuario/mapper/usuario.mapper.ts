import { Usuario } from '@prisma/client';
import { UsuarioResponseDto } from '../dto/usuario-response.dto';

export function toUsuarioResponseDto(usuario: Usuario): UsuarioResponseDto {
  return {
    ...usuario,
  };
}
