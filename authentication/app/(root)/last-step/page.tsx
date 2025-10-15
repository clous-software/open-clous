import LastPageForm from "@/components/forms/LastPageForm";
import { Card } from "@/components/ui/card";

const OnboaringPage = () => {
  return ( 
    <main className="h-full max-w-3xl flex mx-auto justify-center items-center my-auto">
    <Card className="p-8 shadow-none border-none">

    <LastPageForm/>
    </Card>
  </main>
   );
}
 
export default OnboaringPage;