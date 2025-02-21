"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
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
import { joinWaitlist } from "@/app/api/waitlist/route"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { ToastAction } from "@/components/ui/toast"
import mixpanel from "mixpanel-browser";


const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
})

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
      mixpanel.track("Invite Request");
      // Actualiza el estado a 'closed'
      const waitlistResult = await joinWaitlist(values.email);
      if (waitlistResult.success) {  // Asumiendo que joinWaitlist retorna un objeto con una propiedad 'success'
        setJoinedSuccess(true);
        // Puedes mostrar un toast de éxito aquí, si lo deseas
        toast({
          variant: "default",
          title: "Successfully joined our invite waitlist!",
          description: "We will be in contact as soon as we can.",
        });
      }
    
    }catch (error) {

      toast({
        variant: "destructive",
        title: "Couldn't join the invite waitlist",
        description: "This email is already on the invite request waitlist.",
        // We need to add 
        action: <ToastAction altText="Contact support" className="bg-secondary text-black hover:bg-secondary">Contact support</ToastAction>,

      });
    }
  }
  
  

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 flex flex-col gap-1 rounded-2xl">
        <h3 className="text-5xl font-semibold leading-none">Ask for an invite, get early access
        </h3>
    {joinedSuccess ? (
        <div className="items-center text-left gap-4 mt-4">
          <h3 className="text-xl font-semibold">Thank you for your interest</h3>
        <p className="text-base mt-1 mb-4">It means the world to us that people are actually interested in our solution. We&apos;ll be reaching out to see whether we can help you in your hiring needs. </p>
          <Button onClick={() => router.push('/')} className="w-full rounded-full">Back to Home</Button>
        </div>
      ) : (
        <div className="mt-5 space-y-2">
      <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <section className="relative">
                    <FormControl>
                    <Input placeholder=" " {...field} />
                    </FormControl>
                    <FormLabel>Work email</FormLabel>
                  </section>
                </FormItem>
              )}
            />
            <p className="text-xs">By clicking Submit you agree to our <Link target="_blank" href="https://www.clous.app/privacy" className="text-primary"> Privacy Policy.</Link></p>
        <Button type="submit" className="w-full">Submit</Button>
        </div>
            )}
      </form>
    </Form>
  )
}
export default ModalWaitlist;
