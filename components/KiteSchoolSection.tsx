import React from 'react';
import { LESSON_PRICES, RENTAL_PRICES, SPECIAL_ACTIVITIES } from '../constants';
import { CheckIcon, WindIcon } from './Icons';

const KiteSchoolSection: React.FC = () => {
  return (
    <div className="space-y-10 md:space-y-16 animate-fadeIn">
      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-3">
          Click Náutico Kite School
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Aprenda a voar sobre as águas com instrutores certificados e equipamentos de ponta. 
          Localizado na Vila Galé Touros.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="px-4">
        <h3 className="text-xl md:text-2xl font-bold text-cyan-700 mb-6 flex items-center gap-2">
          <WindIcon className="w-6 h-6" /> Aulas e Cursos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LESSON_PRICES.map((lesson) => (
            <div 
              key={lesson.id} 
              className={`relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border transition-all duration-300 ${lesson.isPopular ? 'border-cyan-500 ring-1 ring-cyan-500 shadow-cyan-100' : 'border-slate-100'}`}
            >
              {lesson.isPopular && (
                <span className="absolute -top-3 right-4 bg-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                  Mais Popular
                </span>
              )}
              <h4 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{lesson.name}</h4>
              <p className="text-slate-500 text-sm mb-4 min-h-[20px]">{lesson.details}</p>
              <div className="flex items-baseline gap-1 mt-auto">
                <span className="text-xs text-slate-400 font-medium">R$</span>
                <span className="text-3xl font-bold text-cyan-600">{lesson.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Activities */}
      <div className="px-2 md:px-4">
        <div className="bg-gradient-to-br from-cyan-50 to-white py-8 rounded-3xl border border-cyan-100 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-cyan-800 mb-6 text-center">Experiências Especiais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto px-4">
            {SPECIAL_ACTIVITIES.map((activity) => (
                <div key={activity.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-3">
                    <div>
                    <h4 className="text-base font-bold text-slate-800">{activity.name}</h4>
                    <p className="text-xs text-slate-500">{activity.details}</p>
                    </div>
                    <div className="text-xl font-bold text-cyan-700 whitespace-nowrap">R$ {activity.price}</div>
                </div>
            ))}
            </div>
        </div>
      </div>

      {/* Rentals Table */}
      <div className="px-4">
        <h3 className="text-xl md:text-2xl font-bold text-slate-700 mb-4">Aluguel (Rental)</h3>
        
        {/* Mobile scroll hint */}
        <div className="md:hidden text-xs text-slate-400 mb-2 flex items-center gap-1 animate-pulse">
            <span>← Arraste a tabela para ver valores →</span>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-slate-100 bg-white">
          <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap md:whitespace-normal">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-xs">
              <tr>
                <th scope="col" className="px-6 py-4 min-w-[140px]">Equipamento</th>
                <th scope="col" className="px-6 py-4 text-center">1 Hora</th>
                <th scope="col" className="px-6 py-4 text-center">2 Horas</th>
                <th scope="col" className="px-6 py-4 text-center text-cyan-700">Diária</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RENTAL_PRICES.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{item.item}</td>
                  <td className="px-6 py-4 text-center">R$ {item.h1}</td>
                  <td className="px-6 py-4 text-center">R$ {item.h2}</td>
                  <td className="px-6 py-4 text-center text-cyan-600 font-bold bg-cyan-50/30">R$ {item.daily}</td>
                </tr>
              ))}
              <tr className="bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-800 text-xs md:text-sm">Acessórios (Capacete/Colete/Trapézio)</td>
                <td colSpan={3} className="px-6 py-4 text-center font-bold text-slate-600 text-xs md:text-sm">
                  R$ 100 (Taxa Única)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[10px] md:text-xs text-slate-400 text-center">* Equipamentos sujeitos a disponibilidade. Mínimo de 2 horas para cursos.</p>
      </div>
    </div>
  );
};

export default KiteSchoolSection;