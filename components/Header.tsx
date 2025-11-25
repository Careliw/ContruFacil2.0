import React from 'react';
import { HelpCircle } from 'lucide-react';
import AppLogo from './AppLogo';
import Tooltip from './Tooltip';

interface HeaderProps {
  onOpenHelp: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenHelp }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm no-print transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-default select-none">
           <div className="bg-gradient-to-br from-green-500 to-green-600 p-2.5 rounded-xl text-white shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
             <AppLogo size={22} />
           </div>
           <div>
             <h1 className="text-xl font-bold text-gray-800 leading-tight tracking-tight group-hover:text-green-700 transition-colors duration-300">ConstruFacil</h1>
             <p className="text-[11px] text-gray-500 font-medium tracking-wide uppercase opacity-80 group-hover:opacity-100 transition-opacity">Calculadora de Averbação</p>
           </div>
        </div>
        
        <Tooltip content="Abrir página de ajuda" position="left">
          <button 
            onClick={onOpenHelp}
            className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-all px-4 py-2 rounded-lg hover:bg-green-50/80 border border-transparent hover:border-green-100 group active:scale-95"
          >
            <div className="bg-gray-100 group-hover:bg-green-100 p-1.5 rounded-full transition-colors duration-300">
               <HelpCircle size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="hidden md:inline text-sm font-semibold tracking-wide">Ajuda</span>
          </button>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;