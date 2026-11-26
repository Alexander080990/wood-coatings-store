'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Кинематографичное фотофон */}
      <div className="absolute inset-0">
        <img
          src="/hero-wood.jpg"
          alt="Деревянная архитектура в глубоких тёмных тонах"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite-deep/75 via-graphite/55 to-graphite" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      {/* Контент */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-24 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="inline-flex items-center gap-2 rounded-full border border-wood/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-tightest text-wood-oak"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Профессиональные покрытия для древесины
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4 }}
            className="mt-7 font-display text-5xl font-bold leading-[1.05] text-milk md:text-7xl"
          >
            Профессиональные покрытия
            <br />
            для совершенства древесины
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            Deep Color — премиальные системы защиты и отделки дерева: от глубокой
            пропитки до финишных покрытий. Выбор оттенка, системы покрытий и каталог
            решений для фасадов, окон, дверей и террас.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#shade-studio"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-milk px-7 py-3.5 text-sm font-semibold tracking-wide text-graphite transition-all duration-300 hover:bg-accent hover:shadow-[0_0_40px_-8px_rgba(208,154,107,0.6)]"
            >
              Выбрать оттенок
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#systems"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold tracking-wide text-milk transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Системы покрытий
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Нижний указатель скролла */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-tightest text-muted-soft">Прокрутите</span>
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1.5 w-1 rounded-full bg-milk/70"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
