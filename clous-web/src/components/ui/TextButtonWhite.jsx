import React, { useState } from 'react';
import Icon from './BaseIcon';


const TextButtonWhite =  ({ name, color, size }) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <span 
    className='text-secondary text-lg flex items-center' 
    color={color} 
    onMouseOver={() => setIsOver(true)}
    onMouseOut={() => setIsOver(false)}>
      {name}
    {isOver && <Icon name="ArrowRight" color="#fff"/>}
    {!isOver && <Icon name="ChevronRight" color="#fff"/>}
    

    </span>
  );
};
export default TextButtonWhite;
