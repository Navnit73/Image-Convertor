import React, { useState } from 'react';
import { FaImage, FaDownload, FaShoppingCart } from 'react-icons/fa';

const ECommerceOptimizer = () => {
  const [image, setImage] = useState(null);
  const [optimizedImage, setOptimizedImage] = useState(null);
  const [width, setWidth] = useState(500); // Default width for e-commerce
  const [height, setHeight] = useState(500); // Default height for e-commerce

  // Handle image file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setOptimizedImage(null); // Reset optimized image when new file is uploaded
    }
  };

  // Resize image to match the e-commerce product image standards
  const handleResizeImage = (img, width, height) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg'); // Return resized image in JPEG format
  };

  // Optimize the uploaded image
  const handleOptimizeImage = () => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const resizedImage = handleResizeImage(img, width, height);
        setOptimizedImage(resizedImage); // Set the optimized image (resized)
      };
    }
  };

  // Download the optimized image
  const handleDownload = () => {
    if (!optimizedImage) return;

    const link = document.createElement('a');
    link.href = optimizedImage;
    link.download = 'optimized-product.jpg'; // You can change this as needed
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-indigo-100 flex flex-col items-center py-6 px-4 md:px-10">
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-6 text-center">E-commerce Image Optimizer</h1>
      <p className="text-gray-700 text-lg mb-8 text-center max-w-2xl mx-auto">
        Upload your product image, and we'll optimize it for e-commerce platforms like Amazon, eBay, and more.
      </p>

      {/* File Upload */}
      <label className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg mb-6 w-full flex justify-center">
        <FaImage className="inline-block mr-2" /> Upload Image
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>

      {/* Image Dimension Inputs */}
      <div className="w-full max-w-xl mb-6 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <label className="block text-gray-600 mb-2">Width (px)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full bg-white border rounded-lg p-3 text-gray-800"
            min="100"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-600 mb-2">Height (px)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-white border rounded-lg p-3 text-gray-800"
            min="100"
          />
        </div>
      </div>

      {/* Optimize Image Button */}
      <button
        className="mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-lg w-full md:w-auto hover:bg-blue-700 transition"
        onClick={handleOptimizeImage}
      >
        <FaShoppingCart className="inline-block mr-2" /> Optimize Image
      </button>

      {/* Display optimized image and download button only when image is optimized */}
      {optimizedImage && (
        <>
          <div className="mt-8 w-full max-w-xl text-center">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">Optimized Image Preview</h3>
            <img src={optimizedImage} alt="Optimized" className="max-w-full h-auto mb-6" />
          </div>

          {/* Download Optimized Image Button */}
          <button
            onClick={handleDownload}
            className="mt-4 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg w-full md:w-auto hover:bg-teal-700 transition"
          >
            <FaDownload className="inline-block mr-2" /> Download Optimized Image
          </button>
        </>
      )}
    </div>
  );
};

export default ECommerceOptimizer;
