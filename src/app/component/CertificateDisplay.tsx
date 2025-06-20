// src/app/components/CertificateDisplay.tsx

import Image from 'next/image';

interface CertificateDisplayProps {
  name: string;
  courseName: string; // Used for "Appreciation for [Course/Achievement]" part if desired
  collegeName: string;
  eventName: string; // Used within the body text
}

export default function CertificateDisplay({ name, courseName, collegeName, eventName }: CertificateDisplayProps) {
  const CERT_WIDTH = 1000; // Assuming original width of the new image is also 1000px for aspect ratio
  const CERT_HEIGHT = 707; // Assuming original height is also 707px
  const CERT_ASPECT_RATIO = CERT_WIDTH / CERT_HEIGHT;

  return (
    <div
      id="certificate-body" // IMPORTANT: Give this div an ID for html2canvas
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${100 / CERT_ASPECT_RATIO}%`,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      {/* Base Certificate Image */}
      <Image
        src="/certificate.png" // Ensure this is the new image path
        alt="Certificate of Appreciation"
        layout="fill"
        objectFit="cover" // Use cover to ensure it fills the container
        quality={100}
        priority
        style={{ zIndex: 1 }}
      />

      {/* Overlay for College/Organization Name (BRAND NAME on left) */}
      <div style={{
        position: 'absolute',
        top: "28%",
        left: "22%",
        width: '20%', // Adjusted width
        textAlign: 'left',
        paddingRight: '88px',
        color: '#FFFFFF', // White text
        fontSize: '1rem', // Larger font for Brand Name
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        zIndex: 10,
      }}>
        {collegeName}
      </div>


      {/* Overlay for Recipient Name (Jonathon Deo) */}
      <div style={{
        position: 'absolute',
        top: '40%', // Adjusted top for new image
        right: '5%',
        transform: 'translateX(-50%)', // Keeps it centered on its 'left' point
        width: '40%', // Adjusted width for name area
        textAlign: 'right',
        color: '#FFD700 ', // Dark brown/gold
        fontSize: '2.2rem', // Slightly smaller due to tighter space, fine-tune
        fontWeight: 'bold',
        fontFamily: 'Georgia, serif', 
        zIndex: 10,
      }}>
        {name}
      </div>

      {/* Overlay for "Appreciation for [Course/Achievement]" - this will be dynamic for Course Name */}
      <div style={{
        position: 'absolute',
        top: '29.5%', // Positioned near "OF APPRECIATION"
        right: '1.8%',
        transform: 'translateX(-50%)',
        width: '50%',
        paddingRight:"5px",
        textAlign: 'right',
        color: '#333', // Dark gray
        fontSize: '0.9rem',
        fontWeight: 'normal', // Original seems lighter
        fontFamily: 'Arial, sans-serif',
        zIndex: 10,
      }}>
        {courseName}
      </div>


      {/* Overlay for Event/Reason (part of the main body text) */}
      <div style={{
        position: 'absolute',
        top: '55%', // Adjusted top
        left: '60%', // Adjusted left
        paddingRight:"80px",
        transform: 'translateX(-50%)',
        width: '50%', // Adjusted width to fit the text block
        textAlign: 'center', // Image has centered text here
        color: '#555',
        fontSize: '0.8rem', // Smaller font to fit paragraph
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.4',
        zIndex: 10,
      }}>
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable.
        <br />
        <span style={{ fontWeight: 'bold' }}>For their outstanding contribution in: {eventName}</span>
      </div>

      {/* Overlay for Signature Names (below the existing lines) */}
      {/* Left Signature */}
      <div style={{
        position: 'absolute',
        top: '71%', // Adjusted top
        left: '46%', // Adjusted left
        transform: 'translateX(-50%)',
        width: '18%', // Adjusted width
        textAlign: 'center',
        color: '#333',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        zIndex: 10,
      }}>
        Marcus Smith
      </div>
      <div style={{
        position: 'absolute',
        top: '73%', // Adjusted top
        left: '46%', // Adjusted left
        transform: 'translateX(-50%)',
        width: '18%',
        textAlign: 'center',
        color: '#555',
        fontSize: '0.7rem',
        fontFamily: 'Arial, sans-serif',
        zIndex: 10,
      }}>
        General Manager
      </div>

      {/* Right Signature */}
      <div style={{
        position: 'absolute',
        top: '71%', // Adjusted top
        left: '69%', // Adjusted left
        transform: 'translateX(-50%)',
        width: '18%',
        textAlign: 'center',
        color: '#333',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        zIndex: 10,
      }}>
        Marcus Smith
      </div>
      <div style={{
        position: 'absolute',
        top: '73%', // Adjusted top
        left: '69%', // Adjusted left
        transform: 'translateX(-50%)',
        width: '18%',
        textAlign: 'center',
        color: '#555',
        fontSize: '0.7rem',
        fontFamily: 'Arial, sans-serif',
        zIndex: 10,
      }}>
        General Manager
      </div>

    </div>
  );
}