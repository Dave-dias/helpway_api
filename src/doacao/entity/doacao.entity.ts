export class DoacaoEntity {
  id: number;
  id_campanha: number;
  id_doador: number;
  titulo_campanha?: string;
  nome_organizador?: string;
  valor: number;
  fg_dinheiro: boolean;
  fg_alimentacao: boolean;
  fg_vestuario: boolean;
}
