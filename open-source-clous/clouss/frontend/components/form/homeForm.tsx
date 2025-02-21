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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { submitContact } from "@/app/api/waitlist/route";
import { useState } from "react";
import FormButton from "../buttons/FormButton";

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z
  .string()
  .refine((value) => /^[0-9]+$/.test(value), {
    message: "Phone number should only contain numbers",
  }),
});


export function HomeForm() {

  const [formSubmitted, setFormSubmitted] = useState(false); // Estado para controlar si se envió el formulario

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
  })
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    try {
      await submitContact(values);
      setFormSubmitted(true); // Cambia el estado a formulario enviado

    } catch (error) {
      console.error("Error when submitting the contact form:", error);
      // Manejar el error, como mostrar un mensaje de error al usuario.
    }
  };
  return (
    <main className="lg:w-96">
      <Form {...form}>
      {formSubmitted ? ( // Si el formulario se ha enviado, muestra el mensaje de agradecimiento
          <div>
          <h3 className="text-xl font-semibold">Thank you for joining!</h3>
          <p className="text-lg">
          In the meantime, you can <Link href={""} className="text-primary">submit your feedback
          </Link> so that we can nail our ClousH Alpha launch.
          </p>
        </div>
        ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* First Name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <section className="relative">
                  <FormControl>
                    <Input placeholder="" {...field} className="h-10" />
                  </FormControl>
                  <FormLabel>First name</FormLabel>
                </section>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <section className="relative">
                  <FormControl>
                    <Input placeholder="" {...field} className="h-10" />
                  </FormControl>
                  <FormLabel>Last name</FormLabel>
                </section>
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <section className="relative">
                  <FormControl>
                    <Input placeholder="" {...field} className="h-10" />
                  </FormControl>
                  <FormLabel>Company email</FormLabel>
                </section>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <section className="relative">
                  <FormControl>
                  <Input

                      placeholder=""
                      {...field}
                      className="h-10"
                      
                    />
                  </FormControl>
                  <FormLabel>Phone number</FormLabel>
                </section>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">

<p className="text-xs">By clicking you agree to our{" "}
<Link href={"https://www.clous.app/privacy"} className="text-primary">Privacy Policy.</Link> </p>
  
          <FormButton name="Submit" />
          </div>
        </form>
         )}
      </Form>
    </main>
  );
}
