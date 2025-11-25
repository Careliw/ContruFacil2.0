import { AverbacaoItem, AverbacaoType } from './types';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const calculateItemValue = (item: AverbacaoItem, cubValue: number): number => {
  let areaToCalculate = 0;

  if (item.tipo === AverbacaoType.CONSTRUCAO_NOVA) {
    areaToCalculate = item.areaAtual;
  } else {
    // Acréscimo logic: Requires both fields to be filled (non-zero)
    // The user requested that calculation only happens when both fields are filled.
    if (item.areaAnterior === 0 || item.areaAtual === 0) {
      return 0;
    }
    // Difference between current and previous
    areaToCalculate = Math.max(0, item.areaAtual - item.areaAnterior);
  }

  return areaToCalculate * cubValue;
};