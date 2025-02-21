import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface TextButtonProps {
  name: string;
  color?: string;
  size?: number;
}

const TextButton: React.FC<TextButtonProps> = ({ name, color, size }) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <span
      className={`text-primary text-base flex items-center ${isOver ? 'hovered' : ''}`}
      onMouseOver={() => setIsOver(true)}
      onMouseOut={() => setIsOver(false)}
    >
      {name}
      {isOver ? <ArrowRight /> : <ChevronRight />}
    </span>
  );
};

export default TextButton;
