import React from 'react';
import { LESSON_PRICES, RENTAL_PRICES, SPECIAL_ACTIVITIES, COURSE_STAGES } from '../constants';
import { CheckIcon, WindIcon } from './Icons';

const KiteSchoolSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-fadeIn pb-8">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Click Náutico <span className="text-cyan-600">Kite School</span>
        </h2>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed">
          Aprenda a voar sobre as águas com segurança e técnica. 
          Nossos instrutores certificados garantem sua evolução do zero ao velejo.
        </p>
      </div>

      {/* Course Stages - Visual Timeline */}
      <section className="px-4" aria-label="Etapas do Curso">
        <div className="text-center mb-10">
          <span className="text-cyan-600 font-bold tracking-wider uppercase text-xs mb-2 block">Metodologia</span>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
            Etapas do Curso
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-200 -z-10 rounded-full opacity-50"></div>

          {COURSE_STAGES.map((stage, index) => (
            <div key={stage.step} className="group relative flex flex-col items-center text-center">
              {/* Number Badge */}
              <div className="w-24 h-24 rounded-full bg-white border-4 border-cyan-50 shadow-xl flex items-center justify-center relative z-10 mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl font-black text-cyan-600 bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-600">
                  {stage.step}
                </span>
                {index < 2 && (
                  <div className="md:hidden absolute -bottom-10 left-1/2 w-1 h-10 bg-slate-200 -translate-x-1/2"></div>
                )}
              </div>
              
              {/* Content Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                <h4 className="text-lg font-bold text-slate-800 mb-3 uppercase tracking-wide">
                  {stage.title}
                </h4>
                <div className="w-12 h-1 bg-cyan-500 mx-auto mb-4 rounded-full"></div>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {stage.description}
                </p>
                {/* Visual hint of image/activity type */}
                <div className="mt-4 pt-4 border-t border-slate-50">
                    <span className="text-xs font-semibold text-slate-400 uppercase">{stage.imageKeyword.replace('kitesurf ', '')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4" aria-label="Lista de Preços">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
            <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                    <WindIcon className="w-8 h-8 text-cyan-600" /> 
                    Investimento
                </h3>
                <p className="text-slate-500 text-sm mt-1">Escolha o pacote ideal para sua evolução</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                Mínimo de 2 horas por aula
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LESSON_PRICES.map((lesson) => (
            <div 
              key={lesson.id} 
              className={`relative flex flex-col bg-white rounded-2xl p-6 transition-all duration-300 ${
                  lesson.isPopular 
                  ? 'border-2 border-cyan-500 shadow-xl shadow-cyan-100 scale-100 md:scale-105 z-10' 
                  : 'border border-slate-100 shadow-sm hover:shadow-md'
              }`}
            >
              {lesson.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                  Recomendado
                </div>
              )}
              
              <div className="mb-4">
                  <h4 className="text-lg font-bold text-slate-800 leading-tight min-h-[3rem] flex items-center">
                    {lesson.name}
                  </h4>
                  <p className="text-slate-500 text-sm mt-2">{lesson.details}</p>
              </div>
              
              {lesson.highlight && (
                 <div className="my-3 bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg font-bold border border-green-100 flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 shrink-0 mt-0.5" /> 
                    <span>{lesson.highlight}</span>
                 </div>
              )}

              <div className="mt-auto pt-6 border-t border-slate-50 flex items-end justify-between">
                <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Valor</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm text-slate-500 font-medium">R$</span>
                        <span className="text-3xl font-extrabold text-cyan-700">{lesson.price}</span>
                    </div>
                </div>
                <button className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${
                    lesson.isPopular ? 'bg-cyan-600 text-white hover:bg-cyan-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}>
                    Reservar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Experiences */}
      <section className="px-2 md:px-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-10 rounded-3xl shadow-xl text-white relative overflow-hidden">
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            
            <div className="relative z-10 px-6">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-2">Experiências Especiais</h3>
                <p className="text-slate-400 text-center mb-8 text-sm">Vivências exclusivas para quem busca algo a mais</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {SPECIAL_ACTIVITIES.map((activity) => (
                    <div key={activity.id} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 hover:bg-white/15 transition-colors">
                        <div>
                            <h4 className="text-lg font-bold text-white">{activity.name}</h4>
                            <p className="text-sm text-slate-300 mt-1">{activity.details}</p>
                        </div>
                        <div className="flex flex-col items-center sm:items-end">
                            <span className="text-xs text-slate-400 uppercase">Por pessoa</span>
                            <span className="text-2xl font-bold text-cyan-400">R$ {activity.price}</span>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </section>

      {/* Rentals Table */}
      <section className="px-4">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-slate-800 pl-3">
            Aluguel de Equipamentos
        </h3>
        
        <div className="overflow-hidden rounded-xl shadow-lg border border-slate-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap md:whitespace-normal">
                <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-xs tracking-wider">
                <tr>
                    <th scope="col" className="px-6 py-5 min-w-[160px]">Item</th>
                    <th scope="col" className="px-6 py-5 text-center w-32">1 Hora</th>
                    <th scope="col" className="px-6 py-5 text-center w-32">2 Horas</th>
                    <th scope="col" className="px-6 py-5 text-center w-32 text-cyan-700 bg-cyan-50/50">Diária</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {RENTAL_PRICES.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{item.item}</td>
                    <td className="px-6 py-4 text-center font-medium">R$ {item.h1}</td>
                    <td className="px-6 py-4 text-center font-medium">R$ {item.h2}</td>
                    <td className="px-6 py-4 text-center text-cyan-700 font-bold bg-cyan-50/30">R$ {item.daily}</td>
                    </tr>
                ))}
                <tr className="bg-orange-50/50">
                    <td className="px-6 py-4 font-semibold text-orange-900 text-xs md:text-sm flex items-center gap-2">
                        <span>Acessórios Extras</span>
                        <span className="text-[10px] text-orange-600/70 font-normal">(Capacete, Colete, Trapézio)</span>
                    </td>
                    <td colSpan={3} className="px-6 py-4 text-center font-bold text-orange-700 text-sm">
                    R$ 100 <span className="text-[10px] font-normal uppercase ml-1 opacity-70">Taxa Única</span>
                    </td>
                </tr>
                </tbody>
            </table>
          </div>
        </div>
        <p className="mt-3 text-[11px] text-slate-400 italic text-right">* Equipamentos sujeitos a disponibilidade e avaliação técnica.</p>
      </section>
    </div>
  );
};

export default KiteSchoolSection;