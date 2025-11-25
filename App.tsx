import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import CubSection from './components/CubSection';
import CalculatorTable from './components/CalculatorTable';
import PrintLayout from './components/PrintLayout';
import Toast, { ToastType } from './components/Toast';
import HelpPage from './components/HelpPage';
import Footer from './components/Footer';
import { AverbacaoItem, AverbacaoType } from './types';
import { formatCurrency } from './utils';

const DEFAULT_CUB = 2651.35;
const CUB_STORAGE_KEY = 'construfacil_cub_value';

function App() {
  const [cubValue, setCubValue] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CUB_STORAGE_KEY);
      return saved ? parseFloat(saved) : DEFAULT_CUB;
    }
    return DEFAULT_CUB;
  });

  const [items, setItems] = useState<AverbacaoItem[]>([
    {
      id: '1',
      descricao: 'casa 01-1',
      tipo: AverbacaoType.ACRESCIMO,
      areaAnterior: 25,
      areaAtual: 45.59,
    },
    {
      id: '2',
      descricao: 'Ex: Casa 01, Bloco A',
      tipo: AverbacaoType.CONSTRUCAO_NOVA,
      areaAnterior: 0,
      areaAtual: 45.59,
    }
  ]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [showHelp, setShowHelp] = useState(false);

  const handleSaveCub = (val: number) => {
    setCubValue(val);
    localStorage.setItem(CUB_STORAGE_KEY, val.toString());
    setToastType('success');
    setToastMessage(`Valor do CUB (${formatCurrency(val)}) salvo com sucesso.`);
    setShowToast(true);
  };

  const handleAddItem = () => {
    const newItem: AverbacaoItem = {
      id: uuidv4(),
      descricao: '',
      tipo: AverbacaoType.CONSTRUCAO_NOVA,
      areaAnterior: 0,
      areaAtual: 0,
    };
    setItems([...items, newItem]);
  };

  const handleClearTable = () => {
    setItems([]);
  };

  const handleUpdateItem = (id: string, field: keyof AverbacaoItem, value: any) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Logic: If switching to 'Construção Nova', zero out 'Area Anterior'
        if (field === 'tipo' && value === AverbacaoType.CONSTRUCAO_NOVA) {
          updatedItem.areaAnterior = 0;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const handleDeleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleDuplicateItem = (item: AverbacaoItem) => {
    const newItem = { ...item, id: uuidv4() };
    setItems([...items, newItem]);
  };

  const handlePrint = () => {
    if (items.length === 0) {
      setToastType('warning');
      setToastMessage('Não há cálculos para imprimir.');
      setShowToast(true);
      return;
    }
    window.print();
  };

  const handleCopyValue = (value: string) => {
    navigator.clipboard.writeText(value);
    setToastType('success');
    setToastMessage(`Valor copiado: ${value}`);
    setShowToast(true);
  };

  // Main Content to Render (Help Page or Dashboard)
  const renderContent = () => {
    if (showHelp) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-10rem)]">
          <HelpPage onBack={() => setShowHelp(false)} />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-8 md:gap-10">
        {/* Top Widgets Section */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-4">
             <CubSection 
              value={cubValue} 
              onSave={handleSaveCub} 
            />
          </div>
        </div>

        {/* Main Table Section */}
        <div className="w-full">
           <CalculatorTable
            cubValue={cubValue}
            items={items}
            onAddItem={handleAddItem}
            onClearTable={handleClearTable}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
            onDuplicateItem={handleDuplicateItem}
            onPrint={handlePrint}
            onCopyValue={handleCopyValue}
          />
        </div>
        
        <Footer />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter text-gray-800 pb-10">
      
      {/* Top Navigation Bar */}
      {!showHelp && <Header onOpenHelp={() => setShowHelp(true)} />}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 md:px-12 md:py-12 lg:px-20 lg:py-14 print:p-0 print:w-full print:max-w-none">
         {renderContent()}

         {/* Hidden Print Layout */}
         <PrintLayout cubValue={cubValue} items={items} />
      </main>

      {/* Toast Notification */}
      <Toast 
        message={toastMessage} 
        type={toastType}
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />

    </div>
  );
}

export default App;