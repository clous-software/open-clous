import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import icon from "assets/img/favicon.png";
import { Helmet} from "react-helmet-async";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import Logo from "components/navigation/FixedLogo";

function Privacy() {
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
              Privacy policy
            </h1>
         
        </div>
        <div className="lg:max-w-6xl mx-auto my-6 text-xl">
        <p>
        Hemos actualizado nuestra Política de Privacidad que se muestra a continuación. Estas actualizaciones no son aplicables si reside en el Espacio Económico Europeo (EEE), Suiza o Reino Unido. Si reside en cualquiera de estas áreas, esta versión de nuestra Política de privacidad es la que le aplica.

En Clous Technology, SL (conjuntamente con nuestras filiales, "Clous", "nosotros", "nuestro" o "nos") respetamos su privacidad y asumimos el firme compromiso de velar por la seguridad de cualquier información que obtengamos de usted o sobre usted. Esta Política de Privacidad describe nuestras prácticas en lo que respecta a la Información Personal que recogemos de usted o sobre usted cuando use nuestro sitio web, nuestras aplicaciones y nuestros servicios (conjuntamente, los “Servicios”). 

Esta Política de Privacidad no es aplicable a los contenidos que tratamos por cuenta de los clientes de nuestras ofertas comerciales, como nuestra API. El uso que hacemos de dichos datos se rige por los contratos suscritos con nuestros clientes, que contemplan el acceso y el uso de tales ofertas.

Para obtener información sobre cómo recogemos y utilizamos datos de entrenamiento para desarrollar nuestros modelos lingüísticos que alimentan Clous Peer y otros Servicios, así como sobre las opciones que tiene a su disposición en lo que respecta a dichos datos, consulte este artículo del centro de ayuda.

1. Información Personal que recogemos
Recogemos Información Personal relacionadas con usted (la "Información Personal") tal y como se describe a continuación:

Información Personal Proporcionada por Usted: Recogemos Información Personal si crea una cuenta para utilizar nuestros Servicios o se comunica con nosotros, tal como se describe a continuación:

Información de la Cuenta: Cuando crea una cuenta con nosotros, recogemos datos relacionados con dicha cuenta, incluyendo su nombre, su información de contacto, las credenciales de la cuenta, los datos de la tarjeta de pago y el historial de operaciones (conjuntamente, los “Información de la Cuenta").

Contenido de Usuario: Cuando usa nuestros Servicios, recogemos Información Personal incluida en el input que introduce, los archivos que sube o el feedback que proporciona a nuestros Servicios (el “Contenido”). 

Información de Comunicación: Si se comunica con nosotros, recogemos su nombre, su información de contacto y el contenido de los mensajes que nos envía (los “Información de Comunicación”).

Información de Redes Sociales: Tenemos páginas en redes sociales como Instagram, Facebook, Medium, Twitter, YouTube y LinkedIn. Cuando interactúa con nuestras páginas en redes sociales, recogeremos la Información Personal que decida facilitarnos, como sus datos de contacto (conjuntamente, los “Información Social”). Asimismo, las empresas que alojan nuestras páginas en redes sociales pueden proporcionarnos información agregada y datos analíticos sobre nuestra actividad en las redes sociales.

Otra Información que Usted Nos Proporcione: Recogemos otros datos que puede proporcionarnos como, por ejemplo, cuando participa en nuestros eventos o encuestas o para conocer su identidad (conjuntamente, “Otra Información que Usted Nos Proporcione”.

Información Personal que Recibimos Automáticamente por Su Uso de los Servicios: Cuando visita, usa o interactúa con los Servicios, recibimos los siguientes datos de su visita, uso o interacción (“Información Técnica”):

Datos de Registro: Datos que su navegador o dispositivo envía automáticamente cuando usa nuestros Servicios. Los Datos de Registro incluyen su dirección IP, el tipo de navegador y su configuración, la fecha y hora de su solicitud y cómo interactúa con nuestros Servicios.

Datos de Uso: Podemos recoger automáticamente datos sobre su uso de los Servicios como, por ejemplo, los tipos de contenido que visualiza o con los que interactúa, las funciones que utiliza y las acciones que lleva a cabo, así como su zona horaria, su país, las fechas y horas de acceso, el agente de usuario y su versión, el tipo de ordenador o dispositivo móvil y la conexión de su ordenador.

Información de Su Dispositivo: La Información de Su Dispositivo incluyen el nombre del dispositivo, el sistema operativo, los identificadores del dispositivo y el navegador utilizado. Los datos que se recojan pueden depender del tipo de dispositivo utilizado y de su configuración.

Cookies: Utilizamos cookies para operar y administrar nuestros Servicios y mejorar su experiencia. Una "cookie" es un fragmento de información que un sitio web que visita envía a su navegador. Puede configurar su navegador para que acepte todas las cookies, para que las rechace o para que le notifique cada vez que se le proponga utilizar una cookie, de modo que pueda decidir en cada ocasión si la acepta o no. Sin embargo, rechazar una cookie puede, en algunos casos, impedirle utilizar un sitio web o determinadas áreas o funciones de este, o afectar negativamente a su visualización o funcionamiento. Para más información sobre las cookies, visite Todo sobre las Cookies.

Datos analíticos: Podemos utilizar una variedad de productos de análisis en línea que utilizan cookies para ayudarnos a analizar cómo los usuarios utilizan nuestros Servicios y mejorar su experiencia cuando utiliza los Servicios

2. Cómo utilizamos la Información Personal
Podemos utilizar la Información Personal para los fines siguientes:

Prestar administrar, mantener y/o analizar los Servicios;

Mejorar nuestros Servicios y llevar a cabo actividades de investigación;

Comunicarnos con usted, lo que incluye enviarle información o comunicaciones relacionadas con nuestros Servicios y eventos;

Desarrollar nuevos programas y servicios;

Prevenir fraudes, actividades delictivas o usos indebidos de nuestros Servicios, y proteger la seguridad de nuestros sistemas de IT, arquitectura y redes; 

Para realizar transferencias comerciales; y

Para cumplir con obligaciones legales, procesos judiciales y para proteger nuestros derechos, nuestra privacidad, nuestra seguridad, nuestros bienes y/o los de nuestras entidades afiliadas, de usted u otros terceros.

Información Agregada o Disociada. Podemos agregar o disociar la Información Personal para que no se puedan seguir utilizando para identificarle, y utilizamos dichos datos para analizar la eficacia de nuestros Servicios, mejorar y añadir funciones a nuestros Servicios, desarrollar actividades de investigación y para otros fines similares. Asimismo, de vez en cuando, podremos analizar el comportamiento general y las características de los usuarios de nuestros Servicios y compartir datos agregados como estadísticas generales de usuarios con terceros, publicar dicha información agregada o hacer que dicha información agregada esté a disposición del público en general. Recogemos dichos datos a través de los Servicios mediante el uso de cookies y por los demás medios que se describen en la presente Política de Privacidad. Conservaremos y utilizaremos los datos disociados de forma anónima o disociada y no trataremos de revertir dicha disociación salvo que así lo exija la ley.

Como se ha indicado anteriormente, utilizamos el Contenido que nos proporciona para mejorar nuestros Servicios, por ejemplo, para entrenar los modelos que alimentan nuestros Servicios. Lea nuestras instrucciones sobre cómo puede optar por que no utilicemos su Contenido para entrenar nuestros modelos.

3. Revelación de la Información Personal
En determinadas circunstancias podremos proporcionar su Información Personal, a terceros, sin necesidad de informarle por anticipado, a menos que así lo exija la ley:

Proveedores de Servicios: Para ayudarnos a satisfacer las necesidades de nuestro negocio y a desarrollar determinados servicios y funciones podremos proporcionar Información Personal a proveedores, incluyendo proveedores de servicios de alojamiento, proveedores de servicios de atención al cliente, proveedores de servicios en la nube, proveedores de software de comunicación por correo electrónico, proveedores de servicios de análisis web y otros proveedores de servicios informáticos, entre otros. Siguiendo nuestras instrucciones, dichos proveedores accederán a la Información Personal, llevarán a cabo su tratamiento o los conservarán exclusivamente en el cumplimiento de sus obligaciones frente a nosotros.

Transmisión de Negocio: En el supuesto de que seamos parte de una operación estratégica, una reorganización, un procedimiento concursal, una suspensión de pagos o de la transición de nuestros servicios a otro proveedor (conjuntamente, la “Operación”), su Información Personal y otra información podrán ser revelados en el proceso de auditoría con las contrapartes y los terceros que colaboren en la Operación y trasmitidos a una entidad sucesora o afiliada en el marco de dicha Operación junto con otros activos.

Requerimientos Legales: Podemos compartir su Información Personal, incluida la información sobre su interacción con nuestros Servicios, con autoridades gubernamentales, homólogos del sector u otros terceros:, (i) si así nos lo exige la legislación aplicable o si consideramos de buena fe que dicha acción es necesaria para cumplir con una obligación legal, (ii) para proteger y defender nuestros derechos o bienes, (iii) si determinamos, a nuestro exclusivo criterio, que se ha producido un incumplimiento de nuestras condiciones, políticas o de la ley; (iv) para detectar o prevenir actividades fraudulentas o ilegales; (v) para velar por la seguridad e integridad de nuestros productos, empleados o usuarios, o del público en general, o (vi) para protegernos frente a cualquier responsabilidad legal.

Entidades Afiliadas: Podremos comunicar Información Personal a nuestras entidades afiliadas, es decir, a cualquier entidad que controle a, esté controlada por o se encuentre bajo control común con Clous. Nuestras entidades afiliadas pueden utilizar la Información Personal que compartimos de conformidad con la presente Política de Privacidad.   

Administradores de Cuentas Empresariales: Cuando crea una cuenta de Clous Enterprise o una cuenta profesional o de empresa, los administradores de dicha cuenta pueden acceder a su cuenta de Clous y controlarla. Asimismo, si crea una cuenta utilizando una dirección de correo electrónico perteneciente a su empleador o a otra organización, podremos comunicar el hecho de que usted tiene una cuenta de Clous y determinada información de la cuenta, como su dirección de correo electrónico, con su empleador u organización para, por ejemplo, permitir que se le añada a su cuenta empresarial.

Otros Usuarios y Terceros con los que Comparte Información: Determinadas funciones le permiten mostrar o compartir información con otros usuarios o terceros. Por ejemplo, puede compartir conversaciones de Clous Peer con otros usuarios a través de enlaces compartidos o enviar información a aplicaciones de terceros mediante acciones personalizadas para Peer. Asegúrese de poder confiar en cualquier usuario o tercero con el que comparta información.

4. Sus derechos
Dependiendo de su ubicación, las personas pueden tener ciertos derechos legales en relación con su Información Personal. Por ejemplo, puede tener derecho a:

El derecho acceder a su Información Personal y a obtener información sobre cómo se lleva a cabo su tratamiento.

El derecho a suprimir su Información Personal de nuestros registros.

El derecho a rectificar o actualizar su Información Personal.

El derecho a solicitar la portabilidad de su Información Personal a terceros (derecho a la portabilidad de sus datos).

El derecho a limitar el tratamiento de su Información Personal.

El derecho a retirar su consentimiento: cuando su consentimiento constituya la base jurídica para llevar a cabo el tratamiento de su Información Personal en cualquier momento. 

Oponerse al tratamiento de su Información Personal.

El derecho a presentar una reclamación ante la autoridad local de protección de datos). 

Podrá ejercer algunos de estos derechos a través de su cuenta de Clous. Si no puede ejercer sus derechos a través de su cuenta, envíe su solicitud a avillalba@clous.app.

Una nota sobre la exactitud: Los Servicios como Clous Peer generan resultados leyendo la solicitud de un usuario y, en respuesta, prediciendo las palabras que tienen más probabilidades de aparecer a continuación. En algunos casos, puede que estas palabras no sean las más acertadas desde el punto de vista fáctico. Por esta razón, no deberá dar por hecho que los resultados generados por nuestros modelos son exactos. Si observa que los resultados de Clous Peer contienen información objetivamente inexacta sobre usted y desea que corrijamos dicha inexactitud, puede enviar una solicitud de corrección a avillalba@clous.app. Dada la complejidad técnica del funcionamiento de nuestros modelos, puede que nos resulte imposible corregir la inexactitud en todos los casos. Si esto sucede, puede solicitarnos que eliminemos su Información Personal del resultado de Clous Peer rellenando este formulario.

Para obtener información sobre cómo ejercer sus derechos con respecto a los datos que hemos recogido a través de Internet para entrenar nuestros modelos, consulte esta notificación.

5. Información adicional para los estados de EE. UU.
La siguiente tabla proporciona información adicional sobre las categorías de datos personales que recabamos y cómo divulgamos dicha información. Puede obtener más información sobre la Información Personal que recabamos en "Información Personal que recogemos" más arriba, sobre cómo utilizamos la Información Personal en "Cómo utilizamos la Información Personal" más arriba, y sobre cómo retenemos la Información Personal en "Seguridad y plazos de retención" más abajo.

Categoría de la Información Personal

Divulgación de la Información Personal

Identificadores, como su nombre, datos de contacto, dirección IP y otros identificadores de dispositivos

Podemos revelar esta información a nuestras filiales, vendedores y proveedores de servicios para que la procesen de acuerdo con nuestras instrucciones; a las fuerzas de seguridad y otros terceros por los motivos legales descritos anteriormente; a las partes implicadas en Transacciones; a administradores de cuentas empresariales o de equipo; y a otros usuarios y terceros con los que usted decida compartirla.

Información comercial, como el historial de sus transacciones

Podemos revelar esta información a nuestras afiliadas, vendedores y proveedores de servicios para que la traten de acuerdo con nuestras instrucciones; a las fuerzas de seguridad y otros terceros para cumplir con preceptos legales, según se detalla anteriormente; a las partes implicadas en las Transacciones; y a los administradores de cuentas empresariales o de cuentas de equipo.

Información sobre la actividad en la red, como el Contenido y la forma en que usted interactúa con nuestros Servicios

Podemos revelar esta información a nuestras afiliadas, vendedores y proveedores de servicios para que la traten de acuerdo con nuestras instrucciones; a las fuerzas de seguridad y otros terceros para cumplir con preceptos legales, según se detalla anteriormente; a las partes implicadas en las Transacciones; y a otros usuarios y terceros con los que usted decida compartirla.

Datos de Geolocalización

Podemos revelar esta información a nuestras afiliadas, vendedores y proveedores de servicios para que la traten de acuerdo con nuestras instrucciones; a las fuerzas de seguridad y otros terceros para cumplir con preceptos legales, según se detalla anteriormente; a las partes implicadas en las Transacciones.

Sus credenciales de acceso a la cuenta y los datos de su tarjeta de pago (Información Personal Sensible)

Divulgamos esta información a nuestras afiliadas, vendedores y proveedores de servicios, a las fuerzas de seguridad y a las partes implicadas en las Transacciones.

En la medida en que la legislación local lo prevea y con sujeción a las excepciones aplicables, las personas pueden tener los siguientes derechos de privacidad en relación con su Información Personal:

El derecho a conocer información sobre el tratamiento de su Información Personal, incluyendo las piezas específicas de Información Personal que hemos recopilado de usted;

Derecho a solicitar la eliminación de su Información Personal;

Derecho a rectificar su Información Personal.

El derecho a no ser discriminado en relación con el ejercicio de cualquiera de sus derechos de privacidad.

No "vendemos" datos personales ni "compartimos" datos personales con fines de publicidad basada en el comportamiento, en contextos cruzados (tal y como se definen estos términos en la legislación local que sea aplicable). Tampoco tratamos Información Personal sensible con el fin de inferir características sobre un consumidor.

Ejercicio de sus derechos. En la medida en que sea aplicable, de conformidad con la legislación local, puede ejercer los derechos de privacidad descritos en esta sección enviando una solicitud a avillalba@clous.app.

Verificación. Con el fin de proteger su Información Personal de accesos no autorizados, cambios o eliminaciones, podemos solicitarle que verifique sus credenciales antes de que pueda enviar una solicitud para conocer, corregir o eliminar Información Personal. Si usted no tiene una cuenta con nosotros, o si sospechamos de una actividad fraudulenta o maliciosa, podemos pedirle que nos proporcione Información Personal adicional y una prueba de residencia para su verificación. Si no podemos verificar su identidad, no podremos atender su solicitud.

Agentes autorizados. También puede presentar una solicitud de derechos a través de un agente autorizado. Si lo hace, el agente deberá presentar un permiso escrito y firmado para actuar en su nombre y es posible que también se le pida que verifique de forma independiente su identidad y que nos presente una prueba de su residencia. Las solicitudes de agente autorizado pueden enviarse a avillalba@clous.app.

Recursos. Dependiendo de su lugar de residencia, puede tener derecho a recurrir una decisión que tomemos en relación con las solicitudes para ejercer sus derechos conforme a la legislación local que sea aplicable. Para apelar una decisión, envíe su solicitud a avillalba@clous.app.

6. Menores
Nuestro Servicio no está dirigido para menores de 13 años. Clous no recaba intencionadamente Información Personal de menores de 13 años. Si tiene motivos para creer que un menor de 13 años ha proporcionado Información Personal a Clous a través del Servicio, envíenos un correo electrónico a legal@clous.app. Investigaremos cualquier notificación y en su caso, eliminaremos la Información Personal de nuestros sistemas. Si usted cuenta con 13 años o más, pero es menor de 18 años, deben recabar el permiso de sus padres o tutores para usar nuestros Servicios.

7. Enlaces a otros sitios web
El Servicio puede contener enlaces a otros sitios web no operados o controlados por Clous, incluyendo servicios de redes sociales ("Sitios de Terceros"). La información que usted comparta con Sitios de Terceros se regirá por las políticas de privacidad y condiciones de servicio específicas de los Sitios de Terceros y no por esta Política de Privacidad. El hecho de proporcionar estos enlaces no implica que aprobemos o hayamos revisado estos sitios. Póngase en contacto directamente con los sitios de terceros para obtener información sobre sus prácticas y políticas de privacidad.

8. Seguridad y plazos de conservación
Aplicamos las medidas técnicas, administrativas y organizativas, que sean comercialmente razonables, para proteger la Información Personal, tanto en línea, como fuera de línea, contra la pérdida, el uso indebido y el acceso no autorizado, la divulgación, la alteración o la destrucción. Sin embargo, ninguna transmisión por Internet o correo electrónico es totalmente segura o está libre de errores. En particular, el correo electrónico enviado a o desde nosotros puede no ser seguro. Por lo tanto, debe tener especial cuidado a la hora de decidir qué información nos envía a través del Servicio o por correo electrónico. Además, no somos responsables de la elusión de cualquier configuración de privacidad o medidas de seguridad contenidas en el Servicio, o sitios web de terceros.

Conservaremos su Información Personal sólo durante el tiempo que sea necesario para prestarle nuestro Servicio, o para otros fines legítimos de la empresa, como la resolución de conflictos, razones de seguridad y protección, o el cumplimiento de nuestras obligaciones legales. El tiempo que conservemos sus datos personales dependerá de una serie de factores, como la cantidad, la naturaleza y la sensibilidad de la información, el riesgo potencial de daños derivados de un uso o divulgación no autorizados, el propósito de nuestro tratamiento de la información y cualquier requisito legal.

9. Usuarios internacionales
Al usar nuestro Servicio, usted reconoce y acepta que su Información Personal será tratada y conservada en nuestras instalaciones y servidores de Estados Unidos y que podrán ser comunicados a nuestros proveedores y a nuestras entidades afiliadas en otras jurisdicciones.

Bases legales del tratamiento. Nuestras bases legales del tratamiento de su Información Personal incluyen:

El cumplimiento de las obligaciones derivadas del contrato celebrado con usted cuando prestamos y mantenemos nuestros Servicios. Cuando tratamos la Información de la Cuenta, el Contenido y la Información Técnica, únicamente para prestarle nuestros Servicios, esta información es necesaria para poder prestarle nuestros Servicios. Si no facilita esta información, es posible que no podamos prestarle nuestros Servicios. 

Nuestros intereses legítimos con el fin de proteger nuestros Servicios de abusos, fraudes o riesgos de seguridad, o para desarrollar, mejorar o promocionar nuestros Servicios, incluyendo cuando entrenamos a nuestros modelos. Esto puede incluir el tratamiento de Información de la Cuenta, Contenido, Información Social e Información Técnica. Lea nuestras instrucciones sobre cómo puede solicitar que no utilicemos su información para entrenar nuestros modelos.

Su consentimiento cuando le pedimos su consentimiento para el tratamiento de su Información Personal, para alguna finalidad específica que le comunicamos. Tiene derecho a retirar su consentimiento en cualquier momento.

Cumplimiento de nuestras obligaciones legales cuando utilizamos su Información Personal para cumplir con la legislación aplicable o cuando protegemos nuestros derechos, seguridad y propiedad o los de nuestras filiales, usuarios o terceros.

Transferencias de datos. Cuando sea necesario, utilizaremos las medidas de seguridad adecuadas para transferir Información Personal fuera de determinados países. Sólo transferiremos datos personales de conformidad con un mecanismo de transferencia legalmente válido.

Responsable de protección de datos. Puede ponerse en contacto con nuestro responsable de protección de datos en privacy@clous.app en asuntos relacionados con el tratamiento de Información Personal.

10. Cambios en la Política de Privacidad
Podremos actualizar la presente Política de Privacidad de vez en cuando. Cuando lo hagamos, publicaremos una versión actualizada en esta página, salvo que la legislación aplicable exija otro tipo de notificación.

11. Cómo ponerse en contacto con nosotros
Póngase en contacto con nuestro servicio de soporte si tiene alguna duda o inquietud para la que no encuentre respuesta en la presente Política de Privacidad.
 
            </p> 
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
export default Privacy;