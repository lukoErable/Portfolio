'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LanguageContext } from '../contexts/LanguageContext';

export default function Navbar() {
  const currentPath = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const linkStyle = (path: any) =>
    `text-sm cursor-pointer flex justify-center pt-2 border-b-2 ${
      currentPath === path
        ? currentPath === '/contact'
          ? 'text-white border-white'
          : 'text-blue-900 border-blue-900'
        : 'border-transparent hover:border-white'
    }`;

  const contactStyle = `p-2 px-4 border-2 bg-blue-900 text-black rounded-full hover:bg-blue-900 hover:text-white hover:border-transparent`;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const translations = {
    en: {
      home: 'Home',
      services: 'Services',
      resume: 'Profile',
      work: 'Work',
      contact: 'Contact',
    },
    fr: {
      home: 'Accueil',
      services: 'Services',
      resume: 'Profil',
      work: 'Travaux',
      contact: 'Contact',
    },
  };

  const t = translations[language];

  return (
    <main className="flex flex-col items-center justify-between p-8">
      <div className="z-10 w-full max-w-5xl flex items-center justify-between font-bold text-sm">
        <div className="flex items-center gap-4">
          <a
            className="pointer-events-none flex gap-2 lg:pointer-events-auto"
            href="/"
            rel="noopener noreferrer"
          >
            <h1 className="font-bold text-4xl">Lucas</h1>
            <div className="self-end mb-2 w-2 h-2 bg-blue-900 rounded-full"></div>
          </a>
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 bg-blue-900 text-white rounded"
          >
            {language === 'en' ? 'FR' : 'EN'}
          </button>
        </div>
        <div className="hidden md:flex flex-row space-x-8 w-full justify-end">
          <Link href="/">
            <p className={linkStyle('/')}>{t.home}</p>
          </Link>
          <Link href="/services">
            <p className={linkStyle('/services')}>{t.services}</p>
          </Link>
          <Link href="/resume">
            <p className={linkStyle('/resume')}>{t.resume}</p>
          </Link>
          <Link href="/work">
            <p className={linkStyle('/work')}>{t.work}</p>
          </Link>
          <Link href="/contact">
            <p className={`${linkStyle('/contact')} ${contactStyle}`}>
              {t.contact}
            </p>
          </Link>
        </div>
        <button className="md:hidden" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button className="absolute top-4 right-4" onClick={toggleSidebar}>
          <FaTimes size={24} />
        </button>
        <div className="flex flex-col items-center mt-16 space-y-4">
          <Link href="/">
            <p className={linkStyle('/')}>{t.home}</p>
          </Link>
          <Link href="/services">
            <p className={linkStyle('/services')}>{t.services}</p>
          </Link>
          <Link href="/resume">
            <p className={linkStyle('/resume')}>{t.resume}</p>
          </Link>
          <Link href="/work">
            <p className={linkStyle('/work')}>{t.work}</p>
          </Link>
          <Link href="/contact">
            <p className={`${linkStyle('/contact')} ${contactStyle}`}>
              {t.contact}
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-16 relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
    </main>
  );
}
