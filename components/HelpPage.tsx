import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Tooltip from './Tooltip';

interface HelpPageProps {
  onBack: () => void;
}

const HelpPage: React.FC<HelpPageProps> = ({ onBack }) => {
  const steps = [
    {
      step: 1,
      title: "Passo 1: Insira o Valor do CUB",
      text: "No primeiro campo da calculadora, digite o valor do CUB (Custo Unitário Básico) para o mês atual. Este valor é a base para todos os cálculos."
    },
    {
      step: 2,
      title: "Passo 2: Salve o CUB",
      text: "Clique no botão 'Salvar CUB'. O valor ficará guardado no seu navegador, e a calculadora usará esse número para os cálculos automáticos das obras."
    },
    {
      step: 3,
      title: "Passo 3: Adicione Linhas de Averbação",
      text: "Clique em 'Adicionar Linha' para cada obra que deseja calcular (uma construção nova, um acréscimo, etc.). Você pode adicionar quantas linhas precisar."
    },
    {
      step: 4,
      title: "Passo 4: Preencha os Dados da Obra",
      text: "Para cada linha, selecione o 'Tipo' (Construção Nova ou Acréscimo) e preencha as áreas 'Anterior' e 'Atual' em metros quadrados (m²)."
    },
    {
      step: 5,
      title: "Passo 5: Veja o Valor Calculado",
      text: "O valor final para cada obra aparecerá automaticamente. As fórmulas são:\n- Construção Nova: Área Atual × CUB\n- Acréscimo: (Área Atual - Área Anterior) × CUB"
    },
    {
      step: 6,
      title: "Passo 6: Utilize as Ações",
      text: "Use os botões de ação para 'Copiar' o valor calculado de uma linha ou para 'Excluir' a linha da tabela."
    },
    {
      step: 7,
      title: "Passo 7: Imprimir o Cálculo",
      text: "Após preencher os dados, clique no botão 'Imprimir Cálculo' para gerar uma versão para impressão dos resultados."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Guia Rápido</h1>
        <Tooltip content="Voltar para a tela de cálculo" position="right" className="w-full md:w-auto">
          <button 
            onClick={onBack}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all text-sm font-medium shadow-sm hover:shadow-md active:scale-95 w-full md:w-auto"
          >
            <ArrowLeft size={16} />
            Voltar para a Calculadora
          </button>
        </Tooltip>
      </div>
      
      <div className="space-y-4">
        {steps.map((item, index) => (
          <div 
            key={item.step} 
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col md:flex-row gap-4 items-start transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
             <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
               {item.step}
             </div>
             <div>
               <h3 className="font-bold text-gray-800 mb-1 text-base">{item.title}</h3>
               <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                 {item.text}
               </p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpPage;