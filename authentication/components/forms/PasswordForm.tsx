"use client"
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  password: z.string(),
  confirm_password: z.string(),
});

// Validación personalizada para confirmar la contraseña
const confirmPasswordValidator = (data: { password: any; confirm_password: any; }) => {
  if (data.password !== data.confirm_password) {
    return {
      message: "Passwords do not match",
    };
  }
  return true;
};

formSchema.refine(confirmPasswordValidator, {
  message: "Passwords do not match",
});

const PasswordForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-])[A-Za-z\d@$!%*?&_\-]{8,}$/;
      if (!passwordRegex.test(values.password)) {
        // Mostrar un mensaje de error si las contraseñas no coinciden
        toast({
          title: "Error",
          description: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
          variant: "destructive",
        });
        return;
      }
      else {
        if (values.password !== values.confirm_password) {
          // Mostrar un mensaje de error si las contraseñas no coinciden
          toast({
            title: "Error",
            description: "Passwords do not match",
            variant: "destructive",
          });
          return;
        } 
      
      }


 

        router.push('https://demo.clous.app');



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

  return (
    <Form {...form}>
      <h3 className="text-4xl font-semibold ">Secure data for safe recruiting</h3>
      <p className="text-lg mt-4 w-[30rem]">We don’t ask for your password until the end, so that we can avoid storing sensitive data from users that drop off during the onboarding process.</p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-8 mb-4 text-muted w-full h-full"
      >

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <section className="w-[28rem] flex flex-col gap-2 relative">
              <FormLabel className="text-sm font-semibold">Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="" {...field} />
                </FormControl>
          
                <div  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-9 cursor-pointer">

                {showPassword ? <EyeOff className="text-primary"/> : <Eye className="hover-primary"/>}
                </div>
              </section>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <section className="w-[28rem] flex flex-col gap-2">
              <FormLabel className="text-sm font-semibold">Confirm password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="" {...field} />
                </FormControl>
              </section>
            </FormItem>
          )}
        />

<Button type="submit" className="text-lg font-semibold w-[28rem]">
  Start hiring
  </Button>

      </form>
    </Form>
  );
}

export default PasswordForm;
