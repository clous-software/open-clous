"use client";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa";

function Footer() {

  // Componente de Navegación del Footer simplificado
  const FooterNav = ({ title, links }) => (
    <div>
      <p className="font-semibold text-lg">{title}</p>
      <nav aria-label={`Footer Navigation - ${title}`} className="mt-2">
        <ul className="grid grid-flow-row gap-2 auto-rows-max font-[500] text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className="hover:text-dark-gray transitions"
              onClick={link.onClick}
              target={link.target}
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );

  // Datos de Navegación para cada sección
  const footerNavData = [
    
    {
      title: "Product",
      links: [
        { name: "Clous", path: "/clous" },
        { name: "Peer", path: "/peer" },
        // { name: "Enterprise", path: "/enterprise" },
        // { name: "Startups", path: "/startup" },
        // { name: "Paths", path: "https://beta.clous.app/careers/paths" },
        // { name: "Clous Jobs", path: "https://beta.clous.app/careers" },
        // { name: "Clous Me", path: "https://beta.clous.app/careers/me" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "Company", path: "/about" },
        { name: "Contact us", path: "https://beta.clous.app/getintouch", target: "_blank"},
        { name: "Careers", path: "https://clous-app.notion.site/Careers-Page-Clous-4283b0596d7b498ba955772f714a66b8?pvs=4", onClick: () => trackButtonClick2("Careers"),
          target: "_blank"},
        { name: "Press", path: "https://pitch.com/v/press-kit-en-69wb3u", onClick: () => trackButtonClick2("Press"),
        target: "_blank"},
        { name: "Partners", path: "https://clous-app.notion.site/Programs-4e2975883b1243c19d05bbba218e9080?pvs=4", onClick: () => trackButtonClick2("Press"),
        target: "_blank"},

      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Editorial", path: "/editorial" },
        { name: "Pricing", path: "/pricing" },
        { name: "Archives", path: "https://clous-app.notion.site/d2a4416fbcca45d995aae7ca42ebd610?v=48376c7825ab469087f7e53b3f9722f0&pvs=4", target: "_blank" },
        { name: "Resource Hub", path: "https://clous-app.notion.site/33612f28f032470798cc849a6e04ac83?v=77c0600e5e9549cda2ada4e4f8d9710f&pvs=4", target: "_blank" },
        { name: "Threads", path: "https://clous-app.notion.site/Intelligence-1fd9faaa3d7a4fa5b69c16b62552df9f?pvs=4", target: "_blank" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Vlog", path: "https://clous.substack.com/", target: "_blank" },
        { name: "Linkedin", path: "https://www.linkedin.com/company/cloushq/", target: "_blank" },
        { name: "Youtube", path: "https://www.youtube.com/@cloushq", target: "_blank" },
        // { name: "Slack", path: "https://join.slack.com/t/clouscommunity/shared_invite/zt-2g0jfas4z-wWJdlfVF_1wGAz85~sQWfw", target: "_blank" },
        { name: "Twitter", path: "https://twitter.com/cloushq", target: "_blank" },
      ],
    },
    {
      title: "Library",
      links: [
        {name: "Help Center", path: "https://clous-app.notion.site/825ccd936f984c5ea1618c517f741b7f?v=7a1849906bd147358ccd29eab378e870&pvs=4", target: "_blank"},
        { name: "Disclosures", path: "https://clous-app.notion.site/Disclosures-308f7088b8144e098ee347480234d220?pvs=4",
        target: "_blank"},
        { name: "Releases", path: "https://clous-app.notion.site/Changelog-b45b82cc9e76459d86b0dc71febbce75?pvs=4",
        target: "_blank"},
        { name: "Services", path: "https://beta.clous.app/library",
        target: "_blank"},
      ],
    },
    // ... otros datos para "About Us", "Resources", etc.
  ];

  return (
    <footer aria-label="Site Footer" className="bg-[#fafafa] pt-2 lg:pt-16 rounded-t-3xl px-2 lg:px-16 2xl:px-24 text-dark-blue-greenish">
     
<section className="flex lg:flex-row flex-col justify-between">
          <div className=" flex-col flex gap-2">
            <Link href="/">
              <img src="https://clous.s3.eu-west-3.amazonaws.com/Logo+Orange.png" className="w-8" alt="Clous IsoLogo" />
            </Link>
            <p className="text-sm font-medium text-shade-gray hidden mt-32 lg:flex">Backed us</p>
      <section className="flex gap-6 md:justify-start items-center mb-8">
        <img width={70} src="https://clous.s3.eu-west-3.amazonaws.com/icons/Lanzadera.png" alt="Lanzadera partners with Clous" />
        <img width={25} className="rounded-full" src="https://clous.s3.eu-west-3.amazonaws.com/icons/IAT.webp" alt="IAT partners with Clous" />
        <img width={35} src="https://clous.s3.eu-west-3.amazonaws.com/icons/MIT.webp" alt="MIT partners with Clous" />
        <img width={55} src="https://clous.s3.eu-west-3.amazonaws.com/icons/Accenture.webp" alt="Accenture partners with Clous" />

      </section>
            
          </div>
        <div className="flex lg:flex-row flex-col gap-16 w-3/4">
          {/* Logo y texto de suscripción */}

          {/* Secciones del Footer */}
          {footerNavData.map((section, index) => (
            <FooterNav
              key={index}
              title={section.title}
              links={section.links}
            />
          ))}
          {/*Debería de ser una sección izquierda, después la Grid en la derecha(que "resources" no se quede abajo de "Get the lastest news!") - alvipe-dev*/}


        </div>
            </section>
        <div className="mt-2 border-t border-gray-100 py-2 font-medium">
          <div className="sm:flex sm:justify-between">
            <p className="text-xs ">&copy; 2023-24 Clous © All rights reserved</p>

            <nav
              aria-label="Footer Navigation - Support"
              className="mt-8 sm:mt-0"
            >
              <ul className="flex flex-wrap justify-start gap-4 text-xs lg:justify-end">
                <a href="/legal/terms" className=" transition hover:opacity-75">
                  Terms of use
                </a>

                <a href="/legal/privacy" className=" transition hover:opacity-75">
                  Privacy policy
                </a>

                <a href="/legal/terms-eu" className=" transition hover:opacity-75">
                  EU terms
                </a>
                <a href="/legal/usage" className=" transition hover:opacity-75">
                  Usage policy
                </a>
                <a href="/legal/sharing-policy" className=" transition hover:opacity-75">
                  Sharing policy
                </a>
                <a href="/legal/business-terms" className=" transition hover:opacity-75">
                  Business terms
                </a>
                
                {/* <a href="/service-credits" className=" transition hover:opacity-75">
                  Service credits
                </a> */}
              </ul>
            </nav>
          </div>
        </div>
    </footer>
  );
}

export default Footer;
