import { IoVideocamOutline } from "react-icons/io5";import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { ArchiveIcon } from "lucide-react";

const NotificationCard = () => {
  return (

    <Card className="overflow-auto px-4 border-none flex flex-col gap-4">
      <div className="border-l-4 border-primary mt-2 flex">

      <CardContent className="px-2">
        <IoVideocamOutline className="h-6 w-8"/>
      </CardContent>
      <CardContent className="pl-2">
        <p className="text-base pb-1">
          Your next interview is in 3 minutes
        </p>
        <p className=" text-sm font-normal">
        Get ready! Your upcoming interview is just 3 minutes away. Take a deep breath, collect your thoughts, and make a lasting impression. Good luck!
        </p>
        <Link
          href=""
          target="_blank"
          rel="noopener"
          className="text-sm font-medium text-primary"
          >
          Join
        </Link>
      </CardContent>
          </div>
      <div className="mt-4 flex text-muted">

      <CardContent className="pl-0 pr-4">
        <ArchiveIcon className="h-6 w-6"/>
      </CardContent>
      <CardContent className="pl-2 ">
        <p className="text-base pb-1 font-medium">
        3+ candidates applied again!
        </p>
        <p className="text-sm font-normal">
More than 3 candidates applied to more than one job, that’s recurrent talent! It seems our opportunities resonate with their skills and interests.

        </p>

      </CardContent>
          </div>
    </Card>
  );
};

export default NotificationCard;
