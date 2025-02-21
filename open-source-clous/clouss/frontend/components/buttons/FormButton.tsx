import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

type ButtonType = "button" | "submit" | "reset";

interface FormButtonProps {
  name?: string;
  type?: ButtonType;
}

const FormButton: React.FC<FormButtonProps> = ({ name, type }) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <Button
      type={type || "submit"} // Use "submit" as a default if type is not provided
      className="text-lg"
      onMouseOver={() => setIsOver(true)}
      onMouseOut={() => setIsOver(false)}
    >
      {name}
      {isOver && <ArrowRight />}
      {!isOver && <ChevronRight />}
    </Button>
  );
};

export default FormButton;
