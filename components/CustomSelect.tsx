import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  onChange,
  placeholder = 'Selecione...',
  className = '',
  onKeyDown
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom,
        left: rect.left,
        width: rect.width
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && containerRef.current.contains(event.target as Node)) {
        return;
      }
      setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }
    
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string, e: React.MouseEvent) => {
    e.stopPropagation(); 
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        if (isOpen) setIsOpen(false);
    }
    if (onKeyDown) onKeyDown(e);
  };

  return (
    <div 
        ref={containerRef} 
        className={`relative ${className}`}
    >
      {/* Trigger Button */}
      <div
        tabIndex={0}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        className={`
          w-full px-3 py-2.5 bg-white border rounded-lg text-sm cursor-pointer
          flex justify-between items-center transition-all duration-300
          outline-none shadow-sm group
          ${isOpen 
            ? 'border-green-500 ring-2 ring-green-500/20 shadow-lg shadow-green-100' 
            : 'border-gray-200 hover:border-green-400 hover:shadow-md'
          }
        `}
      >
        <span className={`truncate font-medium transition-colors ${!value ? 'text-gray-400' : 'text-gray-700 group-hover:text-gray-900'}`}>
          {value || placeholder}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-green-500' : 'group-hover:text-green-500'}`} 
        />
      </div>

      {/* Dropdown Menu Portal - z-index increased to 10000 to beat tooltips */}
      {isOpen && createPortal(
        <div 
          className="fixed z-[10000] bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 origin-top"
          style={{
            top: coords.top + 8,
            left: coords.left,
            width: coords.width,
            maxHeight: '260px',
            overflowY: 'auto'
          }}
          onMouseDown={(e) => e.stopPropagation()} 
        >
          <ul className="p-1.5 space-y-0.5">
            {options.map((option) => (
              <li
                key={option}
                onClick={(e) => handleSelect(option, e)}
                className={`
                  px-3 py-2.5 text-sm cursor-pointer flex items-center justify-between
                  transition-all duration-200 rounded-lg relative overflow-hidden
                  ${value === option 
                    ? 'bg-green-50 text-green-700 font-bold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:pl-4'
                  }
                `}
              >
                {option}
                {value === option && <Check size={16} className="text-green-600 animate-in fade-in zoom-in duration-300" />}
              </li>
            ))}
          </ul>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CustomSelect;