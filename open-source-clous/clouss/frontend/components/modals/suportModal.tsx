"use client"
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import FileInputButton from "../buttons/FileInputButton";
import Image from "next/image";
import { ArrowUpRight, Minus, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import mixpanel from 'mixpanel-browser';
import { IoHelpCircleOutline } from "react-icons/io5";
import ActionTooltip from "../actions/ActionTooltip";




// Define a type for the possible values of type_account
type TypeAccount = "I need help using ClousH" | "I need help with my account" | "I need to report an issue";

const formSchema = z.object({
  subject: z.string().min(5, { message: "Must be 5 or more characters long" }),
  reason: z.enum(
    ["I need help using ClousH", "I need help with my account", "I need to report an issue"]
    ),
  message: z.string().min(10, { message: "Must be 10 or more characters long" }),
  images: z.array(z.string()).nullable().refine((images) => !images || images.length <= 4, {
    message: "You can only upload up to 4 images",
  }),
});


const SupportModal = () => {
  const trackButtonClick = (Property: any) => {
    mixpanel.track('Trigger', {
    Name : Property,
    Property: Property, });
  };
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false); // Estado para controlar si se envió el formulario

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selected = Array.from(files).slice(0, 4);
      setSelectedImages(selected);
      form.setValue("images", selected.map((file) => URL.createObjectURL(file)));
    }
  };
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "" as TypeAccount, // Provide a default value based on your use case
      subject:"",
      message:"",
      images: [], // Puedes inicializar con un array vacío
    },
  });

  const typeAccountOptions: TypeAccount[] = ["I need help using ClousH", "I need help with my account", "I need to report an issue"];



  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Manejar la respuesta del backend según sea necesario
      console.log(values);
      setFormSubmitted(true); // Cambia el estado a formulario enviado

      // Mostrar un mensaje de éxito

    } catch (error) {
      // Manejar errores de la solicitud
      console.error("Error creating user:", error);

      // Mostrar un mensaje de error
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-background">{JSON.stringify(values, null, 2)}</code>
          </pre>
        ),
      });

    }
  };
  
  const handleIconClick = () => {
    setIsSectionVisible(!isSectionVisible);
    trackButtonClick("Support"); // Llama a trackButtonClick con el nombre del evento
  };
  

  const handleCloseClick = () => {
    setIsSectionVisible(false);
    setIsMinimized(false); // Ensure the card is maximized when closed
  };

  const handleMinimizeClick = () => {
    setIsMinimized(true);
  };

  const handleMaximizeClick = () => {
    setIsMinimized(false);
  };

  return (
    <main>
        <ActionTooltip label="Customer Support" side="bottom" align="end">
        <div
        className="h-11 w-11 p-2.5 rounded-lg text-muted font-semibold hover:bg-accent cursor-pointer"
        onClick={handleIconClick}
      >
        <IoHelpCircleOutline  className="w-6 h-6" />
      </div>
                </ActionTooltip>
    
      {isSectionVisible && (
        <Card
          className={`fixed bottom-4 right-6 bg-background rounded-2xl z-50 overflow-hidden border-0 ${
            isMinimized ? "minimized" : "w-[28rem]"
          }`}
        >
          <CardContent className="flex gap-4 font-medium justify-between py-2.5 bg-primary text-secondary w-full items-center">
            <h3 className={` ${
            isMinimized ? "text-base " : "text-xl"
          }`}>Ready to help!</h3>
            <div className="flex gap-4">
              {isMinimized ? (
                <ArrowUpRight onClick={handleMaximizeClick} className="cursor-pointer" />
              ) : (
                <Minus onClick={handleMinimizeClick} className="cursor-pointer" />
              )}
              <X onClick={handleCloseClick} className="cursor-pointer" />
            </div>
          </CardContent>
          {!isMinimized && (
            <CardContent className="border rounded-2xl rounded-t-none">
               <Form {...form}>
    {formSubmitted ? ( // Si el formulario se ha enviado, muestra el mensaje de agradecimiento
          <div>
          <h3 className="text-xl font-semibold">Form submitted successfully!</h3>
          <p className="text-lg">
          Thank you for your submission.
          </p>
        </div>
        ) : (
         
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-4 mb-4 text-muted w-full h-full"
      >
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
             <section>
                <Select
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select the reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    {typeAccountOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                
                </SelectContent>
              </Select>
              </section>
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <section className="relative ">
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormLabel>Subject</FormLabel>
              </section>
            </FormItem>
          )}
        />
<FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <section className="relative ">
                <FormControl>
                  <Textarea rows={5} placeholder="" {...field} />
                </FormControl>
                <FormLabel>How can we help?</FormLabel>
              </section>
            </FormItem>
          )}
        />



        <div className="bg-accent  h-20 border rounded-xl flex items-center justify-center text-sm gap-2">
            <FileInputButton onChange={handleImageChange} />
            </div>
        <div className="flex flex-wrap gap-2">
          {selectedImages.map((image, index) => (
            <Image width={60} height={60}
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Selected Image ${index + 1}`}
            className="rounded-lg cover"
            />
            ))}
        </div>
<div className="flex mt-2">
  

<Button type="submit" className="text-lg font-semibold ">Submit</Button>
</div>

      </form>
       )}
    </Form>
            </CardContent>
          )}
        </Card>
      )}
    </main>
  );
};

export default SupportModal;