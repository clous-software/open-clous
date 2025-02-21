"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Asegúrate de que la ruta es correcta según tu configuración
import { Button } from "../ui/button";
import { Input } from "../ui/inputNormal";
import React, { forwardRef, useState } from "react";
import { ChevronDown, Copy, X } from "lucide-react";
import Image from "next/image";
import {
  Select as SelectShad,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define el esquema del formulario
const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  companyName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string(),
  role: z.enum([
    "HR Manager",
    "HR Manageer",
    "HR Managere",
  ])  ,
  cif: z.string(),
  website: z.string(),
  locations: z.array(z.string()), // Cambia location a un array de strings
  timeZone: z.enum([
    "UTC",
    "GMT",
    "CET",
    "EST",
    "CST",
    "MST",
    "PST",
    "IST",
    "JST",
    "AEST",
  ]),
});

const AccountSet = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [locations, setLocations] = useState(["C. de Cea Bermúdez, 28003 Madrid"]); // Ubicación inicial

  // 1. Define tu formulario utilizando react-hook-form
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = () => {
    navigator.clipboard.writeText("0754232").then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // restablecer después de 2 segundos
    });
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "John", // Nombre predefinido
      lastName: "Amstrong", // Nombre predefinido
      companyName: "Clous", // Nombre predefinido
      email: "john.doe@example.com", // Email predefinido
      password: "Ade9192913201", // Email predefinido
      role: "HR Manager", // Deja el campo de rol vacío o predefínelo según tu lógica
      cif: "B56373665", // Deja el campo de rol vacío o predefínelo según tu lógica
      website: "www.clous.app", // Deja el campo de rol vacío o predefínelo según tu lógica
      locations: locations,
      timeZone: "UTC", // Deja el campo de rol vacío
    },
  });

  // 2. Define el manejador de envío del formulario
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Simular el proceso de guardado de datos (aquí podrías mostrar un indicador de carga)
    console.log("Guardando cambios...");
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación de una espera de 2 segundos
  
    // Mostrar un mensaje de éxito (aquí podrías mostrar una notificación o mensaje en la interfaz)
    console.log("Cambios guardados exitosamente:", values);
  };
  

 // Función para agregar una nueva ubicación
 const addLocation = () => {
  setLocations([...locations, ""]);
};

