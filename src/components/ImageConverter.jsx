import React, { useState, useEffect, useRef } from "react";
import { FaFileImage, FaDownload, FaToolbox, FaUpload } from "react-icons/fa"; // Icons

const ImageConverter = ({ image, setImage }) => {
  const [convertedImage, setConvertedImage] = useState(null);
  const [format, setFormat] = useState("JPEG");
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [imageType, setImageType] = useState("");
  const [desiredSize, setDesiredSize] = useState(20); // Desired size in KB

  // Reference to the hidden file input
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (image) {
      const currentType = image.split(".").pop().toUpperCase();
      setImageType(currentType);
    }
  }, [image]);

  const handleConvert = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      let mimeType = `image/${format.toLowerCase()}`;
      binarySearchForQuality(canvas, mimeType, desiredSize * 1024); // Convert KB to bytes
    };

    img.src = image;
  };

  const binarySearchForQuality = (canvas, mimeType, targetSize) => {
    let low = 0.1;
    let high = 1.0;
    let quality = high;
    let iterationLimit = 20; // Prevent infinite loops

    while (low <= high && iterationLimit > 0) {
      quality = (low + high) / 2;
      const base64 = canvas.toDataURL(mimeType, quality);
      const size = Math.ceil((base64.length * 3) / 4) - 2; // Calculate approximate size in bytes

      if (Math.abs(size - targetSize) <= 1024) {
        setConvertedImage(base64);
        return;
      } else if (size > targetSize) {
        high = quality - 0.01;
      } else {
        low = quality + 0.01;
      }
      iterationLimit--;
    }

    // If the exact size isn't achieved, use the best attempt
    setConvertedImage(canvas.toDataURL(mimeType, quality));
  };

  const handleDownload = () => {
    if (!convertedImage) return;

    const link = document.createElement("a");
    link.href = convertedImage;
    link.download = `converted-image.${format.toLowerCase()}`;
    link.click();
  };

  // Handle new image upload (clear current image)
  const handleUploadNewImage = () => {
    setImage(null); // Clear current image
    fileInputRef.current.click(); // Trigger file input to upload new image
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Set the uploaded image
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-indigo-100 flex flex-col md:flex-row p-6">
      {/* Left Card */}
      <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Convert Your Image</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Original Format</label>
          <input
            type="text"
            value={imageType || "N/A"}
            disabled
            className="w-full bg-gray-100 p-2 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Convert to</label>
          <select
            className="w-full bg-gray-100 p-2 rounded mt-1"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="JPEG">JPEG</option>
            <option value="PNG">PNG</option>
            <option value="WEBP">WEBP</option>
            <option value="BMP">BMP</option>
            <option value="GIF">GIF</option>
            <option value="TIFF">TIFF</option>
            <option value="SVG">SVG</option>
          </select>
        </div>
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Width (px)</label>
            <input
              type="number"
              className="w-full bg-gray-100 p-2 rounded mt-1"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Height (px)</label>
            <input
              type="number"
              className="w-full bg-gray-100 p-2 rounded mt-1"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Desired Size (KB)</label>
          <input
            type="number"
            className="w-full bg-gray-100 p-2 rounded mt-1"
            value={desiredSize}
            onChange={(e) => setDesiredSize(Number(e.target.value))}
          />
        </div>
        <button
          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition mb-4"
          onClick={handleConvert}
        >
          <FaToolbox className="inline-block mr-2" /> Convert
        </button>
        {convertedImage && (
          <button
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg w-full hover:bg-teal-700 transition"
            onClick={handleDownload}
          >
            <FaDownload className="inline-block mr-2" /> Download
          </button>
        )}
        {/* New Upload Image Button */}
        <button
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg w-full hover:bg-gray-800 transition mt-4"
          onClick={handleUploadNewImage}
        >
          <FaUpload className="inline-block mr-2" /> Upload New Image
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Right Preview */}
      <div className="w-full md:w-2/3 flex flex-col items-center justify-center">
        <ImagePreview title="Original Image" image={image} />
        <ImagePreview title="Converted Image" image={convertedImage} />
      </div>
    </div>
  );
};

const ImagePreview = ({ title, image }) => (
  <div className="w-full max-w-sm text-center mb-6 md:mb-0">
    <h3 className="font-bold text-indigo-700 mb-2">{title}</h3>
    <div className="border rounded-lg bg-gray-200 w-full h-64 flex items-center justify-center">
      {image ? (
        <img src={image} alt={title} className="max-h-full max-w-full" />
      ) : (
        <p className="text-gray-500">No image available</p>
      )}
    </div>
  </div>
);

export default ImageConverter;
