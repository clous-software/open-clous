import { LucideProps } from 'lucide-react';
import {  FC } from 'react';

interface ListItemProps {
    Icon: FC<LucideProps>;
    text: string;
    onClick: () => void;
    className?: string;  

}

const ListItem: FC<ListItemProps> = ({ Icon, text, onClick, className  }) => {
    return (
        <div className={`px-3 py-2  w-40 rounded-lg font-medium items-center hover:bg-muted/5 flex cursor-pointer text-basehover:text-primary gap-2 leading-none ${className}`}

            onClick={onClick}
        >
            <Icon
            width={18}
            />
          {text}
        </div>
    );
}

export default ListItem;