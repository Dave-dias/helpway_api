import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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
import { CampanhaResponseDto } from './dto/campanha-response.dto';
import { toCampanhaResponseDto } from './mapper/campanha.mapper';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import { UpdateLocalizacaoDto } from './dto/update-localizacao.dto';
import { CampanhaService } from './campanha.service';
import { CreateCampanhaDto } from './dto/create-campanha.dto';

@ApiTags('Campanha')
@Controller('campanha')
export class CampanhaController {
  constructor(private readonly campanhaService: CampanhaService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova campanha' })
  @ApiBody({ type: CreateCampanhaDto })
  @ApiResponse({
    status: 201,
    description: 'Campanha criada com sucesso',
    type: CampanhaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possivel criar a campanha',
  })
  async create(
    @Body() createDoacaoDto: CreateCampanhaDto,
  ): Promise<CampanhaResponseDto> {
    const campanha = await this.campanhaService.create(createDoacaoDto);

    if (!campanha) {
      throw new BadRequestException('Não foi possivel criar a campanha');
    }

    return toCampanhaResponseDto(campanha);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as campanhas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de campanhas',
    type: [CampanhaResponseDto],
  })
  async findAll(): Promise<CampanhaResponseDto[]> {
    const doacoes = await this.campanhaService.findAll();

    return doacoes
      .filter((campanha) => campanha !== null)
      .map((campanha) => toCampanhaResponseDto(campanha));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma campanha pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da campanha' })
  @ApiResponse({
    status: 200,
    description: 'Campanha encontrada',
    type: CampanhaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Campanha não encontrada' })
  async findOne(@Param('id') id: string): Promise<CampanhaResponseDto> {
    const campanha = await this.campanhaService.findOne(+id);

    if (!campanha) {
      throw new NotFoundException('Não foi encontrada nenhuma campanha');
    }

    return toCampanhaResponseDto(campanha);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma campanha existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da campanha' })
  @ApiBody({ type: UpdateCampanhaDto })
  @ApiResponse({
    status: 200,
    description: 'Campanha atualizada com sucesso',
    type: CampanhaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Campanha não encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCampanhaDto,
  ): Promise<CampanhaResponseDto> {
    const campanha = await this.campanhaService.updateDoacao(+id, updateDto);

    if (!campanha) {
      throw new NotFoundException('Não foi encontrada nenhuma campanha');
    }

    return toCampanhaResponseDto(campanha);
  }

  @Patch(':id/localizacao')
  @ApiOperation({ summary: 'Cria ou atualiza a localização da campanha' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da campanha' })
  @ApiBody({ type: UpdateLocalizacaoDto })
  @ApiResponse({
    status: 200,
    description: 'Localização atualizada com sucesso',
    type: CampanhaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Campanha não encontrada' })
  async updateLocalizacao(
    @Param('id') id: string,
    @Body() body: UpdateLocalizacaoDto,
  ): Promise<CampanhaResponseDto | null> {
    const campanha = await this.campanhaService.updateLocalizacao(+id, body);

    if (!campanha) {
      throw new NotFoundException('Não foi encontrada nenhuma campanha');
    }

    return campanha ? toCampanhaResponseDto(campanha) : null;
  }

  @Delete(':id/localizacao')
  @ApiOperation({ summary: 'Remove a localização associada à campanha' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da campanha' })
  @ApiResponse({ status: 200, description: 'Localização removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Campanha não encontrada' })
  async deleteLocalizacao(@Param('id') id: string): Promise<void> {
    const success = await this.campanhaService.deleteLocalizacao(+id);

    if (!success) {
      throw new NotFoundException('Campanha não encontrada ou sem localização');
    }
  }
}
