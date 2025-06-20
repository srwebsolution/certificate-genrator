// src/app/page.tsx (relevant parts)

'use client';

import { useState } from 'react';
import CertificateDisplay from './component/CertificateDisplay';

export default function Home() {
  // Adjusted default values for better context with the new image
  const [name, setName] = useState('Jonathon Deo');
  const [courseName, setCourseName] = useState('Outstanding Achievement in Web Development'); // Example course
  const [collegeName, setCollegeName] = useState('MY COLLEGE NAME'); // New Brand Name
  const [eventName, setEventName] = useState('the Annual Innovation Summit 2024'); // Fits into body text

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h1 style={{ color: '#333' }}>Certificate Generator</h1>

      {/* Input Fields Section (no major changes needed here, just labels) */}
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
      </div>

      {/* Render the CertificateDisplay component */}
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