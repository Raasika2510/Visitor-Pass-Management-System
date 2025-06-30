import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';

const SecurityScanQR = () => {
  const [scannedId, setScannedId] = useState('');
  const [success, setSuccess] = useState(false);
  const [scanning, setScanning] = useState(false);

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
    const res = await axios.post('http://localhost:5000/api/securityexitvisitor/exit', {
      visitor_id: visitorId,
      exitTime: new Date().toISOString(),
    });

    console.log("🎉 Successfully updated visitor:", res.data);
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
      <h1 className="text-2xl font-bold text-violet-700 mb-4">Visitor QR Scanner for Exit</h1>

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
        <div className="mt-6 text-green-700 font-semibold ">
          ✅ Visitor <code className="bg-green-100 px-2 py-1 rounded">{scannedId}</code> marked as <strong>OUT</strong>
          <button
            onClick={resetScan}
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded shadow"
          >
            Scan Another
          </button>
        </div>
      )}
    </div>
  );
};

export default SecurityScanQR;
