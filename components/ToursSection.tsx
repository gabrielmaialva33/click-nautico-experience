import React from 'react';
import { TOURS } from '../constants';
import { SunIcon } from './Icons';

const ToursSection: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn px-4 pb-8">
       {/* Intro */}
       <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 flex items-center justify-center gap-3">
           <SunIcon className="w-8 h-8 text-orange-500" /> 
           <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
             Passeios Turísticos
           </span>
        </h2>
        <p className="text-slate-600 text-lg">
          Explore o "Caribe Brasileiro". Roteiros exclusivos saindo do Vila Galé.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TOURS.map((tour) => (
          <div key={tour.id} className="group flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={tour.image} 
                alt={tour.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                 <div className="flex justify-between items-end">
                    <h3 className="text-xl font-bold leading-tight mb-1 shadow-black drop-shadow-md">{tour.title}</h3>
                 </div>
                 <div className="flex items-center gap-2 text-xs font-medium text-orange-200">
                    <span className="bg-orange-500/90 px-2 py-0.5 rounded text-white shadow-sm">Duração: {tour.duration}</span>
                 </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col justify-between bg-white relative z-10">
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {tour.description}
              </p>
              
              <button className="w-full py-3.5 rounded-xl bg-slate-50 text-slate-700 font-bold border border-slate-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-200 uppercase text-xs tracking-widest shadow-sm">
                Mais Informações
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="relative bg-orange-500 rounded-3xl p-8 md:p-12 text-center overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        <div className="relative z-10 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Passeios Personalizados?</h3>
            <p className="text-orange-100 mb-8 max-w-xl mx-auto text-lg">
            Quer montar um roteiro exclusivo para seu grupo? Entre em contato e organizamos tudo para você.
            </p>
            <div className="inline-flex items-center justify-center bg-white text-orange-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-50 transition-colors cursor-pointer">
            Falar com Concierge
            </div>
        </div>
      </div>
    </div>
  );
};

export default ToursSection;