import { Button } from "@/components/ui/button";
import { Route, Routes } from "lucide-react";
import Landing from "./pages/Landing";
import SecurityLogin from "./pages/SecurityLogin";
import AdminLogin from "./pages/AdminLogin";
import ScanPage from "./pages/ScanPage";

function App() {
  return (
    <>
    <Routes>
      <Route path="/landing" element={<Landing/>}>
        <Route path="security_login" element = {<SecurityLogin/>}/>
        <Route path="admin_login" element = {<AdminLogin/>}/>
        <Route path="scan_page" element = {<ScanPage/>}/>
      </Route>
    </Routes>
    
    </>
  );
}

export default App;
