import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NotificationCard from "@/components/cards/NotificationCard";
import { IoNotificationsOutline } from "react-icons/io5";
import mixpanel from 'mixpanel-browser';
import ActionTooltip from "../actions/ActionTooltip";

const NotificationsModal = () => {
  const trackButtonClick = (Property: any) => {
    mixpanel.track('Trigger', {
    Name : Property,
    Property: Property, });
  };

  return (
    <Dialog>
             <ActionTooltip label="Notifications" side="bottom" align="end">

       <DialogTrigger className="h-11 w-11 p-2.5 rounded-lg text-muted font-semibold hover:bg-accent" onClick={() => trackButtonClick("Notifications")}>
       <IoNotificationsOutline  className="w-6 h-6" />
      </DialogTrigger>
      </ActionTooltip>

      <DialogContent className="h-3/5 max-w-3xl shadow-none">
        <section className="gap-3 flex flex-col w-full overflow-hidden">
          <div className="px-4 mb-4">
          <h3 className=" font-semibold text-2xl"> Your inbox</h3>
          {/* Should be "Mark all as read"*/}
          </div>
          <NotificationCard/>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
