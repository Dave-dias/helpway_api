import { Local } from '@prisma/client';
import { LocalEntity } from './local.entity';

export class DoacaoEntity {
  id: number;
  titulo: string;
  subtitulo: string;
  descricao: string;
  imagem_url: string;
  meta_doacoes: number;
  valor_levantado: number;
  fg_dinheiro: boolean;
  fg_alimentacao: boolean;
  fg_vestuario: boolean;
  localizacao?: LocalEntity;
}
