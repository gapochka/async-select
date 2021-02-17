import React from 'react';
import PropTypes from 'prop-types';

import './List.css';

const renderText = text => <li className="list__text">{text}</li>;

const renderItem = ({ label, value }, onClick) => (
  <li key={value} className="list__item" role="presentation" onClick={onClick({ label, value })}>
    {label}
  </li>
);

const renderList = children => <ul className="list">{children}</ul>;

const List = ({ items, isLoading, onClick }) => {
  if (isLoading) {
    return renderList(renderText('Loading...'));
  }

  if (items.length === 0) {
    return renderList(renderText('No options'));
  }

  const handleClick = ({ label, value }) => () => onClick({ label, value });

  return renderList(items.map(props => renderItem(props, handleClick)));
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

List.defaultProps = {
  items: [],
  isLoading: false,
  onClick: () => {},
};

export default List;
