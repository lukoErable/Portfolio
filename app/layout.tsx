import type { Metadata } from 'next';
import { Anton, Inter, JetBrains_Mono } from 'next/font/google';
import AgentCursors from './components/build/AgentCursors';
import { BuildProvider } from './components/build/BuildContext';
import BuildHud from './components/build/BuildHud';
import Navbar from './components/navbar';
import { LanguageProvider } from './contexts/LanguageContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
});
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

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
        className={`${inter.variable} ${anton.variable} ${mono.variable} relative font-sans noise`}
      >
        <LanguageProvider>
          <BuildProvider>
            <Navbar />
            <div className="relative z-10">{children}</div>
            <AgentCursors />
            <BuildHud />
          </BuildProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
