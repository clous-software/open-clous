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

import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

// Define a type for the possible values of type_account
type TypeAccount = "Enterprise" | "Team" | "Recruiter";

const formSchema = z.object({
  company_name: z.string().min(5, { message: "Must be 5 or more characters long" }).optional(),
  type_account: z.enum(
    ["Enterprise", "Team", "Recruiter"]
  ),
});
 

const SetUpForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: undefined,
      type_account: "Enterprise" as TypeAccount, // Provide a default value based on your use case
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Manejar la respuesta del backend según sea necesario
      console.log(values);

      // Mostrar un mensaje de éxito
      router.push('/last-step');

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
        className="flex flex-col gap-12 text-muted "
      >
     

        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <section className="w-[28rem] flex flex-col gap-2">
                   <FormLabel className="text-sm font-semibold">Company name</FormLabel>
                <FormControl>
                  <Input placeholder="Amazon Inc." {...field} />
                </FormControl>
              </section>
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="type_account"
          render={({ field }) => (
            <FormItem >
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col"
                >
                  
                  <FormItem className="flex items-start gap-3 space-y-0">
                    <FormControl className="mt-2">
                      <RadioGroupItem value="Enterprise"
                      className={`h-6 w-6 ${
                        field.value === 'Enterprise' ? 'bg-primary' : ''
                      }`}
                      />
                    </FormControl>
                    <div className="">

                    <FormLabel className="font-semibold text-xl" >
                      Enterprise
                    </FormLabel>
                    <p className="text-base max-w-[26rem]">For companies that onboard new hires in double digits every month and Linkedin becomes too expensive</p>
                    </div>
                  </FormItem>


                  <FormItem className="flex items-start gap-3 space-y-0 my-4">
                    <FormControl className="mt-2">
                      <RadioGroupItem value="Team"  
                      className={`h-6 w-6 ${
                        field.value === 'Team' ? 'bg-primary' : ''
                      }`}/>
                    </FormControl>
                    <div>

                    <FormLabel className="font-semibold text-xl p-0">
                      Team
                    </FormLabel>
                    <p className="text-base max-w-[26rem]">Small teams with big dreams, or bigger teams that wish they did more with less</p>
                    </div>
                  </FormItem>


                  <FormItem className="flex items-start gap-3 space-y-0">
                    <FormControl className="mt-2">
                      <RadioGroupItem value="Recruiter"  
                      className={`h-6 w-6 ${
                        field.value === 'Recruiter' ? 'bg-primary' : ''
                      }`}/>
                    </FormControl>
                    <div>

                    <FormLabel className="font-semibold text-xl">Recruiter</FormLabel>
                    <p className="text-base max-w-[26rem]">Hiring professionals that are genuinely curious about ClousH</p>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>

)}
/>
<section className="flex gap-2 w-[28rem]">
<Link href="/" className="ml-auto text-lg font-semibold rounded-full bg-muted/5 text-white px-4 py-2 h-10 items-center flex hover:bg-accent">Back</Link>
<Button type="submit" className="text-lg font-semibold rounded-full">Next</Button>
</section>
  </form>
    </Form>
  );
}

 
export default SetUpForm;

