import React, { useState } from 'react';
import Icon from './BaseIcon';

const InCardButton = ({ name, color, size, linkUrl, className, onClick }) => {

  const buttonClasses = `
    rounded-full shadow-none inline-flex px-4 py-1 font-semibold text-base
    ${className || 'bg-primary text-secondary hover:bg-opacity-80 transition:bg-opacity delay-100 duration-300'}
  `;

  const handleClick = (event) => {
    // Llama al manejador onClick si está definido
    if (onClick) {
      onClick(event);
    }
    // Navega a la URL especificada por linkUrl
    if (linkUrl) {
      window.open(linkUrl, '_blank');
    }
  };

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleClick}
    >
      {name}
     {/*{isOver && <Icon name="ArrowRight" color="#fff" />}
      {!isOver && <Icon name="ChevronRight" color="#fff" />}*/}
    </button>
  );
};


export default InCardButton;
