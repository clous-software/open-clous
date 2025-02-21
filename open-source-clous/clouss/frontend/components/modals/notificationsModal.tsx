import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NotificationCard from "@/components/cards/NotificationCard";
import { IoNotificationsOutline } from "react-icons/io5";
import mixpanel from 'mixpanel-browser';


const NotificationsModal = () => {
  const trackButtonClick = (Property: any) => {
    mixpanel.track('Trigger', {
    Name : Property,
    Property: Property, });
  };

  return (
    <Dialog>
       <DialogTrigger className="h-11 w-11 p-2.5 rounded-lg text-muted font-semibold hover:bg-accent" onClick={() => trackButtonClick("Notifications")}>
        <IoNotificationsOutline  className="w-6 h-6" />
      </DialogTrigger>
 
      <DialogContent className="h-4/5 max-w-3xl shadow-none">
        <section className="gap-3 flex flex-col w-full mt-4">
          <NotificationCard/>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
