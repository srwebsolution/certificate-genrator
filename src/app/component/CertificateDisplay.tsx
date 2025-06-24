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
        // paddingBottom needs to remain an inline style or be managed dynamically
        // if its value is calculated in JS based on CERT_ASPECT_RATIO.
        // It's crucial for maintaining the aspect ratio of the responsive container.
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

      {/* Overlay for College/Organization Name (BRAND NAME on left) */}
      {/* <div className={styles.overlayCollegeName}>
        This certificate is proudly presented to
      </div> */}

      {/* Overlay for Recipient Name (Jonathon Deo) */}
      <div className={styles.overlayRecipientName}>
        {name}
      </div>

      {/* Overlay for "Appreciation for [Course/Achievement]" */}
      {/* <div className={styles.overlayCourseName}>
        {courseName}
      </div> */}
      <div className={styles.overlayCourseName2}>
        <span style={{ fontWeight: 'bold' }}>{collegeName}</span>
      </div>


      {/* Overlay for Event/Reason (part of the main body text) */}
      {/* <div className={styles.overlayEventReason}>
        <br />
      representing Team IoTrons participated with distinction in MINDBEND 2025, Gujarat’s largest and most prestigious techno-managerial festival, held at Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat. Their presence and contribution greatly enriched the spirit of innovation, excellence, and global collaboration that define this grand event.
      </div> */}


    </div>
  );  
}