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

const formSchema = z.object({
  message: z.string().min(20, "Send us feedback must be at least 20 characters long")

});


export function FeedbackForm() {
  const [formSubmitted, setFormSubmitted] = useState(false); // Estado para controlar si se envió el formulario

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
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-green-500">Thank you for your submission!</p>
          </div>
        ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
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
