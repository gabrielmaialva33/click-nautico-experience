import React from 'react';
import { TOURS } from '../constants';
import { SunIcon } from './Icons';

const ToursSection: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn px-4">
       {/* Intro */}
       <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
           <SunIcon className="w-8 h-8 text-orange-400" /> Passeios Turísticos
        </h2>
        <p className="text-slate-600">
          Descubra as belezas naturais do litoral potiguar. Organizamos passeios exclusivos 
          para você e sua família aproveitarem o melhor de Touros e região.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TOURS.map((tour) => (
          <div key={tour.id} className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={tour.image} 
                alt={tour.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 text-white">
                 <p className="text-xs font-bold bg-orange-500 px-2 py-1 rounded mb-1 inline-block">{tour.duration}</p>
                 <h3 className="text-xl font-bold">{tour.title}</h3>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <p className="text-slate-600 mb-6">{tour.description}</p>
              <button className="w-full py-3 rounded-lg border-2 border-orange-500 text-orange-500 font-bold hover:bg-orange-500 hover:text-white transition-colors uppercase text-sm tracking-wider">
                Reservar Passeio
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-orange-50 rounded-2xl p-8 text-center border border-orange-100">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Passeios Personalizados?</h3>
        <p className="text-slate-600 mb-6">
          Quer montar um roteiro exclusivo para seu grupo? Entre em contato e organizamos tudo para você.
        </p>
        <div className="inline-block bg-white px-6 py-2 rounded-full shadow-sm text-sm font-semibold text-orange-600">
          Saídas diárias do Vila Galé Touros
        </div>
      </div>
    </div>
  );
};

export default ToursSection;