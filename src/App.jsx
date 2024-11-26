import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import ImageConverter from './components/ImageConverter.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footor.jsx';
import ECommerceOptimizer from './components/ECommerceOptimizer.jsx'; // E-commerce Ready Optimizer Page Component
import OCR from './components/OCR.jsx'; // OCR (Image-to-Text Conversion) Page Component
import SocialMediaOptimizer from './components/SocialMediaOptimizer.jsx'; // Socia

import { useState } from 'react';
const App = () => {
  const [image, setImage] = useState(null);
  return (
    <Router>
       <Header />
      <Routes>
     
      <Route path="/" element={<Home setImage={setImage} />} />
      <Route path="/convert" element={<ImageConverter image={image} setImage={setImage} />} />
      <Route path="/ecommerce" element={<ECommerceOptimizer />} />
        <Route path="/ocr" element={<OCR />} />
        <Route path="/social-media" element={<SocialMediaOptimizer />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
