import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../../generated/prisma';
import { CreateUsuarioDto } from './dto/create-usuario-dto';
import { UsuarioResponseDto } from './dto/usuario-response.dto';

@ApiTags('Usuário')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    type: UsuarioResponseDto,
  })
  create(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado.',
    type: UsuarioResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async findOne(@Param('id') id: string): Promise<UsuarioResponseDto> {
    const idNumber = Number(id);

    if (isNaN(idNumber)) {
      throw new NotFoundException(`Usuário não foi encontrado`);
    }

    const usuario: Usuario | null = await this.usuarioService.findOne(idNumber);

    if (!usuario) {
      throw new NotFoundException(`Usuário não foi encontrado`);
    }

    return usuario;
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Busca um usuário pelo email' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado.',
    type: UsuarioResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async findByEmail(
    @Param('email') email: string,
  ): Promise<UsuarioResponseDto> {
    const usuario: Usuario | null =
      await this.usuarioService.findByEmail(email);

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com email: ${email}, não foi encontrado`,
      );
    }

    return usuario;
  }
}
