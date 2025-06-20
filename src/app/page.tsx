// src/app/page.tsx

'use client'; // This directive makes the component a Client Component in Next.js 13+ App Router

import { useState } from 'react';
import html2canvas from 'html2canvas'; // Keep html2canvas
import jsPDF from 'jspdf'; // Import jsPDF library
import CertificateDisplay from './component/CertificateDisplay';

export default function Home() {
  const [name, setName] = useState('Jonathon Deo');
  const [courseName, setCourseName] = useState('Achievement in Web Development');
  const [collegeName, setCollegeName] = useState('MY COLLEGE NAME');
  const [eventName, setEventName] = useState('the Annual Innovation Summit 2024');

  // Function to handle certificate download as PDF
  const handleDownloadCertificate = async () => {
    const certificateBody = document.getElementById('certificate-body');

    if (certificateBody) {
      try {
        // Step 1: Capture the HTML content as a canvas image using html2canvas
        const canvas = await html2canvas(certificateBody, {
          scale: 3, // Higher scale for better quality in PDF
          useCORS: true,
          logging: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0); // Use JPEG for smaller PDF size, adjust quality (0-1)

        // Step 2: Initialize jsPDF
        // Get dimensions of the canvas
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Calculate PDF page dimensions based on the canvas aspect ratio
        // We want the PDF to fit the image without distortion.
        // jsPDF's default unit is 'mm'. You can also use 'pt', 'px', 'in', 'cm'.
        // Let's use 'px' as it's directly related to our canvas dimensions for easier calculation.
        const pdf = new jsPDF({
          orientation: imgWidth > imgHeight ? 'l' : 'p', // 'l' for landscape, 'p' for portrait
          unit: 'px', // Use pixels as unit
          format: [imgWidth, imgHeight], // Set PDF format to match image dimensions
        });

        // Add the image to the PDF
        // pdf.addImage(imageData, format, x, y, width, height)
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

        // Step 3: Save the PDF
        pdf.save(`${name.replace(/\s+/g, '_')}_Certificate.pdf`); // Save as PDF

      } catch (error) {
        console.error('Error generating certificate for download:', error);
        alert('Failed to generate certificate PDF. Please try again.');
      }
    } else {
      console.error('Certificate body element not found. Cannot proceed with download.');
      alert('Could not find the certificate display area. Please ensure the page loaded correctly.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h1 style={{ color: '#333' }}>Certificate Generator</h1>

      {/* Input Fields Section */}
      <div style={{ marginBottom: '20px', width: '80%', maxWidth: '1000px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: '0', color: '#333' }}>Enter Certificate Details:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Recipient Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', color: '#333' }}
              placeholder="Enter recipient's name"
            />
          </div>
          {/* <div>
            <label htmlFor="courseName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Achievement/Course Text:</label>
            <input
              type="text"
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', color: '#333' }}
              placeholder="e.g., Outstanding Achievement in..."
            />
          </div> */}
          <div>
            <label htmlFor="collegeName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Organization/College Name (Left):</label>
            <input
              type="text"
              id="collegeName"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', color: '#333' }}
              placeholder="e.g., Tech Solutions Inc."
            />
          </div>
          <div>
            <label htmlFor="eventName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Event/Reason Text (Body):</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', color: '#333' }}
              placeholder="e.g., the Annual Tech Conference"
            />
          </div>
        </div>
        {/* Download Button */}
        <button
          onClick={handleDownloadCertificate}
          style={{
            marginTop: '20px',
            padding: '12px 25px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          Download Certificate as PDF
        </button>
      </div>

      {/* Render the CertificateDisplay component below the input and download section */}
      <div style={{ width: '80%', maxWidth: '1000px' }}>
        <CertificateDisplay
          name={name}
          courseName={courseName}
          collegeName={collegeName}
          eventName={eventName}
        />
      </div>
    </div>
  );
}