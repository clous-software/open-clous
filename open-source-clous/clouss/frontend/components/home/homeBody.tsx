"use client";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, ExternalLink, Minus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ActiveJobs from "@/components/cards/ActiveJobsCard";
import NotificationCard from "../cards/NotificationCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "@/app/api/chat/route";
import { ArrowDown } from "lucide-react";
import SettingsModal from "@/components/modals/settingsModal";
import React from "react";
import SupportModal from "@/components/modals/suportModal";
import NotificationsModal from "@/components/modals/notificationsModal";
import { Input } from "@/components/ui/inputNormal";
import Link from "next/link";
import PeerOnboarding from "../ai-peer/peerOnboard";
import mixpanel from "mixpanel-browser";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import ModalWaitlist from "../modals/joinWaitlistModal";

interface Job {
  id: number;
  status: string;
}

mixpanel.init(`${process.env.MIXPANEL_TOKEN}`,  {debug: true, persistence: 'localStorage'});

const HomeBody = () => {
  const [data, setData] = useState<Job[]>([]);
  const trackButtonClick = (Property: any) => {
    mixpanel.track("Trigger", {
      Name: Property,
      Property: Property,
    });
  };

  const pathname = usePathname();
  const currentPageName = pathname.split("/").pop(); // Obtiene el nombre de la página actual

  const router = useRouter();

  const handleInputClick = () => {
    // Redirige a la página "/"
    router.push("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobs = await getAllJobs();
        setData(jobs);
      } catch (error) {
        console.error("Error al obtener los trabajos", error);
      }
    };

    fetchData();
  }, []);

  const publishedJobs =
    data.length > 0 ? data.filter((job) => job.status === "published") : [];
  const activeJobOpeningsCount = publishedJobs.length; // Count of published jobs
  const totalJobsCount = data.length; // Count of all jobs

  return (
    <main className="grid grid-cols-12 gap-4 px-12 xl:pb-12 py-8 h-full text-xl text-muted fadeOut">
      <section
        className="flex gap-2 items-center  relative mx-auto w-[46rem] col-span-12"
        onClick={handleInputClick}
      >
        <Input
          placeholder="I need a Software Developer in with 4 years of experience"
          className="h-12 border"
        />
        <p className="border-primary absolute right-2 rounded-lg bg-primary p-2 cursor-pointer">
          <ArrowDown size={20} className="text-secondary" />
        </p>
      </section>

      <section className="col-span-12 pt-4">
        <h3 className="capitalize font-semibold text-2xl">{currentPageName}</h3>
      </section>
      <Card className=" rounded-2xl col-span-6">
        <CardContent className=" px-4 py-3 font-semibold ">
          <h3>Active jobs</h3>
          <h3 className="text-4xl leading-none pt-1">
            {activeJobOpeningsCount}
          </h3>

          <span className="font-normal text-base"> in the last 30 days</span>
        </CardContent>
      </Card>
      <Card className=" rounded-2xl col-span-6">
        <CardContent className="flex flex-col px-4 py-3 font-semibold ">
          <h3>Opened jobs</h3>
          <h3 className="text-4xl leading-none pt-1">{totalJobsCount}</h3>
          <span className="font-normal text-base"> in the last 30 days</span>
        </CardContent>
      </Card>
      <Card className="rounded-2xl col-span-6">
        <CardContent className="flex flex-col px-4 py-3 font-semibold">
          <h3>New hires</h3>
          <h3 className="text-4xl leading-none pt-1">0</h3>
          <span className="font-normal text-base"> in the last 30 days</span>
        </CardContent>
      </Card>
      <Dialog>
        <DialogTrigger asChild onClick={() => trackButtonClick("Apply")}>
          <Card className="rounded-2xl border-primary  col-span-6 bg-primary text-secondary group cursor-pointer relative min-h-[8rem] overflow-hidden">
            <CardContent className="flex flex-col h-full px-4 py-3 font-semibold">
              <div className="flex justify-between items-center">
                <h3> Pre-order ClousH</h3>{" "}
                <ExternalLink className=" absolute -right-5 -top-6 ease-in-out duration-800 transition-transform transform translate-x-0  group-hover:-translate-x-9 group-hover:translate-y-9" />
              </div>
              <p className="font-normal text-base mt-auto max-w-[32em]">
                It means the world to us that you liked our product, so we made
                available a pre-order in case you want a fast delivery in May.
              </p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="px-8 py-5">
          <ModalWaitlist />
          {/*      <Player
                    autoplay
                    src="/congrats.json"
                    className=" w-[60rem] h-full"
                  /> */}
        </DialogContent>
      </Dialog>

      <Card className="h-full rounded-2xl  lg:col-span-6  overflow-auto">
        <CardContent className="flex flex-col gap-2 px-0 py-3 font-semibold ">
          <h3 className="px-4 pt-2">Your active jobs</h3>
          <ActiveJobs />
        </CardContent>
      </Card>
      <Card className="h-full rounded-2xl lg:col-span-6 hidden lg:flex overflow-auto">
        <CardContent className="flex flex-col gap-2 px-0 py-3 font-semibold">
          <h3 className="px-4"> Upcoming talent</h3>
          <NotificationCard />
        </CardContent>
      </Card>

      <PeerOnboarding/>
    </main>
  );
};

export default HomeBody;
