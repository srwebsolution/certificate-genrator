// src/app/page.tsx

'use client'; // This directive makes the component a Client Component in Next.js 13+ App Router

import { useState } from 'react';
import html2canvas from 'html2canvas'; // Import html2canvas library
import CertificateDisplay from './component/CertificateDisplay'; // Import your CertificateDisplay component

export default function Home() {
  // State variables for each input field with updated default values for the new certificate image
  const [name, setName] = useState('Jonathon Deo');
  const [courseName, setCourseName] = useState('Outstanding Achievement in Web Development'); // Example course
  const [collegeName, setCollegeName] = useState('MY COLLEGE NAME'); // For the "BRAND NAME" on the left
  const [eventName, setEventName] = useState('the Annual Innovation Summit 2024'); // For the body text

  // Function to handle certificate download
  const handleDownloadCertificate = async () => {
    // Get the certificate div by its ID. This ID is set on the main container in CertificateDisplay.tsx
    const certificateBody = document.getElementById('certificate-body');

    if (certificateBody) {
      try {
        // Use html2canvas to capture the content of the certificateBody div
        const canvas = await html2canvas(certificateBody, {
          scale: 3, // Increase scale for higher resolution download (e.g., 2 or 3 is good for print)
          useCORS: true, // Important if your image is from a different origin (though public dir generally fine)
          logging: true, // Enable logging in the console for debugging purposes
          allowTaint: true, // Allows cross-origin images to "taint" the canvas, enabling rendering but disallowing pixel manipulation
          backgroundColor: '#ffffff', // Explicitly set background color for transparent areas in capture
        });

        // Create a temporary anchor (<a>) element to trigger the download
        const link = document.createElement('a');
        link.download = `${name.replace(/\s+/g, '_')}_Certificate.png`; // Set default download file name, replace spaces with underscores
        link.href = canvas.toDataURL('image/png', 1.0); // Convert canvas content to a PNG data URL (1.0 is highest quality)

        // Programmatically click the link to trigger the download
        document.body.appendChild(link); // Append to body (required for Firefox compatibility)
        link.click(); // Simulate a click event
        document.body.removeChild(link); // Remove the link element after the download is triggered

      } catch (error) {
        console.error('Error generating certificate for download:', error);
        alert('Failed to generate certificate image. Please try again.');
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
          <div>
            <label htmlFor="courseName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Achievement/Course Text:</label>
            <input
              type="text"
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', color: '#333' }}
              placeholder="e.g., Outstanding Achievement in..."
            />
          </div>
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
            backgroundColor: '#0070f3', // A standard blue, common in Next.js branding
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease', // Smooth hover effect
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          // Optional: Add hover effect if you're using a proper CSS solution later
          // onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#005bb5'}
          // onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0070f3'}
        >
          Download Certificate
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