import React from 'react';
import { WhatsAppIcon } from './Icons';
import { WHATSAPP_NUMBER } from '../constants';

const FloatingContact: React.FC = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de mais informações sobre as aulas e passeios.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
      aria-label="Contact us on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8" />
    </a>
  );
};

export default FloatingContact;