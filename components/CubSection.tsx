import React from 'react';
import { Save, ExternalLink } from 'lucide-react';
import Tooltip from './Tooltip';
import DecimalInput from './DecimalInput';

interface CubSectionProps {
  value: number;
  onSave: (val: number) => void;
}

const CubSection: React.FC<CubSectionProps> = ({ value, onSave }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-0 no-print animate-fade-in-up hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Valor do CUB (Custo Unitário Básico)</h2>
      <p className="text-gray-500 text-sm mb-6 flex items-center gap-1">
        Defina o CUB para os cálculos. O valor ficará salvo no seu navegador. 
      </p>

      <div className="flex flex-col md:flex-row md:items-end gap-6">
        <div className="w-full md:max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valor do CUB (R$) 
            <Tooltip content="Abrir site do Sinduscon" position="right" className="inline-block ml-1 align-middle">
              <a href="https://www.sinduscon-rio.com.br/wp/servicos/custo-unitario-basico/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-600 transition-colors">
                <ExternalLink size={12} />
              </a>
            </Tooltip>
          </label>
          <Tooltip content="Digite o valor do CUB atual" position="bottom" className="w-full">
            <DecimalInput
              value={value}
              onChange={onSave} // Auto-updates parent state, but button saves to LS
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all shadow-sm hover:border-gray-400 text-lg font-medium text-gray-700 placeholder-gray-300"
            />
          </Tooltip>
        </div>
        <Tooltip content="Salvar valor para usos futuros" className="w-full md:w-auto">
          <button
            onClick={() => onSave(value)}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 active:bg-green-700 transition-all font-medium shadow-md hover:shadow-lg active:scale-95 h-[52px] w-full md:w-auto"
          >
            <Save size={18} />
            Salvar CUB
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default CubSection;