import { columns } from "./components/openings/columns"
import { DataTable } from "./components/openings/data-table"
import { useEffect, useState } from "react"
import { getAllJobs } from "@/app/api/chat/route"

import mixpanel from "mixpanel-browser";
mixpanel.init(`${process.env.MIXPANEL_TOKEN}`,  {debug: true, persistence: 'localStorage'});

export default  function JobOpeningBoard() {
  const [data, setData] = useState([]);
  mixpanel.track("ClousH Opening Board");

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

  return (
    <main className="h-full px-8 overflow-auto w-full mt-4">
   
        <DataTable  columns={columns} data={data} />
    </main>
  )
}