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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is inside the trigger
      if (containerRef.current && containerRef.current.contains(event.target as Node)) {
        return;
      }
      // Since the dropdown is in a portal, we can't easily check with 'contains' on a ref inside the portal 
      // without complex ref forwarding or searching the DOM.
      // However, usually portals block propagation or we handle it via a backdrop. 
      // Simplest way for portal click-outside is to listen on window and close if not targetting the menu.
      
      // But here, we just close it if it's open and the click wasn't on the trigger.
      // We will handle the "click inside menu" separately by stopping propagation or just letting selection close it.
      setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', updatePosition, true); // true for capture to catch table scrolls
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
    e.stopPropagation(); // Prevent closing immediately from click-outside logic if needed
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
          w-full px-3 py-2 bg-white border rounded text-sm cursor-pointer
          flex justify-between items-center transition-all duration-200
          outline-none
          ${isOpen 
            ? 'border-green-500 ring-1 ring-green-500 shadow-md' 
            : 'border-gray-200 hover:border-gray-300'
          }
        `}
      >
        <span className={`truncate ${!value ? 'text-gray-400' : 'text-gray-600'}`}>
          {value || placeholder}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-green-500' : ''}`} 
        />
      </div>

      {/* Dropdown Menu Portal */}
      {isOpen && createPortal(
        <div 
          className="fixed z-[9999] bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 origin-top"
          style={{
            top: coords.top + 4, // Add a little gap
            left: coords.left,
            width: coords.width,
            maxHeight: '240px',
            overflowY: 'auto'
          }}
          onMouseDown={(e) => e.stopPropagation()} // Stop propagation so click-outside doesn't fire immediately
        >
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={(e) => handleSelect(option, e)}
                className={`
                  px-3 py-2 text-sm cursor-pointer flex items-center justify-between
                  transition-colors duration-150
                  ${value === option 
                    ? 'bg-green-50 text-green-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                {option}
                {value === option && <Check size={14} className="text-green-600" />}
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