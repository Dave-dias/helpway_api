import { LocalEntity } from './local.entity';
import { DoacaoEntity } from '../../doacao/entity/doacao.entity';

export class CampanhaEntity {
  id: number;
  id_organizador: number;
  titulo: string;
  subtitulo: string;
  descricao: string;
  imagem_base64: string;
  meta_doacoes: number;
  chave_pix: string | null;
  fg_dinheiro: boolean;
  fg_alimentacao: boolean;
  fg_vestuario: boolean;
  localizacao?: LocalEntity;
  doacoes?: DoacaoEntity[];
}
