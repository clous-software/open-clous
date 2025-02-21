"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { Table } from "@tanstack/react-table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { updateJob } from "@/app/api/jobs/route"
import { joinWaitlist } from "@/app/api/waitlist/route"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { ToastAction } from "@/components/ui/toast"


const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
})
type JobData = {
  status: string;
};

const ModalWaitlist = ({
}) => {
  const router = useRouter();
  const [joinedSuccess, setJoinedSuccess] = useState(false);
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Actualiza el estado a 'closed'
      const waitlistResult = await joinWaitlist(values.email);
      if (waitlistResult.success) {  // Asumiendo que joinWaitlist retorna un objeto con una propiedad 'success'
        setJoinedSuccess(true);
        // Puedes mostrar un toast de éxito aquí, si lo deseas
        toast({
          variant: "default",
          title: "Successfully joined our waitlist!",
          description: "We will be in contact as soon as our Private Beta is open.",
        });
      }
    
    }catch (error) {

      toast({
        variant: "destructive",
        title: "Couldn't join the waitlist",
        description: "This email is already on the waitlist.",
        // We need to add 
        action: <ToastAction altText="Contact support" className="bg-secondary text-black hover:bg-secondary">Contact support</ToastAction>,

      });
    }
  }
  
  

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 flex flex-col gap-1 rounded-2xl">
        <h3 className="text-xl font-semibold leading-none">
          Add new members
        </h3>
    {joinedSuccess ? (
        <div className="items-center text-left gap-4 mt-4">
          <h3 className="text-lg font-semibold">New members successfully added!</h3>
          <Button onClick={() => router.push('/')} className="w-full rounded-full">Back to Home</Button>
        </div>
      ) : (
        <div className="mt-5 space-y-2">
          <div className="relative flex">
<div className="w-full mr-4">

        <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <section className="relative w-full">
                    <FormControl>
                    <Input placeholder=" " {...field} />

                    </FormControl>
                    <div className="absolute top-0 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="default" className="ml-auto pr-0 lg:flex leading-none items-center text-muted justify-center gap-1 hover:text-muted text-base font-medium">
                          <p>Member</p>
                          <ChevronDown className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[150px] text-muted">
                      <p>Member</p>
                        <p>Lead</p>
                        <p>Admin</p>

                      </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                    
                    <FormLabel>Company email</FormLabel>
                  </section>
                </FormItem>
              )}
            />
            </div>

            <div className="w-1/5">
            <Button type="submit" className="w-full relative font-medium rounded-full px-1 py-1.5">Add</Button>

            </div>
            </div>
            <p className="text-xs">By clicking &apos;Add&apos; you agree to our <Link target="_blank" href="https://www.clous.app/sharing-policy" className="text-primary"> Sharing Policy.</Link></p>

        </div>
            )}
      </form>
    </Form>
  )
}
export default ModalWaitlist;
