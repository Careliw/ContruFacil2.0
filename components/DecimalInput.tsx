import React, { useRef, useLayoutEffect } from 'react';

interface DecimalInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  id?: string;
}

const DecimalInput: React.FC<DecimalInputProps> = ({
  value,
  onChange,
  disabled = false,
  className = '',
  placeholder = '0,00',
  id
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Format value to string (e.g. 1234.56 -> "1.234,56")
  const formatValue = (val: number) => {
    if (val === 0) return '';
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/\D/g, ''); // Remove non-digits

    // Limit to 11 digits (9 integer + 2 decimal)
    if (rawValue.length > 11) {
      rawValue = rawValue.slice(0, 11);
    }

    const numericValue = rawValue ? parseInt(rawValue, 10) / 100 : 0;
    onChange(numericValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.closest('form') || document.body;
      const index = Array.prototype.indexOf.call(form.querySelectorAll('input:not([disabled]), select:not([disabled])'), e.currentTarget);
      const nextElement = form.querySelectorAll('input:not([disabled]), select:not([disabled])')[index + 1] as HTMLElement;
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  // Cursor handling: Always keep cursor at the end for ATM style feel
  useLayoutEffect(() => {
    if (inputRef.current) {
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  });

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      inputMode="numeric"
      value={formatValue(value)}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      placeholder={placeholder}
      className={`bg-white ${className}`} // Forced bg-white as requested
    />
  );
};

export default DecimalInput;