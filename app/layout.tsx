import type { Metadata } from 'next';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import '@fontsource/fraunces/400.css';
import '@fontsource/fraunces/600.css';
import '@fontsource/fraunces/700.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Deep Color — Профессиональные покрытия для совершенства древесины',
  description:
    'Deep Color — премиальные профессиональные покрытия для древесины: пропитки, грунты, лазури, масла и системы финишной защиты. Подбор оттенков, системы покрытий и каталог решений.',
  keywords: [
    'Deep Color',
    'покрытия для древесины',
    'профессиональные лакокрасочные материалы для дерева',
    'пропитка для дерева',
    'лаки для дерева',
    'системы покрытий для дерева',
  ],
  openGraph: {
    title: 'Deep Color — Профессиональные покрытия для совершенства древесины',
    description:
      'Премиальные профессиональные покрытия для древесины. Подбор оттенков, системы покрытий и каталог решений.',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
