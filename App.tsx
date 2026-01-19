import React, { useState } from 'react';
import { TabView } from './types';
import { INSTAGRAM_LINK } from './constants';
import { InstagramIcon, WindIcon, SunIcon } from './components/Icons';
import KiteSchoolSection from './components/KiteSchoolSection';
import ToursSection from './components/ToursSection';
import FloatingContact from './components/FloatingContact';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.KITE);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Hero Header */}
      <header className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1920/1080?random=5" 
            alt="Ocean Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-slate-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 mt-8 w-full max-w-4xl">
          <div className="inline-block mb-3 animate-bounce">
            <span className="bg-cyan-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
              Vila Galé Touros
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-2 tracking-tight leading-tight">
            CLICK NÁUTICO
          </h1>
          <p className="text-base md:text-xl text-white/95 font-medium tracking-wide max-w-lg mx-auto drop-shadow-sm">
            Kite School & Passeios Turísticos
          </p>
          
          <div className="mt-6 flex justify-center gap-4">
            <a 
              href={INSTAGRAM_LINK} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-white hover:text-cyan-200 transition-colors bg-white/20 hover:bg-white/30 border border-white/30 px-5 py-2.5 rounded-full backdrop-blur-md active:scale-95 duration-200"
            >
              <InstagramIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">@clicknautico.kiteschool</span>
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs (Sticky) */}
      <div className="sticky top-0 z-40 bg-slate-50/95 backdrop-blur-md border-b border-slate-200 shadow-sm safe-area-inset-top">
        <div className="max-w-4xl mx-auto flex p-2 gap-2 md:gap-4">
          <button
            onClick={() => setActiveTab(TabView.KITE)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 md:py-4 rounded-xl transition-all duration-300 font-bold text-sm md:text-lg active:scale-95 ${
              activeTab === TabView.KITE 
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200/50' 
                : 'text-slate-500 hover:bg-slate-200 bg-white'
            }`}
          >
            <WindIcon className="w-5 h-5 md:w-6 md:h-6" />
            Kite Surf
          </button>
          <button
            onClick={() => setActiveTab(TabView.TOURS)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 md:py-4 rounded-xl transition-all duration-300 font-bold text-sm md:text-lg active:scale-95 ${
              activeTab === TabView.TOURS 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-200/50' 
                : 'text-slate-500 hover:bg-slate-200 bg-white'
            }`}
          >
            <SunIcon className="w-5 h-5 md:w-6 md:h-6" />
            Passeios
          </button>
        </div>
      </div>

      {/* Main Content Area - Added padding bottom for floating button space */}
      <main className="flex-grow w-full max-w-5xl mx-auto py-6 md:py-12 pb-28">
        {activeTab === TabView.KITE ? <KiteSchoolSection /> : <ToursSection />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center pb-24 md:pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-white font-bold text-xl mb-4 tracking-wider">CLICK NÁUTICO</h2>
          <p className="mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Localizado no hotel Vila Galé Touros. <br/>Oferecemos as melhores experiências náuticas do litoral.
          </p>
          <div className="border-t border-slate-800 pt-8 text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Click Nautico. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <FloatingContact />
    </div>
  );
};

export default App;