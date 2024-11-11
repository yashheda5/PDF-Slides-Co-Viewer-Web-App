'use client';

import { useEffect, useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js';

export default function PresenterComponent() {
  const [pdfData, setPdfData] = useState(null); // State to store the PDF file

  // Fetch PDF data when the component mounts
  useEffect(() => {
    const fetchPdf = async () => {
      const response = await fetch('/api/getPdf'); // Replace with your actual API endpoint
      if (response.ok) {
        const data = await response.blob();
        setPdfData(data);
      }
    };
    fetchPdf();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Presenter PDF Viewer</h1>
      
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
        {pdfData ? (
          <Worker workerUrl={workerSrc}>
            <Viewer fileUrl={URL.createObjectURL(pdfData)} />
          </Worker>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {/* Loader spinner */}
            <div className="loader mb-4"></div>
            <p className="text-center text-gray-600 text-lg">Loading PDF...</p>
          </div>
        )}
      </div>
    </div>
  );
}
