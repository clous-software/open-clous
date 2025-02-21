import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";
import { Card, CardContent, CardHeader } from "../ui/card";
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
import { useState } from "react";
import { IoToggle } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { DateRange } from "react-day-picker";
import { Textarea } from "../ui/textarea";
import { ImGoogle3 } from "react-icons/im";
import { BsGoogle, BsGooglePlay } from "react-icons/bs";

const formSchema = z.object({
  allowNotQualified: z.boolean(),
  interviewsPerWeek: z.number(),
  maxApplicants: z.number(),
  maxInterviews: z.number(),
  vacancies: z.number(),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  sharing: z.string(), // Puedes ajustar este tipo según tus necesidades reales
  title: z.string(), // Puedes ajustar este tipo según tus necesidades reales
  description: z.string(), // Puedes ajustar este tipo según tus necesidades reales
  
});

export function PreferencesForm() {

  const [allowNotQualified, setAllowNotQualified] = useState(false);
  const [featureJobs, setFeatureJobs] = useState(false);
  const [publishOnClous, setPublishOnClous] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();
    // Use state to manage the connection status
  const [googleMeetConnected, setGoogleMeetConnected] = useState(false);
  const [googleCalendarConnected, setGoogleCalendarConnected] = useState(false);
  const [googleZoomConnected, setZoomConnected] = useState(false);

  const toggleGoogleMeetConnection = () => {
    setGoogleMeetConnected(!googleMeetConnected);
  };

  const toggleGoogleCalendarConnection = () => {
    setGoogleCalendarConnected(!googleCalendarConnected);
  };
  const toggleZoomConnection = () => {
    setZoomConnected(!googleZoomConnected);
  };

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
        </p>
      );
    }
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allowNotQualified: false,
      interviewsPerWeek: 0,
      maxApplicants: 0,
      maxInterviews: 0,
      vacancies: 0,
      sharing: "",
      title: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  };


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 overflow-auto mt-4 mb-4 text-muted"
      >
         <Card className="border-none rounded-none pt-4 space-y-3">
        <h4 className="leading-none font-medium">
          Job conections
        </h4>
        <CardContent className="flex gap-4 items-center p-0 cursor-pointer"  onClick={toggleGoogleMeetConnection}>
          <BsGoogle
            className="text-gray-foreground w-7 h-7"
          />
          <div className="text-sm leading-none text-gray-foreground mr-auto">
            {/* Conditionally render the email based on connection status */}
            {googleMeetConnected && 
            <div>

            <p className="text-lg text-primary leading-none">Abick</p>
            <p >Lorem ipsum dolor sit</p>
            </div>
            }
          </div>
          <IoToggle
            className={`w-8 h-8  ${googleMeetConnected ? 'text-primary' : 'text-muted rotate-180'}`}
           
          />
        </CardContent>
      </Card>

        <div className="space-y-2 py-3 leading-none">
          <div className=" flex justify-between items-center" onClick={() => setAllowNotQualified((prev) => !prev)}>
        <h4 className="font-medium">Allow not qualified</h4>
          <IoToggle
            className={`w-8 h-8 cursor-pointer ${
              allowNotQualified ? "rotate-180 text-muted" : "text-primary"
            }`}
            
            />

            </div>
          <p className="text-sm w-[25rem]">When this is on, every candidate will be able to schedule interviews with you because you will deactivate our AI that qualifies candidates.</p>
        </div>



        <FormField
          control={form.control}
          name="interviewsPerWeek"
          render={({ field }) => (
            <FormItem>
              <section className="relative ">
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormLabel>Interviews per week</FormLabel>
              </section>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxApplicants"
          render={({ field }) => (
            <FormItem>
              <section className="relative ">
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormLabel>Max. applicants</FormLabel>
              </section>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxInterviews"
          render={({ field }) => (
            <FormItem>
              <section className="relative ">
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormLabel>Max. interviews</FormLabel>
              </section>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vacancies"
          render={({ field }) => (
            <FormItem>
              <section className="relative ">
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormLabel>Vacancies</FormLabel>
              </section>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <label>Open time</label>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                  <Button
              id="date"
              variant="outline"
              className={cn(
                "  justify-start text-left font-normal items-center",
                (!range || (range.from === null && range.to === null)) && "text-accent"
              )}
            >
              {range && (range.from || range.to) ? (
                // Mostrar las fechas seleccionadas
                <>
                  {format(range.from || new Date(), "LLL dd, y")} -{" "}
                  {format(range.to || new Date(), "LLL dd, y")}
                </>
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            defaultMonth={new Date()}
            mode="range"
            min={3}
            max={8}
            selected={range}
            onSelect={(selectedRange) => {
              setRange(selectedRange);
              // Actualizar el valor del campo en el formulario
              field.onChange(selectedRange);
            }}
            footer={footer}
          />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2 ">
          <div className=" flex justify-between items-center"    onClick={() => setFeatureJobs((prev) => !prev)}>
        <h4 className="font-medium ">Feature other companies jobs</h4>
          

          <IoToggle
            className={`w-8 h-8 cursor-pointer ${
              featureJobs  ? "rotate-180 text-muted" : "text-primary"
            }`}
            
            />
            </div>
        <p className="text-sm w-[25rem]">When candidates apply, if they don’t meet the job requirements we recommend them other job openings from your company. When this is on, we will recommend candidates other Job Openings from other companies if you don’t have enough Active Job Openings.</p>
        </div>
        <div className="space-y-2 ">
          <div className=" flex justify-between items-center"    onClick={() => setPublishOnClous((prev) => !prev)}>
        <h4 className="font-medium ">Publish on Clous Domains</h4>
          

          <IoToggle
            className={`w-8 h-8 cursor-pointer ${
              publishOnClous ? "rotate-180 text-muted" : "text-primary"
            }`}
            
            />
            </div>
        <p className="text-sm w-[25rem]">We publish every Job Opening on our Clous Jobs (Linkedin Page) and Slack Community channels.</p>
        </div>
      


        <div>
          <h2 className="mt-4 text-xl text-muted font-semibold">Sharing Preferences</h2>
        </div>
        <FormField
          control={form.control}
          name="sharing"
          render={({ field }) => (
            <FormItem>
              <section className="relative ">
                <FormControl>
                  <Textarea placeholder="" {...field} rows={4}/>
                </FormControl>
              <FormLabel>Sharing editability</FormLabel>
              </section>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
              <FormItem>
              <section className="relative">
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
               <FormLabel>SEO title</FormLabel>
               </section>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
              <FormItem>
              <section className="relative ">
                <FormControl>
                  <Textarea placeholder="" {...field} rows={4}/>
                </FormControl>
              <FormLabel>SEO description</FormLabel>
              </section>
            </FormItem>
          )}
        />
        <div>
        <Button>
          Save
        </Button>
        </div>

      </form>
    </Form>
  );
}
