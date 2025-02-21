import React from 'react';
import { LucideEdit3 } from 'lucide-react';

interface AccordionItemProps {
    item: string;
    isHovered: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ item, isHovered, onClick, onMouseEnter, onMouseLeave }) => (
    <li
        className="flex items-center hover:border-none  my-1 p-1  rounded-md cursor-grab text-muted"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
    >
        <span className="flex-grow"> {item}</span>
        {isHovered && <LucideEdit3 size={16} className='ml-1 flex-shrink-0' />}
    </li>
);
