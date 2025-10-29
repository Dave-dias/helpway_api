import { LocalEntity } from './local.entity';

export class DoacaoEntity {
  id: number;
  id_organizador: number;
  titulo: string;
  subtitulo: string;
  descricao: string;
  imagem_base64: string;
  meta_doacoes: number;
  valor_levantado: number;
  fg_dinheiro: boolean;
  fg_alimentacao: boolean;
  fg_vestuario: boolean;
  localizacao?: LocalEntity;
}
