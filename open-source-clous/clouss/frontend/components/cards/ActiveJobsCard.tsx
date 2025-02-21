import { useEffect, useState } from "react";
import { getAllJobs } from "@/app/api/chat/route";
import React from "react";
import { useRouter } from "next/navigation";
import mixpanel from "mixpanel-browser";
import { Player } from "@lottiefiles/react-lottie-player";

interface Job {
  id: number;
  role: string;
  status: string;
  tools: string[] | { id: number; name: string }[];
  languages: string[] | { id: number; name: string }[];
}

const ActiveJobs = () => {
  const trackButtonClick = (Property: any) => {
    mixpanel.track("Individual", {
      Name: Property,
      Property: Property,
    });
  };

  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobs = await getAllJobs();
        setData(jobs);
      } catch (error) {
        console.error("Error al obtener los trabajos", error);
      } finally {
        setLoading(false); // Una vez completada la obtención de los trabajos, establece el estado de carga a falso
      }
    };

    fetchData();
  }, []);

  const publishedJobs =
    data.length > 0 ? data.filter((job) => job.status === "published") : [];

  return (
    <div className="overflow-auto w-full">
      {loading ? ( // Mostrar indicador de carga si loading es verdadero
        <div className="flex justify-center items-center w-full h-full">
          <Player autoplay loop src="/load.json" className="h-40 min-w-[10rem]" />{" "}
        </div>
      ) : (
        // Renderizar la tabla cuando loading sea falso
        <table>
          <thead>
            <tr className="flex">
              <th className="p-4 text-left font-semibold text-base border-b min-w-[14rem]  xl:min-w-[20rem] w-full">
                Role
              </th>
              <th className="p-4 text-left font-semibold text-base border-b min-w-[14rem] xl:min-w-[20rem] w-full">
                Tools
              </th>
              <th className="p-4 text-left font-semibold text-base border-b min-w-[10rem] xl:min-w-[20rem] w-full">
                Languages
              </th>
            </tr>
          </thead>
          <tbody>
            {publishedJobs.map((job, index) => (
              <React.Fragment key={job.id}>
                <tr
                  className="cursor-pointer flex"
                  onClick={() => {
                    trackButtonClick("Job Opening");
                    router.push(`/job/edit/${job.id}`);
                  }}
                >
                  <td className="px-4 py-2 text-base font-normal h-12 min-w-[14rem] xl:min-w-[20rem] w-full">
                    {job.role}
                  </td>
                  <td className="px-4 py-2 flex gap-2 min-w-[14rem] xl:min-w-[20rem] w-full overflow-x-auto items-center">
                    {job.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-3 py-1.5 bg-accent rounded-lg font-normal text-sm truncate"
                      >
                        {typeof tool === "string" ? tool : tool.name}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-2 flex gap-2 min-w-[14rem] xl:min-w-[20rem] w-full overflow-x-auto items-center">
                    {job.languages.map((lang, langIndex) => (
                      <span
                        key={langIndex}
                        className="px-3 py-1.5 bg-accent rounded-lg font-normal text-sm"
                      >
                        {typeof lang === "string" ? lang : lang.name}
                      </span>
                    ))}
                  </td>
                </tr>
                {/* Agregar línea separadora después de cada fila, excepto la última */}
                {index !== publishedJobs.length - 1 && (
                  <tr>
                    <td colSpan={3} className="border-t"></td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActiveJobs;
