import React, { useState, useEffect } from 'react';

import OutsideClick from 'components/OutsideClick';
import useDebounce from 'hooks/useDebounce';

import './Select.css';
import List from './List';

interface OptionsType {
  label: string;
  value: string;
}

interface SelectProps {
  placeholder?: string;
  loadOptions: (value: string) => Promise<OptionsType[]>;
  onBlur?: () => void;
  onChange?: (value: OptionsType) => void;
  onInputChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ placeholder, loadOptions, onBlur, onChange, onInputChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [label, setLabel] = useState('');
  const [options, setOptions] = useState<OptionsType[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setIsLoading(true);

    loadOptions(debouncedInputValue).then((options: OptionsType[]) => {
      setIsLoading(false);
      setOptions(options);
    });
  }, [debouncedInputValue]);

  const handleOutsideClick = () => setShowOptions(false);

  const handleFocus = () => setShowOptions(true);

  const handleChange = (option: OptionsType) => {
    setShowOptions(false);
    setLabel(option.label);
    onChange && onChange(option);
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget?.value;

    setInputValue(value);
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
