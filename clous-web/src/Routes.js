import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Error404 from "containers/errors/Error404";
import Home from "containers/pages/Home";
import Company from "containers/pages/about/team/Team";

import Contact from "containers/pages/resources/Contact";
import Terms from "containers/pages/legal/Terms";
import Privacy from "containers/pages/legal/Privacy";
import TermsEU from "containers/pages/legal/TermsEU";
import Usage from "containers/pages/legal/Usage";
import BusinessTerms from "containers/pages/legal/BusinessTerms";
import SharingPolicy from "containers/pages/legal/SharingPolicy";
import ServiceCredits from "containers/pages/legal/ServiceCredits";

import { AnimatePresence } from "framer-motion";
import Pricing from "containers/pages/resources/Pricing";
import CookieBanner from "containers/pages/CookieBanner";
import ClousH from "containers/pages/product/ClousH";
import ClousPeer from "containers/pages/product/ClousPeer";
import Editorial from "containers/pages/editorial/Editorial";
import News from "containers/pages/editorial/news/News";
import NewsDetails from "containers/pages/editorial/news/NewsDetails";
import Guides from "containers/pages/editorial/guides/Guides";
import LeadGenerations from "containers/pages/editorial/guides/LeadGen";
import Blog from "containers/pages/editorial/blog/Blog";
import BlogDetails from "containers/pages/editorial/blog/BlogDetails";
import HomeES from "languages/es/Home";
import HomeDE from "languages/de/Home";
import HomeIT from "languages/it/Home";
import HomeFR from "languages/fr/Home";
import HomePT from "languages/pt/Home";

import ProductLaunch from "containers/pages/ProductLaunch";

function AnimatedRoutes() {
  
  const location = useLocation()

  return (
    <AnimatePresence >
    
      
    <CookieBanner />

    <Routes location={location} key={location.pathname} >

      {/* English */}
      <Route exact path="/" element={<Home />} />
      <Route path="/company" element={<Company />} />   
         

      <Route path="/team" element={<Navigate to="/company" replace/>} />     

      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/cloush-launch" element={<Navigate to="/cloush" replace/>} />
      <Route path="/cloush-alpha-launch" element={<Navigate to="/cloush-launch" replace/>} />

      <Route path="/cloush" element={<ClousH />} />
      <Route path="/clouspeer" element={<ClousPeer />} />

      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms-eu" element={<TermsEU />} />
      <Route path="/usage" element={<Usage />} />
      <Route path="/sharing-policy" element={<SharingPolicy />} />
      <Route path="/business-terms" element={<BusinessTerms />} />
      <Route path="/service-credits" element={<ServiceCredits />} />

      <Route path="/editorial" element={<Editorial/>} />

      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetails />} />

      <Route path="/news-room" element={<Navigate to="/clous-wiki" replace/>} />
      <Route path="/news-room/:slug" element={<Navigate to="/clous-wiki/:slug" replace/>} />
      <Route path="/clous-wiki" element={<News/>} />
      <Route path="/clous-wiki/:slug" element={<NewsDetails />} />

      <Route path="/guides" element={<Guides/>} />
      <Route path="/guides/:slug" element={<LeadGenerations/>} /> 

    <Route 
          path="/press" 
          element={<Navigate to="/" replace/>} 
      />
           <Route path="/es/" element={<HomeES/>} />
           <Route path="/fr" element={<HomeFR/>} />
           <Route path="/it" element={<HomeIT/>} />
           <Route path="/de" element={<HomeDE/>} />
           <Route path="/pt" element={<HomePT/>} />
 
      

      <Route path="/*" element={<Error404 />} />
    </Routes>
    </AnimatePresence>
  );
}
export default AnimatedRoutes;
