import React, { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaUpload, FaDownload, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importing Link for routing

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-indigo-600 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold flex items-center">
          <FaHome className="mr-2" />
          <span>Image Converter</span>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-indigo-200 transition">Home</Link>
          <Link to="/convert" className="hover:text-indigo-200 transition">Convert</Link>
          <Link to="/ecommerce" className="hover:text-indigo-200 transition">E-commerce Optimizer</Link>
          <Link to="/ocr" className="hover:text-indigo-200 transition">OCR</Link>
          <Link to="/social-media" className="hover:text-indigo-200 transition">Social Media</Link>
          
        </nav>
        {/* Mobile Menu Icon */}
        <div className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 p-4">
          <nav className="space-y-4">
            <Link to="/" className="block text-white">Home</Link>
            <Link to="/convert" className="block text-white">Convert</Link>
            <Link to="/ecommerce" className="block text-white">E-commerce Optimizer</Link>
            <Link to="/ocr" className="block text-white">OCR</Link>
            <Link to="/social-media" className="block text-white">Social Media</Link>
          
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
