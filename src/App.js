import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeValue } from 'store/actions';
import { getValue } from 'selectors';
import Select from 'components/Select';

import './App.css';
import items from './items.json';

const filterItems = inputValue => items.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterItems(inputValue));
  }, 1000);
};

const App = () => {
  const dispatch = useDispatch();
  const { label } = useSelector(getValue);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = value => setInputValue(value);
  const handleBlur = () => setInputValue('');
  const handleChange = value => dispatch(changeValue(value));

  return (
    <>
      <p>inputValue: &quot;{inputValue}&quot;</p>
      <Select
        value={inputValue}
        placeholder={label}
        loadOptions={loadOptions}
        onBlur={handleBlur}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
    </>
  );
};

export default App;
