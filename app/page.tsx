'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import { LanguageContext } from './contexts/LanguageContext';

const Home: React.FC = () => {
  const { language } = useContext(LanguageContext);

  const handleDownload = () => {
    const url = '/cv.pdf';
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'cv.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const translations = {
    en: {
      title: 'FullStack Developer',
      intro: "Hello I'm",
      name: 'Lucas Fabregoule',
      description:
        'I am a software developer with a passion for creating elegant digital experiences. I have experience in developing websites, softwares, and mobile applications. I am proficient in various programming languages and technologies. I am always looking to learn new things and improve my skills.',
      downloadCV: 'DOWNLOAD CV',
      yearsExperience: 'Years of experience',
      projectsCompleted: 'Projects completed',
      technologiesLearned: 'Technologies learned',
      codeCommits: 'Code commits',
    },
    fr: {
      title: 'Développeur FullStack',
      intro: 'Bonjour, je suis',
      name: 'Lucas Fabregoule',
      description:
        "Je suis un développeur logiciel passionné par la création d'expériences numériques élégantes. J'ai de l'expérience dans le développement de sites web, de logiciels et d'applications mobiles. Je maîtrise divers langages de programmation et technologies. Je cherche toujours à apprendre de nouvelles choses et à améliorer mes compétences.",
      downloadCV: 'TÉLÉCHARGER CV',
      yearsExperience: "Années d'expérience",
      projectsCompleted: 'Projets réalisés',
      technologiesLearned: 'Technologies apprises',
      codeCommits: 'Commits de code',
    },
  };

  const t = translations[language];

  return (
    <main className="flex flex-col items-center justify-between p-4 md:p-8">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex flex-col justify-center w-full md:w-1/2">
            <h1 className="text-lg md:text-xl text-gray-300 mb-2 text-center md:text-left lg:text-left">
              {t.title}
            </h1>
            <div className="text-3xl md:text-5xl font-bold text-center md:text-left lg:text-left">
              {t.intro}
            </div>
            <div className="text-3xl md:text-5xl font-bold text-blue-900 mb-4 text-center md:text-left lg:text-left">
              {t.name}
            </div>
            <p className="text-sm md:text-base text-gray-300 text-center md:text-left lg:text-left">
              {t.description}
            </p>
          </div>
          <div className="flex justify-center items-center w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-2.5 rounded-full border-4 border-dotted border-blue-900 animate-spin"></div>
              <Image
                className="rounded-full relative z-10"
                src="/pp.png"
                alt="photo of Lucas Fabregoule"
                width={250}
                height={250}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            className="flex items-center font-bold text-blue-900 p-2 px-4 border-2 border-blue-900 rounded-full hover:bg-blue-900 hover:border-blue-900 hover:text-black cursor-pointer"
            onClick={handleDownload}
          >
            {t.downloadCV}
            <HiOutlineDownload size={20} className="ml-2" />
          </button>
          <Link href={'https://github.com/lukoErable'} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <button className="p-2 border-2 text-blue-900 hover:text-black border-blue-900 rounded-full hover:bg-blue-900 hover:border-blue-900 cursor-pointer">
                <FaGithub size={20} />
              </button>
            </a>
          </Link>

          <Link
            href={'https://www.linkedin.com/in/lucas-fabregoule-640873274'}
            passHref
            legacyBehavior
          >
            <a target="_blank" rel="noopener noreferrer">
              <button className="p-2 border-2 text-blue-900 hover:text-black border-blue-900 rounded-full hover:bg-blue-900 hover:border-blue-900 cursor-pointer">
                <FaLinkedin size={20} />
              </button>
            </a>
          </Link>
          <Link
            href="https://www.instagram.com/lucas_fbg/"
            passHref
            legacyBehavior
          >
            <a target="_blank" rel="noopener noreferrer">
              <button className="p-2 border-2 text-blue-900 hover:text-black border-blue-900 rounded-full hover:bg-blue-900 hover:border-blue-900 cursor-pointer">
                <FaInstagram size={20} />
              </button>
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href={'/resume'}>
            <div className="flex items-center justify-center text-center p-2 px-4 border-2 border-blue-900 rounded-full hover:bg-blue-950 hover:border-blue-950">
              <h2 className="text-3xl md:text-5xl font-bold text-white mr-2">
                4
              </h2>
              <p className="text-gray-300 text-sm md:text-md">
                {t.yearsExperience}
              </p>
            </div>
          </Link>
          <Link href={'/work'}>
            <div className="flex items-center justify-center text-center p-2 px-4 border-2 border-blue-900 rounded-full cursor-pointer hover:bg-blue-950 hover:border-blue-950">
              <h2 className="text-3xl md:text-5xl font-bold text-white mr-2">
                10
              </h2>
              <p className="text-gray-300 text-sm md:text-md">
                {t.projectsCompleted}
              </p>
            </div>
          </Link>
          <Link href={'/resume'}>
            <div className="flex items-center justify-center text-center p-2 px-4 border-2 border-blue-900 rounded-full cursor-pointer hover:bg-blue-950 hover:border-blue-950">
              <h2 className="text-3xl md:text-5xl font-bold text-white mr-2">
                5
              </h2>
              <p className="text-gray-300 text-sm md:text-md">
                {t.technologiesLearned}
              </p>
            </div>
          </Link>
          {/* <div className="flex items-center justify-center text-center p-2 px-4 border-2 border-blue-900 rounded-full cursor-pointer">
            <h2 className="text-3xl md:text-5xl font-bold text-white mr-2">
              420
            </h2>
            <p className="text-gray-300 text-sm md:text-md">{t.codeCommits}</p>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default Home;
