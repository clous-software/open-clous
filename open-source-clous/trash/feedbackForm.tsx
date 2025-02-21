import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Link from "next/link";
import { submitFeedback } from "@/app/api/waitlist/route";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import FormButton from "../buttons/FormButton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  message: z.string().min(20, "Send us feedback must be at least 20 characters long")

});


export default function FeedbackForm() {
  const [formSubmitted, setFormSubmitted] = useState(false); // Estado para controlar si se envió el formulario
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      
    },
  })
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    try {
      await submitFeedback(values);
      setFormSubmitted(true); // Cambia el estado a formulario enviado

    } catch (error) {
      console.error("Error when submitting the feedback form:", error);
      // Manejar el error, como mostrar un mensaje de error al usuario.
    }
  };
  return (
    <main className="w-auto">
      <Form {...form}>
      {formSubmitted ? ( // Si el formulario se ha enviado, muestra el mensaje de agradecimiento
          <div className="flex flex-col justify-center items-center text-center h-full">
            <h3 className="text-5xl font-semibold leading-none mb-2">Let&apos;s reward contributors

</h3>
<p className="mb-6">Thank you so much for contributing! Our team has put together some <a className="text-primary font-medium" href="https://beta.clous.app/quote">resources easily accessible</a> as a way to show how grateful we are to you. Oh, and a month of subscription for free. Claim it in the link below. </p>   
<Button onClick={() => router.push('https://beta.clous.app/claim/one-month-starter')} className="w-full rounded-full">Claim one month</Button>

          </div>
        ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <h3 className="text-5xl font-semibold leading-none mb-2">Your feedback means the world to us

</h3>
<p className="mb-6">The only reason we can improve every week is thanks to your feedback. We plan to add more and more value with time, and the only way to do it is by collecting first-hand expert feedback. <br/><br/>
  Our team might take a while to implement it, so be patient and relax. We&apos;ve heard you. But you know, our product leaders are the ones who decide on the roadmap. We will try our hardest to be as transparent as we can with with upcoming updates.</p>
   
          {/* First Name */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <section className="relative">
                  <FormControl>
                    <Textarea placeholder="" rows={4} {...field} className="no-resize "/>

                  </FormControl>
                  <FormLabel>Send us feedback</FormLabel>
                </section>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">

<p className="text-xs">By clicking you agree to our{" "}
<Link href={"https://www.clous.app/privacy"} className="text-primary">Privacy Policy.</Link> </p>
          <FormButton name="Send feedback" />
          </div>
        </form>
         )}
      </Form>
    </main>
  );
}
