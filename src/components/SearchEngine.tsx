import React, { useState, useEffect } from "react";
import { Plane, Building2, MapPin, Calendar, Users, SlidersHorizontal, Search, Sparkles, TrendingDown, ArrowRight, Info, Plus } from "lucide-react";

interface SearchEngineProps {
  onSearch: (type: 'vols' | 'sejours' | 'hotels', criteria: any) => void;
  initialDestination?: string;
  initialType?: 'vols' | 'sejours' | 'hotels';
  whiteLabelColor: string;
  whiteLabelMode: boolean;
}

export default function SearchEngine({
  onSearch,
  initialDestination = "",
  initialType = "vols",
  whiteLabelColor,
  whiteLabelMode
}: SearchEngineProps) {
  const [activeTab, setActiveTab] = useState<'vols' | 'sejours' | 'hotels'>(initialType);
  
  // Flight flightType: "Aller-retour" | "Aller simple" | "Multi-destinations"
  const [flightType, setFlightType] = useState<'roundtrip' | 'oneway' | 'multi'>('roundtrip');

  // Form values
  const [fromCity, setFromCity] = useState("Paris (CDG)");
  const [toCity, setToCity] = useState(initialDestination || "Marrakech (RAK)");
  const [dateDep, setDateDep] = useState("2026-09-12");
  const [dateRet, setDateRet] = useState("2026-09-19");
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState("Économique");
  const [durationDays, setDurationDays] = useState(7);
  const [budgetLimit, setBudgetLimit] = useState(1000);
  
  // Segment addition tool for Multi-destinations
  const [multiSegments, setMultiSegments] = useState([
    { from: "Paris (CDG)", to: "Dubaï (DXB)", date: "2026-09-12" },
    { from: "Dubaï (DXB)", to: "Bangkok (BKK)", date: "2026-09-18" }
  ]);

  // Predictor state
  const [prediction, setPrediction] = useState({
    title: "Timing Optimal",
    description: "Les prix sont au plus bas pour cette période de l'année. Foncez !",
    score: 94,
    color: "text-teal-700",
    bg: "bg-teal-50 border-teal-100",
    badgeLabel: "Acheter maintenant"
  });

  // Sync destination if updated from external clicking
  useEffect(() => {
    if (initialDestination) {
      if (initialDestination.toLowerCase().includes("dubai") || initialDestination.toLowerCase().includes("dubaï")) {
        setToCity("Dubaï (DXB)");
      } else if (initialDestination.toLowerCase().includes("istanbul")) {
        setToCity("Istanbul (IST)");
      } else if (initialDestination.toLowerCase().includes("marrakech")) {
        setToCity("Marrakech (RAK)");
      } else if (initialDestination.toLowerCase().includes("bangkok")) {
        setToCity("Bangkok (BKK)");
      } else if (initialDestination.toLowerCase().includes("york")) {
        setToCity("New York (JFK)");
      } else if (initialDestination.toLowerCase().includes("tokyo")) {
        setToCity("Tokyo (HND)");
      } else if (initialDestination.toLowerCase().includes("caire")) {
        setToCity("Le Caire (CAI)");
      } else if (initialDestination.toLowerCase().includes("bali")) {
        setToCity("Bali (DPS)");
      } else {
        setToCity(initialDestination);
      }
    }
  }, [initialDestination]);

  useEffect(() => {
    if (initialType) {
      setActiveTab(initialType);
    }
  }, [initialType]);

  // Adjust prediction based on destination selected
  useEffect(() => {
    const dest = toCity.toLowerCase();
    if (dest.includes("jfk") || dest.includes("york")) {
      setPrediction({
        title: "Prix Moyen - Stable",
        description: "Tarifs conformes aux moyennes des saisons d'OpenSaudi. Idéal de réserver en milieu de semaine.",
        score: 74,
        color: "text-amber-700",
        bg: "bg-amber-50/70 border-amber-150",
        badgeLabel: "Garder un œil"
      });
    } else if (dest.includes("rak") || dest.includes("marrakech") || dest.includes("cai") || dest.includes("caire")) {
      setPrediction({
        title: "Tarifs Exceptionnels",
        description: "Baisse de tarif constatée de -18% sur les lignes de nos partenaires. Période idéale d'achat.",
        score: 96,
        color: "text-emerald-700",
        bg: "bg-emerald-50 border-emerald-100",
        badgeLabel: "Recommandé : Foncez !"
      });
    } else if (dest.includes("dxb") || dest.includes("dubai")) {
      setPrediction({
        title: "Ligne Spéciale OpenSaudi",
        description: "En tant que partenaire technologique d’OpenSaudi, tarifs exclusifs négociés en direct.",
        score: 98,
        color: "text-teal-700",
        bg: "bg-teal-50 border-teal-100/75",
        badgeLabel: "Tarif Préférentiel"
      });
    } else {
      setPrediction({
        title: "Tendance Stable",
        description: "Le bon billet, au bon moment ! Profitez de nos garanties régulées IATA.",
        score: 87,
        color: "text-slate-600",
        bg: "bg-slate-50 border-slate-100",
        badgeLabel: "Rassurant"
      });
    }
  }, [toCity, activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(activeTab, {
      fromCity,
      toCity,
      dateDep,
      dateRet,
      passengers,
      classType,
      durationDays,
      flightType
    });
  };

  const activeColorCode = whiteLabelMode ? whiteLabelColor : "#0f766e";

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 max-w-5xl mx-auto -translate-y-8 relative z-10 text-left">
      
      {/* 3 tabs header with visual indicators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <button
            type="button"
            onClick={() => setActiveTab('vols')}
            className={`flex items-center space-x-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'vols'
                ? "text-white shadow-md shadow-teal-500/10"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
            style={{ 
              backgroundColor: activeTab === 'vols' ? activeColorCode : undefined,
            }}
          >
            <Plane className="w-4 h-4" />
            <span>Vols</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sejours')}
            className={`flex items-center space-x-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'sejours'
                ? "text-white shadow-md shadow-teal-500/10"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
            style={{ 
              backgroundColor: activeTab === 'sejours' ? activeColorCode : undefined,
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Séjours (Packagés)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hotels')}
            className={`flex items-center space-x-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'hotels'
                ? "text-white shadow-md shadow-teal-500/10"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
            style={{ 
              backgroundColor: activeTab === 'hotels' ? activeColorCode : undefined,
            }}
          >
            <Building2 className="w-4 h-4" />
            <span>Hôtels</span>
          </button>
        </div>

        {/* Flight Subtypes indicator triggers for Vols Page requirement */}
        {activeTab === 'vols' && (
          <div className="flex bg-slate-100 p-1 rounded-lg text-[11px] font-extrabold text-slate-600 justify-center">
            <button
              type="button"
              onClick={() => setFlightType('roundtrip')}
              className={`px-3 py-1 rounded-md ${flightType === 'roundtrip' ? 'bg-white text-slate-950 shadow-xs' : 'hover:text-slate-950'}`}
            >
              Aller-retour
            </button>
            <button
              type="button"
              onClick={() => setFlightType('oneway')}
              className={`px-3 py-1 rounded-md ${flightType === 'oneway' ? 'bg-white text-slate-950 shadow-xs' : 'hover:text-slate-950'}`}
            >
              Aller simple
            </button>
            <button
              type="button"
              onClick={() => setFlightType('multi')}
              className={`px-3 py-1 rounded-md ${flightType === 'multi' ? 'bg-white text-slate-950 shadow-xs' : 'hover:text-slate-950'}`}
            >
              Multidestinations
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        
        {/* If flightType is Multi, we show the multi segments builder */}
        {activeTab === 'vols' && flightType === 'multi' ? (
          <div className="space-y-4">
            {multiSegments.map((segment, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Vol {index + 1} - Départ</span>
                  <input
                    type="text"
                    value={segment.from}
                    onChange={(e) => {
                      const copy = [...multiSegments];
                      copy[index].from = e.target.value;
                      setMultiSegments(copy);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-sans">Vol {index + 1} - Destination</span>
                  <input
                    type="text"
                    value={segment.to}
                    onChange={(e) => {
                      const copy = [...multiSegments];
                      copy[index].to = e.target.value;
                      setMultiSegments(copy);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Date de départ</span>
                  <input
                    type="date"
                    value={segment.date}
                    onChange={(e) => {
                      const copy = [...multiSegments];
                      copy[index].date = e.target.value;
                      setMultiSegments(copy);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setMultiSegments([...multiSegments, { from: "", to: "", date: "2026-09-24" }])}
              className="flex items-center space-x-1 py-1 px-3 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-lg border border-teal-100 hover:bg-teal-100"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter un trajet</span>
            </button>
          </div>
        ) : (
          /* Normal simple fields based on tab selection */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Field 1: Departure / From (Disabled for hotels) */}
            <div className={`space-y-1.5 ${activeTab === 'hotels' ? 'opacity-40 pointer-events-none' : ''}`}>
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Départ / Ville</span>
              </label>
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="Ex: Paris (CDG)"
                required={activeTab !== 'hotels'}
                className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 transition-all outline-none"
              />
            </div>

            {/* Field 2: Destination / To - All 8 destinations */}
            <div className="space-y-1.5 md:col-span-1 text-left">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Destination</span>
              </label>
              <div className="relative">
                <select
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 transition-all outline-none appearance-none"
                >
                  <option value="Dubaï (DXB)">Dubaï (EAU)</option>
                  <option value="Istanbul (IST)">Istanbul (Turquie)</option>
                  <option value="Marrakech (RAK)">Marrakech (Maroc)</option>
                  <option value="Bangkok (BKK)">Bangkok (Thaïlande)</option>
                  <option value="New York (JFK)">New York (USA)</option>
                  <option value="Tokyo (HND)">Tokyo (Japon)</option>
                  <option value="Le Caire (CAI)">Le Caire (Égypte)</option>
                  <option value="Bali (DPS)">Bali (Indonésie)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <ArrowRight className="w-4 h-4 opacity-50 rotate-90 md:rotate-0" />
                </div>
              </div>
            </div>

            {/* Field 3: Departure Date / Check-In */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeTab === 'hotels' ? 'Arrivée' : 'Date de départ'}</span>
              </label>
              <input
                type="date"
                value={dateDep}
                onChange={(e) => setDateDep(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 transition-all outline-none"
              />
            </div>

            {/* Field 4: Return Date / Check-Out or Duration */}
            <div className="space-y-1.5">
              {activeTab === 'sejours' ? (
                <>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Durée</span>
                  </label>
                  <select
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 transition-all outline-none"
                  >
                    <option value={5}>Court Séjour (5 Jours)</option>
                    <option value={7}>Semaine Complète (7 Jours)</option>
                    <option value={10}>Détente & Circuits (10 Jours)</option>
                  </select>
                </>
              ) : (
                <>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeTab === 'hotels' ? 'Départ' : 'Date de retour'}</span>
                  </label>
                  <input
                    type="date"
                    value={dateRet}
                    disabled={flightType === 'oneway' && activeTab === 'vols'}
                    onChange={(e) => setDateRet(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 transition-all outline-none disabled:opacity-30"
                  />
                </>
              )}
            </div>

          </div>
        )}

        {/* Secondary options row: Passengers, Class, budget, and forecasting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          
          {/* Left: Class type / Passengers / Budget */}
          <div className="lg:col-span-5 flex gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Voyageurs</span>
              </label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              >
                <option value={1}>1 voyageur</option>
                <option value={2}>2 voyageurs</option>
                <option value={3}>3 voyageurs</option>
                <option value={4}>4 voyageurs</option>
                <option value={5}>Groupe (5+)</option>
              </select>
            </div>

            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                <span>Confort / Étoiles</span>
              </label>
              <select
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              >
                <option value="Économique">Standart / Éco</option>
                <option value="Premium">Premium</option>
                <option value="Affaires">Affaires (Club 5★)</option>
              </select>
            </div>
            
            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span className="font-mono">$</span>
                <span>Budget Max</span>
              </label>
              <select
                value={budgetLimit}
                onChange={(e) => setBudgetLimit(Number(e.target.value))}
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              >
                <option value={300}>Max 300 €</option>
                <option value={600}>Max 600 €</option>
                <option value={1000}>Max 1000 €</option>
                <option value={2000}>Illimité</option>
              </select>
            </div>
          </div>

          {/* Middle: Brand Slogan forecast gauge */}
          <div className="lg:col-span-4">
            <div className={`p-3.5 rounded-xl border flex items-start space-x-3 transition-all duration-300 ${prediction.bg}`}>
              <div className="mt-0.5 shrink-0">
                <TrendingDown className={`w-5 h-5 ${prediction.color}`} />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wide ${prediction.color}`}>
                    {prediction.title}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 font-bold uppercase rounded bg-white text-slate-700 border border-slate-100 shadow-3xs">
                    Score : {prediction.score}/100
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-0.5">
                  {prediction.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right side: Search CTA */}
          <div className="lg:col-span-3">
            <button
              type="submit"
              className="w-full text-white font-extrabold text-sm px-6 py-4 rounded-xl shadow-lg transition-all transform active:scale-95 duration-200 flex items-center justify-center space-x-2"
              style={{ 
                backgroundColor: activeColorCode,
                boxShadow: `0 10px 15px -3px ${activeColorCode}24`
              }}
            >
              <Search className="w-4 h-4 text-white font-bold" />
              <span>
                {activeTab === 'vols' ? 'Rechercher un vol' : activeTab === 'sejours' ? 'Trouver un séjour' : 'Réserver un hôtel'}
              </span>
            </button>
          </div>

        </div>

      </form>

      {/* Small informative notice badge on the bottom footer of search bar */}
      <div className="mt-4 pt-4 border-t border-slate-50 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-medium">
        <div className="flex items-center space-x-1.5">
          <Info className="w-3.5 h-3.5 text-teal-600" />
          <span>Comparez et combinez : vols direct, clubs de vacances, riads d'exception et palaces.</span>
        </div>
        <div className="mt-1 md:mt-0 font-bold text-slate-500">
          <span>GoBillet by <strong>OpenSaudi</strong> • Atout France IM075190024</span>
        </div>
      </div>
    </div>
  );
}
