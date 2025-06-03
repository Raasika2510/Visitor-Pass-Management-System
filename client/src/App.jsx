import { Button } from "@/components/ui/button";
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Landing from "./pages/Landing";
import SecurityLogin from "./pages/SecurityLogin";
import AdminLogin from "./pages/AdminLogin";
import ScanPage from "./pages/ScanPage";
import { BringToFrontIcon } from "lucide-react";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}>
        <Route path="security_login" element = {<SecurityLogin/>}/>
        <Route path="admin_login" element = {<AdminLogin/>}/>
        <Route path="scan_page" element = {<ScanPage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
