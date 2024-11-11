'use client';

import { useEffect, useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js';
import { usePage } from '../context/PageContext';

export default function PresenterComponent() {
  const [pdfData, setPdfData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const { pageNumber, setPageNumber } = usePage();

  useEffect(() => {
    const fetchPdf = async () => {
      const response = await fetch('/api/getPdf');
      if (response.ok) {
        const data = await response.blob();
        setPdfData(data);
      }
    };
    fetchPdf();
  }, []);

  useEffect(() => {
    if (pdfData) {
      const url = URL.createObjectURL(pdfData);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [pdfData]);

  const handlePageChange = (event) => {
    const currentPage = event.currentPage + 1;
    if (currentPage !== pageNumber) {
      setPageNumber(currentPage); // Update page number in context
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Presenter PDF Viewer</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
        {pdfUrl ? (
          <Worker workerUrl={workerSrc}>
            <Viewer
              fileUrl={pdfUrl}
              onPageChange={handlePageChange} // Track page changes
            />
          </Worker>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="loader mb-4"></div>
            <p className="text-center text-gray-600 text-lg">Loading PDF...</p>
          </div>
        )}
      </div>
    </div>
  );
}
