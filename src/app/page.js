'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"; // Assuming Button component exists
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'; // Import the PDF icon

export default function Home() {
  const [isPresenter, setIsPresenter] = useState(false); // State to check if the user is Presenter
  const [pdf, setPdf] = useState(null);  // State to store the uploaded PDF
  const [loading, setLoading] = useState(false); // State to manage loading state
  const router = useRouter(); // Initialize useRouter for navigation

  // Handle file upload for Presenter
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdf(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Submit function for Presenter
  const handleSubmit = async () => {
    if (!pdf) {
      alert("Please upload a PDF before submitting.");
      return;
    }
  
    const formData = new FormData();
    formData.append("pdf", pdf);

    setLoading(true); // Start loading indicator
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        router.push('/presenter'); // Redirect after successful upload
      } else {
        const errorData = await response.json();
        alert(`Failed to upload PDF: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Handle role selection and redirect if Viewer is selected
  const handleRoleSelection = (role) => {
    if (role === "Presenter") {
      setIsPresenter(true);
    } else {
      router.push('/viewer');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Font Awesome Icon */}
      <FontAwesomeIcon icon={faFilePdf} size="6x" className="text-red-600 mb-4" />
      
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Welcome to the PDF Slides Co-Viewer Web App
      </h1>

      {/* Show role selection buttons */}
      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => handleRoleSelection("Presenter")}
          className="px-6 py-6 text-lg bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          View PDF as Presenter
        </Button>
        <Button
          onClick={() => handleRoleSelection("Viewer")}
          className="px-6 py-6 text-lg bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          View PDF as Viewer
        </Button>
      </div>

      {/* Show PDF upload only for Presenter */}
      {isPresenter && (
        <div className="mb-6">
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            className="mb-4 px-6 py-3 border border-gray-300 rounded-lg"
          />
          <Button
            onClick={handleSubmit}
            disabled={loading} // Disable button while loading
            className="px-6 m-5 py-6 text-lg rounded-lg shadow-md"
          >
            {loading ? "Uploading..." : "Submit"} {/* Show loading text */}
          </Button>
        </div>
      )}

      {/* Display loading indicator if loading */}
      {loading && (
        <div className="loader"></div>
      )}
    </div>
  );
}
