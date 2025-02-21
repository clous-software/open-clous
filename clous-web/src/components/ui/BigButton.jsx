import React, { useState } from 'react';
import Icon from './BaseIcon';

const BigButton = ({ name, color, size, linkUrl, className, onClick }) => {
  const [isOver, setIsOver] = useState(false);

  const buttonClasses = `
    rounded-full shadow-none flex px-4 py-2 font-semibold text-2xl w-full justify-center
    ${className || 'bg-primary text-secondary'}
  `;

  const handleClick = (event) => {
    // Llama al manejador onClick si está definido
    if (onClick) {
      onClick(event);
    }
    // Navega a la URL especificada por linkUrl
    if (linkUrl) {
      window.location.href = linkUrl;
    }
  };

  return (
    <button
      type="submit"
      className={buttonClasses}
      onMouseOver={() => setIsOver(true)}
      onMouseOut={() => setIsOver(false)}
      onClick={handleClick}
    >
      {name}
     {/*{isOver && <Icon name="ArrowRight" color="#fff" />}
      {!isOver && <Icon name="ChevronRight" color="#fff" />}*/}
    </button>
  );
};


export default BigButton;
