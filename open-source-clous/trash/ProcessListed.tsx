import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SiGooglecalendar } from "react-icons/si";
import { Button } from "../ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/inputNormal";
import Link from "next/link";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";
import { CgGoogle } from "react-icons/cg";
import { IoLogoGoogle } from "react-icons/io5";
import { ChevronDown, Copy, X } from "lucide-react";
import { IoCloseOutline, IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import {
  Select as SelectShad,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RiAiGenerate } from "react-icons/ri";

interface SelectedButtonIndex {
  dayIndex: number;
  timeIndex: number;
}

interface SelectedDateTime {
  day: string;
  time: string;
}

export const ProcessListed = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] =
    useState<SelectedButtonIndex | null>(null);
  const [currentRender, setCurrentRender] = useState("yes");
  const [selectedDateTime, setSelectedDateTime] =
    useState<SelectedDateTime | null>(null); // Variable de estado para almacenar el día y la hora seleccionados

  const [questions, setQuestions] = useState(["C. de Cea Bermúdez, 28003 Madrid"]); // Ubicación inicial


  const formSchema = z.object({
    questionOne: z.string().min(2).max(50),
    questionTwo: z.string().min(2).max(50),
    questionThree: z.string().min(2).max(50),
    questionFour: z.string().min(2).max(50),
    questionFive: z.string().min(2).max(50),
   
  });
 

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    
    
  });

  // 2. Define el manejador de envío del formulario
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Simular el proceso de guardado de datos (aquí podrías mostrar un indicador de carga)
    console.log("Guardando cambios...");
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación de una espera de 2 segundos
  
    // Mostrar un mensaje de éxito (aquí podrías mostrar una notificación o mensaje en la interfaz)
    console.log("Cambios guardados exitosamente:", values);
  };

  const addQuestions = () => {
    setQuestions([...questions, ""]);
  };
  
  // Función para eliminar una ubicación
  const handleRemoveQuestion = (index: number) => {
    setQuestions((prevLocations) =>
      prevLocations.filter((_, i) => i !== index)
    );
  };
 

  const renderQuestions = () => (
    <section className="hidden">
      <Card className="flex flex-col border-none w-full h-full">
        <CardContent className="p-0 mt-4">
          {/* Nuevo formulario */}
          {/* Campo para el nombre completo */}
          <div className="flex flex-col pr-6">
            <div className="space-y-6 w-full">
              <div className="flex items-start w-full space-x-2">
                <div className="space-y-1 w-full flex flex-row">
                  <div className="relative h-30 mr-4 items-center justify-center flex">
                    <div className="rounded-full w-2.5 h-2.5 ml-0.5 bg-[#333333] "></div>
                    <div className="h-full w-0.5 absolute top-0 left-1/2 bg-[#333333]"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex">
                      <h3 className=" border-0 bg-transparent p-0 w-full mb-4 text-base font-semibold leading-3 rounded-lg">
                        First interview
                      </h3>
                    </div>
                    <p className="text-sm flex items-start font-medium">
                      <IoTimeOutline className="h-6 w-6 mr-2" />
                      30 minutes
                    </p>
                    <p className="text-sm flex items-start font-medium mt-2">
                      <IoLocationOutline className="h-6 w-6 mr-2" />
                      Google Meets
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
  

  return (
    // Render based on current state
   renderQuestions()
      
  );
};
