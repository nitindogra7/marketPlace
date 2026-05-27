import api from "../../apis/Api";
import Nav from "./components/Nav";
import OwnerDashboard from "./ownerDashboard/OwnerDashboard";
import GenerateApi from "./components/GenerateApi";
import { Routes, Route , useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading.jsx"

export default function Workspace() {
  const navigate = useNavigate()
  const { data, isLoading, error } = useQuery({
    queryKey: ["workspace"],
    queryFn: async () => {
      const res = await api.get("/api/workspace");
      return res.data;
    },
  });

  if (isLoading) return <Loading/>;

  if (error?.response?.status === 403) {
    navigate("/login")
    return null
  }

  return (
    <div className="h-screen w-full flex">
      <Nav response={data} />

      <Routes>
        <Route index element={<OwnerDashboard response={data} />} />
        <Route path="generate-api" element={<GenerateApi response={data} />} />
      </Routes>
    </div>
  );
}