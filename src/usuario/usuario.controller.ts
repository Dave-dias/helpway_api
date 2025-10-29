import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario-dto';
import { UsuarioResponseDto } from './dto/usuario-response.dto';
import { toUsuarioResponseDto } from './mapper/usuario.mapper';
import { Usuario } from '@prisma/client';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { toDoacaoResponseDto } from '../doacao/mapper/doacao.mapper';
import { DoacaoResponseDto } from '../doacao/dto/doacao-response.dto';
import { DoacaoService } from '../doacao/doacao.service';

@ApiTags('Usuário')
@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly doacaoService: DoacaoService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    type: UsuarioResponseDto,
  })
  async create(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    const usuario: Usuario = await this.usuarioService.create(createUsuarioDto);

    return toUsuarioResponseDto(usuario);
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

    const usuario = await this.usuarioService.findOne(idNumber);

    if (!usuario) {
      throw new NotFoundException(`Usuário não foi encontrado`);
    }

    return toUsuarioResponseDto(usuario);
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
    const usuario = await this.usuarioService.findByEmail(email);

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com email: ${email}, não foi encontrado`,
      );
    }

    return toUsuarioResponseDto(usuario);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um usuário via Id' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiBody({ type: UpdateUsuarioDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado',
    type: UsuarioResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Senha atual informada não condiz com a senha cadastrada.',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    const oldUsuario = await this.usuarioService.findOne(+id);

    if (!oldUsuario) {
      throw new NotFoundException(`Usuário não foi encontrado`);
    }

    if (oldUsuario.senha !== updateUsuarioDto.senha_atual) {
      throw new UnauthorizedException(
        `Email ou senha informados são incorretos`,
      );
    }

    const usuario = await this.usuarioService.update(+id, updateUsuarioDto);

    return toUsuarioResponseDto(usuario);
  }

  @Get(':id/doacoes')
  @ApiOperation({
    summary: 'Listar todas as campanhas de doação criadas por um usuário',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do usuário (organizador)',
  })
  @ApiResponse({
    status: 200,
    description:
      'Lista de campanhas de doação do usuário retornada com sucesso.',
    type: [DoacaoResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async findDoacoesByUsuario(
    @Param('id') id: string,
  ): Promise<DoacaoResponseDto[]> {
    const usuario = await this.usuarioService.findOne(+id);
    if (!usuario) {
      throw new NotFoundException('Usuário não foi encontrado.');
    }

    const doacoes = await this.doacaoService.findByOrganizadorId(+id);

    return doacoes.map(toDoacaoResponseDto);
  }
}
