import PasswordForm from "@/components/forms/PasswordForm";
import { Card } from "@/components/ui/card";

const OnboaringPage = () => {
  return ( 
    <main className="h-full max-w-3xl flex mx-auto justify-center items-center my-auto">
    <Card className="p-8 shadow-none border-none">

    <PasswordForm/>
    </Card>
  </main>
   );
}
 
export default OnboaringPage;