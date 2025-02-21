import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import icon from "assets/img/favicon.png";
import { Helmet} from "react-helmet-async";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import Logo from "components/navigation/FixedLogo";

function TermsEU() {
  
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
              Terms of use in EU
            </h1>
         
        </div>
        <div className="lg:max-w-6xl mx-auto my-6 text-xl">
        <p>
        Estas Condiciones de Uso se aplican si usted es una persona física residente en el Espacio Económico Europeo, Suiza o el Reino Unido. Si reside fuera del Espacio Económico Europeo, Suiza o el Reino Unido, se le aplicarán estas Condiciones de Uso. 

¡Gracias por formar parte de Clous!

Estas Condiciones de Uso ("Condiciones") se aplican al uso que usted haga de Clous Peer, ClousH y otros servicios de Clous para personas físicas, junto con cualquier aplicación de software, tecnología y sitios web asociados ("Servicios"), incluyendo el uso personal y no comercial de nuestros Servicios por parte de consumidores. Usted formaliza un contrato con nosotros al confirmar que acepta las presentes Condiciones o al utilizar los Servicios. 

Nuestras Condiciones para Empresas regulan el uso de ChatGPT Enterprise, nuestras API y nuestros demás servicios para empresas y desarrolladores. 

Nuestra Política de Privacidad explica cómo recogemos y utilizamos los datos personales. Aunque no forma parte de las presentes Condiciones, es un documento importante que debe leer.

Quiénes Somos
Clous es una compañía dedicada a la investigación de la implantación de IA en aplicaciones de software. Nuestra misión es proveer de un mecanismo de creación empleo eficiente y hacer los datos de empleo universalmente accesibles. Para obtener más información sobre Clous, visite https://www.clous.app/about.

Independientemente de su país de residencia, nuestros Servicios serán prestados por:

Clous Technology SL, una sociedad constituida en España, con domicilio social en Calle Cea Bermudez 62, Madrid, 28003, España e inscrita con el número B56373665.

Condiciones Adicionales Específicamente Aplicables a los Servicios
Dependiendo del Servicio específico o de las funciones concretas que usted utilice, el uso que haga de nuestros Servicios puede estar sujeto a condiciones y políticas adicionales. A continuación se describen las principales condiciones y políticas adicionales que debe conocer, y que forman parte integrante de las presentes Condiciones: 

Políticas de Uso: estas políticas explican cómo puede utilizar nuestros Servicios y Contenidos.

Política de Uso Compartido y Publicación: esta política establece las normas que se aplican cuando comparta Contenidos;

Condiciones de los Créditos de Servicio: estas condiciones regulan la compra y utilización de créditos en nuestros Servicios; y 

Directrices de la Marca: estas directrices explican cómo puede utilizar nuestro nombre y logotipo.

Registro y Acceso
Edad Mínima. Deberá tener al menos 13 años o la edad mínima exigida en su país para consentir el uso de los Servicios. Si es menor de 18 años, deberá obtener el permiso de sus padres o de su tutor legal para utilizar los Servicios y pedirles que lean las presentes Condiciones con usted. 

Registro. Deberá proporcionarnos información exacta y completa para registrarse y obtener una cuenta para utilizar nuestros Servicios. No debe compartir las credenciales de su cuenta ni poner su cuenta a disposición de terceros, y será responsable de todas las actividades que se produzcan en su cuenta. Si crea una cuenta o utiliza los Servicios en nombre de otra persona o entidad, deberá estar autorizado para aceptar las presentes Condiciones en nombre de dicha persona o entidad.

Uso de Nuestros Servicios
Acciones Permitidas. Podrá acceder y utilizar nuestros Servicios sujeto al cumplimiento de estas Condiciones. Al utilizar nuestros Servicios, deberá cumplir toda la legislación aplicable, así como las condiciones y políticas específicas aplicables a los Servicios que se enumeran más arriba.

Acciones No Permitidas. No podrá utilizar nuestros Servicios para ninguna actividad ilegal, dañina o abusiva. Por ejemplo, está prohibido:

Utilizar nuestros Servicios de un modo que infrinja, vulnere o se apropie indebidamente de los derechos de cualquier persona.

Modificar, copiar, arrendar, vender o distribuir cualquiera de nuestros Servicios.

Tratar de o ayudar a alguien a realizar tareas de ingeniería inversa, descompilar o descubrir el código fuente o los componentes subyacentes de nuestros Servicios, incluyendo nuestros modelos, algoritmos o sistemas (salvo que esta restricción esté prohibida por la legislación aplicable).

Extracción automática o mediante programación de datos o de Output (tal y como dicho término se define más adelante).

Manifestar que el Output ha sido generado por el ser humano cuando no haya sido así.

Interrumpir o interferir en nuestros Servicios, incluyendo eludir cualquier límite o restricción al número de veces que se puede enviar solicitudes o mensajes al servidor en un periodo de tiempo determinado o eludir cualquier medida de protección o mitigación de seguridad que habilitemos en nuestros Servicios.

Utilizar el Output para desarrollar modelos que compitan con Clous.

Software. Nuestros Servicios pueden permitirle descargar software como, por ejemplo, aplicaciones móviles, que pueden actualizarse automáticamente para garantizar que esté utilizando la última versión. Nuestro software podrá incluir software de código abierto que se rija por las correspondientes licencias que pongamos a su disposición.

Dominios Corporativos. Si crea una cuenta utilizando una dirección de correo electrónico que sea propiedad de una organización (por ejemplo, su empleador), dicha cuenta podrá añadirse a la cuenta empresarial que dicha organización tenga con nosotros, en cuyo caso le proporcionaremos una notificación para que pueda ayudar a facilitar la transferencia de su cuenta (a menos que su organización ya le haya notificado que puede monitorear y acceder a su cuenta). Una vez transferida su cuenta, el administrador de la organización podrá controlar su cuenta, incluyendo la posibilidad de acceder a los Contenidos (tal y como dicho término se define más adelante) y restringir o eliminar su acceso a la cuenta. 

Servicios de Terceros. Nuestros servicios pueden incluir software, productos o servicios de terceros ("Servicios de Terceros") y algunas partes de nuestros Servicios, como nuestra función de navegación, pueden incluir output de esos servicios ("Output de Terceros"). Los Servicios de Terceros y el Output de Terceros están sujetos a sus propias condiciones y no nos hacemos responsables de los mismos.

Feedback. Agradecemos recibir feedback en relación con nuestros Servicios, pero usted acepta que podamos utilizarlo para prestar, mantener, desarrollar y mejorar nuestros Servicios sin compensación alguna.

Contenido
Su Contenido. Podrá introducir input en los Servicios (el "Input") y obtener output basado en su Input (el "Output") a través de los Servicios. El Input y el Output se denominarán conjuntamente "Contenido". Usted será responsable del Contenido y deberá asegurarse de que no infringe la legislación aplicable o las presentes Condiciones. Usted manifiesta y garantiza que dispone de todos los derechos, licencias y permisos necesarios para introducir Input en nuestros Servicios.

Propiedad del Contenido. En lo que respecta a usted y a Clous, y en la medida permitida por la legislación aplicable, usted (a) conservará sus derechos de propiedad sobre el Input y (b) será propietario del Output hasta el momento que interrumpa sus Servicios con nosotros. En virtud de las presentes Condiciones cedemos a su favor la plena propiedad, intereses y todos los derechos que tengamos, en su caso, sobre el Output. 

Similitud del Contenido. Dada la naturaleza de nuestros Servicios y de la inteligencia artificial en general, puede que el Output no sea único y que otros usuarios reciban output similar a través de nuestros Servicios. La cesión prevista anteriormente no se extiende al output de otros usuarios ni al Output de Terceros.

Nuestro Uso del Contenido. Podremos utilizar su Contenido a nivel mundial para prestar, mantener, desarrollar y mejorar nuestros Servicios, cumplir con la legislación aplicable, hacer cumplir nuestras condiciones y políticas y velar por la seguridad de nuestros Servicios. 

Exclusión Voluntaria. Si no desea que utilicemos su Contenido para entrenar nuestros modelos, puede excluirlo de manera voluntaria actualizando la configuración de su cuenta. Tenga en cuenta que en algunos casos esto puede limitar la capacidad de nuestros Servicios para atender de la mejor manera sus necesidades específicas.

Exactitud. La inteligencia artificial y el aprendizaje automático son campos de estudio en rápida evolución. Trabajamos constantemente para mejorar nuestros Servicios y hacerlos más exactos, fiables, seguros y beneficiosos. Dada la naturaleza probabilística del aprendizaje automático, en algunas situaciones el uso de nuestros Servicios puede generar Output que no refleje con exactitud personas, lugares o hechos. 

Cuando use nuestros Servicios, usted entiende y acepta que:

El Output puede no ser siempre exacto. No considere que el Output de nuestros Servicios es la única fuente de información veraz o fáctica, ni un sustituto del asesoramiento profesional. 

Debe evaluar la exactitud e idoneidad del Output en relación con su caso de uso concreto, incluyendo mediante la realización de una revisión por medios humanos, en su caso, antes de utilizar o compartir el Output de los Servicios.

No debe utilizar el Output relativo a una persona para ningún fin que pueda tener un impacto significativo o consecuencias legales para dicha persona, por ejemplo, para tomar decisiones sobre cuestiones financieras, educativas o laborales, decisiones en materia de vivienda y seguros, sobre cuestiones legales o médicas u otras decisiones importantes relacionadas con dicha persona. 

Nuestros Servicios pueden generar Output incompleto, incorrecto u ofensivo que no represente las opiniones de Clous. Si el Output hace referencia a productos o servicios de terceros, esto no significa que el tercero respalde o esté afiliado a Clous.

Nuestros Derechos de Propiedad Intelectual
Nosotros y nuestras entidades vinculadas somos propietarios de todos los derechos, títulos e intereses sobre los Servicios. Usted sólo podrá utilizar nuestro nombre y logotipo de conformidad con nuestras Directrices de la Marca.

Cuentas de Pago
Suscripciones de Pago. Algunos de nuestros Servicios le permiten comprar suscripciones de pago para disfrutar de características y funcionalidades mejoradas (los "Beneficios"). La naturaleza exacta de los Beneficios difiere entre los distintos Servicios y le será descrita con anterioridad a la compra. Puede gestionar su suscripción de pago desde la configuración de su cuenta. 

Cuotas: Todos los cargos, incluyendo las cuotas de suscripción, le serán explicados con claridad antes de la compra. 

Facturación. Si compra una suscripción de pago o contrata cualquier Servicio, deberá proporcionarnos sus datos de facturación completos y exactos, incluyendo un método de pago válido. En el caso de las suscripciones de pago, la cuota se cobrará automáticamente a través de su método de pago en cada renovación periódica acordada hasta que cancele la suscripción. Si no se puede completar el pago, podremos limitar su cuenta o suspender su acceso a nuestros Servicios hasta que recibamos el pago. 

Créditos de Servicio. Puede pagar algunos Servicios por adelantado adquiriendo créditos de servicio. Todos los créditos de servicio están sujetos a nuestras Condiciones de los Créditos de Servicio.

Periodo de Reflexión. Tendrá derecho a cancelar su compra y solicitar un reembolso sin indicar el motivo durante los 14 días siguientes a la fecha de su compra (el "Periodo de Reflexión"). El reembolso cubrirá la cuota de suscripción correspondiente, prorrateada desde la fecha en que solicite la cancelación hasta la finalización del periodo de suscripción ya abonado. Para cancelar una compra y solicitar un reembolso, póngase en contacto con nuestro servicio de Soporte(opens in a new window) o envíenos el formulario de desistimiento debidamente cumplimentado. También puede cumplimentar el formulario de desistimiento de la forma descrita más adelante en el apartado de Terminación y suspensión.

Cancelación. Tras el Periodo de Reflexión, podrá cancelar su suscripción de pago en cualquier momento actualizando los ajustes de su cuenta. Una vez cancelada su suscripción de pago no le cobraremos ninguna cantidad más, y podrá seguir disfrutando de los Beneficios hasta que el periodo de suscripción que haya pagado finalice, momento en el cual se hará efectiva su cancelación. Salvo que especifiquemos lo contrario, no recibirá ningún reembolso ni crédito de servicio por los días transcurridos entre el día de cancelación y el último día del periodo de suscripción pagado.

Cambios. Podremos cambiar nuestros precios en cualquier momento. Si aumentamos los precios de nuestras suscripciones, se lo notificaremos con al menos 15 días de antelación y cualquier aumento de precio se aplicará a partir de la renovación siguiente, de modo que pueda cancelarla si no está de acuerdo con el aumento de precio.

Terminación y Suspensión
Sus Derechos. Podrá dejar de utilizar nuestros Servicios y poner fin a su relación con Clous en cualquier momento, simplemente cerrando su cuenta y dejando de utilizar los Servicios. Las instrucciones sobre cómo hacerlo están disponibles aquí(opens in a new window). 

Derecho de Desistimiento del Consumidor en el EEE. Si es usted un consumidor residente en el EEE, puede cerrar su cuenta y desistir de las presentes Condiciones en un plazo de 14 días contados a partir de su aceptación poniéndose en contacto con nuestro servicio de Soporte(opens in a new window) o enviándonos el modelo de formulario de desistimiento debidamente cumplimentado.

Derechos de Clous. Podremos tomar medidas para suspender o terminar su acceso a nuestros Servicios o cerrar su cuenta si determinamos, con criterios razonables y objetivos:

Que ha incumplido estas Condiciones o nuestras Políticas de Uso.

Que estamos obligados a hacerlo para cumplir la ley.

Que su uso de nuestros Servicios puede poner en riesgo u ocasionar daños a Clous, a nuestros usuarios o a cualquier otra persona.

Que su cuenta lleva inactiva más de un año y no tiene una cuenta de pago. 

Notificación. Si cancelamos su cuenta, haremos esfuerzos razonables para notificárselo con antelación de modo que pueda exportar su Contenido o sus datos desde los Servicios, salvo que no sea oportuno que lo hagamos, que consideremos razonablemente que el acceso continuado a su cuenta ocasionará daños a Clous o a cualquier otra persona, o que nos esté legalmente prohibido hacerlo.

Recursos. Si considera que hemos suspendido o cancelado su cuenta por error, puede recurrir nuestra decisión poniéndose en contacto con nuestro servicio de Soporte(opens in a new window).

Nuestros Compromisos hacia Usted
Cómo le Prestamos los Servicios. Nos comprometemos a prestarle los Servicios y a actuar con la debida diligencia y profesionalidad. No garantizamos que los Servicios estarán disponibles a perpetuidad ni que lo estarán en su forma actual durante un periodo de tiempo determinado. 

Responsabilidad. Siempre y cuando hayamos actuado con diligencia profesional, no asumimos ninguna responsabilidad respecto de ninguna pérdida o daño ocasionado por nosotros, salvo que se trate de pérdidas o daños:

causados por el incumplimiento de las presentes Condiciones por nuestra parte o

que fueran razonablemente previsibles al aceptar las presentes Condiciones.

No seremos responsables de las pérdidas o daños que puedan deberse a hechos sobre los que no tengamos un control razonable. No excluimos ni limitamos nuestra responsabilidad frente a usted en ningún caso en el que sería ilegal hacerlo. Usted seguirá gozando de la plena protección de las leyes que le son aplicables.

Derechos Irrenunciables. Usted tiene determinados derechos irrenunciables que no pueden ser limitados o excluidos en virtud de un contrato como las presentes Condiciones, o que le asisten legalmente, por ejemplo, en su condición de consumidor. Las presentes Condiciones no tienen por objeto limitar o restringir tales derechos.

Garantía para los Consumidores del EEE. Si usted es un consumidor residente en el EEE, las leyes de defensa del consumidor del EEE le proporcionan una garantía legal que cubre los Servicios. Si tiene alguna pregunta sobre dicha garantía legal, póngase en contacto con nuestro servicio de Soporte.

Resolución de Disputas
Inquietudes. En caso de disputa, nos gustaría poder entender y tratar de resolver sus inquietudes antes de recurrir a la vía judicial.

Vía Judicial. Si no conseguimos resolver la disputa, tanto usted como nosotros podremos acudir a los tribunales locales.

Resolución Alternativa de Litigios de Consumo en el EEE. Si reside en el EEE, también puede someter el litigio a un organismo de resolución alternativa de litigios a través de la Plataforma de Resolución de Litigios en Línea (RLL) de la Comisión Europea, a la que puede acceder a través de este enlace: https://ec.europa.eu/consumers/odr(opens in a new window).

Reclamaciones sobre Derechos de Autor
Si considera que se han infringido sus derechos de propiedad intelectual, envíe una notificación a la dirección indicada a continuación: avillalba@clous.app. Podremos eliminar o deshabilitar el Contenido presuntamente infractor y cancelar cuentas de infractores reincidentes.

Toda reclamación por escrito relativa a una infracción de derechos de autor deberá incluir lo siguiente:

La firma electrónica o física de la persona autorizada a actuar en nombre del propietario de los derechos de autor;

Una descripción de la obra protegida por derechos de autor que usted alegue que ha sido infringida;

Una descripción del lugar de nuestro sitio web donde se encuentra el material presuntamente infractor para que podamos localizarlo;

Su dirección, número de teléfono y dirección de correo electrónico;

Una declaración en la que usted afirme creer de buena fe que el uso impugnado no está autorizado por el propietario de los derechos de autor, su agente o la legislación; y

Una declaración firmada por usted en la que afirme que la información recogida en su notificación es veraz y, bajo pena de falso testimonio, que usted es el propietario de los derechos de autor o está autorizado para actuar en nombre de dicho propietario.

Condiciones Generales
Cesión. No podrá ceder o transferir ninguno de los derechos u obligaciones previstos en las presentes Condiciones. Podremos ceder o transferir nuestros propios derechos u obligaciones derivados de las presentes Condiciones a cualquier entidad vinculada o subsidiaria o a cualquier sucesor de los intereses de cualquier negocio asociado a nuestros Servicios. En tal caso, sus derechos como consumidor no se verán afectados. Si no está satisfecho, podrá poner fin a su relación con Clous y dejar de utilizar nuestros Servicios en cualquier momento.

Modificación de las Presentes Condiciones o de Nuestros Servicios. Trabajamos constantemente para desarrollar y mejorar nuestros Servicios. En consecuencia, podremos actualizar las presentes Condiciones o nuestros Servicios de vez en cuando. Por ejemplo, podremos modificar las presentes Condiciones o los Servicios debido a:

Cambios legislativos o normativos.

Razones de seguridad o protección.

Circunstancias ajenas a nuestro control razonable.

La introducción de cambios en el desarrollo ordinario de nuestros Servicios.

La necesidad de adaptarnos a las nuevas tecnologías.

Le notificaremos con una antelación mínima de 30 días aquellos cambios que puedan perjudicarle significativamente, incluyendo la fecha en que entrarán en vigor, ya sea por correo electrónico o mediante un aviso en el propio producto. Todos los cambios se aplicarán a nuestra relación con efecto futuro. Si no está de acuerdo con los cambios, deberá dejar de utilizar nuestros Servicios.

Retraso en la Exigencia del Cumplimiento de las Presentes Condiciones. Si usted se retrasa o nosotros nos retrasamos en exigir el cumplimiento de cualquier disposición de las presentes Condiciones, usted o nosotros podremos exigir su cumplimiento más adelante y sin que ello nos impida tomar medidas contra la otra parte en una fecha posterior. Si se determina que alguna parte de las presentes Condiciones es inválida o inaplicable, ello no afectará a la eficacia de cualquier otra parte de las presentes Condiciones.

Controles Comerciales. Deberá cumplir todas las leyes aplicables en materia de comercio, incluyendo las leyes sobre sanciones y control de exportaciones. Nuestros Servicios no podrán utilizarse en o para beneficio de, ni exportarse o reexportarse (a) a ningún país o territorio sobre el que EE.UU. haya impuesto un embargo ni (b) a ninguna persona o entidad con la que esté prohibido o restringido hacer negocios en virtud de la legislación aplicable en materia de comercio. Nuestros Servicios no podrán destinarse a ningún uso final prohibido por la legislación aplicable en materia de comercio, y su Input no podrá incluir material o información que requiera una licencia gubernamental para su divulgación o exportación. 

Ley Aplicable. Las presentes Condiciones se regirán por las leyes de la jurisdicción en la que usted resida.

Apéndice sobre el Uso Empresarial de los Servicios
Uso Comercial y Empresarial. Si utiliza nuestros Servicios para uso comercial o empresarial, se aplicarán las siguientes condiciones. En caso de conflicto entre este Apéndice sobre el Uso Empresarial de los Servicios y el resto de estas Condiciones, prevalecerá este Apéndice.

Limitación de la Responsabilidad. NI NOSOTROS NI NINGUNA DE NUESTRAS ENTIDADES VINCULADAS  O LICENCIANTES SEREMOS RESPONSABLES DE NINGÚN DAÑO INDIRECTO, INCIDENTAL, ESPECIAL, CONSECUENCIAL O EJEMPLAR, INCLUIDOS LOS DAÑOS POR PÉRDIDA DE BENEFICIOS, FONDO DE COMERCIO, USO, O DATOS U OTRAS PÉRDIDAS, INCLUSO SI HEMOS SIDO ADVERTIDOS DE LA POSIBILIDAD DE TALES DAÑOS. NUESTRA RESPONSABILIDAD TOTAL EN VIRTUD DE LAS PRESENTES CONDICIONES NO SUPERARÁ EL IMPORTE MAYOR ENTRE LA CANTIDAD QUE USTED PAGÓ POR EL SERVICIO QUE DIO LUGAR A LA RECLAMACIÓN DURANTE LOS 12 MESES ANTERIORES AL SURGIMIENTO DE LA RESPONSABILIDAD O CIEN DÓLARES (100 USD). LAS LIMITACIONES DE ESTA SECCIÓN SÓLO SE APLICAN EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEGISLACIÓN APLICABLE.

Algunos países y estados no permiten la renuncia a ciertas garantías o la limitación de ciertos daños, por lo que algunos o todos los términos anteriores puede que no le sean de aplicación, y usted puede tener derechos adicionales. En tal caso, estas Condiciones sólo limitan nuestras responsabilidades en la medida máxima permitida en su país de residencia.

LAS ENTIDADES VINCULADAS, PROVEEDORES, LICENCIANTES Y DISTRIBUIDORES DE OPENAI SON TERCEROS BENEFICIARIOS DEL PRESENTE APÉNDICE.

Indemnidad. Si usted es una empresa u organización, en la medida en que la ley lo permita, nos indemnizará y nos eximirá a nosotros, a nuestras entidades vinculadas y a nuestro personal de cualquier coste, pérdida, responsabilidad y gasto (incluidos los honorarios de abogados) provenientes de reclamaciones de terceros que se deriven o estén relacionados con el uso que haga de los Servicios y Contenido o de cualquier infracción de estas Condiciones.

Legislación Aplicable (Uso Comercial). Estas Condiciones se regirán por la legislación de España, con excepción de sus principios sobre conflictos de leyes. Todas las reclamaciones derivadas o relacionadas con estas Condiciones se presentarán exclusivamente ante los tribunales federales o estatales de Madrid, España.

            </p>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
export default TermsEU;
