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
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeDasharray="3 3" />
    <rect x="9" y="9" width="13" height="13" rx="2" />
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
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-gray-200/60 border-4 border-gray-200 mb-0 no-print animate-fade-in-up delay-100 hover:shadow-2xl hover:shadow-gray-300/50 hover:border-gray-400 transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
        <div>
           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
             Lançamento de Averbações
             <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold shadow-sm">Calculadora</span>
           </h2>
           <p className="text-gray-500 text-sm mt-1">
             Adicione, preencha e calcule as informações de cada averbação.
           </p>
        </div>
        <Tooltip content="Gerar relatório para impressão" className="w-full md:w-auto">
          <button
            onClick={onPrint}
            className="flex items-center justify-center gap-2 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 font-medium px-6 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm hover:shadow-md w-full md:w-auto group"
          >
            <Printer size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            <span className="tracking-wide">Imprimir Cálculo</span>
          </button>
        </Tooltip>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <Tooltip content="Adicionar nova linha" className="flex-1 md:flex-none">
          <button
            onClick={onAddItem}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 transition-all font-semibold text-sm shadow-lg shadow-green-500/20 hover:shadow-green-500/30 active:scale-95 w-full md:w-auto tracking-wide group"
          >
            <div className="bg-white/20 p-1 rounded-full group-hover:scale-110 transition-transform">
               <Plus size={14} strokeWidth={3} />
            </div>
            Adicionar Linha
          </button>
        </Tooltip>
        <Tooltip content="Remover todas as linhas" className="flex-1 md:flex-none">
          <button
            onClick={onClearTable}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-red-500 border border-red-100 rounded-xl hover:bg-red-50 hover:border-red-200 active:bg-red-100 transition-all font-medium text-sm shadow-sm hover:shadow-md active:scale-95 w-full md:w-auto group"
          >
            <Trash2 size={16} className="group-hover:rotate-12 transition-transform" />
            Limpar Tabela
          </button>
        </Tooltip>
      </div>

      <div className="overflow-x-auto min-h-[300px] pb-4 rounded-xl border border-gray-100 bg-gray-50/30 shadow-inner"> 
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200 text-left bg-gray-50/80">
              <th className="py-4 pl-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[20%]">Nº da Construção</th>
              <th className="py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[20%]">Tipo de Averbação</th>
              <th className="py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[15%]">Área Anterior (m²)</th>
              <th className="py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[15%]">Área Atual (m²)</th>
              <th className="py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[20%]">Valor Calculado (R$)</th>
              <th className="py-4 pr-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right w-[10%]">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {items.map((item) => {
              const value = calculateItemValue(item, cubValue);
              const isNewConstruction = item.tipo === AverbacaoType.CONSTRUCAO_NOVA;
              const formattedValue = formatCurrency(value);

              return (
                <tr key={item.id} className="group hover:bg-green-50/30 transition-colors duration-300">
                  <td className="py-4 pl-6 pr-4">
                    <Tooltip content="Identificação da obra" position="top" className="w-full">
                      <input
                        type="text"
                        value={item.descricao}
                        onChange={(e) => onUpdateItem(item.id, 'descricao', e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ex: Casa 01"
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-gray-700 transition-all hover:border-green-300 placeholder-gray-300 shadow-sm"
                      />
                    </Tooltip>
                  </td>
                  <td className="py-4 pr-4">
                    <Tooltip content="Selecione o tipo" position="top" className="w-full">
                      <CustomSelect 
                        value={item.tipo}
                        options={[AverbacaoType.ACRESCIMO, AverbacaoType.CONSTRUCAO_NOVA]}
                        onChange={(val) => onUpdateItem(item.id, 'tipo', val as AverbacaoType)}
                        onKeyDown={handleKeyDown}
                      />
                    </Tooltip>
                  </td>
                  <td className="py-4 pr-4">
                    <Tooltip content={isNewConstruction ? "Desabilitado para construção nova" : "Área existente"} position="top" className="w-full">
                      <div className={isNewConstruction ? "opacity-40 cursor-not-allowed grayscale" : ""}>
                         <DecimalInput
                            value={item.areaAnterior}
                            onChange={(val) => onUpdateItem(item.id, 'areaAnterior', val)}
                            disabled={isNewConstruction}
                            className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-right transition-all bg-white shadow-sm ${isNewConstruction ? 'border-gray-100 text-gray-300 bg-gray-50' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}
                        />
                      </div>
                    </Tooltip>
                  </td>
                  <td className="py-4 pr-4">
                    <Tooltip content="Área final" position="top" className="w-full">
                      <DecimalInput
                        value={item.areaAtual}
                        onChange={(val) => onUpdateItem(item.id, 'areaAtual', val)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-right text-gray-700 transition-all hover:border-green-300 shadow-sm"
                      />
                    </Tooltip>
                  </td>
                  <td className="py-4 pr-4">
                    <Tooltip content="Resultado final" position="top" className="w-full">
                      <div className="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm text-right font-bold text-gray-700 transition-all group-hover:bg-white group-hover:border-green-200 group-hover:text-green-700 cursor-default shadow-sm group-hover:shadow-md">
                        {formattedValue}
                      </div>
                    </Tooltip>
                  </td>
                  <td className="py-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <Tooltip content="Copiar">
                        <button
                          onClick={() => onCopyValue(formattedValue)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all active:scale-95 transform hover:scale-110"
                        >
                          <Copy size={16} />
                        </button>
                      </Tooltip>
                      <Tooltip content="Duplicar">
                        <button
                          onClick={() => onDuplicateItem(item)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-95 transform hover:scale-110"
                        >
                          <DuplicateIcon size={16} />
                        </button>
                      </Tooltip>
                      <Tooltip content="Excluir">
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-95 transform hover:scale-110"
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
                <td colSpan={6} className="py-24 text-center">
                  <div className="flex flex-col items-center justify-center opacity-40 hover:opacity-60 transition-opacity">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                       <Plus size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-semibold text-lg">Tabela Vazia</p>
                    <p className="text-sm text-gray-400 mt-1">Clique em "Adicionar Linha" para iniciar os cálculos</p>
                  </div>
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