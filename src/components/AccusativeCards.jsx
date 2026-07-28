import React from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const AccusativeCards = () => {
  const cards = [
    {
      id: 'masculine',
      title: '🔵 Masculino (El Único que Cambia)',
      badge: 'Mutación -en',
      isMutated: true,
      items: [
        { label: 'Artículo Determinado', from: 'der Tisch', to: 'den Tisch' },
        { label: 'Artículo Indeterminado', from: 'ein Apfel', to: 'einen Apfel' },
        { label: 'Artículo Negativo', from: 'kein Hund', to: 'keinen Hund' },
        { label: 'Posesivo', from: 'mein Bruder', to: 'meinen Bruder' },
      ],
      note: '💡 Toda la familia masculina añade -en al pasar a Objeto Directo.'
    },
    {
      id: 'feminine',
      title: '🔴 Femenino (100% Inmune)',
      badge: 'Sin Cambios',
      isMutated: false,
      items: [
        { label: 'Artículo Determinado', from: 'die Frau', to: 'die Frau' },
        { label: 'Artículo Indeterminado', from: 'eine Tomate', to: 'eine Tomate' },
      ]
    },
    {
      id: 'neuter',
      title: '🟢 Neutro (100% Inmune)',
      badge: 'Sin Cambios',
      isMutated: false,
      items: [
        { label: 'Artículo Determinado', from: 'das Auto', to: 'das Auto' },
        { label: 'Artículo Indeterminado', from: 'ein Brot', to: 'ein Brot' },
      ]
    },
    {
      id: 'plural',
      title: '🟣 Plural (100% Inmune)',
      badge: 'Sin Cambios',
      isMutated: false,
      items: [
        { label: 'Artículo Determinado', from: 'die Bücher', to: 'die Bücher' },
        { label: 'Posesivo', from: 'meine Kinder', to: 'meine Kinder' },
      ]
    }
  ];

  return (
    <div className="space-y-3.5 my-3 max-w-4xl mx-auto">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
            card.isMutated
              ? 'bg-slate-900 border-amber-500/50 text-white shadow-lg ring-1 ring-amber-500/20'
              : 'bg-white border-slate-200 text-slate-800 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <h4 className={`font-bold text-sm md:text-base flex items-center gap-2 ${card.isMutated ? 'text-amber-300' : 'text-slate-900'}`}>
              {card.title}
            </h4>
            <span
              className={`text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold ${
                card.isMutated
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {card.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {card.items.map((item, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl flex items-center justify-between gap-2 border ${
                  card.isMutated
                    ? 'bg-slate-800/80 border-slate-700/60'
                    : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <span className={`text-xs font-semibold ${card.isMutated ? 'text-slate-300' : 'text-slate-600'}`}>
                  {item.label}
                </span>
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
                  <span className={`line-through opacity-70 ${card.isMutated ? 'text-slate-400' : 'text-slate-400'}`}>
                    {item.from}
                  </span>
                  <ArrowRight size={14} className={card.isMutated ? 'text-amber-400' : 'text-slate-400'} />
                  <span
                    className={`font-bold px-2 py-0.5 rounded border ${
                      card.isMutated
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm font-extrabold'
                        : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    }`}
                  >
                    {item.to}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {card.note && (
            <p className="text-xs text-amber-300 font-medium italic mt-3 pt-2 border-t border-slate-800 flex items-center gap-1.5">
              <Zap size={14} className="text-amber-400 shrink-0" />
              {card.note}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccusativeCards;
