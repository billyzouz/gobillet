import React, { useState } from "react";
import { X, Plane, ShieldCheck, Mail, User, Sparkles, Check, Download, AlertCircle, Building2, Ticket, Printer } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: 'vols' | 'sejours' | 'hotels';
  itemData: any;
  passengersCount: number;
  whiteLabelColor: string;
  whiteLabelMode: boolean;
}

export default function BookingModal({
  isOpen,
  onClose,
  itemType,
  itemData,
  passengersCount = 1,
  whiteLabelColor,
  whiteLabelMode
}: BookingModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [insurance, setInsurance] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [resCode, setResCode] = useState("");

  if (!isOpen || !itemData) return null;

  // Pricing constants
  const passengers = passengersCount || 1;
  const basePricePerPerson = itemType === 'hotels' ? itemData.pricePerNight : itemData.price;
  const nights = itemType === 'hotels' ? 7 : 1; // base sample estimation
  const totalBasePrice = basePricePerPerson * passengers * nights;
  
  const taxPrice = Math.round(totalBasePrice * 0.08); // 8% mock tax
  const insurancePrice = insurance ? 39 * passengers : 0;
  const finalPrice = totalBasePrice + taxPrice + insurancePrice;

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate generation of unique ticket code
    const randomHex = Math.floor(100000 + Math.random() * 900000);
    setResCode(`GOBILLET-2026-${randomHex}`);
    setStep('success');
  };

  const handlePrint = () => {
    window.print();
  };

  const activeColor = whiteLabelMode ? whiteLabelColor : "#0f766e";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Background Dim Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Main Inner Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full z-10 border border-slate-100 transform scale-100 transition-all text-left">
        
        {/* Banner with Slogan */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button 
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 rounded-lg bg-white/10 text-white">
              {itemType === 'vols' ? <Plane className="w-5 h-5 text-sky-400" /> : itemType === 'hotels' ? <Building2 className="w-5 h-5 text-emerald-400" /> : <Sparkles className="w-5 h-5 text-rose-400" />}
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">Réservation GoBillet</span>
              <h3 className="text-xl font-bold tracking-tight text-white font-sans">Le bon billet, au bon moment</h3>
            </div>
          </div>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleBookSubmit} className="p-6 space-y-6">
            
            {/* Selection Overview item */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Votre Sélection</span>
              <div className="flex justify-between items-start mt-1">
                <div>
                  <h4 className="text-base font-extrabold text-slate-800">
                    {itemType === 'vols' ? `${itemData.airline} : ${itemData.fromCode} → ${itemData.toCode}` : itemType === 'hotels' ? `${itemData.name}` : `${itemData.title}`}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    {itemType === 'vols' ? `Vol direct • Classe ${itemData.classType || 'Économique'}` : itemType === 'hotels' ? `Chambre supérieure • ${itemData.location}` : `Contenu premium • Séjour ${itemData.durationDays || 7} Jours`}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-900">{basePricePerPerson} €</span>
                  <p className="text-[9px] text-slate-400 font-bold">
                    {itemType === 'hotels' ? `par nuit x 7` : `par pers`}
                  </p>
                </div>
              </div>

              {/* Secure guarantee badge */}
              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-emerald-705 text-emerald-700 font-bold">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Garantie de remboursement OpenSaudi / Atout France</span>
                </span>
                <span className="text-slate-400 font-mono">IM075190024</span>
              </div>
            </div>

            {/* Traveler information Form Fields */}
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Informations du passager principal</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Full name input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Prénom & Nom</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Jean Dupont"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-800 outline-none transition-all"
                  />
                </div>

                {/* Email address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Adresse Email</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: jean.dupont@email.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-800 outline-none transition-all"
                  />
                </div>

              </div>
            </div>

            {/* Insurance Toggle Option */}
            <div className="p-4 rounded-xl border border-dashed border-rose-200 bg-rose-50/50 flex items-start space-x-3">
              <input
                type="checkbox"
                id="insurance-check"
                checked={insurance}
                onChange={() => setInsurance(!insurance)}
                className="mt-1 rounded text-rose-500 focus:ring-rose-400"
                style={{ accentColor: "#f43f5e" }}
              />
              <div>
                <label htmlFor="insurance-check" className="text-xs font-bold text-slate-800 cursor-pointer flex items-center space-x-1">
                  <span>Option Assurance Multirisques Tranquillité GoBillet</span>
                  <span className="bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded text-[9px] uppercase font-black">Recommandé</span>
                </label>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5 font-medium">
                  Remboursement garanti à 100% en cas d'imprévu ou de modification de vol. Souscrit auprès d'un partenaire agréé GoBillet par OpenSaudi. <strong>39 € / passager</strong>.
                </p>
              </div>
            </div>

            {/* Price breakdown calculation sidebar and CTA button */}
            <div className="pt-4 border-t border-slate-100">
              <div className="space-y-1.5 text-xs text-slate-600 font-semibold mb-4">
                <div className="flex justify-between">
                  <span>Tarif de base ({passengers} voyageur{passengers > 1 ? 's' : ''})</span>
                  <span>{totalBasePrice} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes aéroportuaires & frais de gestion (APST)</span>
                  <span>{taxPrice} €</span>
                </div>
                {insurance && (
                  <div className="flex justify-between text-rose-600 font-bold">
                    <span>Option Assurance Tranquillité</span>
                    <span>+{insurancePrice} €</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-slate-900 font-black pt-2 border-t border-dashed border-slate-100">
                  <span>Prix Total Garanti</span>
                  <span className="text-lg text-teal-700" style={{ color: whiteLabelMode ? whiteLabelColor : undefined }}>{finalPrice} €</span>
                </div>
              </div>

              {/* Action submit */}
              <button
                type="submit"
                className="w-full text-white font-extrabold text-sm px-6 py-4 rounded-xl shadow-lg transition-all duration-200 transform hover:brightness-105 active:scale-95 text-center block cursor-pointer"
                style={{ backgroundColor: activeColor }}
              >
                Confirmer l'achat du Billet
              </button>
              
              <p className="text-[10px] text-slate-400 font-medium text-center mt-3 leading-snug">
                En confirmant, vous acceptez les conditions de transport et les garanties OpenSaudi d'indemnité financière. Aucun frais caché ne sera facturé ultérieurement.
              </p>
            </div>

          </form>
        ) : (
          /* SUCCESS STATE boarding pass rendering */
          <div className="p-6 space-y-6 text-center">
            
            {/* Visual ticket boarding pass card layout */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden text-left border border-slate-800">
              <div className="absolute right-0 bottom-0 opacity-5 -translate-x-2 -translate-y-2">
                <Ticket className="w-56 h-56" />
              </div>

              {/* Top coupon edge */}
              <div className="flex justify-between items-center pb-4 border-b border-dashed border-white/10">
                <div>
                  <span className="text-[10px] bg-sky-500/10 text-sky-400 font-black tracking-widest uppercase px-2 py-0.5 rounded">
                    Billet Émis avec Succès
                  </span>
                  <h4 className="text-base font-black text-white mt-1">GoBillet Coupon Officiel</h4>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-300 bg-white/5 py-1 px-2.5 rounded border border-white/10 block">
                    {resCode}
                  </span>
                </div>
              </div>

              {/* Middle flight details */}
              <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest block font-sans">Acheteur</span>
                  <p className="text-base font-extrabold text-white mt-0.5">{fullName}</p>
                  <p className="text-xs text-slate-400 font-medium">{email}</p>
                </div>

                <div className="text-center bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest block font-sans">Prestation</span>
                  <p className="text-xs font-extrabold text-white mt-0.5">
                    {itemType === 'vols' ? "Aérien Direct" : itemType === 'hotels' ? "Séjour Hôtelier" : "Séjour Tout-Inclus"}
                  </p>
                  <p className="text-[10px] text-teal-400 font-bold mt-1">✓ Protection OpenSaudi • IATA</p>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest block font-sans">Montant Garanti</span>
                  <p className="text-2xl font-black text-white">{finalPrice} €</p>
                  <p className="text-[9px] text-slate-400 font-bold">TVA & Taxes de séjour comprises</p>
                </div>

              </div>

              {/* Bottom footer note code */}
              <div className="pt-4 border-t border-dashed border-white/10 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Operated by GoBillet Tech Platform</span>
                <span className="font-mono text-[10px] text-slate-500">
                  APST Garant IM075190024 • Statut : EXPÉDIÉ
                </span>
              </div>

            </div>

            {/* Call to print option */}
            <div className="space-y-3">
              <h4 className="text-base font-black text-slate-800">Félicitations, votre contrat de voyage est prêt !</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Un email de confirmation contenant vos e-billets et les conditions d'assurance a été envoyé à l'adresse <strong>{email}</strong>. Vos fonds sont pleinement protégés par notre caution APST et la fiabilité d'OpenSaudi.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimer le Reçu</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center"
                  style={{ backgroundColor: activeColor }}
                >
                  Fermer la fenêtre
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
