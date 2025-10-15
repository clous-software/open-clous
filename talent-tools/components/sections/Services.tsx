"use client";
import { CameraOff, Cpu, Gift, ChevronDown, ShieldOff, UserX } from "lucide-react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { useTranslations } from 'next-intl';

function Icon({ id, open }: { id: string; open: boolean }) {
  return (
    <ChevronDown className={`${open ? "rotate-180" : ""} h-8 w-8 transition-transform`} />
  );
}

const Services = () => {

  const t = useTranslations('Pricing');

  return (
    <main className="lg:py-24 lg:px-24 px-4 lg:flex justify-between text-left items-left">


      <section className="flex flex-col gap-1">
        <h2 className="mb-2 text-lg tracking-tight font-semibold max-w-4xl">
          {t('vloggingSection.subtitle')}      </h2>
        <ul className=" flex flex-col text-left items-left rounded-xl">
          <li className="cursor-pointer mt-2 flex text-xl lg:text-3xl">
            <Link href="https://www.clous.app/en/wikis/b1ad31a1-a3fe-49e1-b3cf-87982ddb149e" target="_blank" className="font-semibold underAnimation">
              <h3 className="mr-2">{t('vloggingSection.cta1')} </h3>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-2 text-left items-left rounded-xl ">
          <li className="cursor-pointer mt-2 flex text-xl lg:text-3xl">
            <Link href="https://www.clous.app/en/wikis/0b14210b-9de6-4c1e-b998-19b20dfb2244" target="_blank" className="font-semibold underAnimation">
              <h3 className="mr-2">{t('vloggingSection.cta2')} </h3>
            </Link>
          </li>

        </ul>
        <ul className="flex flex-col gap-2 text-left items-left rounded-xl">
          <li className="cursor-pointer mt-2 flex text-xl lg:text-3xl">
            <Link href="https://www.clous.app/en/wikis/3ef47462-06c5-4ae5-9ff5-67a897afa709" target="_blank" className="font-semibold underAnimation">
              <h3 className="mr-2">{t('vloggingSection.cta3')} </h3>
            </Link>
          </li>

        </ul>
        <ul className="flex flex-col gap-2 text-left items-left rounded-xl ">
          <li className="cursor-pointer mt-2 flex text-xl lg:text-3xl">
            <Link href="https://www.clous.app/en/wikis/0d42323a-0945-44f1-86da-59f81e2a6dfa" target="_blank" className="font-semibold underAnimation">
              <h3 className="mr-2">{t('vloggingSection.cta4')} </h3>
            </Link>
          </li>

        </ul>
      </section>
      {/* <Link href="https://docs.google.com/spreadsheets/d/1fITUDym1-GPFlb99lP_AqYZGX9DJSyf8kCC53wjF7n8/edit?usp=sharing" target="_blank" className="bg-primary rounded-3xl p-8 w-[30%] text-secondary group relative">
          <h2 className="text-2xl max-w[80%]">
          {t('vloggingSection.card.title')} 
          </h2>
          <p className="text-sm font-normal">
          {t('vloggingSection.card.description')} 
          </p>
          <FiExternalLink className="w-6 h-6 text-secondary absolute -right-6 -top-6 group-hover:right-7 group-hover:top-8 transition-hover duration-500 delay-150"/>

        </Link> */}
      <Link href="https://clous-app.notion.site/Careers-Page-Clous-4283b0596d7b498ba955772f714a66b8?pvs=4" target="_blank" className="bg-primary rounded-3xl p-8 w-[30%] text-secondary group hidden lg:flex flex-col relative">
        <h2 className="text-2xl">
          Always looking for the best talent
        </h2>
        <p className="text-sm font-normal">
          We believe that talent is the key asset of any company. We&apos;re always looking for great talent to join our team.
        </p>
        <FiExternalLink className="w-6 h-6 text-secondary absolute -right-6 -top-6 group-hover:right-7 group-hover:top-8 transition-hover duration-500 delay-150" />

      </Link>

    </main>
  );
}

export default Services;
