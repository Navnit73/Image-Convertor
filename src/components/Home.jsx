import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaImage, FaDownload } from "react-icons/fa";

const Home = ({ setImage }) => {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      navigate("/convert");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      navigate("/convert");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-indigo-100 flex flex-col items-center p-6">
      <header className="text-center max-w-3xl mb-12">
        <h1 className="text-5xl font-bold text-indigo-700 mb-6" role="heading" aria-level="1">
          Free Online Image Converter
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Effortlessly convert your images to multiple formats. Whether it's for personal or professional use, 
          our tool offers fast, high-quality conversions with customizable sizes.
        </p>
      </header>

      <section>
        <label htmlFor="file-upload" className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg">
          <FaUpload className="inline-block mr-2" /> Upload Image
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload image file"
        />
      </section>

      <section
        aria-live="polite"
        aria-labelledby="drag-drop"
        className={`mt-8 border-2 ${dragging ? "border-indigo-600 bg-indigo-50" : "border-dashed border-gray-300 bg-gray-100"} w-full max-w-lg h-40 flex items-center justify-center text-gray-600 text-sm rounded-lg`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <FaImage className="text-indigo-500 mr-2" /> Drag and Drop your image here
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <StepCard
          step={1}
          description="Upload your image to begin the conversion process."
          icon={<FaUpload className="text-yellow-500 text-3xl" />}
        />
        <StepCard
          step={2}
          description="Customize the image size and format using the tool."
          icon={<FaImage className="text-blue-500 text-3xl" />}
        />
        <StepCard
          icon={<FaDownload className="text-green-500 text-3xl" />}
          step={3}
          description="Download your converted image instantly."
        />
      </section>
    </div>
  );
};

const StepCard = ({ step, description, icon }) => (
  <article className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200 hover:border-indigo-500 transition transform hover:scale-105">
    <div className="mb-4 flex justify-center items-center">{icon}</div>
    <h3 className="text-2xl font-semibold text-indigo-700 mb-4" role="heading" aria-level="2">
      Step {step}
    </h3>
    <p className="text-gray-600">{description}</p>
  </article>
);

export default Home;
