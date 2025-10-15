import VerifiedEmail from "@/components/forms/VerifyEmailForm";
import { Card } from "@/components/ui/card";

const RootPage = () => {
  return ( 
    <main className="h-full max-w-3xl flex mx-auto justify-center items-center my-auto">
    <Card className="p-8 shadow-none border-none ">

    <VerifiedEmail/>
    </Card>
  </main>
   );
}
 
export default RootPage;