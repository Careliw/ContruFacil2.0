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
    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/60 border-4 border-gray-200 mb-0 no-print animate-fade-in-up hover:shadow-2xl hover:shadow-gray-300/50 hover:border-gray-400 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-green-50/50 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -mr-20 -mt-20"></div>

      <h2 className="text-xl font-bold text-gray-800 mb-2 relative z-10 flex items-center gap-3">
        Valor do CUB (Custo Unitário Básico)
        <div className="h-1 w-12 bg-green-500 rounded-full hidden md:block"></div>
      </h2>
      <p className="text-gray-500 text-sm mb-6 flex items-center gap-1 relative z-10 max-w-lg">
        Defina o CUB para os cálculos. O valor ficará salvo no seu navegador para futuras utilizações.
      </p>

      <div className="flex flex-col md:flex-row md:items-end gap-6 relative z-10">
        <div className="w-full md:max-w-xs group/input">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1 flex items-center gap-2">
            Valor do CUB (R$) 
            <Tooltip content="Abrir site do Sinduscon para consulta" position="right" className="inline-block align-middle">
              <a 
                href="https://www.sinduscon-rio.com.br/wp/servicos/custo-unitario-basico/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-300 hover:text-green-500 transition-colors p-1 hover:bg-green-50 rounded-full"
              >
                <ExternalLink size={14} />
              </a>
            </Tooltip>
          </label>
          <Tooltip content="Digite o valor do CUB atual" position="bottom" className="w-full">
            <DecimalInput
              value={value}
              onChange={onSave} 
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all shadow-sm hover:border-green-300 group-hover/input:bg-white text-lg font-semibold text-gray-800 placeholder-gray-300"
            />
          </Tooltip>
        </div>
        <Tooltip content="Salvar valor permanentemente" className="w-full md:w-auto">
          <button
            onClick={() => onSave(value)}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 transition-all font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 active:scale-95 h-[52px] w-full md:w-auto tracking-wide group/btn"
          >
            <Save size={18} className="group-hover/btn:scale-110 transition-transform duration-200" />
            Salvar CUB
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default CubSection;