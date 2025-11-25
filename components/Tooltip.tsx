import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;
    
    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 10; // slightly larger gap
    
    const newStyle: React.CSSProperties = { position: 'fixed', zIndex: 9999 };

    switch (position) {
      case 'top':
        newStyle.top = rect.top - gap;
        newStyle.left = rect.left + rect.width / 2;
        newStyle.transform = 'translate(-50%, -100%) scale(1)';
        break;
      case 'bottom':
        newStyle.top = rect.bottom + gap;
        newStyle.left = rect.left + rect.width / 2;
        newStyle.transform = 'translate(-50%, 0) scale(1)';
        break;
      case 'left':
        newStyle.top = rect.top + rect.height / 2;
        newStyle.left = rect.left - gap;
        newStyle.transform = 'translate(-100%, -50%) scale(1)';
        break;
      case 'right':
        newStyle.top = rect.top + rect.height / 2;
        newStyle.left = rect.right + gap;
        newStyle.transform = 'translate(0, -50%) scale(1)';
        break;
    }

    setStyle(newStyle);
  };

  const onEnter = () => {
    calculatePosition();
    setIsVisible(true);
  };

  useEffect(() => {
    if(isVisible) {
        window.addEventListener('scroll', calculatePosition);
        window.addEventListener('resize', calculatePosition);
    }
    return () => {
        window.removeEventListener('scroll', calculatePosition);
        window.removeEventListener('resize', calculatePosition);
    }
  }, [isVisible]);

  return (
    <>
      <div 
        ref={triggerRef}
        className={`inline-block ${className}`}
        onMouseEnter={onEnter}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && createPortal(
        <div 
          className="pointer-events-none transition-all duration-200 ease-out"
          style={style}
        >
          {/* We wrap the content in a div that handles the "Entry" animation state */}
          <div className="animate-in fade-in zoom-in-90 duration-150">
             <div className="bg-gray-800 text-white text-xs py-1.5 px-3 rounded shadow-xl relative font-medium tracking-wide">
                {content}
                {/* Arrow */}
                <div 
                  className={`absolute w-2 h-2 bg-gray-800 rotate-45
                    ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : ''}
                    ${position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' : ''}
                    ${position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' : ''}
                    ${position === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2' : ''}
                  `}
                />
             </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Tooltip;