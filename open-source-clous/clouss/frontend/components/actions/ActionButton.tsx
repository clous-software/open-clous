import React from 'react';
import ActionTooltip from './ActionTooltip'; // Asegúrate de importar ActionTooltip desde la ubicación correcta

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ActionButtonProps {
  label: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  href?: string; // Agrega la prop 'href'
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  side,
  align,
  icon: IconComponent,
  onClick,
  className, // Recoge la prop className
  href, // Agrega href a las props destructuradas
}) => {


  return (
    <ActionTooltip side={side} align={align} label={label}>
      <div className={`inline-block ${className}`}>
      {href ? ( // Verifica si href está definido
          <Link href={href}>
              <IconComponent
                className="w-10 h-10 p-2 transition cursor-pointer hover:bg-muted/10 hover:p-1 rounded-lg"
                onClick={() => {
                  if (onClick) {
                    onClick();
                  }
                }}
                strokeWidth={"1.4px"}
              />
          </Link>
        ) : (
          <IconComponent
            className="w-10 h-10 p-2 transition cursor-pointer hover:bg-muted/10 hover:p-1 rounded-lg"
            onClick={() => {
              if (onClick) {
                onClick();
              }
            }}
            strokeWidth={"1.4px"}
          />
        )}
      </div>
    </ActionTooltip>
  );
};

export default ActionButton;