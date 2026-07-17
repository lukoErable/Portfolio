import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Navbar from './components/navbar';
import SceneWrapper from './components/SceneWrapper';
import { LanguageProvider } from './contexts/LanguageContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Lucas Fabregoule — Développeur Full Stack',
  description:
    'Portfolio de Lucas Fabregoule, développeur Full Stack : sites web, applications mobiles iOS, automatisation et outils sur mesure.',
  keywords: [
    'Lucas Fabregoule',
    'développeur full stack',
    'React',
    'Next.js',
    'freelance',
    'développeur web',
  ],
  openGraph: {
    title: 'Lucas Fabregoule — Développeur Full Stack',
    description:
      'Sites web, applications mobiles iOS, automatisation et outils sur mesure.',
    url: 'https://lucasfabregoule.vercel.app',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans noise`}
      >
        <LanguageProvider>
          <SceneWrapper />
          <Navbar />
          <div className="relative z-10">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
