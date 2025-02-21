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
import { IoCloseOutline } from "react-icons/io5";
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

const AddQuestions = () => {
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
    <Form {...form}>
        <form className="space-y-12">
          <section className="">
            <Card className="flex flex-col border-none w-full h-full">
      <CardHeader className="justify-between pt-5 pb-2">
        <h2 className="text-xl text-muted font-semibold">
          Q&A screening questions
        </h2>
        {/*          <Image
          width={36}
          height={36}
          className="rounded-lg cursor-pointer"
          src="/alexx.jpg"
          alt="Alvaro Clous"
  /> */}

        <Button className="rounded-3xl font-medium text-lg">Generate again <RiAiGenerate size={20} className="text-secondary ml-2" /></Button>

        
      </CardHeader>

      <CardContent className="p-0 mt-4">
        {/* Nuevo formulario */}
            {/* Campo para el nombre completo */}
      <div className="flex flex-col gap-6 px-6">
        
      
        <div className="space-y-6 w-full pb-6">
          {questions.map((question, index) => (
            <div key={index} className="flex items-start w-full space-x-2">
              <FormField
          control={form.control}
          name="questionOne"
          render={({ field }) => (
            <FormItem className="space-y-1 w-full">
              <label className="text-base font-medium">Have you managed your own responsibilities in the past?</label>
              <FormControl>
                <Input
                  placeholder="A question that makes candidates remember you..."
                  {...field}
                  maxLength={50}
                  className=" border bg-transparent p-2 w-4/5 text-gray-foreground text-base leading-3 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
             {questions.length > 1 && (
          <div
            className="bg-muted/5 border-0 text-base rounded-lg"
            onClick={() => handleRemoveQuestion(index)}
          >
            <IoCloseOutline className="h-5 w-5" />
          </div>
        )}
            </div>
          ))}

          <p className="text-base font-medium text-primary cursor-pointer" 
          onClick={addQuestions}
          >
            Add questions
          </p>
        </div>
        
  </div>
  <CardFooter className="flex justify-end gap-4 px-8 py-4 border-t mt-auto">
  <Button variant='outline'>Discard</Button> 
    <Button>Create Q&A</Button>
        
  </CardFooter>
       
      </CardContent>

    

      
    </Card>
            
            
          </section>
        </form>
      </Form>
    
  );

  return (
    // Render based on current state
   renderQuestions()
      
  );
};

export default AddQuestions;
