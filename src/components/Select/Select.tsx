import React, { useState, useRef, useEffect } from 'react';

import OutsideClick from 'components/OutsideClick';

import './Select.css';
import List from './List';

interface OptionsType {
  label: string;
  value: string;
}

interface SelectProps {
  placeholder?: string;
  loadOptions: (value: string, setSuggestions: (options: OptionsType[]) => void) => void;
  onBlur?: () => void;
  onChange?: (value: OptionsType) => void;
  onInputChange?: (value: string) => void;
}

const getUniqId = () => Symbol('id');

const Select: React.FC<SelectProps> = ({ placeholder, loadOptions, onBlur, onChange, onInputChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [label, setLabel] = useState('');
  const [options, setOptions] = useState<OptionsType[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const lastCallId = useRef(getUniqId());

  const handleOutsideClick = () => setShowOptions(false);

  const setSuggestions = (id: symbol) => (newOptions: OptionsType[]) => {
    if (id === lastCallId.current) {
      setOptions(newOptions);
    }

    setIsLoading(false);
  };

  const handleLoadOptions = (value: string) => {
    setIsLoading(true);

    const uniqId = getUniqId();
    lastCallId.current = uniqId;

    loadOptions(value, setSuggestions(uniqId));
  };

  useEffect(() => handleLoadOptions(inputValue), []);

  const handleFocus = () => setShowOptions(true);

  const handleChange = (value: OptionsType) => {
    setShowOptions(false);
    setLabel(value.label);
    onChange && onChange(value);
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget?.value;

    setInputValue(value);
    handleLoadOptions(value);
    onInputChange && onInputChange(value);
  };

  const handleBlur = () => {
    setInputValue('');
    onInputChange && onInputChange('');
    onBlur && onBlur();
  };

  return (
    <OutsideClick onClick={handleOutsideClick}>
      <div className="select">
        <input
          className="select__input"
          type="text"
          value={inputValue}
          placeholder={label ? '' : placeholder}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className="select__label">{inputValue ? '' : label}</div>
        {showOptions && <List options={options} isLoading={isLoading} onClick={handleChange} />}
      </div>
    </OutsideClick>
  );
};

export default Select;
