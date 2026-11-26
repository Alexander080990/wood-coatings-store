'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SHADES, type Shade } from '@/lib/shades';

/**
 * Интерактивная демонстрация изменения цвета древесины.
 *
 * Реализация: изображение деревянной архитектуры рисуется на canvas,
 * цвет оттенка накладывается через мультипликативный режим blending.
 * Это сохраняет естественную текстуру древесины (текстура, поры,
 * тени и переходы) и меняет только цвет — без эффекта плоской заливки.
 *
 * Режим сравнения: левая часть — натуральный фон, правая — выбранный оттенок.
 *
 * Прототип. Окончательная цветовая calibрия и связь оттенков с продуктами
 * производителей — по документации Sikkens / Zobel.
 */
export default function ShadeStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const currentShade = useRef<Shade>(SHADES[0]);
  const targetShade = useRef<Shade>(SHADES[0]);
  const compareRef = useRef(false);
  const rafRef = useRef<number>(0);
  const [activeId, setActiveId] = useState(SHADES[0].id);
  const [compare, setCompare] = useState(false);

  const hexToRgb = (hex: string) => {
    const value = hex.replace('#', '');
    return [
      parseInt(value.slice(0, 2), 16),
      parseInt(value.slice(2, 4), 16),
      parseInt(value.slice(4, 6), 16),
    ];
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Растягиваем изображение по всему canvas (cover)
    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;
    let drawWidth = rect.width;
    let drawHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;
    if (imgRatio > canvasRatio) {
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
    } else {
      drawHeight = rect.width / imgRatio;
      offsetY = (rect.height - drawHeight) / 2;
    }

    const drawImageAt = (tint: string | null, clipLeft: number | null) => {
      ctx.save();
      if (clipLeft !== null) {
        ctx.beginPath();
        ctx.rect(clipLeft, 0, rect.width - clipLeft, rect.height);
        ctx.clip();
      }
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      if (tint) {
        const [r, g, b] = hexToRgb(tint);
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(0, 0, rect.width, rect.height);
        ctx.globalCompositeOperation = 'source-over';
      }
      ctx.restore();
    };

    if (compareRef.current) {
      // Слева — натуральный фон, справа — оттенок
      const mid = rect.width / 2;
      drawImageAt(null, 0);
      drawImageAt(currentShade.current.color, mid);

      // Разделитель
      ctx.strokeStyle = 'rgba(237,231,220,0.75)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(mid, 0);
      ctx.lineTo(mid, rect.height);
      ctx.stroke();
    } else {
      drawImageAt(currentShade.current.color, null);
    }

    // Кинематографичное затемнение
    const grad = ctx.createLinearGradient(0, 0, 0, rect.height);
    grad.addColorStop(0, 'rgba(15,17,19,0.25)');
    grad.addColorStop(1, 'rgba(15,17,19,0.55)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.restore();
  }, []);

  // Следование за состоянием режима сравнения
  useEffect(() => {
    compareRef.current = compare;
    draw();
  }, [compare, draw]);

  // Загрузка изображения архитектуры
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      draw();
    };
    img.src = '/shade-house.jpg';
  }, [draw]);

  // Плавная аппроксимация к новому оттенку
  useEffect(() => {
    targetShade.current = SHADES.find((s) => s.id === activeId) ?? SHADES[0];
    const tick = () => {
      const from = hexToRgb(currentShade.current.color);
      const to = hexToRgb(targetShade.current.color);
      const mix = (a: number, b: number) => Math.round(a + (b - a) * 0.12);
      const next = `rgb(${mix(from[0], to[0])}, ${mix(from[1], to[1])}, ${mix(from[2], to[2])})`;
      currentShade.current = { ...currentShade.current, color: next };
      draw();
      const done =
        Math.abs(from[0] - to[0]) < 3 &&
        Math.abs(from[1] - to[1]) < 3 &&
        Math.abs(from[2] - to[2]) < 3;
      if (!done) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [activeId, draw]);

  // Перерисовка при ресайзе
  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draw]);

  const activeShade = SHADES.find((s) => s.id === activeId) ?? SHADES[0];

  return (
    <section id="shade-studio" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-graphite-deep" />
      <div className="grain-overlay absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 md:px-10 md:pt-32 md:pb-28">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-tightest text-accent">
            Индекс оттенков
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-milk md:text-6xl">
            Выберите оттенок —<br />и увидите, как меняется древесина
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            Оттенок накладывается на натуральную текстуру древесины. Меняется цвет —
            сохраняется структура. Выберите вариант и наблюдайте реалистичное изменение
            покрытия деревянной архитектуры.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 md:aspect-[16/10]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

            <div className="pointer-events-none absolute inset-0 flex items-end p-6 md:p-8">
              <div>
                <span className="text-xs uppercase tracking-tightest text-milk/60">
                  {compare ? 'Оттенок (правая часть)' : 'Текущий оттенок'}
                </span>
                <p className="mt-1 font-display text-2xl font-semibold text-milk md:text-3xl">
                  {activeShade.name}
                </p>
              </div>
            </div>

            <div className="absolute left-5 top-5">
              <button
                onClick={() => setCompare((v) => !v)}
                className="rounded-full border border-white/15 bg-graphite-deep/70 px-4 py-1.5 text-xs font-medium tracking-wide text-milk backdrop-blur transition-colors hover:border-accent hover:text-accent"
              >
                {compare ? 'Сравнение: есть' : 'Сравнить с натуральным'}
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-tightest text-muted">
              Выбор оттенка
            </span>
            <p className="mt-2 text-sm leading-relaxed text-muted-soft">
              Коды оттенков подтверждены цветовыми системами производителей
              (Sikkens Cetol / Zobel Color-Line). Связь с конкретными продуктами —
              по документации производителя.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {SHADES.map((shade) => {
                const isActive = shade.id === activeId;
                return (
                  <button
                    key={shade.id}
                    onClick={() => setActiveId(shade.id)}
                    className={`group flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-accent/60 bg-graphite-panel'
                        : 'border-white/8 bg-graphite/60 hover:border-white/20'
                    }`}
                  >
                    <span
                      className="h-9 w-9 shrink-0 rounded-full ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: shade.color }}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-milk">
                        {shade.name}
                      </span>
                      <span className="block text-xs text-muted">Код {shade.code}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={activeShade.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="mt-5 text-sm leading-relaxed text-muted-soft"
              >
                {activeShade.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
