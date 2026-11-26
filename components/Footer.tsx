export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-graphite-deep py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-bold tracking-tightest text-milk">
              DEEP<span className="text-accent"> COLOR</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Профессиональные покрытия для совершенства древесины. Системы защиты
              и отделки дерева, подбор оттенков и каталог решений.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-tightest text-muted-soft">
                Навигация
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#systems" className="text-muted transition-colors hover:text-milk">
                    Системы покрытий
                  </a>
                </li>
                <li>
                  <a href="#shade-studio" className="text-muted transition-colors hover:text-milk">
                    Подбор оттенков
                  </a>
                </li>
                <li>
                  <a href="#catalog" className="text-muted transition-colors hover:text-milk">
                    Каталог
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-tightest text-muted-soft">
                География
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="text-muted">Москва</li>
                <li className="text-muted">Московская область</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-tightest text-muted-soft">
                Бренды
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="text-muted">Sikkens</li>
                <li className="text-muted">Zobel</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-muted-soft md:flex-row">
          <p>© {new Date().getFullYear()} Deep Color. Прототип.</p>
          <p>
            Информация о продукции по документации производителей. Цены и
            наличие уточняйте у поставщика.
          </p>
        </div>
      </div>
    </footer>
  );
}
