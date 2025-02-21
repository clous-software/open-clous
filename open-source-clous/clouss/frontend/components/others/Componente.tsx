// EditableTool.js
import React from "react";

interface EditableToolProps {
  value: string;
  onChange: (newValue: string) => void;
  maxLength: number; // Nueva propiedad para definir el tamaño máximo
}

function EditableTool({ value, onChange, maxLength }: EditableToolProps) {
  const handleEdit = (e: React.FormEvent<HTMLSpanElement>) => {
    const newValue = e.currentTarget.textContent || "";
    if (maxLength > 0 && newValue.length > maxLength) {
      // Si se supera el límite de caracteres, recortar el valor
      e.currentTarget.textContent = newValue.slice(0, maxLength);
      return;
    }
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (maxLength > 0) {
      const currentValue = e.currentTarget.textContent;
      if (currentValue && currentValue.length >= maxLength) {
        e.preventDefault();
      }
    }
  };

  return (
    <span contentEditable onInput={handleEdit} onBlur={handleEdit} onKeyDown={handleKeyDown}>
      {value}
    </span>
  );
}

export default EditableTool;
