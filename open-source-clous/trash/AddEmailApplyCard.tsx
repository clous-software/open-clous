import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SiGooglecalendar } from "react-icons/si";
import Textarea from 'react-expanding-textarea'; // Import the Textarea component
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";
import { CgGoogle } from "react-icons/cg";
import { IoLogoLinkedin } from "react-icons/io5";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ModalWaitlist from "@/components/modals/joinWaitlistModal";
import { SignonButton } from "@/components/ui/signonbutton";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoToggle } from "react-icons/io5";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BsTextLeft } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { ArrowUpRight, ExternalLink, Minus, X } from "lucide-react";
import { GoInbox } from "react-icons/go";
import { PiQueueFill } from "react-icons/pi";

const emailApplySchema = z.object({
  email_apply_subject: z.string().optional(),
  email_apply_message: z.string().optional(),
});
type JobData = z.infer<typeof emailApplySchema>;


const AddEmailApplyCard = () => {
  const [currentRender, setCurrentRender] = useState('yes');
  const [editedJob, setEditedJob] = useState<JobData | null>(null);

  const formSchema = z.object({
    dob: z.string({
      required_error: "An application email is required.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-xl bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <section>
      {/* Render based on current state */}
      <Card className="flex flex-col border-none min-w-5xl h-6/8 items-center justify-center py-4 px-4">
        <section className="flex flex-col">
          <h3 className="text-xl font-semibold mt-3 px-6">
            Add application email
          </h3>
          <CardContent className="pb-3 flex flex-col w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 overflow-auto mb-4 text-muted">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-left">
                    <FormControl>
                      <Input
                        name="emailApplySubject"
                        className="text-left border outline-none border-none placeholder:text-gray-foreground placeholder:font-normal font-semibold min-w-[25rem] bg-transparent flex p-0 py-1 text-sm overflow-auto py-2 px-3"                        
                        placeholder="Write a subject that catches the candidate eye"
                        onChange={(e) =>
                          setEditedJob((prevJob) => ({
                            ...prevJob,
                            email_apply_subject: e.target.value,
                          }))
                        }
                      /> 
                    </FormControl>
                    <FormControl>
                      <Textarea
                        name="jobURL"
                        className="text-left border outline-primary  min-w-[30rem] rounded-xl min-h-[15rem] bg-transparent flex p-0 py-1 text-sm overflow-auto py-2 px-3"                        
                        placeholder="Personalize your messaging with AI"
                        onChange={(e) =>
                          setEditedJob((prevJob) => ({
                            ...prevJob,
                            email_apply_message: e.target.value,
                          }))
                        }
                      /> 
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  
                )}
              />
              <Button
            variant="outline"
            className={` relative text-base w-full py-4 px-8 border-none font-semibold w-[15rem] bg-primary self-end text-secondary overflow-hidden`}
          >
            Add Email Apply
          </Button>
            </form>
          </Form>
          </CardContent>
          
          
        </section>
      </Card>
    </section>
  );
};

export default AddEmailApplyCard;
