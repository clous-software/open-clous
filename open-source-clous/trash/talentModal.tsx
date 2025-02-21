import { useState } from "react";

import Preferences from "../settings/preferences";
import { IoApps } from "react-icons/io5";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import { FaRightFromBracket } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

const GapModal = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el sidebar está abierto o cerrado

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen); // Cambia el estado de isOpen al contrario de su valor actual
  }

  return (
    <main>
      {/* Header */}
      <header
        className="h-11 w-11 p-2.5 rounded-lg text-muted font-semibold hover:bg-muted/5 cursor-pointer"
        onClick={handleToggleSidebar} // Invocar handleToggleSidebar correctamente
      >
        <IoApps className="w-6 h-6" />
      </header>

      {/* Sidebar */}
      <section className={`sidebar border px-10 py-3 gap-6 z-50 fixed flex justify-between mx-auto flex-col overflow-auto  ${!isOpen ? 'open relative' : 'closed'}`}>
        {/* Arrow para cerrar el sidebar */}
        
        {/* Contenido del sidebar */}
        <Preferences />
      </section>
    </main>
  );
};

export default GapModal;
