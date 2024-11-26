import React, { useState } from 'react';
import { FaImage, FaFileAlt } from 'react-icons/fa';
import Tesseract from 'tesseract.js';
import { LinearProgress } from '@mui/material';  // Importing Material-UI progress bar

const OCR = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0); // Track OCR progress

  // Handle image file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      extractText(file);
    }
  };

  // Extract text using OCR and track progress
  const extractText = (file) => {
    setIsProcessing(true); // Start processing
    setProgress(0); // Reset progress bar

    Tesseract.recognize(
      file,
      'eng',
      {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(m.progress * 100); // Update progress bar as OCR is processed
          }
        }
      }
    ).then(({ data: { text } }) => {
      setText(text);
      setIsProcessing(false); // Processing complete
    });
  };

  // Function to apply styling to extracted text
  const formatText = (text) => {
    // Simple styling logic to make headings bold and paragraphs normal text
    return text.split('\n').map((line, index) => {
      if (line.trim().endsWith(':')) {
        return <h2 key={index} className="font-bold text-indigo-700">{line}</h2>;
      } else if (line.trim().startsWith('*')) {
        return <p key={index} className="italic">{line.slice(1).trim()}</p>;
      } else {
        return <p key={index} className="text-gray-800">{line}</p>;
      }
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-indigo-100 flex flex-col items-center py-6 px-4 md:px-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-6 text-center">Image-to-Text (OCR)</h1>
        <p className="text-gray-700 text-lg mb-8 text-center max-w-2xl mx-auto">
          Upload an image with text, and we'll extract the text for you using OCR.
        </p>
      </header>

      <section className="w-full max-w-lg mb-6">
        <label className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg w-full flex justify-center" htmlFor="file-upload">
          <FaImage className="inline-block mr-2" /> Upload Image
        </label>
        <input 
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload an image for text extraction"
        />
      </section>

      {/* Progress Bar */}
      {isProcessing && (
        <section className="w-full max-w-lg mt-6">
          <LinearProgress variant="determinate" value={progress} className="h-2" />
        </section>
      )}

      {/* Extracted Text Display */}
      {text && !isProcessing && (
        <section className="mt-8 w-full max-w-lg text-center">
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">Extracted Text</h3>
          <div className="w-full text-left text-gray-800">
            {formatText(text)}
          </div>
        </section>
      )}
    </main>
  );
};

export default OCR;
