import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Import komponen baru
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
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Akses: Semua Role (Admin, Musyif, Wali Murid) */}
        <Route path="/beranda" element={
          <ProtectedRoute allowedRoles={['ADMIN', 'MUSYIF', 'WALI_MURID']}>
            <BerandaPage />
          </ProtectedRoute>
        } />
        <Route path="/laporan" element={
          <ProtectedRoute allowedRoles={['ADMIN', 'MUSYIF', 'WALI_MURID']}>
            <LaporanPage />
          </ProtectedRoute>
        } />
        <Route path="/setting-profile" element={
          <ProtectedRoute allowedRoles={['ADMIN', 'MUSYIF', 'WALI_MURID']}>
            <SettingProfilePage />
          </ProtectedRoute>
        } />

        {/* Akses: Admin & Musyif Saja */}
        <Route path="/setor" element={
          <ProtectedRoute allowedRoles={['ADMIN', 'MUSYIF']}>
            <SetorHafalanPage />
          </ProtectedRoute>
        } />
        <Route path="/kelas" element={
          <ProtectedRoute allowedRoles={['ADMIN', 'MUSYIF']}>
            <KelolaKelasPage />
          </ProtectedRoute>
        } />
        <Route path="/data-siswa" element={
          <ProtectedRoute allowedRoles={['ADMIN', 'MUSYIF']}>
            <DataSiswaPage />
          </ProtectedRoute>
        } />

        {/* Akses: Khusus Admin Saja */}
        <Route path="/data-musyif" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <DataMusyifPage />
          </ProtectedRoute>
        } />
        <Route path="/management-user" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <ManagementUserPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;