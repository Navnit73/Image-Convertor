import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">About Us</h3>
          <p className="text-gray-400">
            We provide an easy and efficient online tool to convert your images to any desired format. Fast, simple, and reliable image conversion at your fingertips.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="text-gray-400 hover:text-indigo-400 transition">Home</a></li>
            <li><a href="#features" className="text-gray-400 hover:text-indigo-400 transition">Features</a></li>
            <li><a href="#contact" className="text-gray-400 hover:text-indigo-400 transition">Contact</a></li>
            <li><a href="#terms" className="text-gray-400 hover:text-indigo-400 transition">Terms of Service</a></li>
            <li><a href="#privacy" className="text-gray-400 hover:text-indigo-400 transition">Privacy Policy</a></li>
          </ul>
        </div>
        {/* Social Media Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="https://facebook.com" className="text-gray-400 hover:text-blue-500 transition"><FaFacebook size={24} /></a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition"><FaTwitter size={24} /></a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-pink-500 transition"><FaInstagram size={24} /></a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-700 transition"><FaLinkedin size={24} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center text-gray-500">
        <p>&copy; 2024 Image Converter. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
