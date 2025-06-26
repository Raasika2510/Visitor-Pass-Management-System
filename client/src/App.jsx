import { Button } from "@/components/ui/button";
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Landing from "./pages/Landing";
import SecurityLogin from "./pages/SecurityLogin";
import AdminLogin from "./pages/AdminLogin";
import ScanPage from "./pages/ScanPage";
import SecurityLayout from "./layouts/SecurityLayout";
import SecurityDashboard from "./pages/SecurityDashboard";
import SecurityAddVisitors from "./pages/SecurityAddVisitors";
import SecurityScanQR from "./pages/SecurityScanQR";
import SecurityVisitorSearch from "./pages/SecurityVisitorSearch";
import SecurityProfile from "./pages/SecurityProfile";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddUser from "./pages/AdminAddUser";
import AdminUserSearch from "./pages/AdminUserSearch";
import AdminVisitorSearch from "./pages/AdminVisitorSearch";
import AdminProfile from "./pages/AdminProfile";
import SecurityPreviewPass from "./pages/SecurityPreviewPass";

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

      <Route path="/security" element={<SecurityLayout/>}>
        <Route path = "dashboard" element={<SecurityDashboard/>}/>
        <Route path = "addvisitor" element={<SecurityAddVisitors/>}/>
        <Route path = "scanqr" element={<SecurityScanQR/>}/>
        <Route path = "visitorsearch" element={<SecurityVisitorSearch/>}/>
        <Route path = "profile" element={<SecurityProfile/>}/>
        <Route path = "previewpass" element={<SecurityPreviewPass/>}/>
      </Route>

      <Route path="/admin" element={<AdminLayout/>}>
        <Route path = "dashboard" element={<AdminDashboard/>}/>
        <Route path = "adduser" element={<AdminAddUser/>}/>
        <Route path = "usersearch" element={<AdminUserSearch/>}/>
        <Route path = "visitorsearch" element={<AdminVisitorSearch/>}/>
        <Route path = "profile" element={<AdminProfile/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
