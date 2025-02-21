import React from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const [cookies, setCookie] = useCookies(['cookieConsent']);

  const handleAccept = () => {
    setCookie('cookieConsent', true, { path: '/' });
  };


  if (cookies.cookieConsent) {
    return null; // Don't render the banner if the cookieConsent is set
  }

  return (
    <main className="flex sm:justify-center ">
       <section className='text-sm bg-dark-blue-greenish fixed bottom-0 z-40 items-center my-2 p-4 lg:p-6 rounded-xl flex'>
      <p className="text-white">
          We use cookies. Read our{" "}
          <Link className='text-white underline' to={"/privacy"}

          > Privacy Policy</Link> for more information.
        </p>
        <button className='rounded-lg font-medium text-white pl-5 hover:text-underline' onClick={() => handleAccept()}>Accept</button>

      </section>
     
    </main>
  );
};
export default CookieBanner;