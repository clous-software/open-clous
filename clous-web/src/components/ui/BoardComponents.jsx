import { Dot } from "lucide-react";

const Board = () => {

  const openings = [
    {
      role: "Graphic Designer",
      statuses: [
        { label: "Active", color: "#91C483", icon: Dot },
      ],
      tools: ["Figma", "Adobe"],
    },
    {
      role: "Software Developer",
      statuses: [
        { label: "Active", color: "#91C483", icon: Dot },
      ],
      tools: ["Javascript", "React"],
    },
    {
      role: "Digital Marketing",
      statuses: [
        { label: "Draft", color: "#DD4A48", icon: Dot },
      ],
      tools: ["SEO"],
    },
    {
      role: "Data Engineer",
      statuses: [
        { label: "Draft", color: "#DD4A48", icon: Dot },
      ],
      tools: ["SQL"],
    },
    {
      role: "Account Executive",
      statuses: [
        { label: "Active", color: "#91C483", icon: Dot },
      ],
      tools: ["CRM", "Prospecting tools"],
    },
  ];

  return (
    <table className="overflow-x-auto hidden lg:flex h-4/6">
      <tbody>
        {openings.map((item, index) => (
          <tr key={index} className={`flex gap-2 ${index === openings.length - 1 ? '' : 'border-b'} py-1 hover:bg-dark-blue-greenish/5`}>
            <td className="flex items-center group relative w-96 pl-6">
              <p className="font-medium text-lg">{item.role}</p>
              <p className="text-base text-primary px-3 font-medium hidden group-hover:flex cursor-pointer absolute py-1 right-0">
                Open
              </p>
            </td>
            <td className="flex items-center group w-32">
              {item.statuses.map((status, statusIndex) => (
                <div key={statusIndex} className="px-4 flex items-center cursor-default">
                  <p className={`flex items-center font-medium px-3 py-1 rounded-xl bg-[#E5E7EB] border border-[#d9d9d9]`}>
                    <span className={`w-3 h-3 rounded-lg border mr-1`} style={{ backgroundColor: status.color }}>
                      {""}
                    </span>
                    {status.label}
                  </p>
                </div>
              ))}
            </td>
            <td className="flex items-center gap-2 px-4 w-80 cursor-default">
              {item.tools.map((tool, toolIndex) => (
                <div key={toolIndex} className={`bg-[#E5E7EB] px-3 py-1 rounded-xl border border-[#d9d9d9] font-normal`}>
                  <span className="mr-2">{tool}</span>
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;
