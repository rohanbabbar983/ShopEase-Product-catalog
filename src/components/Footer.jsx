import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-12">
      <div className=" p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600">
        
        <div className="text-lg font-semibold text-blue-600">
          © {new Date().getFullYear()} ShopEase
        </div>

        <div className="flex gap-4 text-lg">
          <a href="https://github.com/rohanbabbar983" target="_blank" rel="noopener noreferrer" className="hover:text-black">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/rohan-babbar-039512239/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
            <FaLinkedin size={20} />
          </a>
          <a href="mailto:rohanbabbar2003@gmail.com" className="hover:text-red-500">
            <FaEnvelope size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
