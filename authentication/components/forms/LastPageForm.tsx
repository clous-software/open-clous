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
import axios from "axios";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import Link from "next/link";

// Define a type for the possible values of type_account
type TypeAccount = "Enterprise" | "Startup" | "Recruiter";

const formSchema = z.object({
  company_name: z.string().min(5, { message: "Must be 5 or more characters long" }),
  type_account: z.enum(
    ["Enterprise", "Startup", "Recruiter"]
  ),
});
 

const LastPageForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name:"",
      type_account: "" as TypeAccount, // Provide a default value based on your use case
    },
  });

  const typeAccountOptions: TypeAccount[] = ["Enterprise", "Startup", "Recruiter"];



  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Manejar la respuesta del backend según sea necesario
      console.log(values);

      // Mostrar un mensaje de éxito
      router.push('/password-check');

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
          
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 text-muted w-full h-full"
      >
     

        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <section className="w-[28rem] flex flex-col gap-2">
                   <FormLabel className="text-sm font-semibold">Company tax ID (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Type your ID number" {...field} />
                </FormControl>
              </section>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <section className="w-[28rem] flex flex-col gap-2">
                   <FormLabel className="text-sm font-semibold">Team members</FormLabel>
                <FormControl>
                  <Input placeholder="Type your ID number" {...field} />
                </FormControl>
              </section>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <section className="w-[28rem] flex flex-col gap-2">
                   <FormLabel className="text-sm font-semibold">Complete your job ID</FormLabel>
                <FormControl>
                  <Input placeholder="Type your ID number" {...field} />
                </FormControl>
              </section>
            </FormItem>
          )}
        />
       


<section className="flex gap-2 w-[28rem]">
<Link href="/set-up" className="ml-auto text-lg font-semibold rounded-full bg-muted/5 px-4 py-2 h-10 items-center flex hover:bg-accent">Back</Link>
<Button type="submit" className="text-lg rounded-full font-semibold">Next</Button>
</section>
  </form>
    </Form>
  );
}

 
export default LastPageForm;

