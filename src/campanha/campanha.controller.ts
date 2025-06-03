import {
  Body,
  Controller,
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
import { CampanhaService } from './campanha.service';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import { Campanha } from '@prisma/client';
import { CampanhaResponseDto } from './dto/campanha-response.dto';
import { toCampanhaResponseDto } from './mapper/doacao.mapper';

@ApiTags('campanha')
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
  async create(
    @Body() createCampanhaDto: CreateCampanhaDto,
  ): Promise<CampanhaResponseDto> {
    const campanha = await this.campanhaService.create(createCampanhaDto);

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
    const campanhas = await this.campanhaService.findAll();

    if (!campanhas || campanhas.length === 0) {
      throw new NotFoundException('Nenhuma campanha encontrada');
    }

    return campanhas.map((campanha) => toCampanhaResponseDto(campanha));
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
      throw new NotFoundException('Campanha não encontrada');
    }

    return toCampanhaResponseDto(campanha);
  }

  @Get('localidade/:tpLocalidade')
  @ApiOperation({ summary: 'Lista campanhas por localidade' })
  @ApiParam({
    name: 'tpLocalidade',
    type: Number,
    description: 'Tipo da localidade',
  })
  @ApiResponse({
    status: 200,
    description: 'Campanhas encontradas',
    type: [CampanhaResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Nenhuma campanha encontrada' })
  async findAllByLocalidade(
    @Param('tpLocalidade') tpLocalidade: string,
  ): Promise<CampanhaResponseDto[]> {
    const tpLocalidadeNumber = Number(tpLocalidade);

    if (isNaN(tpLocalidadeNumber)) {
      throw new NotFoundException(`Nenhuma campanha foi encontrada`);
    }

    const campanhas: Campanha[] =
      await this.campanhaService.findAllByLocalidade(tpLocalidadeNumber);

    if (!campanhas || campanhas.length === 0) {
      throw new NotFoundException(`Nenhuma campanha foi encontrada`);
    }

    return campanhas.map((campanha) => toCampanhaResponseDto(campanha));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma campanha pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da campanha' })
  @ApiBody({ type: UpdateCampanhaDto })
  @ApiResponse({
    status: 200,
    description: 'Campanha atualizada',
    type: CampanhaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Campanha não encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateCampanhaDto: UpdateCampanhaDto,
  ): Promise<CampanhaResponseDto> {
    const idNumber = Number(id);

    if (isNaN(idNumber)) {
      throw new NotFoundException(`Nenhuma campanha foi encontrada`);
    }

    const campanha = await this.campanhaService.update(
      idNumber,
      updateCampanhaDto,
    );

    return toCampanhaResponseDto(campanha);
  }
}
