'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Прототип: форми заявки без подключения платных сервисов.
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-graphite py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wood-walnut/10 to-transparent" />
      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-tightest text-accent"
        >
          Заявка
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 font-display text-4xl font-bold leading-tight text-milk md:text-6xl"
        >
          Подберём систему покрытий
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg"
        >
          Оставьте заявку — мы свяжемся и проконсультируем по выбору системы
          покрытий для вашего объекта в Москве и Московской области.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          {submitted ? (
            <div className="rounded-2xl border border-accent/40 bg-graphite-panel/80 p-8">
              <p className="font-display text-xl font-semibold text-milk">
                Заявка отправлена
              </p>
              <p className="mt-2 text-sm text-muted">
                Это прототип: в рабочей версии заявка будет формироваться и
                передаваться согласно выбранному способу связи.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  placeholder="Имя"
                  className="w-full rounded-xl border border-white/10 bg-graphite/80 px-4 py-3 text-sm text-milk placeholder:text-muted-soft focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <input
                  required
                  type="tel"
                  placeholder="Телефон"
                  className="w-full rounded-xl border border-white/10 bg-graphite/80 px-4 py-3 text-sm text-milk placeholder:text-muted-soft focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <textarea
                rows={4}
                placeholder="Объект и задача (фасад, окна, двери, терраса, внутренние работы)"
                className="w-full resize-none rounded-xl border border-white/10 bg-graphite/80 px-4 py-3 text-sm text-milk placeholder:text-muted-soft focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-milk px-7 py-3.5 text-sm font-semibold tracking-wide text-graphite transition-colors hover:bg-accent"
              >
                Отправить заявку
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
