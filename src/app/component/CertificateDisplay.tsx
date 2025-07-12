// src/app/components/CertificateDisplay.tsx

import Image from 'next/image';
import styles from './CertificateDisplay.module.css'; // Import the CSS Module

interface CertificateDisplayProps {
  name: string;
  courseName: string; // Used for "Appreciation for [Course/Achievement]" part if desired
  collegeName: string; // Used for College/Organization Name on left
  eventName: string; // Used within the body text
}

export default function CertificateDisplay({ name, courseName, collegeName, eventName }: CertificateDisplayProps) {
  const CERT_WIDTH = 1000; // Original width of the certificate image
  const CERT_HEIGHT = 707; // Original height of the certificate image
  const CERT_ASPECT_RATIO = CERT_WIDTH / CERT_HEIGHT;

  return (
    <div
      id="certificate-body" // IMPORTANT: Keep this ID for html2canvas to target
      className={styles.certificateBody} // Apply the main container class from CSS module
      style={{
        paddingBottom: `${100 / CERT_ASPECT_RATIO}%`,
      }}
    >
      {/* Base Certificate Image */}
      <Image
        src="/certificate.png" // Confirm this matches your actual file extension (png or jpg)
        alt="Certificate of Appreciation"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        style={{ zIndex: 1 }}
      />

      {/* Overlay for Recipient Name (Jonathon Deo) */}
      <div className={styles.overlayRecipientName}>
        {name.split(" ")[0]} {name.split(" ")[1] ? name.split(" ")[1] : ""}
      </div>

      <div className={styles.overlayCourseName2}>
        <span style={{ fontWeight: 'bold' }}>{eventName}</span>
      </div>

      {/* <div className={styles.overlayEventReason}>
        for participating with distinction in <p className='font-bold'> MINDBEND 2025, Gujarat’s largest techno-managerial festival, held at Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat. </p> <p className='flex'>{name.split(" ")[0]}&apos;s presence and contributions greatly enriched the spirit of innovation, excellence, and global collaboration that define this grand event.</p>
      </div> */}
      </div> 
  );
}