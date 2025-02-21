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
import { updateJob } from "@/app/api/chat/route"
import { joinWaitlist } from "@/app/api/waitlist/route"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

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
      }
    
    }catch (error) {

        toast({
          variant: "destructive",
          title: "Error joining the waitlist:",
          description: "This email is already on the waitlist.",
        });
    }
  }
  
  

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1 rounded-2xl">
        <h3 className="text-2xl font-semibold leading-none">Delivery on May, Pre-order now
</h3>
        <p className="text-sm">We’re getting ready for our private Beta soon. If you enjoyed the Demo, make sure to secure your seat by pre-ordering. </p>
    {joinedSuccess ? (
        <div className="text-primary items-center flex flex-col gap-4">
          <h3 className="text-xl">Thank you for pre ordering</h3>
        <p className="text-sm">Our Sales Team will get back to you as soon as you leave your email below, or you can fill out a form and we’ll reach out through email in 72 hours. </p>
          <Button onClick={() => router.push('/')} className="w-full">Back to Home</Button>
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
                    <FormLabel>Company email</FormLabel>
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