// Función para eliminar una ubicación
const handleRemoveLocation = (index: number) => {
  setLocations((prevLocations) =>
    prevLocations.filter((_, i) => i !== index)
  );
};
  return (
    <main className="h-full overflow-auto w-full">
      {/* Otras secciones del componente... */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <section className="space-y-4">
            <nav className="flex border-b pb-2 justify-between  items-center">
              <h2 className="text-xl font-semibold text-muted">
                Account settings
              </h2>
            </nav>
            {/* Nuevo formulario */}
            {/* Campo para el nombre completo */}
      <div className="flex gap-12  items-center">
      <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <label className="text-base font-medium">First Name</label>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      maxLength={50}
                      className=" border bg-transparent p-2 w-80 text-gray-foreground text-base leading-3 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <label className="text-base font-medium">Last Name</label>
                  <FormControl>
                    <Input
                      placeholder="Amstrong"
                      {...field}
                      maxLength={50}
                      className=" border bg-transparent p-2 w-80 text-gray-foreground text-base leading-3 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      </div>
            <div className="flex justify-between  cursor-pointer items-center">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-foreground text-sm">
                  {" "}
                  {form.watch("email")}
                </p>
              </div>
              <Button variant="outline" className="bg-muted/5 border-0 text-base">Change Email</Button>
            </div>
            <div>
                <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-1 justify-between  flex items-center">
                    <label className="font-medium">Company role</label>
                    <SelectShad
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="border-none p-0 text-gray-foreground text-base rounded-lg w-40 justify-end space-x-1">
                        <SelectValue placeholder="Select Time Zone" />
                        <ChevronDown className="w-6 h-6" />
                      </SelectTrigger>
                      <SelectContent className="text-gray-foreground text-base overflow-auto">
                        {[
                          "HR Manager",
                          "HR Manageer",
                          "HR Managere",
                        ].map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectShad>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <div className="flex justify-between  items-center mr-auto cursor-pointer pt-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative space-y-0">
                    <label className="text-base">Password</label>
                    <FormControl className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        readOnly
                        className="border-none bg-transparent h-4 p-0 w-80 text-gray-foreground text-base rounded-lg "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button variant="outline" className="bg-muted/5 border-0 text-base">Change Password</Button>
            </div>
            {/* Botón de cambiar contraseña */}
            <Button>Save</Button>

          </section>

          <section className="space-y-4">
            <nav className="flex border-b pb-2 justify-between  items-center">
              <h2 className="text-xl font-semibold text-muted">
                Organization account
              </h2>
            </nav>
            {/* Nuevo formulario */}

            {/* Campo para el nombre completo */}
            <div className="flex justify-between  cursor-pointer items-center">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="space-y-1 ">
                    <label className="text-base font-medium">Company Name</label>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        maxLength={24}
                        readOnly
                        className="border-none bg-transparent h-4 p-0 w-80 text-gray-foreground text-base rounded-lg "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant="outline" className="bg-muted/5 border-0 text-base">Change company</Button>

              {/*          <Image
                src="/logo.png"
                alt="hola"
                width={40}
                height={40}
                className="w-12 h-12"
              /> */}
            </div>
            <div className="flex justify-between  cursor-pointer items-center">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="space-y-1 ">
                    <label className="text-base font-medium">Company Website</label>
                    <FormControl>
                      <Input
                        placeholder="www.clous.app"
                        {...field}
                        maxLength={24}
                        readOnly
                        className="border-none bg-transparent h-4 p-0 w-80 text-gray-foreground text-base rounded-lg "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant="outline" className="bg-muted/5 border-0 text-base">Change website</Button>
            </div>
            <div
              className="space-y-1 cursor-pointer w-28 group"
              onClick={handleCopyClick}
            >
              <span className="text-base font-medium">Account ID</span>
              <p className="text-gray-foreground text-base flex justify-between  items-center font-semibold group-hover:text-primary">
                <span>{isCopied ? "Copied!" : "0754232"}</span>
                <Copy className="h-54 w-5 group-hover:text-primary" />
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-base font-medium">Location</label>
              {locations.map((location, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    {...form.register(`locations.${index}`)}
                    defaultValue={location}
                    maxLength={50}
                    className="border bg-transparent p-2 text-gray-foreground text-base rounded-lg w-80"
                  />
                 {locations.length > 1 && (
              <div
                className="bg-muted/5 border-0 text-base rounded-lg"
                onClick={() => handleRemoveLocation(index)}
              >
                <X className="h-4 w-4" />
              </div>
            )}
                </div>
              ))}

              <p className="text-base font-semibold text-primary pt-2" 
              onClick={addLocation}
              >
                Add location
              </p>
            </div>

            <div>
              <FormField
                control={form.control}
                name="timeZone"
                render={({ field }) => (
                  <FormItem className="space-y-1 justify-between  flex items-center">
                    <div>

                    <label>Time Zone</label>
                    <p className="text-sm pt-1 text-gray-foreground ">Lorem ipsum Lorem ipsum Lorem ipsum</p>
                    </div>
                    <SelectShad
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="border-none p-0 text-gray-foreground text-base rounded-lg w-20 justify-end space-x-1">
                        <SelectValue placeholder="Select Time Zone" />
                        <ChevronDown className="w-6 h-6" />
                      </SelectTrigger>
                      <SelectContent className="text-gray-foreground text-base h-40 overflow-auto">
                        {[
                          "UTC",
                          "GMT",
                          "CET",
                          "EST",
                          "CST",
                          "MST",
                          "PST",
                          "IST",
                          "JST",
                          "AEST",
                        ].map((zone) => (
                          <SelectItem key={zone} value={zone}>
                            {zone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectShad>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1 pb-4">
              <span className="text-base font-medium">Company CIF</span>
              <p className="border bg-transparent p-2 text-gray-foreground text-base rounded-lg w-80">
                {form.watch("cif")}
              </p>
            </div>
            <Button >Save</Button>
          </section>
        </form>
      </Form>
    </main>
  );
};

export default AccountSet;

{
  /*             <div className="flex w-full justify-between  py-6">
                <div className=" flex  gap-y-4 ">
                    <Avatar className="border w-20 h-20 m-auto">
                        <AvatarImage src="" alt="avatar" />
                        <AvatarFallback className="bg-background w-20 h-20">
                            <Plus className="text-muted" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="p-4 items-center font-medium text-gray-foreground">

                        <h3 className="pb-2 text-sm">Profile image</h3>
                        <p className="text-primary hover:opacity-75  text-sm hover:border-b hover:border-b-primary/75 cursor-pointer">Upload Image</p>
                    </div>
                </div>
                <div className="flex flex-col  gap-y-2 justify-center font-medium">
            <h3 className="pb-2 text-sm">Company ID:</h3>
            <div className="border p-2 w-44 rounded-lg hover:text-primary cursor-pointer group" onClick={handleCopyClick}>
                <div className="flex justify-between  items-center font-semibold text-sm text-muted group-hover:text-primary">
                    <span>{isCopied ? "Copied!" : "0754232"}</span>
                    <Copy className="h-6 w-6 group-hover:text-primary" />
                </div>
            </div>
        </div>
            </div> */
}
