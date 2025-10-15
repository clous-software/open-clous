"use client"
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoTrashOutline } from "react-icons/io5";
import { ArrowLeft, Minus, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/inputNormal";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineReplay } from "react-icons/md";
import { IoAttach } from "react-icons/io5";
import {
  Select as SelectShad,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RiAiGenerate } from "react-icons/ri";

const Settings = () => {
  const initialQuestions = ["Data Name 1", "Data Name 2", "Data Name 3"];
  const [questions, setQuestions] = useState<string[]>(initialQuestions);

  const formSchema = z.object({
    questionOne: z.string().min(2).max(50),
    questionTwo: z.string().min(2).max(50),
    questionThree: z.string().min(2).max(50),
    questionFour: z.string().min(2).max(50),
    questionFive: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const dataTypes = ["String", "Boolean", "Integer", "Float"]; // Add other data types as needed
  const [questionType, setQuestionType] = useState<string[]>([]);


  const addQuestion = () => {
    const newQuestion = `Question ${questions.length + 1}`;
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted with data:", data);
  };

  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el sidebar está abierto o cerrado

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen); // Cambia el estado de isOpen al contrario de su valor actual
  }

  return (
    <main className="w-full flex flex-col h-full overflow-auto">
      <section className="pl-32 py-16 w-[40vw]">
        <div className="flex justify-between">
          <h2 className="text-2xl text-black font-semibold">Getting started</h2>
          <div className="flex gap-x-2 items-center">
            <IoAttach className="w-6 h-6" />
            <MdOutlineReplay className="w-6 h-6" />

          </div>
        </div>
        <div className="mt-6">
          <div>
            <Form {...form}>
              <form className="space-y-12">
                <section className="">
                  {/* Render questions dynamically */}
                  {questions.map((question, index) => (
                    <div key={index} className="flex items-center w-full space-x-2 space-y-4">
                      {/* Render form fields for each question */}
                      <input
                        type="text"
                        name={`question${index + 1}`}
                        placeholder={question}
                        className="border-0 bg-transparent p-2 w-4/5 text-gray-foreground text-base leading-3 rounded-lg"
                      />
                      {/* To select the data type */}
                      <SelectShad
                        name={`questionType${index + 1}`}
                        value={questionType[index] || ""}
                        onValueChange={(value) => {
                          const updatedQuestionTypes = [...questionType];
                          updatedQuestionTypes[index] = value;
                          setQuestionType(updatedQuestionTypes);
                        }}
                      >
                        <SelectTrigger className="ml-2 min-w-[4rem] border shadow-none justify-start gap-2 text-sm font-medium p-4 inline-flex">
                          <SelectValue placeholder="Select Data Type" />
                          <ChevronDown />
                        </SelectTrigger>
                        <SelectContent>
                          {dataTypes.map((type) => (
                            <SelectItem key={type} value={type} className="text-lg">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectShad>
                      {/* Button to remove the question */}
                      {questions.length > 1 && (
                        <button
                          type="button"
                          className="bg-muted/5 border-0 text-base rounded-lg"
                          onClick={() => removeQuestion(index)}
                        >
                          <IoTrashOutline />
                        </button>
                      )}
                    </div>
                  ))}
                  {/* Button to add a new question */}
                  <button
                    type="button"
                    className="text-base font-medium text-primary cursor-pointer"
                    onClick={addQuestion}
                  >
                    Add variable
                  </button>
                </section>
                <div className="px-4 py-2 bg-primary text-secondary font-medium text-lg inline-flex rounded-xl" onClick={handleToggleSidebar}>Start validating</div>
              </form>
            </Form>
          </div>
          <div>
            <div className={`sidebarAlt px-10 py-3 gap-6 z-50 flex justify-between mx-auto flex-col overflow-auto w-[50vw]  ${!isOpen ? 'open relative' : 'closed'}`}>
              {/* Arrow para cerrar el sidebar */}

              {/* Contenido del sidebar */}
              <div className="py-24 justify-center flex flex-col gap-y-4">
                <div></div> {/* This is the progress bar */}
                <div className="flex flex-col gap-y-4 p-6 border rounded-xl">
                  <div className="flex gap-x-4">
                    <h3 className="text-base font-semibold">Location</h3>
                    <p>Madrid, Spain</p>
                  </div>
                  <div className="flex gap-x-4">
                    <h3 className="text-base font-semibold">Home Team</h3>
                    <p>Real Madrid FC</p>
                  </div>
                  <div className="flex gap-x-4">
                    <h3 className="text-base font-semibold">Away Team</h3>
                    <p>FC Barcelona</p>
                  </div>
                  <div className="flex gap-x-4">
                    <h3 className="text-base font-semibold">Amount</h3>
                    <p>254€</p>
                  </div>
                  <div className="flex gap-x-4">
                    <h3 className="text-base font-semibold">Quote</h3>
                    <p>2.15</p>
                  </div>
                  <div className="flex gap-x-4">
                    <h3 className="text-base font-semibold">Selection</h3>
                    <p>1X</p>
                  </div>

                </div>
                <div className="px-16 py-2 bg-primary justify-center mx-auto text-secondary font-medium text-lg inline-flex rounded-xl">Approve</div>
                <button
                  type="button"
                  className="text-base font-medium text-primary cursor-pointer"
                >
                  Deny
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="pl-32 py-16 w-[40vw]">
        <div className="flex flex-col gap-y-8">
          <h2 className="text-2xl text-black font-semibold">Implementation</h2>
          <div className="flex gap-x-2 items-center px-4 py-2 border rounded-xl items-center inline-flex">
            *********************************

          </div>
        </div>
      </section>
    </main>
  );
};

export default Settings;