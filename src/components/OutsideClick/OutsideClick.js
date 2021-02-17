import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const OutsideClick = ({ children, onClick }) => {
  const ref = useRef(null);

  const handleClick = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClick();
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return <div ref={ref}>{children}</div>;
};

OutsideClick.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OutsideClick;
