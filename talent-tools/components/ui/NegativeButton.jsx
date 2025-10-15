"use client";

const NegativeButton = ({ name, linkUrl, className, target, onClick }) => {

  const buttonClasses = `
  rounded-full shadow-none flex px-3 lg:px-4 py-1 font-semibold text-base lg:text-xl cursor-pointer
    ${className || 'border border-2 border-primary hover:bg-primary hover:text-secondary transition-hover duration-200 delay-100 text-primary'}
  `;

  const handleClick = (event) => {
    // Llama al manejador onClick si está definido
    if (onClick) {
      onClick(event);
    }
    // Navega a la URL especificada por linkUrl
    if (target === '_blank') {
      window.open(linkUrl, '_blank');
    } else {
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
    </button>
  );
};


export default NegativeButton;
