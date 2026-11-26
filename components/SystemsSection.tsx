'use client';

import { motion } from 'framer-motion';
import { COATING_SYSTEMS } from '@/lib/shades';

export default function SystemsSection() {
  return (
    <section id="systems" className="relative bg-graphite py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-tightest text-accent">
            Системы покрытий
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-milk md:text-6xl">
            Решение для конкретной задачи —<br />не просто банка материала
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            Каждая система — это последовательность слоёв: от защитной пропитки до
            финишного покрытия. Нанесение, назначение каждого слоя и совместимость
            компонентов — по техническим рекомендациям производителей.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {COATING_SYSTEMS.map((system, index) => (
            <motion.article
              key={system.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-graphite-panel/60 p-7 transition-colors duration-500 hover:border-wood/40"
            >
              <span className="font-display text-5xl font-bold text-white/5 transition-colors duration-500 group-hover:text-accent/20">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-milk">
                {system.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{system.intro}</p>

              <div className="mt-6 space-y-3 border-t border-white/8 pt-5">
                {system.steps.map((step) => (
                  <div key={step.layer} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 rounded-md bg-wood/15 px-2 py-0.5 text-xs font-semibold tracking-wide text-wood-oak">
                      {step.layer}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-soft">
                      {step.purpose}
                    </span>
                  </div>
                ))}
              </div>

              <span className="mt-6 text-xs uppercase tracking-tightest text-muted-soft">
                {system.scene}
              </span>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs leading-relaxed text-muted-soft">
          Состав систем и рекомендации по нанесению — по документации производителей
          Sikkens и Zobel. Доступность продуктов в вашем регионе уточняйте у
          авторизованного поставщика.
        </p>
      </div>
    </section>
  );
}
