'use client';

import { useContext } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { LanguageContext } from '../contexts/LanguageContext';

const ServicePage = () => {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      webDevelopment: {
        title: 'Web Development',
        description:
          'I offer professional web development services to create responsive and dynamic websites tailored to your business needs.',
      },
      uiUxDesign: {
        title: 'UI / UX Design',
        description:
          'I specialize in UI/UX design, crafting intuitive and visually appealing interfaces for an enhanced user experience.',
      },
      software: {
        title: 'Software',
        description:
          'I develop custom software solutions to streamline your business processes and enhance productivity.',
      },
      mobileApp: {
        title: 'Mobile App',
        description:
          'I provide mobile app development services to create user-friendly applications for both iOS and Android platforms.',
      },
    },
    fr: {
      webDevelopment: {
        title: 'Développement Web',
        description:
          "J'offre des services de développement web professionnels pour créer des sites web réactifs et dynamiques adaptés aux besoins de votre entreprise.",
      },
      uiUxDesign: {
        title: 'Design UI / UX',
        description:
          'Je suis spécialisé dans le design UI/UX, créant des interfaces intuitives et visuellement attrayantes pour une expérience utilisateur améliorée.',
      },
      software: {
        title: 'Logiciel',
        description:
          "Je développe des solutions logicielles personnalisées pour rationaliser vos processus d'entreprise et améliorer la productivité.",
      },
      mobileApp: {
        title: 'Application Mobile',
        description:
          "Je fournis des services de développement d'applications mobiles pour créer des applications pour les plateformes iOS et Android.",
      },
    },
  };

  const t = translations[language];

  return (
    <main className="flex flex-col items-center justify-between p-4 md:p-8">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <div className="grid gap-8 mt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <div className="flex flex-col space-y-4 cursor-pointer min-h-[220px] p-4 hover:bg-blue-950 hover:bg-opacity-30 rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl md:text-5xl text-blue-900">01</h1>
              <FaArrowRightLong
                className="rotate-45 p-2 bg-blue-900 rounded-full text-black hover:rotate-0 transition-transform duration-300 ease-in-out"
                size={40}
              />
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-blue-900">
              {t.webDevelopment.title}
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              {t.webDevelopment.description}
            </p>
            <div className="border-b border-gray-500 border-opacity-35"></div>
          </div>

          <div className="flex flex-col space-y-4 cursor-pointer min-h-[220px] p-4 hover:bg-blue-950 hover:bg-opacity-30 rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl md:text-5xl text-blue-900">02</h1>
              <FaArrowRightLong
                className="rotate-45 p-2 bg-blue-900 rounded-full text-black hover:rotate-0 transition-transform duration-300 ease-in-out"
                size={40}
              />
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-blue-900">
              {t.uiUxDesign.title}
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              {t.uiUxDesign.description}
            </p>
            <div className="border-b border-gray-500 border-opacity-35"></div>
          </div>

          <div className="flex flex-col space-y-4 cursor-pointer min-h-[220px] p-4 hover:bg-blue-950 hover:bg-opacity-30 rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl md:text-5xl text-blue-900">03</h1>
              <FaArrowRightLong
                className="rotate-45 p-2 bg-blue-900 rounded-full text-black hover:rotate-0 transition-transform duration-300 ease-in-out"
                size={40}
              />
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-blue-900">
              {t.software.title}
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              {t.software.description}
            </p>
            <div className="border-b border-gray-500 border-opacity-35"></div>
          </div>

          <div className="flex flex-col space-y-4 cursor-pointer min-h-[220px] p-4 hover:bg-blue-950 hover:bg-opacity-30 rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl md:text-5xl text-blue-900">04</h1>
              <FaArrowRightLong
                className="rotate-45 p-2 bg-blue-900 rounded-full text-black hover:rotate-0 transition-transform duration-300 ease-in-out"
                size={40}
              />
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-blue-900">
              {t.mobileApp.title}
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              {t.mobileApp.description}
            </p>
            <div className="border-b border-gray-500 border-opacity-35"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServicePage;
