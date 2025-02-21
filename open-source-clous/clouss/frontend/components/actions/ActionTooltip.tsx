import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

interface ActionTooltipProps {
  label: string;
  title?: string;
  description?: string;
  gifUrl?: string;
  buttonClassName?: string; // Nuevo prop para el className del botón
  buttonText?: string; // Nuevo prop para el texto del botón
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  className?: string;
  onButtonClick?: () => void; // Nuevo prop para la función de clic del botón
}

const ActionTooltip = ({
  label,
  title,
  description,
  gifUrl,
  buttonText,
  buttonClassName,
  onButtonClick,
  side,
  align,
  className,
  children,
}: ActionTooltipProps) => {
  // Capitaliza solo la primera letra de la etiqueta
  const capitalizedLabel =
    label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={`shadow-none text-muted w-96 rounded-lg ${className}`}
        >
          {gifUrl && <img src={gifUrl} alt="GIF" />}
          <h3 className="text-lg font-semibold">{capitalizedLabel}</h3>
          {description && <p className="text-sm">{description}</p>}
          {buttonText && onButtonClick && ( // Renderizar el botón si se proporciona el texto del botón y la función de clic
            <Button  className={`btn btn-primary ${buttonClassName}`}
            onClick={onButtonClick}>
              {buttonText}
            </Button>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;
