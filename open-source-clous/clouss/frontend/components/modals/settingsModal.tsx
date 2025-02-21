import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Settings from "@/app/(root)/(routes)/settings/page";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import mixpanel from 'mixpanel-browser';

const SettingsModal = () => {
  const trackButtonClick = (Property: any) => {
    mixpanel.track('Trigger', {
    Name : Property,
    Property: Property, });
  };
  return (
    <Dialog >
      <DialogTrigger className="h-11 w-11 p-2 rounded-lg text-gray-foreground font-semibold bg-accent" onClick={() => trackButtonClick("Settings")}>
          <Avatar>
            <AvatarFallback>
              AP
            </AvatarFallback>
          </Avatar>
      </DialogTrigger>
      <DialogContent className="h-4/5 max-w-5xl shadow-none px-5">
        <Settings/>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
