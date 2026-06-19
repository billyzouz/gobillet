import React, { useState } from "react";
import { Plane, Sparkles, Building2, MapPin, ArrowRight, Star } from "lucide-react";

interface UniversesSectionProps {
  onSelectUniverse: (type: 'vols' | 'sejours' | 'hotels') => void;
  whiteLabelColor: string;
  whiteLabelMode: boolean;
}

export default function UniversesSection({
  onSelectUniverse,
  whiteLabelColor,
  whiteLabelMode
}: UniversesSectionProps) {
  const [hoveredTab, setHoveredTab] = useState<'vols' | 'sejours' | 'hotels' | null>(null);

  const activeColor = whiteLabelMode ? whiteLabelColor : "#0284c7";

  const universes = [
    {
      id: 'vols' as const,
      title: "Univers Vols",
      slogan: "Le bon vol, au bon moment.",
      description: "Direct, sans mauvaise surprise. De la classe Éco jusqu'au confort de la Première, accédez instantanément aux meilleures offres mondiales avec notre prédiction de prix.",
      accent: "from-sky-50 to-sky-100/30 text-sky-700",
      icon: <Plane className="w-8 h-8" />,
      features: ["Modification & annulation flexible", "Compensation CO2 incluse", "预测 Algorithme de prix"],
      cta: "Découvrir les vols"
    },
    {
      id: 'sejours' as const,
      title: "Univers Séjours",
      slogan: "Le bon séjour, au bon moment.",
      description: "Des formules tout-en-un incluant vol, transfert privé et hôtel de rêve. Entièrement protégées par la caution Atout France, pour voyager l'esprit léger.",
      accent: "from-rose-50 to-rose-100/30 text-rose-600",
      icon: <Sparkles className="w-8 h-8" />,
      features: ["Vol direct + Transferts inclus", "Hôtels sélectionnés 3* à 5*", "Paiement 3X ou 4X sans frais"],
      cta: "Découvrir nos séjours"
    },
    {
      id: 'hotels' as const,
      title: "Univers Hôtels",
      slogan: "Le bon hôtel, au bon moment.",
      description: "Des lits douillets pour tous les budgets. Zéro frais caché de resort à l'arrivée. Nous référençons des hébergements de qualité supérieure notés au moins 4.5/5.",
      accent: "from-emerald-50 to-emerald-100/30 text-emerald-700",
      icon: <Building2 className="w-8 h-8" />,
      features: ["Petit-déjeuner inclus sur 90%", "Payez directement sur place", "Meilleur prix garanti"],
      cta: "Découvrir les hôtels"
    }
  ];

  return (
    <section id="universes-section" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#0f172a] bg-slate-200/60 px-3 py-1.5 rounded-full inline-block">
            Nos Univers Connectés
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-4 sm:text-4xl">
            La cohérence de marque par le slogan
          </h2>
          <p className="mt-4 text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wider">
            « Le bon billet, au bon moment » est décliné sur l'ensemble de notre gamme pour sceller notre promesse.
          </p>
        </div>

        {/* 3 cards grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {universes.map((uni) => {
            const isHovered = hoveredTab === uni.id;
            return (
              <div
                key={uni.id}
                onMouseEnter={() => setHoveredTab(uni.id)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => {
                  onSelectUniverse(uni.id);
                  // Scroll back to search area smoothly
                  const searchEl = document.getElementById("search-section");
                  if (searchEl) {
                    searchEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`bg-white rounded-3xl p-8 border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left cursor-pointer group ${
                  isHovered ? 'border-sky-300 ring-2 ring-sky-100 -translate-y-2' : ''
                }`}
              >
                <div>
                  
                  {/* Icon flag */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${uni.accent} flex items-center justify-center mb-6`}>
                    {uni.icon}
                  </div>

                  {/* Slogan details and info */}
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{uni.title}</span>
                  <h3 className="text-xl font-black text-slate-900 mt-1 mb-2">
                    {uni.slogan}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed min-h-24">
                    {uni.description}
                  </p>

                  {/* Checklist highlights */}
                  <div className="mt-6 space-y-2.5">
                    {uni.features.map((feat, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs font-bold text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Footer action button */}
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-sm font-black text-slate-800 group-hover:text-sky-600 transition-colors"
                    style={{ color: isHovered && whiteLabelMode ? whiteLabelColor : undefined }}
                  >
                    {uni.cta}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-slate-900 group-hover:text-white transition-all flex items-center justify-center"
                    style={{ 
                      backgroundColor: isHovered && whiteLabelMode ? whiteLabelColor : undefined,
                      color: isHovered && whiteLabelMode ? '#ffffff' : undefined
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
