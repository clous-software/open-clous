"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRight, Minus, X, Circle, Check } from "lucide-react";
import { BsCircleFill } from "react-icons/bs";
import { Card, CardContent } from "@/components/ui/card";
import mixpanel from 'mixpanel-browser';

interface AccordionData {
  value: string;
  title: string;
  content: string;
  isChecked: boolean;
}

const PeerOnboarding: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);


  const [accordionData, setAccordionData] = useState<AccordionData[]>([
    {
      value: "1",
      title: "Create your job opening",
      content: "Time to grow your team! Craft compelling job openings to attract top talent. Describe your company culture, highlight the role, and let your next team member know why they'll thrive with you. Start shaping the future today.",
      isChecked: false,
    },
    {
      value: "2",
      title: "Connect and publish",
      content: "Unlock efficiency! Connect your Calendar account seamlessly and publish job openings with just one click. Streamline your recruitment process by effortlessly sharing opportunities with potential candidates.",
      isChecked: false,
    },
    {
      value: "3",
      title: "Share your job opening",
      content: "Spread the word! Share your job openings on social media, professional networks, and within your industry circles. The more eyes on your opportunities, the closer you are to finding the perfect match for your team.",
      isChecked: false,
    },
    {
      value: "4",
      title: "Invite your team",
      content: "Ready to amplify collaboration? Invite your team members to join Clous. Simply share invites via email, and watch your workspace come to life with shared goals and achievements.",
      isChecked: false,
    },
    {
      value: "5",
      title: "Update notifications",
      content: "Ensure you never miss a beat! Update your notification preferences both in-app and via email. Stay informed about crucial developments in your hiring process. Enable important notifications for a seamless and effective recruitment experience.",
      isChecked: false,
    },
  // Resto de los datos del acordeón
]);  

  const handleMinimizeClick = () => {
    setIsMinimized(true);
  };

  const handleMaximizeClick = () => {
    setIsMinimized(false);
  };

  const handleAccordionTriggerClick = (index: number) => {
    const updatedAccordionData = accordionData.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isChecked: true, // Marcar el elemento actual
        };
      }
      return item;
    });
    setAccordionData(updatedAccordionData);
  };

  return (
    <main>
      <Card
        className={`fixed bottom-4 left-28 bg-background rounded-2xl z-50 overflow-hidden border-0 ${
          isMinimized ? "minimized " : "w-[26rem]"
        }`}
      >
        <CardContent className={`bg-primary text-secondary font-medium w-full items-center py-2 ${isMinimized ? "relative pr-12 text-base" : " gap-4 text-xl leading-4 "}`}>
          {isMinimized ? (
        <div onClick={handleMaximizeClick}> 
        Welcome to ClousH
            <ArrowUpRight  className="cursor-pointer absolute top-2 right-2" />
              </div> 
            ) : (
              <div className="flex justify-between items-center">

              Welcome to ClousH

              <Minus onClick={handleMinimizeClick} className="cursor-pointer " />
              </div>
              )}
        </CardContent>
        {!isMinimized && (
          <CardContent className="border rounded-2xl rounded-t-none">
            <Accordion type="single" collapsible className="pt-1">
              {accordionData.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={item.value}
                  className={`border-b-0 ${index === 0 ? '' : 'border-t-2'}`}
                >
                  <AccordionTrigger
                    className="hover:no-underline text-xl gap-2 text-left"
                    onClick={() => handleAccordionTriggerClick(index)}
                  >
                    {item.isChecked ? (
                      <div className="border border-primary w-4 h-4 rounded-sm bg-primary relative ">
                        <Check className="text-secondary w-4 h-4 absolute p-0.5" />
                      </div>
                    ) : (
                      <div className="border border-primary w-4 h-4 rounded-sm bg-background"></div>
                    )}{" "}
                    <h4 className="font-medium">
                      
                    {item.title}
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        )}
      </Card>
    </main>
  );
};

export default PeerOnboarding;