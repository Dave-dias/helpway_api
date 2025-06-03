import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DoacaoService } from './doacao.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { DoacaoResponseDto } from './dto/doacao-response.dto';
import { toDoacaoResponseDto } from './mapper/doacao.mapper';

@ApiTags('doacao')
@Controller('doacao')
export class DoacaoController {
  constructor(private readonly doacaoService: DoacaoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova doação' })
  @ApiBody({ type: CreateDoacaoDto })
  @ApiResponse({
    status: 201,
    description: 'Doação criada com sucesso',
    type: DoacaoResponseDto,
  })
  async create(
    @Body() createDoacaoDto: CreateDoacaoDto,
  ): Promise<DoacaoResponseDto> {
    const doacao = await this.doacaoService.create(createDoacaoDto);

    return toDoacaoResponseDto(doacao);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as doações' })
  @ApiResponse({
    status: 200,
    description: 'Lista de doações',
    type: [DoacaoResponseDto],
  })
  async findAll(): Promise<DoacaoResponseDto[]> {
    const doacoes = await this.doacaoService.findAll();

    return doacoes.map((doacao) => toDoacaoResponseDto(doacao));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma doação pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da doação' })
  @ApiResponse({
    status: 200,
    description: 'Doação encontrada',
    type: DoacaoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Doação não encontrada' })
  async findOne(@Param('id') id: string): Promise<DoacaoResponseDto> {
    const doacao = await this.doacaoService.findOne(+id);

    if (!doacao) {
      throw new NotFoundException('Não foi encontrada nenhuma doação');
    }

    return toDoacaoResponseDto(doacao);
  }

  @Get('usuario/:idUsuario')
  @ApiOperation({ summary: 'Lista todas as doações de um usuário' })
  @ApiParam({ name: 'idUsuario', type: Number, description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de doações do usuário',
    type: [DoacaoResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma doação encontrada para o usuário',
  })
  async findAllByIdUsuario(
    @Param('idUsuario') idUsuario: string,
  ): Promise<DoacaoResponseDto[]> {
    const doacoes = await this.doacaoService.findAllByIdUsuario(+idUsuario);

    if (!doacoes || doacoes.length === 0) {
      throw new NotFoundException('Não foi encontrada nenhuma doação');
    }

    return doacoes.map((doacao) => toDoacaoResponseDto(doacao));
  }

  @Get('campanha/:idCampanha')
  @ApiOperation({ summary: 'Lista todas as doações de uma campanha' })
  @ApiParam({ name: 'idCampanha', type: Number, description: 'ID da campanha' })
  @ApiResponse({
    status: 200,
    description: 'Lista de doações da campanha',
    type: [DoacaoResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma doação encontrada para a campanha',
  })
  async findAllByIdCampanha(
    @Param('idCampanha') idCampanha: string,
  ): Promise<DoacaoResponseDto[]> {
    const doacoes = await this.doacaoService.findAllByIdCampanha(+idCampanha);

    if (!doacoes || doacoes.length === 0) {
      throw new NotFoundException('Não foi encontrada nenhuma doação');
    }

    return doacoes.map((doacao) => toDoacaoResponseDto(doacao));
  }
}
