import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import OutsideClick from 'components/OutsideClick';

import './Select.css';
import List from './List';

const getUniqId = () => Symbol('id');

const Select = ({ placeholder, value, loadOptions, onChange, onBlur, onInputChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const lastCallId = useRef(getUniqId());

  const handleOutsideClick = () => setShowOptions(false);

  const setSuggestions = id => val => {
    if (id === lastCallId.current) {
      setOptions(val);
    }

    setIsLoading(false);
  };

  const handleLoadOptions = val => {
    setIsLoading(true);

    const uniqId = getUniqId();
    lastCallId.current = uniqId;

    loadOptions(val, setSuggestions(uniqId));
  };

  useEffect(() => handleLoadOptions(value), []);

  const handleFocus = () => setShowOptions(true);

  const handleChange = val => {
    setShowOptions(false);
    onChange(val);
  };

  const handleInputChange = event => {
    const val = event.target.value;

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
        {showOptions && <List items={options} isLoading={isLoading} onClick={handleChange} />}
      </div>
    </OutsideClick>
  );
};

Select.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  loadOptions: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
};

Select.defaultProps = {
  placeholder: '',
  value: '',
  loadOptions: () => {},
  onBlur: () => {},
  onChange: () => {},
  onInputChange: () => {},
};

export default Select;
