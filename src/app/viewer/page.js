'use client';

import { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import { socket } from '../socket';

export default function ViewerComponent() {
  const [pageNumber, setPageNumber] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToPage } = pageNavigationPluginInstance;

  const handleJumpToPage = async () => {
    jumpToPage(pageNumber - 1);
  };

  socket.on('pageChange', (newPageNumber) => {
    console.log('Viewer received page change:', newPageNumber);
    setPageNumber(newPageNumber + 1);
    handleJumpToPage(newPageNumber);
  });

  useEffect(() => {
    socket.connect();

    const fetchPdf = async () => {
      const response = await fetch('/api/getPdf');
      if (response.ok) {
        const blob = await response.blob();
        setPdfUrl(URL.createObjectURL(blob));
      }
    };
    fetchPdf();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r  from-blue-500 to-purple-500 p-4">
      <h1 className="text-4xl font-semibold text-white mb-6">Viewer PDF View</h1>
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-6 border border-gray-300">
        {pdfUrl ? (
          <div className="overflow-y-auto" style={{ height: '750px' }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfUrl}
                defaultScale={SpecialZoomLevel.PageFit}  // Set to fit the full page
                plugins={[pageNavigationPluginInstance]}
                initialPage={pageNumber - 1}
              />
            </Worker>
          </div>
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
