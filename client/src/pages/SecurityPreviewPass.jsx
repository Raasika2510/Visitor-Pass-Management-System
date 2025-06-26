import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import QRCode from 'react-qr-code'
import logo from '../assets/logo.png'
import axios from 'axios'

const SecurityPreviewPass = () => {
    const navigate = useNavigate()
    const componentRef = useRef()

    const data = JSON.parse(localStorage.getItem('visitor_data'))
    if (!data) return <p className="text-center mt-10">No visitor data found.</p>

    const visitor_id = `VST-${Date.now()}`
    localStorage.setItem('visitor_id', visitor_id)

    const printTrigger = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `VisitorPass-${visitor_id}`,
        removeAfterPrint: true,
    })

    const handlePrint = async () => {
        try {
            const payload = {
                visitor_id,
                entryTime: new Date().toISOString(),
                security_id: localStorage.getItem("security_id"),
                name: data.name,
                mobile: data.mobile,
                email: data.email,
                address: data.address,
                vehicleNo: data.vehicleNo,
                personToMeet: data.personToMeet,
                department: data.department,
                purpose: data.purpose,
            }

            await axios.post("http://localhost:5000/api/securityaddvisitor/crud", payload)
            printTrigger()

        } catch (error) {
            console.error("❌ Failed to save visitor:", error)
            alert("Could not save visitor. Please check connection or try again.")
        }
    }

    return (
        <div className="flex flex-col items-center p-6">
            <div
                ref={componentRef}
                className="w-[420px] h-[595px] p-4 bg-white border-2 border-gray-300 rounded-xl shadow-md font-sans flex flex-col"
            >
                {/* 🔷 Header Logo */}
                <div className="flex justify-center mb-2 py-3">
                    <img src={logo} alt="Gate Pass Header" className="w-full object-contain max-h-28" />
                </div>


                <div className="flex flex-row justify-between items-start px-4 py-5 mt-[-8px]">

                    <div className="flex-1 text-left text-gray-800 space-y-3 text-[15px] leading-snug">
                        <p><strong>Name:</strong> {data.name}</p>
                        <p><strong>Mobile:</strong> {data.mobile}</p>
                        <p><strong>Department:</strong> {data.department}</p>
                        <p><strong>Meeting:</strong> {data.personToMeet}</p>
                        <p><strong>Purpose:</strong> {data.purpose}</p>
                        <p><strong>Sign of Security: </strong> { }</p>
                        <p><strong>Sign of Visitor:</strong> { }</p>
                        <p><strong>Sign of Staff: </strong> { }</p>
                    </div>


                    <div className="flex-shrink-0 pl-3">
                        <img
                            src={data.image}
                            alt="visitor"
                            className="w-28 h-28 border shadow rounded object-cover"
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-6 mb-2">
                    <QRCode value={visitor_id} size={150} />
                </div>
            </div>

            <div className="mt-4 flex gap-4 no-print">
                <button
                    onClick={() => navigate('/security/addvisitor')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
                >
                    Back
                </button>
                <button
                    onClick={handlePrint}
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded"
                >
                    Print Pass
                </button>
            </div>
        </div>
    )
}

export default SecurityPreviewPass
