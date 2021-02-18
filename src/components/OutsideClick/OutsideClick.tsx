import React, { useRef, useEffect } from 'react';

interface OutsideClickProps {
  children: React.ReactNode;
  onClick: () => void;
}

const OutsideClick: React.FC<OutsideClickProps> = ({ children, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent) => {
    if (!ref.current?.contains(event.target as Element)) {
      onClick();
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return <div ref={ref}>{children}</div>;
};

export default OutsideClick;
