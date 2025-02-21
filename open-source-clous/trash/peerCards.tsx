import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ArrowDown} from "lucide-react";
import { useState } from "react";
interface PeerCardsProps {
  onCardClick: (cardTitle: string) => void;
}
const PeerCards = ({ onCardClick }: PeerCardsProps) => {  
  const [clicked, setClicked] = useState(false);

  const handleClick = (cardTitle: string) => {
    if (!clicked) {
      onCardClick(cardTitle);
      setClicked(true);
    }
  };
  return (
    <section className="grid col-span-2 grid-cols-2 gap-2 ">
      <Card className="text-sm flex items-center leading-4 group cursor-pointer p-3 relative h-12" onClick={() => handleClick("Software developer with 4 years of experience")} >
        <CardContent className="p-0">
          <h3 className="font-medium">Software developer </h3>
          <p className="text-gray-foreground w-56 truncate">with 4 years of experience</p>
        </CardContent>
        <p className="hidden absolute right-3 group-hover:inline-block items-center">
          <ArrowDown
            size={20}
            className="text-gray-foreground"
          />
          </p>
      </Card>
      <Card className="text-sm flex items-center leading-4 group cursor-pointer p-3 relative h-12" onClick={() => handleClick("Graphic designer that knows Figma")}>
        <CardContent className="p-0 ">
          <h3 className="font-medium">Graphic designer</h3>
          <p className="text-gray-foreground w-56 truncate">that knows Figma</p>
        </CardContent>
        <p className="hidden absolute right-3 group-hover:inline-block items-center">
          <ArrowDown
            size={20}
            className="text-gray-foreground"
          />
          </p>
      </Card>
      <Card className="text-sm flex items-center leading-4 group cursor-pointer p-3 relative h-12"  onClick={() => handleClick("Sales manager with proven track record")}>
        <CardContent className="p-0">
          <h3 className="font-medium">Sales manager</h3>
          <p className="text-gray-foreground w-56 truncate">with proven track record</p>
        </CardContent>
        <p className="hidden absolute right-3 group-hover:inline-block items-center">
          <ArrowDown
            size={20}
            className="text-gray-foreground"
          />
          </p>
      </Card>
      <Card className="text-sm flex items-center leading-4 group cursor-pointer p-3 relative h-12">
        <CardContent className="p-0"  onClick={() => handleClick("Product manager with experience in SaaS")}>
          <h3 className="font-medium">Product manager </h3>
          <p className="text-gray-foreground w-56 truncate"> with experience in SaaS</p>
        </CardContent>
        <p className="hidden absolute right-3 group-hover:inline-block items-center">
          <ArrowDown
            size={20}
            className="text-gray-foreground"
          />
          </p>
      </Card>
    </section>
  );
};

export default PeerCards;
