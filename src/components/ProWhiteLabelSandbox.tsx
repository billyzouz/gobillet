import React, { useState } from "react";
import { Laptop, Palette, Sliders, Layout, Code, ExternalLink, HelpCircle, Shield, CheckCircle2 } from "lucide-react";

interface ProWhiteLabelSandboxProps {
  onUpdateBrand: (name: string, color: string, isWhiteLabel: boolean) => void;
  brandName: string;
  brandColor: string;
  isWhiteLabel: boolean;
}

export default function ProWhiteLabelSandbox({
  onUpdateBrand,
  brandName,
  brandColor,
  isWhiteLabel
}: ProWhiteLabelSandboxProps) {
  const [customName, setCustomName] = useState(brandName);
  const [borderRadius, setBorderRadius] = useState<"rounded-none" | "rounded-xl" | "rounded-3xl">("rounded-3xl");
  const [embedMode, setEmbedMode] = useState<"standalone" | "iframe">("standalone");
  const [showConfigCode, setShowConfigCode] = useState(false);

  const presets = [
    { name: "Azur Impérial (Billet.fr)", color: "#0284c7", slug: "sky" },
    { name: "Émeraude Royale (Sensation)", color: "#059669", slug: "emerald" },
    { name: "Or Impérial (Prestige)", color: "#b45309", slug: "gold" },
    { name: "Améthyste Intense (Modern)", color: "#7c3aed", slug: "purple" },
    { name: "Rose Intense (Evasion)", color: "#e11d48", slug: "rose" },
    { name: "Slate Minimaliste (Élégance)", color: "#475569", slug: "slate" }
  ];

  const handleApply = (name: string, color: string) => {
    onUpdateBrand(name, color, true);
  };

  const handleReset = () => {
    setCustomName("Billet");
    onUpdateBrand("Billet", "#0284c7", false);
  };

  const generateEmbedCode = () => {
    return `<!-- Intégration Marque Blanche Billet.fr v1.4 -->
<div id="billet-frame-root" 
     data-tenant-id="b2b-partner-98"
     data-theme-color="${brandColor}"
     data-font-family="Plus Jakarta Sans"
     data-corners="${borderRadius}">
</div>
<script src="https://cdn.billet.fr/v1/white-label-bundle.js" async></script>
<script>
  window.BilletSettings = {
    brandName: "${isWhiteLabel ? brandName : 'Billet.fr'}",
    atoutFranceRef: "IM075190024",
    allowCustomInsurance: true,
    accentHex: "${brandColor}"
  };
</script>`;
  };

  return (
    <section id="pro-sandbox" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Visual background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header container */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#10b981] bg-[#10b981]/10 px-3 py-1.5 rounded-full inline-block">
            Espace Pro & Intégration
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mt-4 sm:text-4xl">
            Console Marque Blanche Régulée
          </h2>
          <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-wider leading-relaxed">
            « Prévoyez l'architecture modulaire dès le départ pour vos intégrations marque blanche. »
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Simulez instantanément l'injection dynamique d'autres identités visuelles (logos et palettes graphiques) sur nos moteurs de recherche vols, séjour et hôtels.
          </p>
        </div>

        {/* Console layout Split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Panel: The Workspace Control Deck */}
          <div className="lg:col-span-5 bg-slate-950/90 rounded-3xl p-6 sm:p-8 border border-slate-800/80 flex flex-col justify-between">
            <div className="space-y-6 text-left">
              
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-white uppercase tracking-wider">Configuration Graphique</h3>
              </div>

              {/* Sub-toggle: Toggle State */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300">Statut de la Marque Blanche :</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${isWhiteLabel ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-700 text-slate-300'}`}>
                    {isWhiteLabel ? "Active" : "Par Défaut"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  L'état de la marque blanche applique dynamiquement les couleurs et le titre sur les composants de l'application cliente ci-dessus en temps réel.
                </p>
              </div>

              {/* Param 1: Custom logo parameter */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">Nom légal du licencié B2B :</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Ex: MonAgenceTours"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-white outline-none focus:border-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleApply(customName, brandColor)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 rounded-xl"
                  >
                    Renommer
                  </button>
                </div>
              </div>

              {/* Param 2: Presets of color palettes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">Combinaison Visuelle (Couleur Accent) :</label>
                <div className="grid grid-cols-2 gap-2">
                  {presets.map((p) => {
                    const isSelected = brandColor === p.color && isWhiteLabel;
                    return (
                      <button
                        key={p.color}
                        type="button"
                        onClick={() => {
                          setCustomName(isWhiteLabel && customName !== "Billet" ? customName : p.name.split(" ")[0]);
                          handleApply(isWhiteLabel && customName !== "Billet" ? customName : p.name.split(" ")[0], p.color);
                        }}
                        className={`text-left p-2 rounded-lg border text-xs font-semibold flex items-center space-x-2 transition-all ${
                          isSelected 
                            ? "bg-slate-800 border-white/60 text-white" 
                            : "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300"
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                        <span className="truncate">{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Param 3: Border Radius slider */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">Angle d'arrondi des boutons & des cartes :</label>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-extrabold uppercase">
                  <button
                    onClick={() => setBorderRadius("rounded-none")}
                    className={`p-2 rounded border ${borderRadius === 'rounded-none' ? 'border-emerald-400 bg-emerald-500/10 text-white' : 'border-slate-800 text-slate-400'}`}
                  >
                    Anguleux (0px)
                  </button>
                  <button
                    onClick={() => setBorderRadius("rounded-xl")}
                    className={`p-2 rounded border ${borderRadius === 'rounded-xl' ? 'border-emerald-400 bg-emerald-500/10 text-white' : 'border-slate-800 text-slate-400'}`}
                  >
                    Classique (12px)
                  </button>
                  <button
                    onClick={() => setBorderRadius("rounded-3xl")}
                    className={`p-2 rounded border ${borderRadius === 'rounded-3xl' ? 'border-emerald-400 bg-emerald-500/10 text-white' : 'border-slate-800 text-slate-400'}`}
                  >
                    Capsule (24px)
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Controls Reset */}
            <div className="pt-6 border-t border-slate-800/80 flex justify-between items-center mt-6">
              <button
                onClick={handleReset}
                className="text-slate-400 hover:text-white text-xs font-bold transition-colors"
              >
                Réinitialiser par défaut
              </button>
              
              <button
                onClick={() => setShowConfigCode(!showConfigCode)}
                className="text-xs font-bold bg-[#10b981] hover:bg-emerald-600 text-white px-3.5 py-2.5 rounded-xl flex items-center space-x-1.5"
              >
                <Code className="w-4 h-4" />
                <span>{showConfigCode ? "Masquer le code" : "Générer l'Iframe"}</span>
              </button>
            </div>

          </div>

          {/* Right Panel: Technical Sandbox preview Output */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800/80 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Laptop className="w-5 h-5 text-sky-400" />
                  <span className="text-xs font-black uppercase text-slate-300 tracking-wider">Console de Déploiement</span>
                </div>
                <span className="font-mono text-[9px] text-[#10b981] bg-emerald-500/10 py-1 px-2 rounded">
                  Status: Compilation OK • v1.4
                </span>
              </div>

              {/* Explanatory info about the code API hooks */}
              <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/30 text-xs space-y-3 leading-relaxed">
                <p className="font-semibold text-slate-300">
                  <strong className="text-teal-400">Pourquoi cette modularité est critique :</strong> Les voyagistes recherchent des architectures découplées. Notre front-end est câblé de manière à ce que les variables de thèmes soient injectées en CSS Custom Properties (`--color-brand-primary`). 
                </p>
                
                {/* Atout France regulatory reminder */}
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-[10px]">
                    <span className="font-bold text-rose-200">Point Réglementation Légale :</span>
                    <p className="mt-0.5">
                      Chaque marque blanche de voyage hébergeant des ventes d'hôtels et forfaits complétés en France **doit faire mention** de l'immatriculation d'agent de voyage Atout France. Billet.fr fournit par défaut l'immatriculation IM075190024 pour couvrir légitimement les transactions B2B2C.
                    </p>
                  </div>
                </div>
              </div>

              {/* Embed Code Textarea */}
              {showConfigCode ? (
                <div className="mt-4 space-y-2">
                  <span className="text-xs font-bold text-slate-400 block font-mono">Code d'intégration Iframe / JavaScript :</span>
                  <pre className="p-4 bg-slate-900 rounded-xl font-mono text-[10px] text-teal-300 overflow-x-auto border border-slate-800/50 leading-normal max-h-48 select-all">
                    {generateEmbedCode()}
                  </pre>
                </div>
              ) : (
                /* Live schema output metrics representation */
                <div className="mt-4 space-y-3 font-mono text-xs text-slate-400">
                  <span className="text-slate-500 block">Propriétés CSS héritées par le moteur :</span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">--color-accent-hex</span>
                      <span className="text-white font-bold">{brandColor}</span>
                      <span className="w-3 h-3 rounded-full inline-block ml-2 align-middle border border-slate-700" style={{ backgroundColor: brandColor }} />
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">--brand-name</span>
                      <span className="text-white font-bold">{isWhiteLabel ? brandName : "Billet.fr"}</span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">--border-radius</span>
                      <span className="text-white font-bold">{borderRadius === 'rounded-none' ? "0px" : borderRadius === 'rounded-xl' ? "12px" : "24px"}</span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">--atout-france-caution</span>
                      <span className="text-[#10b981] font-bold">Oui (APST 100%)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Certification verification icon tag line */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-bold">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                <span>Module validé conforme pour les futurs constructeurs de site</span>
              </span>
              <span>Propulsé par Billet.fr SAS</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
