import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#daf0e4] dark:bg-[#7ac19a] shadow-md mt-20 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row justify-center md:justify-between gap-4 md:px-[50px]">
          <div className="flex flex-col items-center md:flex-row md:items-center gap-3">
            <img
              src="public/images/Roomly logo.png"
              alt="Logo de la empresa"
              className="h-14 w-auto"
            />
            <p className="text-gray-800 dark:text-gray-300 text-sm text-center">
              © 2024 Roomly. Todos los derechos reservados.
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com"
              className="text-gray-800 dark:text-gray-300 hover:text-[#34565E]"
            >
              <FaFacebookF />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.x.com"
              className="text-gray-800 dark:text-gray-300 hover:text-[#34565E]"
            >
              <FaTwitter />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com"
              className="text-gray-800 dark:text-gray-300 hover:text-[#34565E]"
            >
              <FaYoutube />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com"
              className="text-gray-800 dark:text-gray-300 hover:text-[#34565E]"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
