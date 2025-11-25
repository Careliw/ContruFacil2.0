import React from 'react';
import { AlertCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <>
      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-md no-print mb-12">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-orange-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-orange-800">Observações Importantes</h3>
            <div className="mt-2 text-sm text-orange-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>O cálculo acima não possui valor legal. Trata-se apenas de uma ferramenta de auxílio na elaboração de contas.</li>
                <li>Verifique se o valor do CUB está atualizado, correspondendo ao mês vigente do calculo da averbação.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-400 text-sm pb-8 no-print">
         Desenvolvido por Wesley Careli - v1.1.0<br/>
         Todos os direitos reservados.
      </div>
    </>
  );
};

export default Footer;