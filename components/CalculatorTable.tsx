import React from 'react';
import { Plus, Trash2, Printer, Copy } from 'lucide-react';
import { AverbacaoItem, AverbacaoType } from '../types';
import { calculateItemValue, formatCurrency } from '../utils';
import Tooltip from './Tooltip';
import DecimalInput from './DecimalInput';
import CustomSelect from './CustomSelect';

interface CalculatorTableProps {
  cubValue: number;
  items: AverbacaoItem[];
  onAddItem: () => void;
  onClearTable: () => void;
  onUpdateItem: (id: string, field: keyof AverbacaoItem, value: any) => void;
  onDeleteItem: (id: string) => void;
  onDuplicateItem: (item: AverbacaoItem) => void;
  onPrint: () => void;
  onCopyValue: (value: string) => void;
}

// Custom Icon for Duplicate (Square with + and dotted background)
const DuplicateIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Dotted Background (Top Left) */}
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeDasharray="3 3" />
    
    {/* Solid Foreground (Bottom Right) */}
    <rect x="9" y="9" width="13" height="13" rx="2" />
    
    {/* Plus Sign */}
    <path d="M15.5 12.5v6" />
    <path d="M12.5 15.5h6" />
  </svg>
);

const CalculatorTable: React.FC<CalculatorTableProps> = ({
  cubValue,
  items,
  onAddItem,
  onClearTable,
  onUpdateItem,
  onDeleteItem,
  onDuplicateItem,
  onPrint,
  onCopyValue,
}) => {

  // Helper to handle Enter key navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = document.body; 
      const query = 'input:not([disabled]), select:not([disabled]), [tabindex="0"]';
      const elements = Array.from(form.querySelectorAll(query)) as HTMLElement[];
      
      const index = elements.indexOf(e.currentTarget as HTMLElement);
      
      if (index > -1 && index < elements.length - 1) {
        elements[index + 1].focus();
      }
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 mb-0 no-print animate-fade-in-up delay-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Lançamento de Averbações</h2>
        <Tooltip content="Gerar visualização para impressão" className="w-full md:w-auto">
          <button
            onClick={onPrint}
            className="flex items-center justify-center gap-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 font-medium px-6 py-2.5 rounded-md transition-all active:scale-95 shadow-sm w-full md:w-auto"
          >
            <Printer size={18} />
            Imprimir Cálculo
          </button>
        </Tooltip>
      </div>
      
      <p className="text-gray-500 text-sm mb-6 -mt-6">
        Adicione, preencha e calcule as informações de cada averbação.
      </p>

      <div className="flex flex-wrap gap-4 mb-8">
        <Tooltip content="Adicionar nova linha de cálculo" className="flex-1 md:flex-none">
          <button
            onClick={onAddItem}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-500 text-white rounded-md hover:bg-green-600 active:bg-green-700 transition-all font-medium text-sm shadow-md hover:shadow-lg active:scale-95 w-full md:w-auto"
          >
            <Plus size={16} />
            Adicionar Linha
          </button>
        </Tooltip>
        <Tooltip content="Remover todas as linhas da tabela" className="flex-1 md:flex-none">
          <button
            onClick={onClearTable}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-500 text-white rounded-md hover:bg-red-600 active:bg-red-700 transition-all font-medium text-sm shadow-md hover:shadow-lg active:scale-95 w-full md:w-auto"
          >
            <Trash2 size={16} />
            Limpar Tabela
          </button>
        </Tooltip>
      </div>

      <div className="overflow-x-auto min-h-[300px] pb-4"> 
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[20%]">Nº da Construção</th>
              <th className="py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[20%]">Tipo de Averbação</th>
              <th className="py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">Área Anterior (m²)</th>
              <th className="py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">Área Atual (m²)</th>
              <th className="py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[20%]">Valor Calculado (R$)</th>
              <th className="py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right w-[10%]">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => {
              const value = calculateItemValue(item, cubValue);
              const isNewConstruction = item.tipo === AverbacaoType.CONSTRUCAO_NOVA;
              const formattedValue = formatCurrency(value);

              return (
                <tr key={item.id} className="group hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 pr-4">
                    <Tooltip content="Identificação da obra (Lote, Casa, etc)" position="top" className="w-full">
                      <input
                        type="text"
                        value={item.descricao}
                        onChange={(e) => onUpdateItem(item.id, 'descricao', e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ex: Casa 01, Bloco A"
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-gray-600 transition-shadow hover:border-gray-300 placeholder-gray-300"
                      />
                    </Tooltip>
                  </td>
                  <td className="py-4 pr-4">
                    <Tooltip content="Selecione o tipo de cálculo" position="top" className="w-full">
                      <CustomSelect 
                        value={item.tipo}
                        options={[AverbacaoType.ACRESCIMO, AverbacaoType.CONSTRUCAO_NOVA]}
                        onChange={(val) => onUpdateItem(item.id, 'tipo', val as AverbacaoType)}
                        onKeyDown={handleKeyDown}
                      />
                    </Tooltip>
                  </td>
                  <td className="py-4 pr-4">
                    <Tooltip content={isNewConstruction ? "Não aplicável para construção nova" : "Área já existente antes do acréscimo"} position="top" className="w-full">
                      <DecimalInput
                        value={item.areaAnterior}
                        onChange={(val) => onUpdateItem(item.id, 'areaAnterior', val)}
                        disabled={isNewConstruction}
                        className={`w-full px-3 py-2.5 border border-gray-200 rounded text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-right transition-all bg-white ${isNewConstruction ? 'text-gray-300' : 'text-gray-600 hover:border-gray-300'}`}
                      />
                    </Tooltip>
                  </td>
                  <td className="py-4 pr-4">
                    <Tooltip content="Área total final da construção" position="top" className="w-full">
                      <DecimalInput
                        value={item.areaAtual}
                        onChange={(val) => onUpdateItem(item.id, 'areaAtual', val)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-right text-gray-600 transition-shadow hover:border-gray-300"
                      />
                    </Tooltip>
                  </td>
                  <td className="py-4 pr-4">
                    <Tooltip content="Resultado baseado no CUB" position="top" className="w-full">
                      <div className="w-full px-3 py-2.5 bg-white border border-transparent rounded text-sm text-right font-medium text-gray-800 transition-colors group-hover:border-gray-200 cursor-default">
                        {formattedValue}
                      </div>
                    </Tooltip>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Tooltip content="Copiar valor calculado">
                        <button
                          onClick={() => onCopyValue(formattedValue)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all active:scale-95 transform hover:scale-110"
                        >
                          <Copy size={16} />
                        </button>
                      </Tooltip>
                      <Tooltip content="Duplicar esta linha">
                        <button
                          onClick={() => onDuplicateItem(item)}
                          className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all active:scale-95 transform hover:scale-110"
                        >
                          <DuplicateIcon size={16} />
                        </button>
                      </Tooltip>
                      <Tooltip content="Excluir esta linha">
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-all active:scale-95 transform hover:scale-110"
                        >
                          <Trash2 size={16} />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="py-16 text-center text-gray-400 text-sm italic bg-white rounded-lg border border-dashed border-gray-200 mt-2">
                  Nenhum item adicionado. Clique em "Adicionar Linha" para começar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalculatorTable;