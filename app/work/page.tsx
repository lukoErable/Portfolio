'use client';

import { useContext } from 'react';
import ImageCarousel from '../components/carousel';
import { LanguageContext } from '../contexts/LanguageContext';
type SupportedLanguage = 'en' | 'fr';

const translations = {
  en: {
    image1: {
      text: 'This is a website for buying sneakers online. As a user, you can browse through the catalog, add items to your cart, and make a purchase.',
      title: 'Sneakers Website',
    },
    image2: {
      text: 'This is a bot that helps you buy sneakers on the internet.',
      title: 'Sneakers Bot',
    },
    image3: {
      text: 'This website is a manga website where you can read manga online for free and without ads.',
      title: 'ScanSan: Manga website',
    },
    image4: {
      text: 'Rendment is a website that helps you manage your cryptocurrencies by optimizing the yield rate.',
      title: 'Rendment: Cryptocurrency Yield Optimizer',
    },
    image5: {
      text: 'Vintedge is a bot that help you buy and sell clothes on Vinted. By scanning the ads, it allows you to find the best deals.',
      title: 'Vintedge: Vinted Bot',
    },
  },
  fr: {
    image1: {
      text: "Site web d'achat de baskets en ligne. En tant qu'utilisateur, vous pouvez parcourir le catalogue, ajouter des articles à votre panier et effectuer un achat.",
      title: 'Site de baskets en ligne',
    },
    image2: {
      text: 'Ceci est un bot qui vous aide à acheter des baskets sur internet.',
      title: 'Bot pour Baskets ',
    },
    image3: {
      text: 'Ce site web est un site de manga où vous pouvez lire des mangas en ligne gratuitement et sans publicités.',
      title: 'ScanSan : Site de manga',
    },
    image4: {
      text: 'Rendment est un site web qui vous aide à gérer vos cryptomonnaies en optimisant le taux de rendement.',
      title: 'Rendment : Optimiseur de rendement de cryptomonnaie',
    },
    image5: {
      text: 'Vintedge est un bot qui vous aide à acheter et vendre des vêtements sur Vinted. En scannant les annonces, il vous permet de trouver les meilleures affaires.',
      title: 'Vintedge : Bot Vinted',
    },
  },
};

const getImages = (language: SupportedLanguage) => [
  {
    src: '/sneakers_site.png',
    alt: 'Sneakers Website',
    text: translations[language].image1.text,
    title: translations[language].image1.title,
    languages: 'React, MySQL, Node.js',
    link: '',
    github: '',
    index: 1,
  },
  {
    src: '/rendment.png',
    alt: 'rdmt',
    text: translations[language].image4.text,
    title: translations[language].image4.title,
    languages: 'Next.js, TypeScript, React',
    link: '',
    github: '',
    index: 2,
  },
  {
    src: '/manga.png',
    alt: 'Scans Web Site',
    text: translations[language].image3.text,
    title: translations[language].image3.title,
    link: 'https://scansan.vercel.app/',
    github: 'https://github.com/lukoErable/ScanSan',
    languages: 'Next.js, TypeScript, React',
    index: 3,
  },
  {
    src: '/bot.png',
    alt: 'Sneakers Bot',
    text: translations[language].image2.text,
    title: translations[language].image2.title,
    languages: 'Electron Js, React, Node Js, JavaScript',
    link: '',
    github: '',
    index: 4,
  },
  {
    src: '/vintedge.png',
    alt: 'Vinted Bot',
    text: translations[language].image5.text,
    title: translations[language].image5.title,
    languages: 'Tauri, React, NextJs',
    link: '',
    github: 'https://github.com/lukoErable/vintedge',
    index: 5,
  },
];

export default function Home() {
  const { language } = useContext(LanguageContext);
  const images = getImages(language as SupportedLanguage);

  return (
    <div>
      <ImageCarousel images={images} />
    </div>
  );
}
