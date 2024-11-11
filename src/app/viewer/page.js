'use client';

import { useEffect, useRef, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js';
import { usePage } from '../context/PageContext';

export default function ViewerComponent() {
  const { pageNumber } = usePage();
  const [pdfData, setPdfData] = useState(null);
  const viewerRef = useRef(null);

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

  // Use a new effect to scroll to the updated page when `pageNumber` changes
  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.instance.scrollToPage(pageNumber - 1); // Sync viewer to the presenter's page
    }
  }, [pageNumber]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Viewer - PDF Viewer</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
        {pdfData ? (
          <Worker workerUrl={workerSrc}>
            <Viewer
              ref={viewerRef} // Set the Viewer ref
              fileUrl={URL.createObjectURL(pdfData)}
              initialPage={pageNumber - 1} // Set the initial page on first render
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
