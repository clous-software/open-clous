import React from 'react';
import { PlusSquare } from 'lucide-react';

interface AddAccordionItemButtonProps {
    onClick: () => void;
}

export const AddAccordionItemButton: React.FC<AddAccordionItemButtonProps> = ({ onClick }) => (
    <button className="icon-group space-2 py-2 w-full text-muted flex items-center cursor-pointer " onClick={onClick}> 
        <PlusSquare size={24}  className='hover:border-2 '/>
    </button>
);
