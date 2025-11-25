export enum AverbacaoType {
  ACRESCIMO = 'Acréscimo',
  CONSTRUCAO_NOVA = 'Construção Nova',
}

export interface AverbacaoItem {
  id: string;
  descricao: string;
  tipo: AverbacaoType;
  areaAnterior: number;
  areaAtual: number;
}

export interface AppState {
  cubValue: number;
  items: AverbacaoItem[];
}