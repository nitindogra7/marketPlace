import Signup from "./pages/signup";
import Login from "./pages/login";
import { Route , Routes } from "react-router-dom";
export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      
    </div>
  );
}
