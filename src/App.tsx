import React, { useState } from "react";
import Header from "./components/Header";
import SearchEngine from "./components/SearchEngine";
import SearchResults from "./components/SearchResults";
import BookingModal from "./components/BookingModal";
import USPSection from "./components/USPSection";
import UniversesSection from "./components/UniversesSection";
import DestinationsGrid from "./components/DestinationsGrid";
import ProWhiteLabelSandbox from "./components/ProWhiteLabelSandbox";
import Footer from "./components/Footer";
import { 
  Sparkles, ArrowRight, Plane, Building2, Lightbulb, ShieldCheck, 
  AlertTriangle, Phone, Mail, Clock, MapPin, Send, HelpCircle, 
  ChevronDown, ChevronUp, UserCheck, Lock, LogIn, Database, Award, BookOpen,
  SlidersHorizontal
} from "lucide-react";
import { FLIGHTS_DATA, HOTELS_DATA, PACKAGES_DATA, DESTINATIONS_DATA } from "./data";

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>("accueil");
  const [lang, setLang] = useState<string>("FR");

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>("user@opensaudi.com");
  const [loginPassword, setLoginPassword] = useState<string>("opensaudi");
  const [authError, setAuthError] = useState<string>("");
  const [userProfile, setUserProfile] = useState<any>({
    name: "Alexandre Moreau",
    email: "user@opensaudi.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    history: [
      { id: "h01", type: "vols", title: "Paris (CDG) → Dubaï (DXB)", details: "Vol direct Saudia SV123", date: "12 Sept 2026", price: 420, status: "Confirmé" },
      { id: "h02", type: "hotels", title: "La Mamounia Palace", details: "7 Nuits, Suite Traditionnelle", date: "19 Sept 2026", price: 3150, status: "Confirmé" }
    ]
  });

  // White Label / Dynamic Brand configuration parameters
  const [whiteLabelMode, setWhiteLabelMode] = useState<boolean>(false);
  const [whiteLabelName, setWhiteLabelName] = useState<string>("GoBillet");
  const [whiteLabelColor, setWhiteLabelColor] = useState<string>("#0f766e");

  // Search core states
  const [searchType, setSearchType] = useState<'vols' | 'sejours' | 'hotels'>('vols');
  const [searchCriteria, setSearchCriteria] = useState<any>({
    fromCity: "Paris (CDG)",
    toCity: "Marrakech (RAK)",
    dateDep: "2026-09-12",
    dateRet: "2026-09-19",
    passengers: 1,
    classType: "Économique",
    durationDays: 7
  });
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Booking states
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);
  const [selectedBookItem, setSelectedBookItem] = useState<any>(null);
  const [selectedBookType, setSelectedBookType] = useState<'vols' | 'sejours' | 'hotels'>('vols');

  // Interactive callbacks
  const handleSearch = (type: 'vols' | 'sejours' | 'hotels', criteria: any) => {
    setSearchType(type);
    setSearchCriteria(criteria);
    setHasSearched(true);
    
    // Smooth scroll down to results section or relevant page tab focus
    if (currentPage !== "accueil") {
      setCurrentPage("accueil");
    }
    setTimeout(() => {
      const resultsEl = document.getElementById("results-section");
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  const handleSelectDestinationFromCard = (destName: string, category: 'vols' | 'sejours' | 'hotels') => {
    let formattedTo = "Marrakech (RAK)";
    if (destName.toLowerCase().includes("dubai") || destName.toLowerCase().includes("dubaï")) formattedTo = "Dubaï (DXB)";
    if (destName.toLowerCase().includes("istanbul")) formattedTo = "Istanbul (IST)";
    if (destName.toLowerCase().includes("bangkok")) formattedTo = "Bangkok (BKK)";
    if (destName.toLowerCase().includes("york")) formattedTo = "New York (JFK)";
    if (destName.toLowerCase().includes("tokyo")) formattedTo = "Tokyo (HND)";
    if (destName.toLowerCase().includes("caire")) formattedTo = "Le Caire (CAI)";
    if (destName.toLowerCase().includes("bali")) formattedTo = "Bali (DPS)";

    const newCriteria = {
      ...searchCriteria,
      toCity: formattedTo,
      passengers: 1
    };

    setSearchType(category);
    setSearchCriteria(newCriteria);
    setHasSearched(true);
    setCurrentPage("accueil");

    setTimeout(() => {
      const resultsEl = document.getElementById("results-section");
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  const handleSelectUniverseCard = (type: 'vols' | 'sejours' | 'hotels') => {
    setSearchType(type);
    setCurrentPage("accueil");
    const searchEl = document.getElementById("search-section");
    if (searchEl) {
      searchEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookItem = (itemType: 'vols' | 'sejours' | 'hotels', item: any) => {
    setSelectedBookType(itemType);
    setSelectedBookItem(item);
    setIsBookModalOpen(true);
  };

  const handleUpdateBrand = (name: string, color: string, isActive: boolean) => {
    setWhiteLabelName(name);
    setWhiteLabelColor(color);
    setWhiteLabelMode(isActive);
  };

  const handleToggleWhiteLabelToggle = () => {
    if (whiteLabelMode) {
      setWhiteLabelMode(false);
    } else {
      setWhiteLabelMode(true);
      setWhiteLabelName("Al-Thuraya Travel");
      setWhiteLabelColor("#d97706"); // Gold/amber accent
    }
  };

  const handleOpenWhiteLabelSettingsScroll = () => {
    setCurrentPage("pro");
    setTimeout(() => {
      const sandboxEl = document.getElementById("pro-sandbox");
      if (sandboxEl) {
        sandboxEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === "user@opensaudi.com" && loginPassword === "opensaudi") {
      setIsLoggedIn(true);
      setAuthError("");
    } else {
      setAuthError("Identifiants incorrects. Utilisez user@opensaudi.com et opensaudi.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Contact Form State
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [ticketNum, setTicketNum] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randId = Math.floor(1000 + Math.random() * 9000);
    setTicketNum(`SUPPORT-724-K${randId}`);
    setContactSuccess(true);
    setContactSubject("");
    setContactMessage("");
  };

  // FAQ filters/search
  const [faqSearch, setFaqSearch] = useState("");
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);

  const faqs = [
    { id: 1, cat: "reservation", q: "Comment est garantie la réservation auprès de l'agence OpenSaudi ?", a: "GoBillet bénéficie de l'agrément Atout France de l'agence de voyages OpenSaudi (immatriculation IM075190024). L'ensemble des réservations de vols ou de forfaits est cautionné d'une garantie financière intégrale à 100% auprès de l'APST. Vos fonds sont pleinement protégés." },
    { id: 2, cat: "vols", q: "Quelles sont les compagnies aériennes disponibles sur la plateforme ?", a: "GoBillet intègre directement les flux IATA. Vous retrouverez les plus grandes compagnies mondiales telles que Saudia, Emirates, Qatar Airways, Air France, Turkish Airlines, Royal Air Maroc, Thai Airways et EgyptAir pour vos liaisons régulières." },
    { id: 3, cat: "marque_blanche", q: "Comment fonctionne l'intégration en marque blanche ?", a: "Notre technologie d'arborescence modulaire permet d'injecter dynamiquement vos variables CSS (couleur accent, border-radius, nom de marque) en une seconde. Les voyagistes tiers peuvent intégrer nos modules via Iframe ou widget API sécurisé." },
    { id: 4, cat: "reimbursement", q: "Puis-je modifier ou annuler mon billet avec l'option Tranquillité ?", a: "Oui, l'Option Assurance Multirisques Tranquillité GoBillet (disponible à la confirmation) vous permet d'être remboursé à 100% sans justificatif en cas d'annulation de votre vol ou réaménagement de vos dates." },
    { id: 5, cat: "hotels", q: "Y a-t-il des frais de séjour cachés à payer à l'hôtel ?", a: "Absolument aucun. Tous nos tarifs hôteliers sont mentionnés taxes d'aéroport, TVA locales et frais de resort inclus, assurant une transparence absolue conforme à notre promesse de marque." }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
    f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  // Dynamic branding color fallback
  const dynamicAccent = whiteLabelMode ? whiteLabelColor : "#0f766e";

  return (
    <div id="app-root-container" className="min-h-screen flex flex-col justify-between bg-slate-50 relative font-sans">
      
      {/* 1. TOP REGULATED LAUNCH BANNER */}
      <div className="bg-slate-900 text-slate-300 py-3 px-4 text-xs font-semibold text-center border-b border-slate-800 flex flex-wrap justify-center items-center gap-2">
        <span className="inline-flex items-center space-x-1 py-0.5 px-2 bg-teal-500/15 text-teal-400 rounded text-[10px] font-black uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Accrédité IATA</span>
        </span>
        <span className="text-slate-200">
          GoBillet by <strong>OpenSaudi</strong> • Licence Tour Opérateur Atout France <strong>IM075190024</strong>
        </span>
        <button 
          onClick={handleOpenWhiteLabelSettingsScroll}
          className="underline text-teal-400 hover:text-teal-300 font-bold ml-1 transition-colors"
        >
          Tester la Marque Blanche B2B →
        </button>
      </div>

      {/* 2. MAIN HEADER COMPONENT */}
      <Header
        whiteLabelMode={whiteLabelMode}
        whiteLabelName={whiteLabelName}
        whiteLabelColor={whiteLabelColor}
        onToggleWhiteLabel={handleToggleWhiteLabelToggle}
        onOpenWhiteLabelSettings={handleOpenWhiteLabelSettingsScroll}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onOpenLogin={() => setCurrentPage("compte")}
        lang={lang}
        setLang={setLang}
      />

      {/* 3. MULTIPAGE ROUTING CONTAINER */}
      <main className="flex-grow">
        
        {currentPage === "accueil" && (
          <div>
            {/* HERO BANNER */}
            <section id="search-section" className="bg-gradient-to-b from-slate-900 to-slate-800 text-white pt-20 pb-28 px-4 relative overflow-hidden text-center md:pt-24 md:pb-36">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1500')] bg-cover bg-center mix-blend-overlay opacity-15" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 to-transparent" />
              
              <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-teal-300">
                  <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
                  <span>Le bon billet, au bon moment • By OpenSaudi</span>
                </div>

                <h1 className="text-4xl xs:text-5xl md:text-6xl font-black tracking-tight leading-none text-white max-w-4xl mx-auto">
                  Le bon billet,<br className="sm:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300" style={{ backgroundImage: whiteLabelMode ? `linear-gradient(to right, ${whiteLabelColor}, #34d399)` : undefined }}>au bon moment.</span>
                </h1>

                <p className="text-sm md:text-base text-slate-300 font-semibold max-w-2xl mx-auto leading-relaxed">
                  Bénéficiez d’offres mondiales exclusives sur vos vols, séjours et hôtels avec nos comparateurs régulés et soutenus par le professionnalisme d’OpenSaudi.
                </p>

                <div className="flex justify-center items-center space-x-4 pt-2 text-xs font-bold text-slate-400 font-mono">
                  <span>⚓ APST Garanti</span>
                  <span>•</span>
                  <span>✈ IATA Accredited</span>
                  <span>•</span>
                  <span>📞 Support Français 24/7</span>
                </div>
              </div>
            </section>

            {/* DYNAMIC SEARCH ENGINE BAR */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
              <SearchEngine
                onSearch={handleSearch}
                initialDestination={searchCriteria.toCity}
                initialType={searchType}
                whiteLabelColor={whiteLabelColor}
                whiteLabelMode={whiteLabelMode}
              />
            </div>

            {/* DYNAMIC SEARCH RESULTS ANCHOR */}
            <section id="results-section" className="scroll-mt-24">
              {hasSearched ? (
                <div className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <SearchResults
                    type={searchType}
                    criteria={searchCriteria}
                    onBookItem={handleBookItem}
                    whiteLabelColor={whiteLabelColor}
                    whiteLabelMode={whiteLabelMode}
                  />
                </div>
              ) : (
                <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <div className="bg-teal-50/40 border border-slate-200/60 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-white text-teal-600 border border-teal-100 shadow-3xs" style={{ color: dynamicAccent }}>
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-800">Visualisez un exemple de recherche</h4>
                        <p className="text-xs text-slate-500 font-medium">
                          Sélectionnez une des 8 destinations magiques à la une ci-dessous pour simuler les billets en direct.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSearch('vols', searchCriteria)}
                      className="text-xs font-black text-white px-5 py-3 rounded-xl shadow-xs transition-transform duration-150 active:scale-95 whitespace-nowrap cursor-pointer"
                      style={{ backgroundColor: dynamicAccent }}
                    >
                      Lancer une simulation type →
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* WHY CHOOSE GOBILLET SECTION */}
            <USPSection
              whiteLabelColor={whiteLabelColor}
              whiteLabelMode={whiteLabelMode}
            />

            {/* THE 3 TRAVEL UNIVERSES */}
            <UniversesSection
              onSelectUniverse={handleSelectUniverseCard}
              whiteLabelColor={whiteLabelColor}
              whiteLabelMode={whiteLabelMode}
            />

            {/* POPULAR DESTINATIONS GRID */}
            <DestinationsGrid
              onSelectDestination={handleSelectDestinationFromCard}
              whiteLabelColor={whiteLabelColor}
              whiteLabelMode={whiteLabelMode}
            />

            {/* MOMENT OFFERS PROMOTIONS BANNER SECTION */}
            <section className="py-16 bg-slate-50 border-t border-b border-slate-100 text-left">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 text-left">
                  <span className="text-xs font-black uppercase text-teal-600 tracking-wider">Offres Privilèges du Moment</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">Promotions Flash by OpenSaudi</h3>
                  <p className="text-xs text-slate-500 font-bold mt-1 uppercase">Remises immédiates négociées directement auprès de nos compagnies partenaires.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Promo 1 */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs hover:shadow-md transition-all">
                    <div className="space-y-2">
                      <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-[9px] uppercase font-black">VOL DIRECT SPECIAL</span>
                      <h4 className="text-lg font-bold text-slate-900">Paris → Dubaï (Aller-Retour)</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">Bénéficiez d’une escale VIP et d’une franchise bagage gratuite de 30kg avec Saudia.</p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-2xl font-black text-[#0f766e]">340 €</span>
                      <p className="text-[10px] text-slate-400 font-bold">au lieu de 460€</p>
                      <button 
                        onClick={() => handleSelectDestinationFromCard("Dubaï", "vols")}
                        className="mt-3 block text-center text-[11px] font-black bg-slate-900 hover:bg-slate-800 text-white py-1.5 px-3 rounded-lg transition-colors"
                      >
                        En profiter
                      </button>
                    </div>
                  </div>

                  {/* Promo 2 */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs hover:shadow-md transition-all">
                    <div className="space-y-2">
                      <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-[9px] uppercase font-black">FORMULE SEJOUR EXCLUSIVE</span>
                      <h4 className="text-lg font-bold text-slate-900">Séjour Riad de Luxe Marrakech</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">Vol + 5 nuits en suite, transferts privés aéroport et petits-déjeuners inclus.</p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-2xl font-black text-[#0f766e]">299 €</span>
                      <p className="text-[10px] text-slate-400 font-bold">par personne</p>
                      <button 
                        onClick={() => handleSelectDestinationFromCard("Marrakech", "sejours")}
                        className="mt-3 block text-center text-[11px] font-black bg-slate-900 hover:bg-slate-800 text-white py-1.5 px-3 rounded-lg transition-colors"
                      >
                        En profiter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* MARQUE BLANCHE QUICK BOARD PREVIEW */}
            <section className="py-20 bg-slate-900 text-white relative text-left">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                  <div className="space-y-4 max-w-xl">
                    <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-black">
                      <span>Réseau Professionnel B2B</span>
                    </div>
                    <h3 className="text-3xl font-extrabold tracking-tight text-white mb-2">Des moteurs modulaires sous votre nom</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Installez instantanément le moteur de réservation GoBillet sur vos propres plateformes ou blogs de voyage. Personnalisez l’identité graphique, les angles arrondis et les formules en quelques clics via notre console de développement.
                    </p>
                  </div>
                  <div className="shrink-0 flex gap-4">
                    <button 
                      onClick={() => setCurrentPage("pro")} 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-colors"
                    >
                      Accéder à l'Espace Pro
                    </button>
                    <button 
                      onClick={() => setCurrentPage("propos")} 
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/10 font-extrabold text-xs px-6 py-3 rounded-xl transition-colors"
                    >
                      Documents API
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 4. DEDICATED VOLS PAGE */}
        {currentPage === "vols" && (
          <div className="py-12 bg-white text-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="mb-8 border-b border-slate-100 pb-6">
                <span className="text-xs font-black uppercase tracking-wider text-teal-600">Pôle Aérien Régulé</span>
                <h1 className="text-3xl font-black text-slate-900 mt-1">Trouvez le bon vol, au bon moment</h1>
                <p className="text-xs text-slate-500 font-bold uppercase mt-1">
                  Accords de distribution internationaux avec les alliances de transport sous la supervision OpenSaudi.
                </p>
              </div>

              {/* SEARCH ENGINE FOR VOLS */}
              <div className="mb-12 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <SearchEngine 
                  onSearch={handleSearch}
                  initialDestination={searchCriteria.toCity}
                  initialType="vols"
                  whiteLabelColor={whiteLabelColor}
                  whiteLabelMode={whiteLabelMode}
                />
              </div>

              {/* FLIGHTS ROW LIST + SIDEBAR FILTERS */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Simulated Filters */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-150 space-y-6 h-fit">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
                    <span>Filtrer les vols</span>
                    <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Nombre d'escales</label>
                    <div className="space-y-1.5 text-xs font-semibold text-slate-700">
                      <label className="flex items-center space-x-2"><input type="checkbox" defaultChecked className="rounded text-teal-600 focus:ring-teal-500" /><span>Vols Directs uniquement</span></label>
                      <label className="flex items-center space-x-2"><input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500" /><span>1 escale max</span></label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Alliances de compagnies</label>
                    <div className="space-y-1.5 text-xs font-semibold text-slate-700">
                      <label className="flex items-center space-x-2"><input type="checkbox" defaultChecked className="rounded text-teal-600 focus:ring-teal-500" /><span>Saudia (Partenaire Majeur)</span></label>
                      <label className="flex items-center space-x-2"><input type="checkbox" defaultChecked className="rounded text-teal-600 focus:ring-teal-500" /><span>Air France / Emirates</span></label>
                      <label className="flex items-center space-x-2"><input type="checkbox" defaultChecked className="rounded text-teal-600 focus:ring-teal-500" /><span>Qatar Airways / Turkish</span></label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">IMMATRICULATION GOBILLET</span>
                    <span className="text-[11px] font-bold text-slate-600 block">IATA Code: #209384-FR</span>
                  </div>
                </div>

                {/* Flights Grid and White Label connectors placeholders */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Whitelabel connection indicator */}
                  <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 flex items-center justify-between flex-wrap gap-4 text-xs font-bold text-teal-800">
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4 text-teal-600" />
                      <span>Connecteurs API : Resaneo Live Widget & MisterFly Engine activés</span>
                    </div>
                    <span className="bg-white/90 border border-teal-200 text-teal-700 py-1 px-2.5 rounded text-[10px]">
                      Authentifié • OpenSaudi GDS
                    </span>
                  </div>

                  <div className="space-y-4">
                    {FLIGHTS_DATA.map((flight) => (
                      <div key={flight.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 shadow-3xs flex flex-col md:flex-row items-center justify-between gap-6 hover:border-slate-350 hover:bg-slate-100/40 transition-all">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center font-black text-slate-700 text-lg">
                            {flight.airlineLogo}
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase text-teal-600 tracking-wider font-mono">Compagnie : {flight.airline}</span>
                            <div className="flex items-center space-x-2 mt-0.5">
                              <span className="text-base font-extrabold text-slate-900">{flight.departureTime}</span>
                              <span className="text-slate-400 text-xs">→</span>
                              <span className="text-base font-extrabold text-slate-900">{flight.arrivalTime}</span>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">{flight.fromCode} ({flight.fromName}) à {flight.toCode} • Vol direct</span>
                          </div>
                        </div>

                        {/* Reassurances list inside column */}
                        <div className="hidden md:block max-w-[200px] text-xs space-y-1 font-bold text-slate-500">
                          {flight.reassurances.map((r, i) => (
                            <div key={i} className="flex items-center space-x-1">
                              <span className="w-1 h-1 rounded-full bg-slate-900 shrink-0" />
                              <span className="truncate">{r}</span>
                            </div>
                          ))}
                        </div>

                        {/* Price side buy click */}
                        <div className="text-left md:text-right shrink-0">
                          <span className="text-2xl font-black text-slate-900">{flight.price} €</span>
                          <p className="text-[9px] text-slate-400 font-bold block">Tarif de base / voyageur</p>
                          <button
                            onClick={() => handleBookItem("vols", flight)}
                            className="mt-2.5 text-xs font-black text-white px-4 py-2 rounded-xl transition-all block text-center"
                            style={{ backgroundColor: dynamicAccent }}
                          >
                            Réserver ce vol
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* 5. DEDICATED SEJOURS COMPONENT */}
        {currentPage === "sejours" && (
          <div className="py-12 bg-white text-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="mb-8 border-b border-slate-100 pb-6">
                <span className="text-xs font-black uppercase tracking-wider text-teal-600">Formules combinées voyage</span>
                <h1 className="text-3xl font-black text-slate-900 mt-1">Le bon séjour, au bon moment</h1>
                <p className="text-xs text-slate-500 font-bold uppercase mt-1">
                  Tous nos séjours forfaits packagés sont protégés juridiquement et financés de bout en bout par la caution Atout France.
                </p>
              </div>

              {/* Filtering packages by Theme & Duration */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-150 mb-10 text-xs space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <span className="font-bold text-slate-600">Trier par thématique :</span>
                  <span className="px-2.5 py-1 bg-teal-600 text-white font-extrabold rounded-lg">Tous nos séjours</span>
                  <span className="px-2.5 py-1 bg-white hover:bg-slate-250 border border-slate-100 text-slate-700 font-bold rounded-lg cursor-pointer">Spa & Escapades de Luxe</span>
                  <span className="px-2.5 py-1 bg-white hover:bg-slate-250 border border-slate-100 text-slate-700 font-bold rounded-lg cursor-pointer">Histoire & Circuits</span>
                  <span className="px-2.5 py-1 bg-white hover:bg-slate-250 border border-slate-100 text-slate-700 font-bold rounded-lg cursor-pointer">Aventure en couple</span>
                </div>
              </div>

              {/* Packages Cards list */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PACKAGES_DATA.map((pack) => (
                  <div key={pack.id} className="bg-white rounded-3xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
                    <div className="h-56 relative overflow-hidden">
                      <img referrerPolicy="no-referrer" src={pack.image} alt={pack.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 bg-teal-500 text-white font-black text-[9px] uppercase tracking-widest px-2 py-1 rounded-md">
                        Formule {pack.durationDays} Jours
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Destination: {pack.location}</span>
                        <h3 className="text-lg font-bold text-slate-900">{pack.title}</h3>
                        
                        <div className="pt-2 space-y-2">
                          {pack.highlights.map((h, i) => (
                            <div key={i} className="flex items-start space-x-1 text-xs text-slate-600 font-semibold leading-relaxed">
                              <span className="text-[#0f766e] font-black shrink-0">✓</span>
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Vol A/R + Hôtel inclus</span>
                          <span className="text-2xl font-black text-slate-900">{pack.price} €</span>
                          <span className="text-[10px] font-bold text-slate-400 block font-mono">Par personne</span>
                        </div>

                        <button 
                          onClick={() => handleBookItem("sejours", pack)}
                          className="text-white font-extrabold text-xs px-4 py-3 rounded-xl hover:brightness-105 transition-all text-center block cursor-pointer"
                          style={{ backgroundColor: dynamicAccent }}
                        >
                          Réserver ce Séjour
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* 6. DEDICATED HOTELS COMPONENT */}
        {currentPage === "hotels" && (
          <div className="py-12 bg-white text-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="mb-8 border-b border-slate-100 pb-6">
                <span className="text-xs font-black uppercase tracking-wider text-teal-600">Pôle Hébergement & Hospitality</span>
                <h1 className="text-3xl font-black text-slate-900 mt-1">La bonne adresse, au bon moment</h1>
                <p className="text-xs text-slate-500 font-bold uppercase mt-1">
                  Les plus beaux lits à tarification nette garantie. Zéro surprise sur place, aucun frais caché.
                </p>
              </div>

              {/* Filters row star */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-150 h-fit space-y-5">
                  <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest block">Affiner mes critères</h3>
                  
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Catégorie hôtelière</span>
                    <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                      <input type="checkbox" defaultChecked className="rounded text-teal-600 focus:ring-teal-500" />
                      <span>Hôtels d'exception 5★</span>
                    </label>
                    <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                      <input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500" />
                      <span>Hôtels de Charme 4★</span>
                    </label>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Note moyenne minimale</span>
                    <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                      <input type="checkbox" defaultChecked className="rounded text-teal-600 focus:ring-teal-500" />
                      <span>Excellent (4.5/5 ou +)</span>
                    </label>
                  </div>
                </div>

                {/* Hotels List and placeholder container */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* API Widget Container Placeholder */}
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-150 flex items-center justify-between text-xs font-bold">
                    <span>Flux GDS consolidé hôtelier en temps réel</span>
                    <span className="bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded text-[10px]">99.8% Disponibilité</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {HOTELS_DATA.map((hotel) => (
                      <div key={hotel.id} className="bg-white border border-slate-150 rounded-3xl overflow-hidden flex flex-col justify-between shadow-3xs hover:border-slate-350 transition-all">
                        <div className="h-48 relative overflow-hidden">
                          <img referrerPolicy="no-referrer" src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="p-5 flex-grow flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center flex-wrap">
                              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">{hotel.location}</span>
                              <span className="bg-teal-50 text-teal-800 font-extrabold text-[10px] py-0.5 px-2 rounded-md">Note: {hotel.rating}/5</span>
                            </div>
                            <h3 className="text-base font-bold text-slate-900">{hotel.name}</h3>
                            <p className="text-xs text-slate-500 font-semibold leading-relaxed truncate">{hotel.amenities.join(" • ")}</p>
                          </div>

                          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                            <div>
                              <span className="text-xl font-black text-slate-900">{hotel.pricePerNight} €</span>
                              <p className="text-[9px] text-slate-400 font-bold block font-mono">par nuit (TTC)</p>
                            </div>

                            <button
                              onClick={() => handleBookItem("hotels", hotel)}
                              className="text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all"
                              style={{ backgroundColor: dynamicAccent }}
                            >
                              Réserver
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* 7. QUI SOMMES-NOUS / À PROPOS */}
        {currentPage === "propos" && (
          <div className="py-16 bg-white text-left max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#0f766e]">La crédibilité & La souveraineté</span>
            <h1 className="text-4xl font-extrabold text-slate-950 mt-2 mb-6">GoBillet by OpenSaudi</h1>
            
            <div className="prose prose-slate max-w-none text-slate-600 space-y-5 text-sm font-semibold leading-relaxed">
              <p>
                <strong>GoBillet</strong> est la nouvelle plateforme d'agrégation de voyages et d'hôtellerie créée pour répondre aux exigences élevées du grand public et des professionnels à la recherche du timing de réservation idéal.
              </p>
              
              <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-100 text-[#0f766e] font-bold">
                <Quote className="w-6 h-6 text-teal-700 inline-block mr-2" />
                Notre slogan, <strong>« Le bon billet, au bon moment »</strong>, n'est pas qu'une phrase marketing : c'est notre fil conducteur et notre engagement contractuel. Tout notre modèle algorithmique recherche continuellement la baisse des tarifs pour sécuriser l'achat.
              </div>

              <h3 className="text-xl font-bold text-slate-900 pt-4">Adossé à la robustesse d'OpenSaudi</h3>
              <p>
                Afin d'apporter confort, crédibilité et solidité juridique, GoBillet est étroitement liée à l'agence <strong>OpenSaudi</strong>. Cette synergie stratégique offre aux voyageurs la garantie ultime :
              </p>

              <ul className="space-y-3 list-disc pl-5 text-xs">
                <li><strong>Accréditation IATA :</strong> Permet d'intégrer en direct le catalogue tarifaire des plus grands transporteurs mondiaux (Saudia, Emirates, Air France...).</li>
                <li><strong>Immatriculation Atout France N° IM075190024 :</strong> Licence de voyage obligatoire pour les opérateurs de tourisme exerçant en France.</li>
                <li><strong>Garantie Financière APST de 100% :</strong> Tous vos versements sont pleinement garantis contre la défaillance financière. Vos vacances sont assurées quoi qu'il arrive.</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 pt-4">Une architecture prête pour l'intégration de marques blanches</h3>
              <p>
                Dès la conception, GoBillet possède des composants et GDS découplés permettant d'exposer nos puissants moteurs de recherche voyages sous des marques tierces. Découvrez notre console développeurs et personnalisez l’identité graphique à votre gré.
              </p>
            </div>
          </div>
        )}

        {/* 8. ESPACE PRO & CONSOLE MARQUE BLANCHE */}
        {currentPage === "pro" && (
          <div>
            <ProWhiteLabelSandbox
              onUpdateBrand={handleUpdateBrand}
              brandName={whiteLabelName}
              brandColor={whiteLabelColor}
              isWhiteLabel={whiteLabelMode}
            />
          </div>
        )}

        {/* 9. CONTACT & ASSISTANCE CUSTOMER FORM */}
        {currentPage === "contact" && (
          <div className="py-16 bg-white text-left max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-black uppercase text-[#0f766e] tracking-widest">Support Dédié 7j/7</span>
            <h1 className="text-3xl font-black text-slate-900 mt-1">Nous Contacter</h1>
            <p className="text-xs text-slate-500 font-bold uppercase mt-1">Nos experts francophones basés localement répondent sous 2 heures garanties.</p>

            {contactSuccess ? (
              <div className="mt-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-slate-900">Votre ticket a bien été enregistré.</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Un conseiller OpenSaudi de premier rang vient de prendre en charge votre demande. Votre numéro de suivi est : <strong>{ticketNum}</strong>.
                </p>
                <button 
                  onClick={() => setContactSuccess(false)}
                  className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Envoyer un nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Nom & Prénom</label>
                    <input type="text" required placeholder="Dupont Jean" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Votre Email</label>
                    <input type="email" required placeholder="dupont@gmail.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Sujet de la demande</label>
                  <input 
                    type="text" 
                    required 
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="Ex: Gérer ma réservation Paris-Dubaï Saudia" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Votre message détaillé</label>
                  <textarea 
                    rows={5} 
                    required 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Écrivez votre message ici..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all flex items-center space-x-2"
                  style={{ backgroundColor: dynamicAccent }}
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer ma demande sécurisée</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* 10. CLIENT DASHBOARD & SIMULATED REGISTER LOGIN */}
        {currentPage === "compte" && (
          <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            {isLoggedIn ? (
              /* LOGGED IN USER STATE */
              <div className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 space-y-8 shadow-xs">
                
                {/* Greeting Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center space-x-4">
                    <img referrerPolicy="no-referrer" src={userProfile.avatar} alt={userProfile.name} className="w-16 h-16 rounded-full object-cover border-2 border-teal-500" />
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-[#0f766e]">Espace Voyageur Certifié</span>
                      <h2 className="text-2xl font-black text-slate-900 mt-1">{userProfile.name}</h2>
                      <p className="text-xs text-slate-500 font-medium">{userProfile.email} • Client Grand Public</p>
                    </div>
                  </div>

                  <div className="flex bg-teal-50 text-teal-800 py-2 px-4 rounded-2xl items-center space-x-2 border border-teal-100/50">
                    <UserCheck className="w-5 h-5 text-teal-600" />
                    <span className="text-xs font-extrabold pb-0.5">Compte Conforme • Atout France</span>
                  </div>
                </div>

                {/* Simulated Past History Bookings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest">Historique de mes Commandes</h3>
                  
                  <div className="space-y-4">
                    {userProfile.history.map((hist: any, index: number) => (
                      <div key={hist.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${hist.type === 'vols' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'}`}>
                              {hist.type === 'vols' ? 'Vol' : 'Hôtel'}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 font-mono">ID: {hist.id}</span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900 mt-1">{hist.title}</h4>
                          <p className="text-xs text-slate-500 font-medium">{hist.details} • Départ le {hist.date}</p>
                        </div>
                        <div className="text-left sm:text-right shrink-0">
                          <span className="text-lg font-black text-slate-900 block">{hist.price} €</span>
                          <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100/45 border border-emerald-100 rounded-md px-1.5 py-0.5 mt-1">
                            ✓ {hist.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-between items-center flex-wrap gap-4">
                  <button 
                    onClick={handleLogout}
                    className="text-xs font-bold text-rose-500 hover:text-rose-700 underline"
                  >
                    Déconnecter mon compte
                  </button>

                  <button 
                    onClick={() => setCurrentPage("accueil")}
                    className="bg-slate-900 text-white font-black text-xs px-5 py-2.5 rounded-xl hover:bg-slate-800"
                  >
                    Retourner à l'accueil
                  </button>
                </div>

              </div>
            ) : (
              /* LOGIN INTERFACE FORM with pre-loaded parameters for easy client testing */
              <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 space-y-6 shadow-md shadow-slate-100">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-slate-900">Se connecter à GoBillet</h2>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">Saisissez vos identifiants pour accéder à vos billets électroniques certifiés.</p>
                </div>

                {authError && (
                  <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl font-semibold border border-rose-100 leading-normal">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Adresse Email</label>
                    <input 
                      type="email" 
                      required 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="user@opensaudi.com" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Mot de passe</label>
                    <input 
                      type="password" 
                      required 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800" 
                    />
                  </div>

                  {/* Simulator helpful credentials display */}
                  <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 text-[11px] text-[#0f766e]">
                    <span className="font-bold underline block mb-0.5">Simulation de compte d'essai :</span>
                    Utilisez l'email <strong className="font-mono text-slate-900 select-all">user@opensaudi.com</strong> et mot de passe <strong className="font-mono text-slate-900 select-all">opensaudi</strong>. Le GDS chargera instantanément votre carnet de voyage OpenSaudi.
                  </div>

                  <button 
                    type="submit" 
                    className="w-full text-white font-extrabold text-xs px-6 py-3.5 rounded-xl hover:brightness-105 transition-all flex items-center justify-center space-x-1.5"
                    style={{ backgroundColor: dynamicAccent }}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Se connecter sécurisé</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

      </main>

      {/* 11. GLOBAL FAQ REDIRECT TRIGGER COMPONENT */}
      {currentPage === "faq" && (
        <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left bg-white">
          <span className="text-xs font-black uppercase tracking-widest text-[#0f766e]">Foire aux questions</span>
          <h1 className="text-3xl font-black text-slate-900 mt-1 mb-8">FAQ & Aide réglementaire</h1>
          
          <div className="mb-8 relative max-w-lg">
            <input 
              type="text" 
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Rechercher une question (ex: Atout France, Vol...)" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500"
            />
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((f, i) => {
              const isOpen = faqExpanded === f.id;
              return (
                <div key={f.id} className="border border-slate-150 rounded-2xl p-5 bg-slate-50/40">
                  <button 
                    onClick={() => setFaqExpanded(isOpen ? null : f.id)}
                    className="w-full flex items-center justify-between font-bold text-slate-900 text-sm text-left outline-none"
                  >
                    <span>{f.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-teal-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <p className="text-xs text-slate-650 font-medium leading-relaxed text-slate-600 mt-3 pt-3 border-t border-slate-205 border-slate-200/60">
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 12. DYNAMIC BRAND COLOR CONTROLLED FOOTER */}
      <Footer
        whiteLabelColor={whiteLabelColor}
        whiteLabelMode={whiteLabelMode}
        whiteLabelName={whiteLabelName}
        setCurrentPage={setCurrentPage}
        lang={lang}
      />

      {/* 13. CONFIRMATION BOOKING PASS MODAL */}
      <BookingModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        itemType={selectedBookType}
        itemData={selectedBookItem}
        passengersCount={searchCriteria.passengers}
        whiteLabelColor={whiteLabelColor}
        whiteLabelMode={whiteLabelMode}
      />

    </div>
  );
}

// Simple Helper Graphic Quote Icons
function Quote(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v4c0 1.25.75 2 2 2h2c0 2-1.5 5-3 6" />
      <path d="M14 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v4c0 1.25.75 2 2 2h2c0 2-1.5 5-3 6" />
    </svg>
  );
}
