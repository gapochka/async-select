import React, { useState, useRef, useEffect } from 'react';

import OutsideClick from 'components/OutsideClick';

import './Select.css';
import List from './List';

interface OptionsType {
  label: string;
  value: string;
}

interface SelectProps {
  placeholder: string;
  value: string;
  loadOptions: (value: string, setSuggestions: (options: OptionsType[]) => void) => void;
  onChange: (value: OptionsType) => void;
  onBlur: (event: React.FormEvent<HTMLInputElement>) => void;
  onInputChange: (value: string) => void;
}

const getUniqId = () => Symbol('id');

const Select: React.FC<SelectProps> = ({ placeholder, value, loadOptions, onChange, onBlur, onInputChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<OptionsType[]>([]);
  const lastCallId = useRef(getUniqId());

  const handleOutsideClick = () => setShowOptions(false);

  const setSuggestions = (id: symbol) => (newOptions: OptionsType[]) => {
    if (id === lastCallId.current) {
      setOptions(newOptions);
    }

    setIsLoading(false);
  };

  const handleLoadOptions = (val: string) => {
    setIsLoading(true);

    const uniqId = getUniqId();
    lastCallId.current = uniqId;

    loadOptions(val, setSuggestions(uniqId));
  };

  useEffect(() => handleLoadOptions(value), []);

  const handleFocus = () => setShowOptions(true);

  const handleChange = (val: OptionsType) => {
    setShowOptions(false);
    onChange(val);
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget?.value;

    handleLoadOptions(val);
    onInputChange(val);
  };

  return (
    <OutsideClick onClick={handleOutsideClick}>
      <div className="select">
        <input
          className="select__input"
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={onBlur}
        />
        {showOptions && <List options={options} isLoading={isLoading} onClick={handleChange} />}
      </div>
    </OutsideClick>
  );
};

export default Select;
