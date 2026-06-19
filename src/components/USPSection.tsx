import React from "react";
import { Globe, TrendingDown, Maximize, ShieldCheck, CheckCircle2 } from "lucide-react";

interface USPSectionProps {
  whiteLabelColor: string;
  whiteLabelMode: boolean;
}

export default function USPSection({ whiteLabelColor, whiteLabelMode }: USPSectionProps) {
  const activeColor = whiteLabelMode ? whiteLabelColor : "#0f766e";

  const usps = [
    {
      id: 1,
      title: "Le monde à portée de clic",
      description: "Des milliers de destinations, compagnies aériennes reconnues et hôtels d’exception dans le monde entier, réunis sur une seule plateforme intelligente.",
      badge: "Couverture Globale",
      icon: <Globe className="w-6 h-6" />,
      bg: "bg-slate-50",
      textColor: "text-slate-900"
    },
    {
      id: 2,
      title: "Réservez au bon moment",
      description: "Nos outils de prédiction tarifaire analysent les courbes historiques pour vous orienter à réserver dès que le tarif est le plus avantageux.",
      badge: "Algorithme Prédictif",
      icon: <TrendingDown className="w-6 h-6" />,
      bg: "bg-slate-900 text-white",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "Vol, séjour et hôtel réunis",
      description: "Composez votre voyage idéal sur-mesure de A à Z : combinez transports et hébergements d’un seul jet sans changer de site.",
      badge: "Modularité Totale",
      icon: <Maximize className="w-6 h-6" />,
      bg: "bg-teal-50/50 hover:bg-teal-50",
      textColor: "text-slate-900"
    },
    {
      id: 4,
      title: "Réservez en toute sérénité",
      description: "Paiement 100% sécurisé, tarifs transparents, sans frais cachés, et la fiabilité d’OpenSaudi, agence accréditée IATA et Atout France, à chaque étape.",
      badge: "Garantie de Confiance",
      icon: <ShieldCheck className="w-6 h-6" />,
      bg: "bg-emerald-50/50 hover:bg-emerald-50",
      textColor: "text-slate-900"
    }
  ];

  return (
    <section id="why-section" className="py-20 bg-white relative overflow-hidden">
      
      {/* Absolute decorative bubbles for ambient depth */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute right-0 bottom-10 w-[300px] h-[300px] bg-sky-50 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Label */}
        <div className="text-center max-w-3xl mx-auto mb-16 text-left sm:text-center">
          <span 
            className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-block"
            style={{ 
              backgroundColor: whiteLabelMode ? `${whiteLabelColor}12` : "#f0fdfa", 
              color: whiteLabelMode ? whiteLabelColor : "#14b8a6" 
            }}
          >
            Pourquoi GoBillet ?
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-4 sm:text-4xl">
            Voyagez l'esprit léger
          </h2>
          <p className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            Adossé à OpenSaudi (accréditée Atout France & IATA)
          </p>
        </div>

        {/* Bento Grid layout with custom column spans to look modern and hand-crafted */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {usps.map((usp) => {
            const isDark = usp.bg.includes("slate-900");
            return (
              <div 
                key={usp.id}
                className={`border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${usp.bg}`}
              >
                <div>
                  <div className={`p-3 w-fit rounded-2xl mb-6 ${isDark ? 'bg-white/10 text-teal-300' : 'bg-teal-600 text-white'}`}
                    style={{ backgroundColor: !isDark && whiteLabelMode ? activeColor : undefined }}
                  >
                    {usp.icon}
                  </div>
                  <span className={`text-[10px] uppercase font-black tracking-wider ${isDark ? 'text-teal-400' : 'text-slate-400'}`}>
                    {usp.badge}
                  </span>
                  <h3 className={`text-xl font-bold mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{usp.title}</h3>
                  <p className={`text-sm mt-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {usp.description}
                  </p>
                </div>

                {usp.id === 4 && (
                  <div className={`mt-6 pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-100'} flex flex-wrap gap-2 text-[10px] font-mono text-slate-400`}>
                    <span className="bg-white/90 border border-slate-200 px-2 py-0.5 rounded text-slate-700">Garantie APST</span>
                    <span className="bg-white/90 border border-slate-200 px-2 py-0.5 rounded text-slate-700">IATA Member</span>
                    <span className="bg-white/90 border border-slate-200 px-2 py-0.5 rounded text-slate-700">Atout France : IM075190024</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
