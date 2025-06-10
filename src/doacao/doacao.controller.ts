import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
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
import { UpdateDoacaoDto } from './dto/update-doacao.dto';
import { UpdateLocalizacaoDto } from './dto/update-localizacao.dto';

@ApiTags('Doação')
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
  @ApiResponse({ status: 400, description: 'Não foi possivel criar a doação' })
  async create(
    @Body() createDoacaoDto: CreateDoacaoDto,
  ): Promise<DoacaoResponseDto> {
    const doacao = await this.doacaoService.create(createDoacaoDto);

    if (!doacao) {
      throw new BadRequestException('Não foi possivel criar a doação');
    }

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

    return doacoes
      .filter((doacao) => doacao !== null)
      .map((doacao) => toDoacaoResponseDto(doacao));
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

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma doação existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da doação' })
  @ApiBody({ type: UpdateDoacaoDto })
  @ApiResponse({
    status: 200,
    description: 'Doação atualizada com sucesso',
    type: DoacaoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Doação não encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDoacaoDto,
  ): Promise<DoacaoResponseDto> {
    const doacao = await this.doacaoService.updateDoacao(+id, updateDto);

    if (!doacao) {
      throw new NotFoundException('Não foi encontrada nenhuma doação');
    }

    return toDoacaoResponseDto(doacao);
  }

  @Patch(':id/localizacao')
  @ApiOperation({ summary: 'Cria ou atualiza a localização da doação' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da doação' })
  @ApiBody({ type: UpdateLocalizacaoDto })
  @ApiResponse({
    status: 200,
    description: 'Localização atualizada com sucesso',
    type: DoacaoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Doação não encontrada' })
  async updateLocalizacao(
    @Param('id') id: string,
    @Body() body: UpdateLocalizacaoDto,
  ): Promise<DoacaoResponseDto | null> {
    const doacao = await this.doacaoService.updateLocalizacao(+id, body);

    if (!doacao) {
      throw new NotFoundException('Não foi encontrada nenhuma doação');
    }

    return doacao ? toDoacaoResponseDto(doacao) : null;
  }

  @Delete(':id/localizacao')
  @ApiOperation({ summary: 'Remove a localização associada à doação' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da doação' })
  @ApiResponse({ status: 200, description: 'Localização removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Doação não encontrada' })
  async deleteLocalizacao(@Param('id') id: string): Promise<void> {
    const success = await this.doacaoService.deleteLocalizacao(+id);

    if (!success) {
      throw new NotFoundException('Doação não encontrada ou sem localização');
    }
  }
}
