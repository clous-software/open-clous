"use client";
import { useTranslations } from 'next-intl';

function Uvp() {
  const t = useTranslations('Clous');

  return (
    <div className="py-16">
      <main className="rounded-3xl bg-primary lg:flex gap-12 px-4 lg:px-12 lg:mx-24 py-12">
        <section className="text-left flex flex-col justify-start items-start max-w-xl mb-8">
          <h2 className="text-3xl lg:text-5xl text-white relative text-primary">
            {t('actionSection.title')}
          </h2>
        </section>
        <section className="relative">
          <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(242, 108, 33, 1), transparent)' }}></div>
          <ul className="text-xl text-white relative z-0">
            <li>
              <p className="font-medium">{t('actionSection.action1')}</p>
            </li>
            <li>
              <p className="font-medium">{t('actionSection.action2')}</p>
            </li>
            <li>
              <p className="font-medium">{t('actionSection.action3')}</p>
            </li>
            <li>
              <p className="font-medium">{t('actionSection.action4')}</p>
            </li>
            <li>
              <p className="font-medium">{t('actionSection.action5')}</p>
            </li>
            <li>
              <p className="font-medium">{t('actionSection.action6')}</p>
            </li>
            <li>
              <p className="font-medium">{t('actionSection.action7')}</p>
            </li>
            <li>
              <p className="font-medium">{t('actionSection.action8')}</p>
            </li>
            <li>
              <p></p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Uvp;
