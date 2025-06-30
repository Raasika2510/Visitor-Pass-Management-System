import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';

const ScanPage = () => {
  const [scannedId, setScannedId] = useState('');
  const [success, setSuccess] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [visitordetails, setVisitorDetails] = useState(null);
  const navigate = useNavigate();

  const handleScan = async (results) => {
    console.log("📸 Scanner result:", results);

    if (!results || !results.length || !results[0].rawValue) {
      console.log("⚠️ Invalid or empty scan result");
      return;
    }

    const visitorId = results[0].rawValue;

    if (success) {
      console.log("✅ Already marked success. Skipping further scans.");
      return;
    }

    console.log("📦 Sending visitor ID to backend:", visitorId);
    setScannedId(visitorId);
    setSuccess(true);
    setScanning(false);

    try {
      const res = await axios.post('http://localhost:5000/api/scanpage/scan', {
        visitor_id: visitorId,
      });

      console.log("🎉 Successfully received visitor details:", res.data);
      setVisitorDetails(res.data);
    } catch (err) {
      console.error("❌ Logout failed:", err);
      alert('Error logging out visitor.');
    }
  };


  const resetScan = () => {
    console.log("🔄 Resetting scanner state");
    setScannedId('');
    setSuccess(false);
    setScanning(true);
  };

  return (
    <div className="py-11 mt-10 text-center max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-violet-700 mb-4">QR Scanner for Visitor Details</h1>

      {!scanning && !success && (
        <button
          onClick={() => {
            console.log("📷 Scanning started");
            setScanning(true);
          }}
          className="bg-violet-700 hover:bg-violet-600 text-white px-6 py-2 rounded-lg shadow"
        >
          Start Scanning
        </button>
      )}

      {scanning && (
        <div className="mx-auto w-72 h-72 border-4 border-violet-500 mt-4 rounded-lg overflow-hidden">
          <Scanner
            onScan={handleScan}
            onError={(err) => console.error("❗ Scanner error:", err)}
          />
        </div>
      )}

      {success && (
        <div className="mt-6 text-violet-500 font-semibold ">
          ✅ Visitor ID:  <code className="bg-green-100 px-2 py-1 rounded">{scannedId}</code> Details:

          {visitordetails && (
            <div className="mt-4  text-center px-6 text-gray-800 space-y-1">
              <p><strong>Name:</strong> {visitordetails.name}</p>
              <p><strong>Mobile:</strong> {visitordetails.mobile}</p>
              <p><strong>Address:</strong> {visitordetails.address}</p>
              <p><strong>Department:</strong> {visitordetails.department}</p>
              <p><strong>Meeting:</strong> {visitordetails.personToMeet}</p>
              <p><strong>Purpose:</strong> {visitordetails.purpose}</p>
              <p><strong>Status:</strong> {visitordetails.status}</p>
              <p><strong>Entry Time:</strong> {new Date(visitordetails.entryTime).toLocaleString()}</p>
            </div>
          )}

          <button
            onClick={resetScan}
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded shadow"
          >
            Scan Another
          </button>
           <br/>
          <button
            onClick={()=> {navigate("/")}}
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded shadow"
          >
           Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ScanPage;
