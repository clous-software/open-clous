import React, { useState } from 'react';
import Icon from './BaseIcon';

const NormalButton = ({ name, color, size, linkUrl, className, onClick }) => {

  const buttonClasses = `
    rounded-full shadow-none flex px-6 py-2 font-semibold text-2xl cursor-pointer
    ${className || 'bg-primary text-secondary hover:bg-opacity-80 transition:bg-opacity delay-100 duration-300'}
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
      onClick={handleClick}
    >
      {name}
     {/*{isOver && <Icon name="ArrowRight" color="#fff" />}
      {!isOver && <Icon name="ChevronRight" color="#fff" />}*/}
    </button>
  );
};


export default NormalButton;
