import { Metadata } from "next";

import { columns } from "./components/candidates/columns";
import { DataTable } from "./components/candidates/data-table";
export const metadata: Metadata = {
  title: "Candiates",
  description: "A task and issue tracker build using Tanstack Table.",
};

import mixpanel from 'mixpanel-browser';
mixpanel.init(`${process.env.MIXPANEL_TOKEN}`,  {debug: true, persistence: 'localStorage'});


export default function JobTalentBoard() {
  const candidates = [
    {
      id: "1001",
      name: "Oscar Hernandez",
      email: "oscar_hernandez82@gmail.com",
      status: "Applied",
      opening: "Project Manager"
    },
    {
      id: "1002",
      name: "Alex Crespo",
      email: "crespo.alex91@hotmail.com",
      status: "Qualified",
      opening: "Human Resources Specialist"
    },
    {
      id: "1003",
      name: "Margot Rivera",
      email: "margot.rivera23@yahoo.com",
      status: "Scheduled",
      opening: "Sales Representative"
    },
    {
      id: "1004",
      name: "Sara Lopez",
      email: "lopez_sara88@outlook.com",
      status: "Interviewed",
      opening: "Project Coordinator"
    },
    {
      id: "1005",
      name: "Mike Johnson",
      email: "mjohnson1984@gmail.com",
      status: "Applied",
      opening: "Frontend Developer"
    },
    {
      id: "1006",
      name: "Filipo Martinez",
      email: "filipo.martinez79@yahoo.com",
      status: "Scheduled",
      opening: "Sales Associate"
    },
    {
      id: "1007",
      name: "Paula Smith",
      email: "paula.smith_76@hotmail.com",
      status: "New hire",
      opening: "Senior Frontend Developer",
    },
  ];
  
  

  
  mixpanel.track("ClousH Talent Board");
  return (
    <main className="h-full px-8 overflow-auto w-full mt-4">
      <DataTable columns={columns} data={candidates} />
    </main>
  );
}
