import React, { useState } from 'react';
import Icon from './BaseIcon';

const Badge = ({ name, color, size }) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <span className='text-primary flex items-center' color={color}onMouseOver={() => setIsOver(true)}
    onMouseOut={() => setIsOver(false)}>
      {name}
    {isOver && <Icon name="ArrowRight"/>}
    {!isOver && <Icon name="ChevronRight"/>}
    

    </span>
  );
};

export default Badge;
