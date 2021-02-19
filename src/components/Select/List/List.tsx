import React from 'react';

import { OptionsType } from './OptionsType';

import './List.css';

interface ListProps {
  options: Array<OptionsType>;
  isLoading: boolean;
  onClick: (value: OptionsType) => void;
}

const renderText = (text: string) => <li className="list__text">{text}</li>;

const renderItem = ({ label, value }: OptionsType, onClick: (value: OptionsType) => () => void) => (
  <li key={value} className="list__item" role="presentation" onClick={onClick({ label, value })}>
    {label}
  </li>
);

const renderList = (children: React.ReactNode) => <ul className="list">{children}</ul>;

const List: React.FC<ListProps> = ({ options, isLoading, onClick }) => {
  if (isLoading) {
    return renderList(renderText('Loading...'));
  }

  if (options.length === 0) {
    return renderList(renderText('No options'));
  }

  const handleClick = (value: OptionsType) => () => onClick(value);

  return renderList(options.map(props => renderItem(props, handleClick)));
};

export default List;
