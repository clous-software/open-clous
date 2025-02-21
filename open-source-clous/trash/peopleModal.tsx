import { useState } from "react";

import People from "../settings/people";
import { IoFilterOutline } from "react-icons/io5";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import { FaRightFromBracket } from "react-icons/fa6";

const PeopleModal = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el sidebar está abierto o cerrado

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen); // Cambia el estado de isOpen al contrario de su valor actual
  }

  return (
    <main>
      {/* Header */}
      <header
        className="p-2.5 rounded-lg text-muted font-semibold hover:bg-muted/5 cursor-pointer"
        onClick={handleToggleSidebar} // Invocar handleToggleSidebar correctamente
      >
        <IoFilterOutline className="w-6 h-6" />
      </header>

      {/* Sidebar */}
      <section className={`sidebar border py-3 gap-6 pr-12 z-50 w-[30rem] fixed flex justify-between  flex-col overflow-auto  ${!isOpen ? 'open relative' : 'closed'}`}>
        {/* Arrow para cerrar el sidebar */}
        
        {/* Contenido del sidebar */}
        <People />
      </section>
    </main>
  );
};

export default PeopleModal;
