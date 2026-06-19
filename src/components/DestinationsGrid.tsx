import React from "react";
import { DESTINATIONS_DATA } from "../data";
import { MapPin, Plane, ArrowRight } from "lucide-react";

interface DestinationsGridProps {
  onSelectDestination: (destName: string, category: 'vols' | 'sejours' | 'hotels') => void;
  whiteLabelColor: string;
  whiteLabelMode: boolean;
}

export default function DestinationsGrid({
  onSelectDestination,
  whiteLabelColor,
  whiteLabelMode
}: DestinationsGridProps) {
  
  const activeColor = whiteLabelMode ? whiteLabelColor : "#0284c7";

  return (
    <section id="destinations-section" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left">
            <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full inline-block"
              style={{ 
                backgroundColor: whiteLabelMode ? `${whiteLabelColor}12` : undefined, 
                color: whiteLabelMode ? whiteLabelColor : undefined 
              }}
            >
              Évasions Populaires
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-4 sm:text-4xl">
              Destinations à la une
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-semibold max-w-xl leading-relaxed">
              Cliquez sur une destination ci-dessous pour programmer automatiquement votre comparateur et voir le cours des billets en temps réel.
            </p>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-xs font-black text-slate-400 uppercase tracking-widest">
            <span>Cliquez pour simuler le tarif</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* 6 Grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS_DATA.map((dest) => {
            const defaultCategory = dest.id === 'd3' ? 'sejours' : dest.id === 'd5' || dest.id === 'd6' ? 'hotels' : 'vols';
            
            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest.name, defaultCategory)}
                className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                
                {/* Photo frame with zoom effect */}
                <div className="h-56 overflow-hidden relative">
                  <img 
                    referrerPolicy="no-referrer"
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Bottom overlay inside card image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                    <div className="text-left text-white w-full">
                      <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>{dest.country}</span>
                      </div>
                      <h4 className="text-xl font-black mt-0.5">{dest.name}</h4>
                    </div>
                  </div>

                  {/* Top category label based on typical match */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-slate-800 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-lg border border-slate-100/50 shadow-sm">
                    {defaultCategory === 'vols' ? "✈ Vols Directs" : defaultCategory === 'sejours' ? "🏖 Séjour Packagé" : "🏨 Hôtels Premium"}
                  </div>
                </div>

                {/* Body details and simulated pricing indicator */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed min-h-12">
                    {dest.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">Tarif indicatif</span>
                      <span className="text-xs text-slate-500 font-bold">À partir de <strong className="text-base text-slate-900 font-black">{dest.startPrice} €</strong></span>
                    </div>

                    <span className="text-xs font-black text-sky-600 flex items-center space-x-1"
                      style={{ color: whiteLabelMode ? whiteLabelColor : undefined }}
                    >
                      <span>Comparer</span>
                      <span className="transition-transform group-hover:translate-x-1 block">→</span>
                    </span>
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
