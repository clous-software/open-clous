import React from 'react';
import { icons } from 'lucide-react';
import * as BootstrapIcons from 'react-icons/bs';
import * as Fa6Icon from 'react-icons/fa6';

const Icon = ({ name, color, size }) => {
  let IconComponent;

  // Comprueba si el nombre del ícono existe en Lucide Icons
  if (icons[name]) {
    IconComponent = icons[name];
  }
  // Comprueba si el nombre del ícono existe en Bootstrap Icons
  else if (BootstrapIcons[name]) {
    IconComponent = BootstrapIcons[name];
  }
  // Comprueba si el nombre del ícono existe en FontAwesome Icons
  else if (Fa6Icon[name]) {
    IconComponent = Fa6Icon[name];
  }
  // Si no se encuentra en ninguna biblioteca, muestra un ícono predeterminado o maneja el caso según tus necesidades

  if (!IconComponent) {
    return null; // Maneja el caso en que el icono no esté disponible
  }

  return <IconComponent color={color} size={size} className=" h-7 w-7" />;
};

export default Icon;
