import React, { useState, useMemo } from "react";
import { FLIGHTS_DATA, HOTELS_DATA, PACKAGES_DATA, Flight, Hotel, PackageOffer } from "../data";
import { Plane, Star, MapPin, Building2, SlidersHorizontal, ArrowUpDown, ChevronDown, Check, Coins, Calendar, Clock, Sparkles } from "lucide-react";

interface SearchResultsProps {
  type: 'vols' | 'sejours' | 'hotels';
  criteria: {
    fromCity?: string;
    toCity?: string;
    dateDep?: string;
    dateRet?: string;
    passengers?: number;
    classType?: string;
    durationDays?: number;
  };
  onBookItem: (itemType: 'vols' | 'sejours' | 'hotels', item: any) => void;
  whiteLabelColor: string;
  whiteLabelMode: boolean;
}

export default function SearchResults({
  type,
  criteria,
  onBookItem,
  whiteLabelColor,
  whiteLabelMode
}: SearchResultsProps) {
  const [maxPrice, setMaxPrice] = useState<number>(1300);
  const [sortBy, setSortBy] = useState<'priceAsc' | 'ratingDesc'>('priceAsc');
  const [stopFilter, setStopFilter] = useState<string>('all');
  const [starFilter, setStarFilter] = useState<number>(0);

  // Compute destination name clean
  const destinationClean = useMemo(() => {
    if (!criteria.toCity) return "";
    const nameOnly = criteria.toCity.split("(")[0].trim();
    return nameOnly;
  }, [criteria.toCity]);

  // Flights filter logic
  const filteredFlights = useMemo(() => {
    if (type !== 'vols') return [];
    let items = [...FLIGHTS_DATA];
    
    // Filter by destination search word
    if (destinationClean) {
      items = items.filter(f => 
        f.toName.toLowerCase().includes(destinationClean.toLowerCase()) || 
        f.toCode.toLowerCase().includes(destinationClean.toLowerCase())
      );
    }

    // Filter by max price
    items = items.filter(f => f.price * (criteria.passengers || 1) <= maxPrice);

    // Filter by stops
    if (stopFilter === 'direct') {
      items = items.filter(f => f.stops === 0);
    } else if (stopFilter === '1stop') {
      items = items.filter(f => f.stops === 1);
    }

    // Sort
    if (sortBy === 'priceAsc') {
      items.sort((a, b) => a.price - b.price);
    } else {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [type, destinationClean, maxPrice, stopFilter, sortBy, criteria.passengers]);

  // Hotels filter logic
  const filteredHotels = useMemo(() => {
    if (type !== 'hotels') return [];
    let items = [...HOTELS_DATA];

    if (destinationClean) {
      items = items.filter(h => 
        h.location.toLowerCase().includes(destinationClean.toLowerCase())
      );
    }

    // Filter by max price
    items = items.filter(h => h.pricePerNight * (criteria.passengers || 1) <= maxPrice);

    // Filter by stars
    if (starFilter > 0) {
      items = items.filter(h => h.stars >= starFilter);
    }

    // Sort
    if (sortBy === 'priceAsc') {
      items.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [type, destinationClean, maxPrice, starFilter, sortBy, criteria.passengers]);

  // Packages filter logic
  const filteredPackages = useMemo(() => {
    if (type !== 'sejours') return [];
    let items = [...PACKAGES_DATA];

    if (destinationClean) {
      items = items.filter(p => 
        p.location.toLowerCase().includes(destinationClean.toLowerCase()) ||
        p.title.toLowerCase().includes(destinationClean.toLowerCase())
      );
    }

    // Filter by max price
    items = items.filter(p => p.price * (criteria.passengers || 1) <= maxPrice);

    // Sort
    if (sortBy === 'priceAsc') {
      items.sort((a, b) => a.price - b.price);
    } else {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [type, destinationClean, maxPrice, sortBy, criteria.passengers]);

  const activeColor = whiteLabelMode ? whiteLabelColor : "#0f766e";

  return (
    <div className="mt-4 bg-slate-50/60 rounded-3xl p-6 md:p-8 border border-slate-100 max-w-7xl mx-auto text-left">
      
      {/* Search status header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-dashed border-slate-200">
        <div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-850" style={{ backgroundColor: whiteLabelMode ? `${whiteLabelColor}15` : undefined, color: whiteLabelMode ? whiteLabelColor : undefined }}>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-650" style={{ backgroundColor: whiteLabelMode ? whiteLabelColor : undefined }} />
            <span>Moteur unifié GoBillet by OpenSaudi</span>
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
            Offres disponibles pour <span className="text-teal-700" style={{ color: whiteLabelMode ? whiteLabelColor : undefined }}>{destinationClean || "Toutes nos destinations"}</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Recherche synchronisée • {criteria.passengers || 1} voyageur(s) • Conforme législation Atout France IM075190024
          </p>
        </div>

        {/* Display price predictions alert info */}
        <div className="bg-slate-950 text-white rounded-2xl p-4 flex items-center space-x-4 max-w-md">
          <div className="w-1 bg-teal-400 self-stretch rounded-full" />
          <div className="text-xs">
            <span className="font-extrabold uppercase text-teal-400 tracking-wider">Le bon billet, au bon moment :</span>
            <p className="text-slate-300 mt-0.5 leading-relaxed font-medium">
              Nous avons analysé 1 400 requêtes pour cette destination. Les tarifs à l'écran incluent le tarif garanti sans frais cachés.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of options: Toolbar controls & Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center space-x-1.5">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span>Affiner</span>
              </span>
              <button 
                onClick={() => { setMaxPrice(1300); setStopFilter('all'); setStarFilter(0); }}
                className="text-[10px] font-bold text-slate-400 hover:text-sky-600 transition-colors"
                style={{ color: whiteLabelMode ? whiteLabelColor : undefined }}
              >
                Réinitialiser
              </button>
            </div>

            {/* Price slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Budget Max</span>
                <span className="text-sky-600" style={{ color: whiteLabelMode ? whiteLabelColor : undefined }}>{maxPrice} €</span>
              </div>
              <input
                type="range"
                min={40}
                max={1300}
                step={20}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
                style={{ accentColor: activeColor }}
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>40 €</span>
                <span>1300 € +</span>
              </div>
            </div>

            {/* Sort Order options */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Trier par</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSortBy('priceAsc')}
                  className={`px-3 py-2 text-xs font-bold rounded-lg border text-center transition-all ${
                    sortBy === 'priceAsc'
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Moins cher
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('ratingDesc')}
                  className={`px-3 py-2 text-xs font-bold rounded-lg border text-center transition-all ${
                    sortBy === 'ratingDesc'
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Meilleure note
                </button>
              </div>
            </div>

            {/* Flights direct / stopover filter */}
            {type === 'vols' && (
              <div className="space-y-2 pt-2 border-t border-slate-50">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Escales</span>
                <div className="space-y-1.5 text-xs font-medium text-slate-700">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="stops" 
                      checked={stopFilter === 'all'} 
                      onChange={() => setStopFilter('all')}
                      className="rounded text-sky-600 focus:ring-sky-500"
                      style={{ accentColor: activeColor }}
                    />
                    <span>Peu importe</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="stops" 
                      checked={stopFilter === 'direct'} 
                      onChange={() => setStopFilter('direct')}
                      className="rounded text-sky-600 focus:ring-sky-500"
                      style={{ accentColor: activeColor }}
                    />
                    <span>Vols directs uniquement</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="stops" 
                      checked={stopFilter === '1stop'} 
                      onChange={() => setStopFilter('1stop')}
                      className="rounded text-sky-600 focus:ring-sky-500"
                      style={{ accentColor: activeColor }}
                    />
                    <span>Max 1 escale</span>
                  </label>
                </div>
              </div>
            )}

            {/* Hotels stars count */}
            {type === 'hotels' && (
              <div className="space-y-2 pt-2 border-t border-slate-50">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Standing</span>
                <div className="space-y-2 text-xs font-semibold text-slate-600">
                  <button
                    type="button"
                    onClick={() => setStarFilter(0)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg border ${starFilter === 0 ? 'bg-sky-50/55 border-sky-100 text-sky-700 font-extrabold' : 'border-transparent text-slate-600'}`}
                    style={{ 
                      backgroundColor: starFilter === 0 && whiteLabelMode ? `${whiteLabelColor}10` : undefined,
                      borderColor: starFilter === 0 && whiteLabelMode ? `${whiteLabelColor}25` : undefined,
                      color: starFilter === 0 && whiteLabelMode ? whiteLabelColor : undefined
                    }}
                  >
                    Tous les hôtels
                  </button>
                  <button
                    type="button"
                    onClick={() => setStarFilter(4)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg border flex items-center justify-between ${starFilter === 4 ? 'bg-sky-50/55 border-sky-100 text-sky-700 font-extrabold' : 'border-transparent text-slate-600'}`}
                    style={{ 
                      backgroundColor: starFilter === 4 && whiteLabelMode ? `${whiteLabelColor}10` : undefined,
                      borderColor: starFilter === 4 && whiteLabelMode ? `${whiteLabelColor}25` : undefined,
                      color: starFilter === 4 && whiteLabelMode ? whiteLabelColor : undefined
                    }}
                  >
                    <span>★★★★ & plus</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setStarFilter(5)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg border flex items-center justify-between ${starFilter === 5 ? 'bg-sky-50/55 border-sky-100 text-sky-700 font-extrabold' : 'border-transparent text-slate-600'}`}
                    style={{ 
                      backgroundColor: starFilter === 5 && whiteLabelMode ? `${whiteLabelColor}10` : undefined,
                      borderColor: starFilter === 5 && whiteLabelMode ? `${whiteLabelColor}25` : undefined,
                      color: starFilter === 5 && whiteLabelMode ? whiteLabelColor : undefined
                    }}
                  >
                    <span>★★★★★ Luxe</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Secure Atout France reminder */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-3 translate-y-3">
              <Building2 className="w-24 h-24" />
            </div>
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              Sécurité Garantie
            </span>
            <h4 className="text-sm font-black text-white">Garantie Légale Intégrale</h4>
            <p className="text-slate-300 text-xs font-semibold leading-relaxed">
              En conformité avec le code du tourisme, votre réservation ouvre droit à la garantie financière totale de l'APST. 
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              N° d'immatriculation : IM075190024
            </p>
          </div>
        </div>

        {/* Listings display list */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* FLIGHT RESULTS SCREEN */}
          {type === 'vols' && (
            <>
              {filteredFlights.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-slate-200">
                  <Plane className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-700 mt-4">Aucun billet trouvé pour ces filtres</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Essayez d'augmenter votre budget maximal ou d'assouplir les conditions d'escale.
                  </p>
                </div>
              ) : (
                filteredFlights.map((flight) => {
                  const totalPrice = flight.price * (criteria.passengers || 1);
                  return (
                    <div key={flight.id} className="bg-white hover:border-slate-300 border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        
                        {/* Airline & rating info */}
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-sm font-black text-slate-600">
                            {flight.airlineLogo}
                          </div>
                          <div>
                            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Compagnie</span>
                            <h4 className="text-sm font-extrabold text-slate-800">{flight.airline}</h4>
                            <div className="flex items-center space-x-1.5 mt-0.5">
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              <span className="text-xs font-bold text-slate-600">{flight.rating}/5</span>
                              <span className="text-[10px] text-slate-400">• Note passager</span>
                            </div>
                          </div>
                        </div>

                        {/* Direct Flight schedule pathway */}
                        <div className="flex-1 w-full md:w-auto grid grid-cols-3 gap-2 items-center text-center">
                          <div className="text-left md:text-center">
                            <span className="text-xl font-extrabold text-slate-800">{flight.departureTime}</span>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{flight.fromCode}</p>
                          </div>

                          <div className="relative">
                            <span className="text-[10px] text-slate-400 font-extrabold block">
                              {flight.stops === 0 ? "Sans escale" : `${flight.stops} escale`}
                            </span>
                            <div className="h-0.5 bg-slate-200 my-1 relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:rotate-45 after:border-t after:border-r after:border-slate-300">
                              <Plane className="w-3.5 h-3.5 text-slate-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-0.5" />
                            </div>
                            <span className="text-[10px] text-sky-600 font-mono" style={{ color: whiteLabelMode ? whiteLabelColor : undefined }}>
                              {flight.duration}
                            </span>
                          </div>

                          <div className="text-right md:text-center">
                            <span className="text-xl font-extrabold text-slate-800">{flight.arrivalTime}</span>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{flight.toCode}</p>
                          </div>
                        </div>

                        {/* Price & call-to-action */}
                        <div className="w-full md:w-auto flex md:flex-col justify-between items-center md:items-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                          <div className="text-left md:text-right">
                            <div className="flex items-baseline space-x-1 justify-end">
                              <span className="text-xs text-slate-500 font-bold">Dès</span>
                              <span className="text-2xl font-black text-slate-900">{flight.price} €</span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                              Total : {totalPrice} € • {criteria.passengers || 1} voy.
                            </p>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => onBookItem('vols', flight)}
                            className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md transform active:scale-95 mt-2"
                            style={{ backgroundColor: activeColor }}
                          >
                            Choisir ce vol
                          </button>
                        </div>

                      </div>

                      {/* Micro assurances highlights */}
                      <div className="mt-4 pt-3 border-t border-slate-50 flex flex-wrap gap-2">
                        {flight.reassurances.map((item, idx) => (
                          <span key={idx} className="bg-slate-50 text-slate-500 px-2.5 py-1 rounded text-[10px] font-bold border border-slate-100/50">
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

          {/* HOTELS LISTINGS */}
          {type === 'hotels' && (
            <>
              {filteredHotels.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-slate-200">
                  <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-700 mt-4">Aucun hôtel ne correspond à vos filtres</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Ajustez vos préférences ou diminuez le nombre d'étoiles exigé.
                  </p>
                </div>
              ) : (
                filteredHotels.map((hotel) => {
                  const nights = 7; // default standard calculation
                  const totalPrice = hotel.pricePerNight * nights * (criteria.passengers || 1);
                  return (
                    <div key={hotel.id} className="bg-white hover:border-slate-300 border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row">
                      
                      {/* Left: Image banner */}
                      <div className="w-full md:w-64 h-48 md:h-auto relative shrink-0">
                        <img 
                          referrerPolicy="no-referrer"
                          src={hotel.image} 
                          alt={hotel.name}
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-black uppercase flex items-center space-x-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>{hotel.stars} Étoiles</span>
                        </div>
                      </div>

                      {/* Right: details, price */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-0.5">
                                  <MapPin className="w-3 h-3" />
                                  <span>{hotel.location}</span>
                                </span>
                              </div>
                              <h3 className="text-lg font-black text-slate-800 mt-1 leading-tight">{hotel.name}</h3>
                            </div>
                            
                            <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded text-right shrink-0">
                              <span className="text-xs font-black block">{hotel.rating}/5 Extra</span>
                              <span className="text-[9px] text-emerald-600 block">{hotel.reviewsCount} avis vérifiés</span>
                            </div>
                          </div>

                          {/* Hotel amenities list */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {hotel.amenities.map((item, idx) => (
                              <span key={idx} className="bg-slate-50 text-slate-500 font-semibold text-[10px] px-2 py-0.5 rounded border border-slate-100">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Pricing element & Action */}
                        <div className="mt-5 pt-4 border-t border-slate-50 flex items-end justify-between">
                          <div>
                            {hotel.reassurances.map((item, idx) => (
                              <div key={idx} className="text-[10px] text-emerald-600 font-bold flex items-center space-x-1 mt-0.5">
                                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>

                          <div className="text-right">
                            <div className="flex items-baseline space-x-1 justify-end">
                              <span className="text-xs text-slate-500 font-bold">Dès</span>
                              <span className="text-xl font-black text-slate-900">{hotel.pricePerNight} €</span>
                              <span className="text-[10px] text-slate-400 font-bold">/ nuit</span>
                            </div>
                            <p className="text-[9px] text-slate-400 font-bold mt-0.5">
                              Exemple de 7 nuits : {totalPrice} €
                            </p>
                            <button
                              type="button"
                              onClick={() => onBookItem('hotels', hotel)}
                              className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs px-4 py-2 mt-2 rounded-lg transition-all"
                              style={{ backgroundColor: activeColor }}
                            >
                              Réserver l'hébergement
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

          {/* PACKAGE RESULTS (SEJOURS) */}
          {type === 'sejours' && (
            <>
              {filteredPackages.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-slate-200">
                  <Sparkles className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-700 mt-4">Aucun séjour disponible</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Ajustez vos conditions d'hébergement ou la durée demandée.
                  </p>
                </div>
              ) : (
                filteredPackages.map((pack) => {
                  const totalForTravelers = pack.price * (criteria.passengers || 1);
                  return (
                    <div key={pack.id} className="bg-white hover:border-slate-300 border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row">
                      
                      {/* Image Frame */}
                      <div className="w-full md:w-72 h-48 md:h-auto relative shrink-0">
                        <img 
                          referrerPolicy="no-referrer"
                          src={pack.image} 
                          alt={pack.title}
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute top-2 left-2 bg-sky-600 text-white px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider" style={{ backgroundColor: activeColor }}>
                          {pack.durationDays} Jours / {pack.durationDays - 1} Nuits
                        </div>
                        <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-extrabold">
                          Vol Aller-Retour inclus ✓
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-rose-500" />
                              <span>{pack.location}</span>
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              <span className="text-xs font-black text-slate-700">{pack.rating}/5</span>
                            </div>
                          </div>

                          <h3 className="text-lg font-black text-slate-900 mt-1 leading-snug">{pack.title}</h3>

                          {/* Highlights bullet grid */}
                          <div className="mt-4 space-y-1">
                            {pack.highlights.map((high, index) => (
                              <div key={index} className="text-xs text-slate-600 font-medium flex items-center space-x-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>{high}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price callout and transaction trigger */}
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="text-[10px] text-slate-400 font-bold">
                            Opérateur Certifié Atout France<br />Garantie de remboursement APST
                          </div>

                          <div className="text-right">
                            <div className="flex items-baseline space-x-0.5 justify-end">
                              <span className="text-xs text-slate-500 font-bold">Formule Dès</span>
                              <span className="text-2xl font-black text-slate-900">{pack.price} €</span>
                              <span className="text-xs text-slate-400 font-bold">/ pers</span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                              Client Facturé : {totalForTravelers} € ({criteria.passengers || 1} pers)
                            </p>
                            
                            <button
                              type="button"
                              onClick={() => onBookItem('sejours', pack)}
                              className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs px-5 py-2.5 mt-2 rounded-xl transition-all shadow-sm"
                              style={{ backgroundColor: activeColor }}
                            >
                              Réserver le Forfait Complet
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}
