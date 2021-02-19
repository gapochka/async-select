import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Select from 'components/Select';
import { changeOption } from 'store/actions';

import 'App.css';
import items from 'items.json';

interface OptionsType {
  label: string;
  value: string;
}

const filterItems = (inputValue: string) => items.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));

const loadOptions = (inputValue: string, callback: (options: OptionsType[]) => void) => {
  setTimeout(() => {
    callback(filterItems(inputValue));
  }, 1000);
};

const App = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value: string) => setInputValue(value);
  const handleChange = (option: OptionsType) => dispatch(changeOption(option));

  return (
    <>
      <p>inputValue: &quot;{inputValue}&quot;</p>
      <Select
        placeholder="Select"
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
    </>
  );
};

export default App;
