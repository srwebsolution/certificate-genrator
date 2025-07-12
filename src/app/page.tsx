// src/app/page.tsx

'use client';

import { useState, useRef, useEffect } from 'react'; // Added useEffect
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CertificateDisplay from './component/CertificateDisplay';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function Home() {
  // State for the data currently displayed on the certificate
  const [currentName, setCurrentName] = useState('Jonathon Deo');
  const [currentCourseName, setCurrentCourseName] = useState('1st Rank in ');
  const [currentCollegeName, setCurrentCollegeName] = useState('the Annual Tech Conference');
  const [eventName, setEventName] = useState('the Annual Innovation Summit 2024');

  // State for Excel file and parsed participants
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [participants, setParticipants] = useState<any[]>([]); // Parsed data from Excel

  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [zipDownloaded, setZipDownloaded] = useState<boolean>(false);

  // Ref to the hidden div that will render certificates for html2canvas
  const hiddenCertificateRef = useRef<HTMLDivElement>(null);

  // Effect to update the preview certificate when participants data changes
  // or when eventName changes and there's data
  useEffect(() => {
    if (participants.length > 0) {
      // Display the first participant's data as a preview
      const firstParticipant = participants[0];
      // Use common column names, or default if not found
      setCurrentName(firstParticipant["Student Name"] || firstParticipant.Name || firstParticipant["Candidate's Name"] || "Participant Name");
      setCurrentCourseName(firstParticipant.Course || "Achievement Title"); // Adjust based on your Excel
      setCurrentCollegeName(firstParticipant.College || "Organization Name"); // Adjust based on your Excel
      setMessage(`Found ${participants.length} participants. Ready to generate.`);
    } else {
      // Reset preview if no participants or file is cleared
      setCurrentName('Jonathon Deo');
      setCurrentCourseName('1st Rank in ');
      setCurrentCollegeName('the Annual Tech Conference');
      setMessage('Upload an Excel file to get started.');
    }
  }, [participants, eventName]); // Re-run when participants or eventName changes

  // Handle Excel file upload and parse
  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setExcelFile(file);
    setZipDownloaded(false); // Reset download status when a new file is selected

    if (!file) {
      setParticipants([]);
      setMessage('No file selected.');
      return;
    }

    setLoading(true);
    setMessage('Parsing Excel file...');
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' }); // { defval: '' } replaces undefined with empty string

      // Log jsonData directly here to confirm it has data
      console.log('Parsed Excel data (jsonData):', jsonData);
      if (jsonData.length > 0) {
        console.log('First participant row from jsonData:', jsonData[0]);
      }

      setParticipants(jsonData as any[]); // This schedules the update
      // console.log(participants); // This will still show the old state, as explained above.
      // It's safe to remove this specific log line if it's confusing.

    } catch (error) {
      console.error('Error parsing Excel file:', error);
      setParticipants([]);
      setMessage('Failed to parse Excel file. Please check the file format or ensure it\'s a valid .xlsx/.xls file.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle bulk certificate download as ZIP
  const handleBulkDownloadCertificates = async () => {
    if (participants.length === 0) {
      setMessage('Please upload an Excel file with participant data first.');
      return;
    }
    if (!eventName.trim()) {
      setMessage('Please enter an Event Name.');
      return;
    }
    if (zipDownloaded) {
      setMessage('ZIP file already downloaded. Please upload a new Excel file to generate again.');
      return;
    }

    setLoading(true);
    setMessage('Generating certificates...');
    const zip = new JSZip();
    let generatedCount = 0;

    try {
      // Temporarily render the CertificateDisplay in a hidden div
      if (!hiddenCertificateRef.current) {
        console.error("Hidden certificate reference is not available.");
        setMessage("Error: Certificate display area not found.");
        setLoading(false);
        return;
      }

      // Hide the visible CertificateDisplay to avoid flicker
      const visibleDisplay = document.getElementById('certificate-body');
      if (visibleDisplay) {
        visibleDisplay.style.display = 'none';
      }

      // Ensure the hidden container is visible for html2canvas to work, but off-screen
      hiddenCertificateRef.current.style.position = 'absolute';
      hiddenCertificateRef.current.style.left = '-9999px';
      hiddenCertificateRef.current.style.top = '-9999px';
      hiddenCertificateRef.current.style.width = '1000px'; // Match expected width for html2canvas
      hiddenCertificateRef.current.style.height = '707px'; // Match expected height
      hiddenCertificateRef.current.style.visibility = 'visible'; // Make it visible to html2canvas
      hiddenCertificateRef.current.style.pointerEvents = 'none'; // Prevent interaction

      // Loop through each participant and generate a PDF
      for (const [index, participant] of participants.entries()) {
        // Safely access participant name, trying common column names
        const nameField = participant["Student Name"] || participant.Name || participant["Candidate's Name"] || `Participant ${index + 1}`;
        const courseField = participant.Course || currentCourseName; // Fallback to current state
        const collegeField = participant.College || currentCollegeName; // Fallback to current state

        setMessage(`Generating certificate for ${nameField}... (${index + 1}/${participants.length})`);

        // Update the state for the CertificateDisplay component to re-render in the hidden div
        setCurrentName(nameField);
        setCurrentCourseName(courseField);
        setCurrentCollegeName(collegeField);

        // Allow React to update the DOM with the new participant's data
        // This is crucial for html2canvas to capture the correct content
        await new Promise(resolve => setTimeout(resolve, 50));

        // Capture the rendered certificate from the hidden div
        const canvas = await html2canvas(hiddenCertificateRef.current!, {
          scale: 3, // Higher scale for better quality in PDF
          useCORS: true,
          logging: false, // Set to true for debugging html2canvas
          allowTaint: true,
          backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pdf = new jsPDF({
          orientation: imgWidth > imgHeight ? 'l' : 'p',
          unit: 'px',
          format: [imgWidth, imgHeight],
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

        // Add PDF to the ZIP file
        // Sanitize filename to remove invalid characters
        const fileName = `${nameField.replace(/[^a-zA-Z0-9_ -]/g, '').replace(/\s+/g, '_')}_${eventName}_Participation_Certificate.pdf`;
        zip.file(fileName, pdf.output('arraybuffer'));
        generatedCount++;
      }

      // Generate the ZIP file
      setMessage('Compressing certificates...');
      const content = await zip.generateAsync({ type: 'blob' });

      // Save the ZIP file
      const sanitizedEventName = eventName.replace(/[^a-zA-Z0-9_ -]/g, '').replace(/\s+/g, '_');
      saveAs(content, `${sanitizedEventName}_Certificates.zip`);
      setZipDownloaded(true); // Mark that the ZIP has been downloaded
      setMessage(`Successfully generated ${generatedCount} certificates and downloaded ZIP!`);

    } catch (error) {
      console.error('Error generating bulk certificates:', error);
      setMessage(`Error: Failed to generate certificates. ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
      // Reset visible CertificateDisplay style
      const visibleDisplay = document.getElementById('certificate-body');
      if (visibleDisplay) {
        visibleDisplay.style.display = 'block';
      }
      // Reset hidden container style
      if (hiddenCertificateRef.current) {
        hiddenCertificateRef.current.style.position = 'static';
        hiddenCertificateRef.current.style.left = 'auto';
        hiddenCertificateRef.current.style.top = 'auto';
        hiddenCertificateRef.current.style.width = 'auto';
        hiddenCertificateRef.current.style.height = 'auto';
        hiddenCertificateRef.current.style.visibility = 'hidden'; // Hide it again
      }
      // Clear file input and participant data after successful generation
      setExcelFile(null);
      if (document.getElementById('excelFileInput')) {
        (document.getElementById('excelFileInput') as HTMLInputElement).value = '';
      }
      setParticipants([]); // Clear parsed data
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h1 style={{ color: '#333' }}>Bulk Certificate Generator</h1>

      {/* Input Fields Section */}
      <div style={{ marginBottom: '20px', width: '80%', maxWidth: '1000px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: '0', color: '#333' }}>Upload Excel & Enter Event Name:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label htmlFor="excelFileInput" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Upload Excel File (.xlsx/.xls):</label>
            <input
              type="file"
              id="excelFileInput"
              accept=".xlsx, .xls"
              onChange={handleExcelUpload}
              className='cursor-pointer'
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', color: '#333' }}
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="eventName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Event Name:</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', color: '#333' }}
              placeholder="Enter Event Name"
              disabled={loading}
            />
          </div>
        </div>
        {/* Show a preview of parsed participants */}
        {participants.length > 0 && (
          <div className='text-black' style={{ marginTop: '20px', background: '#f9f9f9', padding: '10px', borderRadius: '6px' }}>
            <strong>Participants Name:</strong>
            <ul style={{ maxHeight: '120px', overflowY: 'auto', margin: 0, paddingLeft: '20px' }}>
              {participants.slice(0, 5).map((row, idx) => (
                // Try different common column names for the participant's name
                <li key={idx}>
                  {row["Student Name"] || row["Name"] || row["Candidate's Name"] || `Row ${idx + 1}`}
                </li>
              ))}
              {participants.length > 5 && <li>... and {participants.length - 5} more</li>}
            </ul>
          </div>
        )}
        {/* Download Button */}
        <button
          onClick={handleBulkDownloadCertificates}
          disabled={loading || participants.length === 0 || !eventName.trim() || zipDownloaded}
          style={{
            marginTop: '20px',
            padding: '12px 25px',
            backgroundColor: loading || zipDownloaded ? '#cccccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading || zipDownloaded ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          {loading
            ? message
            : zipDownloaded
              ? 'ZIP Already Downloaded'
              : `Generate All ${participants.length > 0 ? participants.length : ''} Certificates as ZIP`}
        </button>
        {message && <p style={{ marginTop: '10px', color: loading ? '#0070f3' : '#333' }}>{message}</p>}
      </div>

      {/* This is the visible CertificateDisplay, initially shows default values */}
      <div style={{ width: '80%', maxWidth: '1000px', display: loading ? 'none' : 'block' }}>
        <CertificateDisplay
          name={currentName}
          courseName={currentCourseName}
          collegeName={currentCollegeName}
          eventName={eventName}
        />
      </div>

      {/* HIDDEN div for html2canvas to capture certificates one by one */}
      <div ref={hiddenCertificateRef} style={{
        // Initially hidden and not taking up space
        position: 'fixed', // Use fixed to ensure it's not affecting layout
        left: '-9999px',
        top: '-9999px',
        width: '1000px', // Set to original certificate width
        height: '707px', // Set to original certificate height
        overflow: 'hidden',
        visibility: 'hidden', // Hide it from view
        pointerEvents: 'none', // Prevent interaction
      }}>
        <CertificateDisplay
          name={currentName}
          courseName={currentCourseName}
          collegeName={currentCollegeName}
          eventName={eventName}
        />
      </div>
    </div>
  );
}