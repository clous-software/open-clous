import { ArrowDown } from 'lucide-react';
import React from 'react';

const CardPeer = ({ title, description, handleClick }) => {
  return (
    <div className="border boder-dark-gray rounded-lg text-sm flex items-center leading-4 group cursor-pointer p-3 relative h-12" onClick={() => handleClick(title + description)}>
      <div className="p-0">
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-foreground w-56 font-normal truncate">{description}</p>
      </div>
      <p className="hidden absolute right-3 group-hover:inline-block items-center">
        <ArrowDown size={20} className="text-gray-foreground" />
      </p>
    </div>
  );
};

export default CardPeer;
