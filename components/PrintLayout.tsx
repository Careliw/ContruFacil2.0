import React from 'react';
import { AverbacaoItem, AverbacaoType } from '../types';
import { calculateItemValue, formatCurrency, formatNumber } from '../utils';

interface PrintLayoutProps {
  cubValue: number;
  items: AverbacaoItem[];
}

const PrintLayout: React.FC<PrintLayoutProps> = ({ cubValue, items }) => {
  const totalValue = items.reduce((acc, item) => acc + calculateItemValue(item, cubValue), 0);

  return (
    <div className="hidden print-only w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Memória de Cálculo</h1>

      <div className="space-y-6">
        {items.map((item, index) => {
          const value = calculateItemValue(item, cubValue);
          const areaCalc = item.tipo === AverbacaoType.CONSTRUCAO_NOVA 
            ? `${formatNumber(item.areaAtual)} m²` 
            : `(${formatNumber(item.areaAtual)} m² - ${formatNumber(item.areaAnterior)} m²)`;

          return (
            <div key={item.id} className="border-b border-gray-100 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Item {index + 1}: Sem identificação</h3>
                  <p className="text-gray-600 text-sm">{item.descricao || "Construção sem nome"}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{formatCurrency(value)}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{item.tipo}</span>
                <span>
                  {areaCalc} × {formatCurrency(cubValue)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

       {/* Grand Total - Not explicitly shown as a total sum in video print view but implied by "Memória de cálculo". 
           However, looking closely at the video end, it shows individual item blocks. 
           I will stick to the video which shows a single item card in the print view.
       */}

       {/* Warning Box in Print View */}
      <div className="mt-12 bg-orange-50 border border-orange-200 p-4 rounded text-center">
        <p className="font-bold text-gray-700 text-sm mb-1">Este memória de cálculo não possui valor legal.</p>
        <p className="text-gray-500 text-xs">
          Trata-se apenas de uma ferramenta de auxílio na elaboração de contas. Verifique se o valor do CUB corresponde ao mês vigente.
        </p>
      </div>

      <div className="fixed bottom-0 left-0 w-full text-center text-gray-400 text-xs py-4 border-t border-gray-100 mt-8">
        Desenvolvido por Wesley Careli - v1.1.0<br/>
        Todos os direitos reservados.
      </div>
    </div>
  );
};

export default PrintLayout;