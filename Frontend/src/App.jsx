import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BerandaPage from "./pages/BerandaPage";
import SettingProfilePage from "./pages/SettingProfilePage";
import LaporanPage from "./pages/LaporanPage";
import SetorHafalanPage from "./pages/SetorHafalanPage"; 
import KelolaKelasPage from "./pages/KelolaKelasPage";
import DataSiswaPage from "./pages/DataSiswaPage";
import DataMusyifPage from "./pages/DataMusyifPage";
import ManagementUserPage from "./pages/ManagementUserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/beranda" element={<BerandaPage />} />
        <Route path="/setting-profile" element={<SettingProfilePage />} />
        <Route path="/laporan" element={<LaporanPage />} />
        <Route path="/setor" element={<SetorHafalanPage />} />
        <Route path="/kelas" element={<KelolaKelasPage />} />
        <Route path="/data-siswa" element={<DataSiswaPage />} />
        <Route path="/data-musyif" element={<DataMusyifPage />} />
        <Route path="/management-user" element={<ManagementUserPage />} />
      </Routes>
    </Router>
  );
}
export default App;