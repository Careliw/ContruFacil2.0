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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;
    
    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 12; 
    
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
    // Add delay to prevent accidental showing during quick movements/clicks
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      calculatePosition();
      setIsVisible(true);
    }, 400); // 400ms delay
  };

  const onLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  // Immediate hide on interaction
  const onInteraction = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    if(isVisible) {
        window.addEventListener('scroll', calculatePosition, true);
        window.addEventListener('resize', calculatePosition);
    }
    return () => {
        window.removeEventListener('scroll', calculatePosition, true);
        window.removeEventListener('resize', calculatePosition);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [isVisible]);

  return (
    <>
      <div 
        ref={triggerRef}
        className={`inline-block ${className}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseDown={onInteraction} // Clear immediately on mouse down
        onClick={onInteraction}
      >
        {children}
      </div>
      {isVisible && createPortal(
        <div 
          className="pointer-events-none transition-all duration-200 ease-out z-[9999]"
          style={style}
        >
          <div className="animate-in fade-in zoom-in-95 duration-200">
             <div className="bg-slate-800/95 backdrop-blur-md text-white text-xs py-2 px-3 rounded-lg shadow-xl border border-slate-700/50 relative font-medium tracking-wide max-w-[200px] text-center leading-relaxed">
                {content}
                {/* Arrow */}
                <div 
                  className={`absolute w-2 h-2 bg-slate-800/95 rotate-45 border-slate-700/50
                    ${position === 'top' ? 'bottom-[-5px] left-1/2 -translate-x-1/2 border-b border-r' : ''}
                    ${position === 'bottom' ? 'top-[-5px] left-1/2 -translate-x-1/2 border-t border-l' : ''}
                    ${position === 'left' ? 'right-[-5px] top-1/2 -translate-y-1/2 border-t border-r' : ''}
                    ${position === 'right' ? 'left-[-5px] top-1/2 -translate-y-1/2 border-b border-l' : ''}
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