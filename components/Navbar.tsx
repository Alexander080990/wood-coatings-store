'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const LINKS = [
  { label: 'Системы', href: '#systems' },
  { label: 'Оттенки', href: '#shade-studio' },
  { label: 'Каталог', href: '#catalog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-graphite/85 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="font-display text-xl font-bold tracking-tightest text-milk md:text-2xl">
          DEEP<span className="text-accent"> COLOR</span>
        </a>

        {/* Десктопная навигация */}
        <div className="hidden items-center gap-8 md:flex md:gap-12">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-muted transition-colors hover:text-milk"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-wood/40 px-5 py-2 text-sm font-semibold tracking-wide text-milk transition-colors hover:border-accent hover:text-accent"
          >
            Заявка
          </a>
        </div>

        {/* Кнопка-бургер на мобильных */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Открыть меню"
          aria-expanded={open}
          className="flex flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-0.5 w-6 bg-milk transition-all duration-300 ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-milk transition-all duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-milk transition-all duration-300 ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Мобильное меню */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden bg-graphite/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/5 py-4 text-lg font-medium text-milk"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full border border-wood/40 px-5 py-3 text-center text-sm font-semibold tracking-wide text-milk transition-colors hover:border-accent hover:text-accent"
              >
                Заявка
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
