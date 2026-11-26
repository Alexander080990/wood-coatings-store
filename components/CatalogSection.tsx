'use client';

import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/shades';

export default function CatalogSection() {
  return (
    <section id="catalog" className="relative bg-graphite-deep py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-tightest text-accent">
              Каталог
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-milk md:text-6xl">
              Направления каталога
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              Категория по задаче, а не по формальным признакам. К каждому направлению —
              системное решение и техническая документация.
            </p>
          </div>
          <a
            href="#catalog"
            className="shrink-0 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold tracking-wide text-milk transition-colors hover:border-accent hover:text-accent"
          >
            Все категории
          </a>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, index) => (
            <motion.a
              key={category.id}
              href="#catalog"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
              className="group relative flex flex-col justify-between bg-graphite/80 p-8 transition-colors duration-500 hover:bg-graphite-panel"
            >
              <div>
                <span className="font-display text-4xl font-bold text-white/10 transition-colors duration-500 group-hover:text-accent/30">
                  0{index + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-milk">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{category.hint}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-wood-oak transition-colors duration-300 group-hover:text-accent">
                Перейти
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </motion.a>
          ))}
        </div>

        {/* Пример структуры карточки товара (прототип, без реальных данных) */}
        <div className="mt-16">
          <span className="text-xs font-semibold uppercase tracking-tightest text-muted">
            Пример карточки товара
          </span>
          <div className="mt-6 grid gap-8 rounded-2xl border border-white/8 bg-graphite/60 p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-wood-walnut/40">
              <img
                src="/architecture.jpg"
                alt="Архитектурная иллюстрация для карточки товара"
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-tightest text-accent">
                Пример структуры
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-milk">
                Название продукта
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Краткое описание назначения продукта в рамках системы покрытий.
                Технические характеристики — по документации производителя.
              </p>
              <dl className="mt-6 space-y-2 border-t border-white/8 pt-5">
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-muted">Назначие</dt>
                  <dd className="text-right text-milk">По документации</dd>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-muted">Совместимость</dt>
                  <dd className="text-right text-milk">По системе</dd>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-muted">Цена и наличие</dt>
                  <dd className="text-right text-muted-soft">Уточнить у поставщика</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
