'use client';

import { useEffect, useState, useCallback } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import { usePage } from '../../context/PageContext';
import {socket} from '../socket'

export default function PresenterComponent() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const { pageNumber, setPageNumber } = usePage();

  const pageNavigationPluginInstance = pageNavigationPlugin();

  useEffect(() => {

    socket.connect()

    const fetchPdf = async () => {
      const response = await fetch('/api/getPdf');
      if (response.ok) {
        const blob = await response.blob();
        setPdfUrl(URL.createObjectURL(blob));
      }
    };
    fetchPdf();
  }, []);

  const handlePageChange = ({ currentPage }) => {
    const newPage = currentPage + 1;
    console.log('Presenter page change:', newPage);
    setPageNumber(newPage);
    if (socket) {
      socket.emit('pageChange', newPage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Presenter PDF Viewer</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
        {pdfUrl ? (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer
              fileUrl={pdfUrl}
              plugins={[pageNavigationPluginInstance]}
              onPageChange={handlePageChange}
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