import React, { useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import axios from 'axios'

function SecurityScanQR() {
  const [visitorId, setVisitorId] = useState('')
  const [success, setSuccess] = useState(false)
  const [scanning, setScanning] = useState(false)

  const handleScan = async (results) => {
    if (!success && results.length) {
      const id = results[0]?.rawValue
      setVisitorId(id)
      setSuccess(true)
      setScanning(false)

      try {
        await axios.post('http://localhost:5000/api/securityexitvisitor/crud', {
          visitor_id: id,
          exitTime: new Date().toISOString(),
        })
      } catch (error) {
        alert('Logout failed. Try again.')
        console.error(error)
      }
    }
  }

  const resetScanner = () => {
    setVisitorId('')
    setSuccess(false)
    setScanning(true)
  }

  return (
    <div className="p-6 max-w-xl mx-auto text-center bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-violet-800 mb-4">VISITOR PASS QR SCANNER</h2>

      {!scanning && !success && (
        <button
          onClick={() => setScanning(true)}
          className="bg-violet-700 hover:bg-violet-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow"
        >
          Start Scanning
        </button>
      )}

      {scanning && (
        <div className="mt-6 mx-auto w-72 h-72 border-4 border-violet-500 rounded-lg shadow-lg overflow-hidden">
          <Scanner onResult={handleScan} />
        </div>
      )}

      {success && (
        <div className="mt-6 text-green-700 font-semibold text-lg">
          ✅ Visitor <code className="bg-green-100 px-2 py-1 rounded">{visitorId}</code> marked as <strong>OUT OF CAMPUS</strong>
          <div className="mt-4">
            <button
              onClick={resetScanner}
              className="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded shadow"
            >
              Scan Another
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SecurityScanQR
