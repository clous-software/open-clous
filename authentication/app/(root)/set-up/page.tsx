import SetUpForm from "@/components/forms/SetUpForm";
import { Card } from "@/components/ui/card";

const OnboaringPage = () => {
  return ( 
    <main className="h-full max-w-3xl flex mx-auto justify-center items-center my-auto">
    <Card className="p-8 shadow-none border-none">

    <SetUpForm/>
    </Card>
  </main>
   );
}
 
export default OnboaringPage;