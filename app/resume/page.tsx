'use client';

import { useContext, useState } from 'react';
import { BiLogoTypescript } from 'react-icons/bi';
import { DiMysql } from 'react-icons/di';
import { FaCss3, FaHtml5, FaNodeJs, FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { RiNextjsLine, RiTailwindCssFill } from 'react-icons/ri';
import { LanguageContext } from '../contexts/LanguageContext';

const resumePage = () => {
  const { language } = useContext(LanguageContext);
  const [activeSection, setActiveSection] = useState('Experience');

  const sections = [
    { id: 'Experience', label: 'Experience', labelFr: 'Expérience' },
    { id: 'Education', label: 'Education', labelFr: 'Éducation' },
    { id: 'Skills', label: 'Skills', labelFr: 'Compétences' },
    { id: 'AboutMe', label: 'Profile', labelFr: 'Profile' },
  ];

  const renderSectionContent = () => {
    const translations = {
      en: {
        title: 'My experience',
        yieldOptimization: 'Yield Optimization',
        cryptoWebApp: 'Cryptocurrency WebApp',
        freelanceWebDev: 'Freelance Web Developer',
        onlineProjects: 'Online Projects',
        softwareWebsiteMobileApp: 'Software / Website / Mobile App',
        saasSneakersCompany: 'SAAS Sneakers Company',
        websiteToSellProducts: 'Website to sell products',
        ecommerceStartup: 'E-commerce Startup',

        title2: 'My education',
        programmingCourse: 'Programming Course',
        programmingCourse2: '42 School - Programming',
        onlineCourse: 'Online Course',
        onlineCourse2: '1 Month intensive course',
        btsSio: 'BTS SIO computer science',
        studies: 'Studies',
        dutNetworks: 'DUT networks and telecommunications',
        bacSti2d: 'Baccalauréat STI2D - EE',
        college: 'College',

        title3: 'My Skills',
        description: '',

        title4: 'About Me',
        description2: '',
        name: 'Name',
        experience: 'Experience',
        nationality: 'Nationality',
        freelance: 'Freelance',
        phone: 'Phone',
        instagram: 'Instagram',
        email: 'Email',
        languages: 'Languages',
        years: 'Years',
        available: 'Available',
        french: 'French',
        english: 'English',
      },
      fr: {
        title: 'Mon expérience',
        yieldOptimization: 'Optimisation du rendement',
        cryptoWebApp: 'Application Web de crypto',
        freelanceWebDev: 'Développeur Web Freelance',
        onlineProjects: 'Projets en ligne',
        softwareWebsiteMobileApp: 'Logiciels / Site Web / Application Mobile',
        saasSneakersCompany: 'Entreprise SAAS de sneakers',
        websiteToSellProducts: 'Site Web de vente de produits',
        ecommerceStartup: 'Startup de commerce',

        title2: 'Mon éducation',
        programmingCourse: 'Cours de programmation',
        programmingCourse2: 'Ecole 42 langage C',
        onlineCourse: 'Cours en ligne',
        onlineCourse2: "Cours intensif d'un mois",
        btsSio: 'BTS SIO informatique',
        studies: 'Études',
        dutNetworks: 'DUT réseaux et télécommunications',
        bacSti2d: 'Baccalauréat STI2D - EE',
        college: 'Lycée',

        title3: 'Mes Compétences',
        description: '',

        title4: 'À mon Propos',
        description2: '',
        name: 'Nom',
        experience: 'Expérience',
        nationality: 'Nationalité',
        freelance: 'Freelance',
        phone: 'Téléphone',
        instagram: 'Instagram',
        email: 'Email',
        languages: 'Langues',
        years: 'Ans',
        available: 'Disponible',
        french: 'Français',
        english: 'Anglais',
      },
    };

    const t = translations[language];

    const skills = [
      { icon: FaHtml5, name: 'HTML5' },
      { icon: FaCss3, name: 'CSS3' },
      { icon: IoLogoJavascript, name: 'JavaScript' },
      { icon: FaReact, name: 'React' },
      { icon: RiNextjsLine, name: 'NextJS' },
      { icon: RiTailwindCssFill, name: 'Tailwind' },
      { icon: FaNodeJs, name: 'Node.js' },
      { icon: DiMysql, name: 'SQL' },
      { icon: BiLogoTypescript, name: 'TypeScript' },
    ];

    switch (activeSection) {
      case 'Experience':
        return (
          <div className="space-y-4">
            <h1 className="text-3xl">{t.title}</h1>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-950 p-4 rounded-lg bg-opacity-30 cursor-pointer hover:bg-opacity-60">
                <h2 className="text-blue-900 font-bold">2023-2024</h2>
                <h1 className="text-xl max-w-36">
                  RDMT - {t.yieldOptimization}
                </h1>
                <div className="flex">
                  <div className="self-end p mb-2.5 w-2 h-2 bg-blue-900 rounded-full"></div>
                  <div className="p-1 pl-2 text-gray-500">
                    {t.cryptoWebApp}{' '}
                  </div>
                </div>
              </div>

              <div className="bg-blue-950 p-4 rounded-lg bg-opacity-30 cursor-pointer hover:bg-opacity-60">
                <h2 className="text-blue-900 font-bold">2020-2024</h2>
                <h1 className="text-xl max-w-36">{t.freelanceWebDev}</h1>
                <div className="flex">
                  <div className="self-end p mb-2.5 w-2 h-2 bg-blue-900 rounded-full"></div>
                  <div className="p-1 pl-2 text-gray-500">
                    {t.onlineProjects}
                  </div>
                </div>
              </div>

              <div className="bg-blue-950 p-4 rounded-lg bg-opacity-30 cursor-pointer hover:bg-opacity-60">
                <h2 className="text-blue-900 font-bold">2019-2024</h2>
                <h1 className="text-xl max-w-38">
                  WALKNWEAR - {t.softwareWebsiteMobileApp}
                </h1>
                <div className="flex">
                  <div className="self-end p mb-2.5 w-2 h-2 bg-blue-900 rounded-full"></div>
                  <div className="p-1 pl-2 text-gray-500">
                    {t.saasSneakersCompany}{' '}
                  </div>
                </div>
              </div>

              <div className="bg-blue-950 p-4 rounded-lg bg-opacity-30 cursor-pointer hover:bg-opacity-60">
                <h2 className="text-blue-900 font-bold">2017-2019</h2>
                <h1 className="text-xl max-w-36">{t.websiteToSellProducts}</h1>
                <div className="flex">
                  <div className="self-end p mb-2.5 w-2 h-2 bg-blue-900 rounded-full"></div>
                  <div className="p-1 pl-2 text-gray-500">
                    {t.ecommerceStartup}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Education':
        return (
          <div className="space-y-4">
            <h1 className="text-3xl">{t.title2}</h1>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-950 p-4 rounded-lg bg-opacity-30 cursor-pointer hover:bg-opacity-60">
                <h2 className="text-blue-900 font-bold">2023</h2>
                <h1 className="text-xl max-w-36">{t.programmingCourse2}</h1>
                <div className="flex">
                  <div className="self-end p mb-2.5 w-2 h-2 bg-blue-900 rounded-full"></div>
                  <div className="p-1 pl-2 text-gray-500">
                    {t.onlineCourse2}
                  </div>
                </div>
              </div>

              <div className="bg-blue-950 p-4 rounded-lg bg-opacity-30 cursor-pointer hover:bg-opacity-60">
                <h2 className="text-blue-900 font-bold">2021-2022</h2>
                <h1 className="text-xl max-w-36">{t.programmingCourse}</h1>
                <div className="flex">
                  <div className="self-end p mb-2.5 w-2 h-2 bg-blue-900 rounded-full"></div>
                  <div className="p-1 pl-2 text-gray-500">{t.onlineCourse}</div>
                </div>
              </div>

              <div className="bg-blue-950 p-4 rounded-lg bg-opacity-30 cursor-pointer hover:bg-opacity-60">
                <h2 className="text-blue-900 font-bold">2019-2021</h2>
                <h1 className="text-xl max-w-42">{t.btsSio}</h1>
                <div className="flex">
                  <div className="self-end p mb-2.5 w-2 h-2 bg-blue-900 rounded-full"></div>
                  <div className="p-1 pl-2 text-gray-500">{t.studies}</div>
                </div>
              </div>

              <div className="bg-blue-950 p-4 rounded-lg bg-opacity-30 cursor-pointer hover:bg-opacity-60">
                <h2 className="text-blue-900 font-bold">2018-2019</h2>
                <h1 className="text-xl max-w-38">{t.dutNetworks}</h1>
                <div className="flex">
                  <div className="self-end p mb-2.5 w-2 h-2 bg-blue-900 rounded-full"></div>
                  <div className="p-1 pl-2 text-gray-500">{t.studies}</div>
                </div>
              </div>

              <div className="bg-blue-950 p-4 rounded-lg bg-opacity-30 cursor-pointer hover:bg-opacity-60">
                <h2 className="text-blue-900 font-bold">2016-2018</h2>
                <h1 className="text-xl max-w-36">{t.bacSti2d}</h1>
                <div className="flex">
                  <div className="self-end p mb-2.5 w-2 h-2 bg-blue-900 rounded-full"></div>
                  <div className="p-1 pl-2 text-gray-500">{t.college}</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Skills':
        return (
          <div className="space-y-4 w-full">
            <h1 className="text-3xl">{t.title3}</h1>
            <p>{t.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="relative bg-blue-950 p-4 sm:p-6 rounded-lg bg-opacity-30 flex justify-center items-center group cursor-pointer border-2 border-blue-950 border-opacity-0 hover:border-blue-900"
                >
                  <skill.icon className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                  <div className="absolute bottom-0 flex-col items-center hidden -mb-3 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-nowrap bg-black shadow-lg rounded-md border-2 border-blue-900">
                      {skill.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'AboutMe':
        return (
          <div className="space-y-4 w-full">
            <h1 className="text-3xl">{t.title4}</h1>
            <p>{t.description2}</p>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-12">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <p className="text-gray-400 text-md">{t.name}</p>
                  <h1 className="text-xl">Lucas Fabregoule</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-400 text-md">{t.experience}</p>
                  <h1 className="text-xl">4+ {t.years}</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-400 text-md">{t.nationality}</p>
                  <h1 className="text-xl">{t.french}</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-400 text-md">{t.freelance}</p>
                  <h1 className="text-xl">{t.available}</h1>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <p className="text-gray-400 text-md">{t.phone}</p>
                  <h1 className="text-xl">{'(+33) 06 62 13 55 22'}</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-400 text-md">{t.instagram}</p>
                  <h1 className="text-xl">lucas_fbg</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-400 text-md">{t.email}</p>
                  <h1 className="text-xl">lucasfabregoule@gmail.com</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-400 text-md">{t.languages}</p>
                  <h1 className="text-xl">
                    {t.french}, {t.english}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const translations = {
    en: {
      title: 'Why choose me?',
      description:
        'I provide comprehensive web development, UI/UX design, software creation, and mobile app development services to deliver tailored digital solutions for your business needs.',
    },
    fr: {
      title: 'Pourquoi moi ?',
      description:
        "Je propose des services complets de développement web, de design UI/UX, de création de logiciels et de développement d'applications mobiles pour fournir des solutions numériques sur mesure adaptées aux besoins de votre entreprise.",
    },
  };

  const t = translations[language];

  return (
    <main className="flex flex-col items-center justify-between p-4 md:p-8">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-32">
          <div className="w-full lg:w-1/3 space-y-4 lg:space-y-8 mb-8 lg:mb-0">
            <h1 className="text-3xl md:text-4xl text-center">{t.title}</h1>
            <p className="text-sm md:text-base text-center">{t.description}</p>

            <div className="w-auto space-y-2 md:space-y-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`bg-blue-950 bg-opacity-20 w-auto text-center rounded-md p-2 text-sm md:text-md cursor-pointer hover:bg-opacity-95 ${
                    activeSection === section.id
                      ? 'bg-opacity-95 font-bold '
                      : ''
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {language === 'fr' ? section.labelFr : section.label}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-2/3">{renderSectionContent()}</div>
        </div>
      </div>
    </main>
  );
};

export default resumePage;
