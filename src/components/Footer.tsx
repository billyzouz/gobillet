import React, { useState } from "react";
import { Plane, CalendarCheck, ShieldCheck, Headphones, Coins, Mail, ArrowRight, BookOpen, Award } from "lucide-react";

interface FooterProps {
  whiteLabelColor: string;
  whiteLabelMode: boolean;
  whiteLabelName: string;
  setCurrentPage: (page: string) => void;
  lang: string;
}

export default function Footer({ whiteLabelColor, whiteLabelMode, whiteLabelName, setCurrentPage, lang }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState("");
  const [successNews, setSuccessNews] = useState(false);

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail) {
      setSuccessNews(true);
      setNewsEmail("");
    }
  };

  const activeColor = whiteLabelMode ? whiteLabelColor : "#0f766e";

  return (
    <footer className="bg-slate-950 text-slate-300 relative text-left">
      
      {/* 1. REASSURANCE BANNER (Bandeau de réassurance) */}
      <div className="bg-slate-900 border-b border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="flex items-start space-x-3.5">
              <div className="p-2 bg-teal-500/10 rounded-xl text-teal-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Paiement 100% Sécurisé</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Transactions cryptées SSL. Réservation sécurisée par Carte Bleue, Visa, Mastercard ou PayPal.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Sans frais cachés</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Tous nos tarifs incluent l'intégralité des taxes obligatoires et d'aéroport. Une transparence tarifaire totale.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="p-2 bg-sky-500/10 rounded-xl text-sky-450">
                <Headphones className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Support Client 7j/7</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Nos conseillers experts basés localement vous guident et vous assistent à chaque instant de votre réservation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-sans">Crédibilité OpenSaudi</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  GoBillet bénéficie de la solidité d’OpenSaudi, opérateur accrédité IATA et Atout France (IM075190024).
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. NEWSLETTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
              <span className="text-xs font-black uppercase text-teal-400 tracking-wider">Newsletter de Veille</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">
              Ne ratez plus le bon moment
            </h3>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Inscrivez-vous et recevez nos meilleures offres de vols, séjours et hôtels partout dans le monde avant tout le monde.
            </p>
          </div>

          <div className="lg:col-span-5 bg-slate-900 border border-white/5 p-6 rounded-3xl relative overflow-hidden">
            {successNews ? (
              <div className="py-4 text-center space-y-2">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 mx-auto rounded-full flex items-center justify-center text-lg font-bold">
                  ✓
                </div>
                <h4 className="text-sm font-bold text-white">Inscription Réussie !</h4>
                <p className="text-xs text-slate-400">
                  Merci ! Vous recevrez nos alertes de baisse de tarifs très bientôt.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      placeholder="Votre adresse email principal"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white outline-none focus:border-teal-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
                    style={{ backgroundColor: activeColor }}
                  >
                    Je m'inscris
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block">
                  ✓ Protection des données. Désabonnement gratuit en un clic.
                </span>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* 3. FOOTER COLUMNS - EXACTLY AS REQUESTED */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Column 1: GoBillet */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">GoBillet</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => setCurrentPage("propos")} className="hover:text-white transition-colors">
                  Qui sommes-nous
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("pro")} className="hover:text-white transition-colors">
                  Espace pro
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("contact")} className="hover:text-white transition-colors">
                  Nous contacter
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("accueil")} className="hover:text-white transition-colors">
                  Recrutement
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Voyager */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Voyager</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => setCurrentPage("vols")} className="hover:text-white transition-colors">
                  Vols
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("sejours")} className="hover:text-white transition-colors">
                  Séjours
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("hotels")} className="hover:text-white transition-colors">
                  Hôtels
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("accueil")} className="hover:text-white transition-colors">
                  Destinations populaires
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("accueil")} className="hover:text-white transition-colors">
                  Offres du moment
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Aide */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Aide</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => setCurrentPage("faq")} className="hover:text-white transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("contact")} className="hover:text-white transition-colors">
                  Support
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("compte")} className="hover:text-white transition-colors">
                  Gérer ma réservation
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("propos")} className="hover:text-white transition-colors">
                  Conditions de voyage
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Légal */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Légal</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => setCurrentPage("faq")} className="hover:text-white transition-colors">
                  CGV (Conditions Générales)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("faq")} className="hover:text-white transition-colors">
                  Mentions légales
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("faq")} className="hover:text-white transition-colors">
                  Politique de confidentialité
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("faq")} className="hover:text-white transition-colors">
                  Cookies
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* 4. BASEMENT LEGALS AND SOCIAL RIGHTS */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <div className="text-center md:text-left space-y-1">
            <p className="font-bold text-slate-400">
              © {new Date().getFullYear()} GoBillet by OpenSaudi — Le bon billet, au bon moment.
            </p>
            <p className="text-[10px] text-slate-500">
              GoBillet est adossé à l’agence OpenSaudi, accréditée IATA et Atout France sous l’immatriculation Atout France IM075190024.
            </p>
          </div>

          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-slate-400 font-semibold">
            <span>Réseaux sociaux</span>
            <span>•</span>
            <span className="text-teal-400">Langue : {lang === "FR" ? "Français" : lang === "EN" ? "English" : "العربية"}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
