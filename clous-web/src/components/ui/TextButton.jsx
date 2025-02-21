import React, { useState } from 'react';
import Icon from './BaseIcon';

const TextButton =  ({ name, color, size }) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <span 
    className='text-lg rotate-180 flex items-center align-center' 
    color={color} 
    onMouseOver={() => setIsOver(true)}
    onMouseOut={() => setIsOver(false)}>
      {name}
  <Icon name="ArrowRight" />
     </span>
  );
};
export default TextButton;
