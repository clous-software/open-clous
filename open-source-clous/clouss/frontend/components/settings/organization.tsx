import { Metadata } from "next";

import { columns } from "@/components/members/columns";
import { DataTable } from "@/components/members/data-table";
import { useState } from "react";
import { PlusSquare } from "lucide-react";
export const metadata: Metadata = {
  title: "Members List",
  description: "A members list by Clous.",
};

export default function JobTalentBoard() {
  const [members, setMembers] = useState([
    {
      id: "1001",
      name: "Alvaro",
      email: "avillaba@clous.app",
      role: "Admin",
    },
    {
      id: "1002",
      name: "Alex",
      email: "apurdoi@clous.app",
      role: "Admin",
    },
    {
      id: "1003",
      name: "Margot",
      email: "margot@clous.app",
      role: "Manager",
    },
    {
      id: "1004",
      name: "Sara",
      email: "sara@clous.app",
      role: "Member",
    },
    {
      id: "1005",
      name: "Mike",
      email: "mike@clous.app",
      role: "Member",
    },
    {
      id: "1006",
      name: "Alvaro",
      email: "avillaba@clous.com",
      role: "Member",
    },
    {
      id: "1007",
      name: "Paula",
      email: "spaula@clous.com",
      role: "Manager",
    },
  ]);

  const handleAddMember = () => {
    // Implement logic to add a new member
    const newMember = {
      id: "1008", // Generate a unique ID using uuid
      name: "New member",
      email: "newmember@clous.app",
      role: "Member",
    };

    // Update the Members state by creating a new array with the existing Members and the new one
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };

  return (
    <main className="h-full overflow-auto w-full">
      <DataTable columns={columns} data={members} />

      <div className="flex items-end pl-6 pt-2 leading-4 text-sm text-gray-foreground cursor-pointer gap-1" onClick={handleAddMember}>
        <PlusSquare width={16} height={16} /> Add new member
      </div>
    </main>
  );
}
