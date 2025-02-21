import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";

function TrustedMedia() {
  const trackButtonClick = (buttonName) => {
    mixpanel.track(`Link ${buttonName}`);
  }
  return (
    <main className='pb-16 text-center'>
      <h3 className='text-base font-normal text-gray-500'>Featured us</h3>
      <section className='flex gap-5 md:justify-center items-center'>
      <Link to="https://999plazaradio.es/queremos-ocupar-el-lugar-de-las-flores-como-regalo-de-los-momentos-mas-especiales-jorge-sanchez-responsable-de-comunicacion-de-pancracio-chocolates-agencia-kids1" target="_blank"
      onClick={() => trackButtonClick(" - Plazaradio")}
      >
      <img width={110} src="https://clous.s3.eu-west-3.amazonaws.com/images/logos/logo_plazaradio.png" alt="PlazaRadio Clous Partner"/>
      </Link>
      <Link to="https://elreferente.es/startup/clous/" target="_blank"
        onClick={() => trackButtonClick(" - Elreferente")}
      >
      <img width={110} src="https://clous.s3.eu-west-3.amazonaws.com/images/logos/logo_elreferente.png" alt="ElReferente Clous Partner" 
      />  
      </Link>
      <Link className="https://emprendedores.es/ayudas/lanzadera-3/" target="_blank"
        onClick={() => trackButtonClick(" - Emprendedores")}
      >
      <img width={110} src="https://clous.s3.eu-west-3.amazonaws.com/images/logos/logo_emprendedores.png" alt="Emprendedores Clous Partner"
      />
      </Link>
      <Link to="https://www.abc.es/espana/comunidad-valenciana/lanzadera-potencia-programa-aceleracion-selecciona-100-empresas-20230904112606-nt.html" target="_blank"
              onClick={() => trackButtonClick(" - Diario ABC")}
      >
      <img width={70} src="https://clous.s3.eu-west-3.amazonaws.com/images/logos/logo_diario_abc.png" alt="Diario ABC Clous Partner"/>
      </Link>

      </section>
    </main>
  )
}

export default TrustedMedia