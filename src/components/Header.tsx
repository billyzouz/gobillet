import React, { useState } from "react";
import { Plane, Building2, Sparkles, Settings, User, Globe, ChevronDown, LogIn, Award } from "lucide-react";

interface HeaderProps {
  whiteLabelMode: boolean;
  whiteLabelName: string;
  whiteLabelColor: string;
  onToggleWhiteLabel: () => void;
  onOpenWhiteLabelSettings: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onOpenLogin: () => void;
  lang: string;
  setLang: (lang: string) => void;
}

export default function Header({
  whiteLabelMode,
  whiteLabelName,
  whiteLabelColor,
  onToggleWhiteLabel,
  onOpenWhiteLabelSettings,
  currentPage,
  setCurrentPage,
  isLoggedIn,
  onLogout,
  onOpenLogin,
  lang,
  setLang,
}: HeaderProps) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const activeColor = whiteLabelMode ? whiteLabelColor : "#0f766e"; // Beautiful warm teal for GoBillet/Saudi connection

  const navLinks = [
    { id: "accueil", label: "Accueil", icon: null },
    { id: "vols", label: "Vols", icon: <Plane className="w-3.5 h-3.5" /> },
    { id: "sejours", label: "Séjours", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "hotels", label: "Hôtels", icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: "propos", label: "Qui sommes-nous", icon: null },
    { id: "pro", label: "Espace Pro B2B", icon: null },
    { id: "contact", label: "Contact", icon: null },
  ];

  const getLangName = (l: string) => {
    switch (l) {
      case "FR": return "🇫🇷 FR";
      case "EN": return "🇬🇧 EN";
      case "AR": return "🇸🇦 AR";
      default: return "🇫🇷 FR";
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 backdrop-blur-md bg-white/95 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Area with OpenSaudi Signature */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group text-left" 
            onClick={() => {
              setCurrentPage("accueil");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl shadow-sm overflow-hidden" 
              style={{ backgroundColor: activeColor }}
            >
              <Plane className="w-6 h-6 text-white rotate-45 transform -translate-y-0.5" />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-teal-400" />
            </div>
            
            <div>
              <div className="flex items-baseline space-x-1.5 leading-none">
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-teal-800 transition-colors">
                  {whiteLabelMode ? whiteLabelName : "GoBillet"}
                </span>
                {!whiteLabelMode && (
                  <span className="text-[10px] font-bold text-slate-400 font-sans tracking-wide">
                    by OpenSaudi
                  </span>
                )}
                {whiteLabelMode && (
                  <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-rose-50 text-rose-600 rounded">
                    B2B Client
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wide mt-1 leading-none">
                Le bon billet, au bon moment.
              </p>
            </div>
          </div>

          {/* Navigation Links for Pages */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? "text-white shadow-xs"
                      : "text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                  }`}
                  style={{
                    backgroundColor: isActive ? activeColor : undefined
                  }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Toolbar settings (Language switcher + Account login system) */}
          <div className="flex items-center space-x-2">
            
            {/* Language Dropdown Selector in Header */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{getLangName(lang)}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-50 text-left">
                  {["FR", "EN", "AR"].map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-extrabold hover:bg-slate-50 text-slate-700 flex items-center justify-between"
                    >
                      <span>{getLangName(l)}</span>
                      {lang === l && <span className="text-teal-600">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account Profile Action button */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage("compte")}
                  className="flex items-center space-x-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-slate-300"
                >
                  <User className="w-4 h-4 text-teal-600" />
                  <span className="hidden sm:inline">Mon Espace</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-700 hover:underline px-2 py-1"
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 md:py-2.5 bg-slate-900 text-white hover:bg-teal-900 rounded-xl text-xs font-black transition-all shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Connexion</span>
              </button>
            )}

            {/* Customizer trigger for developer options */}
            <button
              onClick={onOpenWhiteLabelSettings}
              title="Tester configuration marque blanche"
              className="p-2 sm:p-2.5 text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
