import Signup from "./pages/signup";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route , Routes } from "react-router-dom";
import OTPVerification from "./components/OtpComponent";
import Workspace from "./pages/owner.workspace/workspace";
export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/verify-otp" element={<OTPVerification/>}/>

        <Route path="/workspace/*" element={
          <ProtectedRoute>
            <Workspace/>
            </ProtectedRoute>}/>
      </Routes>
      
    </div>
  );
}
