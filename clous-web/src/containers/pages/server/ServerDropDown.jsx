import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import Maintenance from "components/server/Maintenance";


export default function ServerDropDown(){
    return(
        <Layout>
            <Navbar />
            <div className="pt-28">
                
            <Maintenance />
            </div>
            <Footer />
        </Layout>
    )
}
