import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import icon from "assets/img/favicon.png";
import { Helmet} from "react-helmet-async";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import Logo from "components/navigation/FixedLogo";

function Usage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    mixpanel.track("Privacy Page", {
      Type: 'Privacy',

    });
  }, []);
  mixpanel.track("Privacy Page");
  return (
    <Layout>
      <Helmet>
      <meta name="robots" content="noindex" />
      <link rel="icon" content={icon} />
        <meta name="author" content="Clous Technology SL" />
        <meta name="publisher" content="Clous" />
        <meta property="og:image" content='https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp' />
        </Helmet>
        <div className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap w-full fixed z-30  ">

<Navbar />             
</div>
<div className="z-40 relative">
        <Logo />
      </div>
      <div className="pt-28 px-6">
        <div className="relative ">
        <h1
              className="text-4xl font-bold tracking-tight text-button-orange
               sm:text-5xl lg:text-6xl"
            >
              {" "}
              Usage policy
            </h1>
         
        </div>
        <div className="lg:max-w-6xl mx-auto my-6 text-xl">
        <p>
        Hemos actualizado nuestras políticas de uso para que sean más legibles y hemos añadido orientaciones específicas para cada servicio. Los clientes pueden inscribirse para recibir notificaciones de nuevas actualizaciones de nuestras políticas de uso rellenando este formulario.(opens in a new window)

Nuestro objetivo es que nuestras herramientas se utilicen de forma segura y responsable, al tiempo que maximizamos su control sobre cómo utilizarlas. Al utilizar nuestros servicios, usted acepta adherirse a nuestras políticas.

Hemos establecido políticas universales aplicables a todos nuestros servicios, así como políticas específicas para los creadores que utilizan Clous Peer o nuestra API para crear aplicaciones para sí mismos o para otros. La violación de nuestras políticas podría dar lugar a acciones contra su cuenta, hasta la suspensión o terminación. También trabajamos para que nuestros modelos sean más seguros y útiles, entrenándolos para que rechacen instrucciones perjudiciales y reduzcan su tendencia a producir contenidos dañinos. 

Creemos que aprender del uso en el mundo real es un componente crítico para crear y lanzar sistemas de IA cada vez más seguros. No podemos predecir todos los usos beneficiosos o abusivos de nuestra tecnología, por lo que realizamos un seguimiento proactivo de las nuevas tendencias de abuso. Nuestras políticas evolucionarán en función de lo que aprendamos con el tiempo.

Políticas universales
Para maximizar la innovación y la creatividad, creemos que debe tener la flexibilidad de utilizar nuestros servicios como mejor le parezca, siempre que cumpla la ley y no se perjudique a sí mismo ni a los demás. Al utilizar cualquier servicio de Clous, como Clous Peer, labs.clous.app y la API de Clous, se aplican estas normas:

Cumpla con la legislación aplicable - por ejemplo, no comprometa la privacidad de otros, no participe en actividades reguladas sin cumplir con las regulaciones aplicables, ni promueva o participe en ninguna actividad ilegal, incluyendo la explotación o daño de niños y el desarrollo o distribución de sustancias, bienes o servicios ilegales.

No utilice nuestro servicio para hacerse daño a si mismo o a otros - Por ejemplo, no utilice nuestros servicios para promover el suicidio o la autolesión, desarrollar o utilizar armas, herir a otras personas o destruir propiedades, o participar en actividades no autorizadas que violen la seguridad de cualquier servicio o sistema. 

No reutilices ni distribuyas los resultados de nuestros servicios para perjudicar a otros - por ejemplo, no compartas los resultados de nuestros servicios para estafar, defraudar, enviar spam, engañar, intimidar, acosar, difamar, discriminar por atributos protegidos, sexualizar a niños o promover la violencia, el odio o el sufrimiento de otros.

Respete nuestras salvaguardas - no eluda las salvaguardas o mitigaciones de seguridad de nuestros servicios a menos que cuente con el apoyo de Clous (por ejemplo, expertos en dominios de nuestra Red de Equipos Rojos (Red Teaming Networks) o esté relacionado con investigaciones realizadas de acuerdo con nuestra Política de Uso Compartido & Publicación.  

Informamos sobre material aparentemente relativo a abuso sexual infantil (CSAM) al Centro Nacional para Menores Desaparecidos y Explotados (National Center for Missing and Exploited Children).

Construir con la Plataforma API Clous
La Plataforma Clous le permite crear aplicaciones totalmente personalizadas. Como desarrollador de su aplicación, es responsable de diseñar e implementar cómo sus usuarios interactúan con nuestra tecnología. Para hacer esto más fácil, hemos compartido nuestras mejores prácticas de Seguridad(opens in a new window) y ofrecemos herramientas como nuestro Moderation Endpoint (punto de moderación)(opens in a new window) y mensajes de sistema personalizables. 

Somos conscientes de que nuestra API introduce nuevas capacidades con un impacto escalable, por lo que contamos con políticas específicas para cada servicio que se aplican a todos los usos de nuestras API, además de nuestras Políticas Universales:

No comprometa la privacidad de los demás, incluyendo:

Recopilar, tratar, divulgar, inferir o generar datos personales sin cumplir con los requisitos legales aplicables.

Utilizar sistemas biométricos para la identificación o evaluación, incluido el reconocimiento facial.

Facilitar programas espía, vigilancia de las comunicaciones o seguimiento no autorizado de personas

No realice ni facilite las siguientes actividades que puedan perjudicar significativamente la seguridad, el bienestar o los derechos de otras personas, entre ellas

Proporcionar asesoramiento jurídico, médico/sanitario o financiero personalizado sin la revisión de un profesional cualificado y la divulgación del uso de la asistencia de IA y sus posibles limitaciones.

Tomar decisiones automatizadas de alto riesgo en ámbitos que afecten a la seguridad, los derechos o el bienestar de una persona (por ejemplo, aplicación de la ley, migración, gestión de infraestructuras críticas, componentes de seguridad de productos, servicios esenciales, crédito, empleo, vivienda, educación, puntuación social (social scoring) o seguros).

Facilitar el juego con dinero real o los préstamos de día.

Participar en campañas políticas o grupos de presión, incluida la generación de materiales de campaña personalizados o dirigidos a grupos demográficos específicos.

Disuadir a la gente de participar en procesos democráticos, lo que incluye tergiversar los procesos de votación o las cualificaciones y desalentar el voto.

No utilices indebidamente nuestra plataforma para causar daño engañando o confundiendo intencionadamente a otras personas, lo que incluye

Generar o promover desinformación, información errónea o falsa participación en línea (por ejemplo, comentarios, reseñas).

Hacerse pasar por otro individuo u organización sin consentimiento o legitimidad legal.

Participar o promover la deshonestidad académica 

No asegurarse de que los sistemas automatizados (por ejemplo, chatbots) revelen a las personas que están interactuando con IA, a menos que sea obvio por el contexto.

No construyas herramientas que puedan ser inapropiadas para menores, incluyendo:

Contenido sexualmente explícito o sugerente. Esto no incluye el contenido creado con fines científicos o educativos.

Construir con Clous
Los Clous Peer compartidos te permiten utilizar Clous Peer para crear experiencias para otros. Debido a que los usuarios de su Clous Peer son también usuarios de Clous, cuando construyas con Clous Peer, tenemos las siguientes políticas específicas del servicio además de nuestras Políticas Universales:

No comprometas la privacidad de otros, incluyendo:

Recopilar, tratar, divulgar, inferir o generar datos personales sin cumplir con los requisitos legales aplicables.

Solicitar o recopilar los siguientes identificadores sensibles, información de seguridad o sus equivalentes: información de tarjetas de pago (por ejemplo, números de tarjetas de crédito o información de cuentas bancarias), identificadores gubernamentales (por ejemplo, SSN), claves API o contraseñas.

Uso de sistemas de identificación biométrica para la identificación o evaluación, incluido el reconocimiento facial.

Facilitar programas espía, vigilancia de las comunicaciones o seguimiento no autorizado de personas.

No realice ni facilite las siguientes actividades que puedan afectar significativamente a la seguridad, el bienestar o los derechos de otras personas, entre ellas

Realizar acciones no autorizadas en nombre de los usuarios.

Proporcionar asesoramiento jurídico, médico o financiero a medida.

Tomar decisiones automatizadas en ámbitos que afectan a los derechos o el bienestar de una persona (por ejemplo, aplicación de la ley, migración, gestión de infraestructuras críticas, componentes de seguridad de los productos, servicios esenciales, crédito, empleo, vivienda, educación, puntuación social (social scoring) o seguros).

Facilitar el juego con dinero real o los préstamos de día.

Participar en campañas políticas o grupos de presión, incluida la elaboración de material de campaña personalizado o dirigido a grupos demográficos específicos.

Disuadir a las personas de participar en procesos democráticos, lo que incluye tergiversar los procesos de votación o las cualificaciones y desalentar el voto.

No desinformar, tergiversar o engañar a los demás, incluyendo:

Generar o promover la desinformación, información errónea o la falsa participación en línea (por ejemplo, comentarios, reseñas)

Hacerse pasar por otro individuo u organización sin consentimiento o legitimad legal.

Participar o promover la deshonestidad académica.

Utilizar contenidos de terceros sin los permisos necesarios.

Tergiversar o engañar a otros sobre el propósito de tu Peer.

No construyas herramientas que puedan ser inapropiadas para menores, incluyendo:

Contenido sexualmente explícito o sugerente. Esto no incluye contenidos creados con fines científicos o educativos.

No cree herramientas dirigidas a usuarios menores de 13 años.

Utilizamos una combinación de sistemas automatizados, revisión humana e informes de usuarios para encontrar y evaluar las Peer que potencialmente infringen nuestras políticas. Las infracciones pueden dar lugar a acciones contra el contenido o su cuenta, tales como advertencias, restricciones para compartir, o la inelegibilidad para la inclusión en nuestros Servicios.

Actualizaciones
Los clientes pueden inscribirse para recibir notificaciones de nuevas actualizaciones de nuestras políticas de uso rellenando este formulario.


            </p> 
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
export default Usage;
