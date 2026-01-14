import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "../molecules/LogoutModal";
// IMPORT SEMUA IKON
import { 
  BiHome, BiBarChartSquare, BiCheckSquare, BiLayer, 
  BiCog, BiChevronDown, BiUser, BiIdCard, BiBook, 
  BiFile, BiGroup, BiLogOut, BiSearch 
} from "react-icons/bi";
// IMPORT LOGO GAMBAR (Sesuaikan path jika perlu)
import logoMIS from "../../assets/logo.png"; 

const Sidebar = ({ isCollapsed, isActive }) => {
  // State untuk submenu Input Data
  const [isInputDataOpen, setInputDataOpen] = useState(true);
  // State untuk Modal Konfirmasi Keluar
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Efek: Jika sidebar mengecil, tutup dropdown Input Data otomatis agar rapi
  useEffect(() => {
    if (isCollapsed) {
      setInputDataOpen(false);
    }
  }, [isCollapsed]);

  // Handler saat tombol "Keluar" di modal dikonfirmasi
  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate("/"); // Arahkan ke halaman Login
  };

  // Data Menu Utama
  const menuItems = [
    { path: "/beranda", label: "Beranda", icon: BiHome },
    { path: "/laporan", label: "Laporan Progress", icon: BiBarChartSquare },
    { path: "/setor", label: "Setor Hafalan", icon: BiCheckSquare },
    { path: "/kelas", label: "Kelola Kelas", icon: BiLayer },
  ];

  // Data Submenu Input Data
  const subMenuItems = [
    { path: "/data-siswa", label: "Data Siswa", icon: BiUser },
    { path: "/data-musyif", label: "Data Musyif", icon: BiIdCard },
  ];

  return (
    <>
      {/* Render Modal di luar aside agar tampil di atas segalanya */}
      {showLogoutModal && (
        <LogoutModal onClose={() => setShowLogoutModal(false)} onConfirm={handleLogout} />
      )}

      <aside className={`fixed left-0 top-0 h-screen bg-[#1B4332] text-white z-[1050] transition-all duration-300 ease-in-out shadow-xl font-poppins
        ${isCollapsed ? "w-[80px]" : "w-[260px]"} 
        ${isActive ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        
        {/* --- BAGIAN HEADER BRAND (LOGO + TEKS) --- */}
        <div className={`h-[70px] flex items-center justify-center border-b border-white/10 transition-all duration-300 overflow-hidden
            ${isCollapsed ? "p-2 gap-0" : "p-5 gap-3"}`}>
          
          {/* 1. Gambar Logo (Selalu Tampil) */}
          <img 
            src={logoMIS} 
            alt="MIS Logo" 
            // Sedikit membesar saat dicollapse biar gagah di tengah
            className={`shrink-0 transition-all duration-300 object-contain ${isCollapsed ? "w-[40px] h-[40px]" : "w-[32px] h-[32px]"}`}
          />

          {/* 2. Teks (Hilang dengan animasi mulus saat collapsed) */}
          <span className={`font-bold text-[1.25rem] whitespace-nowrap overflow-hidden transition-all duration-300 origin-left
              ${isCollapsed ? "opacity-0 w-0 scale-95" : "opacity-100 w-auto scale-100"}`}>
            Mutabaah MIS
          </span>
        </div>
        {/* --- END HEADER BRAND --- */}


        {/* --- BAGIAN SEARCH BOX (Hanya tampil jika tidak collapsed) --- */}
        {!isCollapsed && (
          <div className="px-[15px] pb-[15px] pt-[20px] animate-[fadeIn_0.3s_ease-in]">
            <div className="flex items-center bg-[#2D5A46] border border-[#3d7059] rounded-[4px] px-3 py-1.5 transition-colors focus-within:border-white/50">
              <input 
                type="text" 
                name="sidebar-search" // Name unik untuk hindari autofill
                id="sidebar-search"
                autoComplete="off" // Matikan autofill browser
                placeholder="Cari..." 
                className="bg-transparent border-none text-white text-sm w-full outline-none placeholder-white/60 font-poppins" 
              />
              <BiSearch className="text-white/70 text-lg shrink-0" />
            </div>
          </div>
        )}

        {/* --- BAGIAN NAVIGASI MENU --- */}
        <nav className={`px-0 space-y-0.5 overflow-y-auto custom-scrollbar ${isCollapsed ? "mt-4" : "mt-1"} max-h-[calc(100vh-140px)]`}>
          
          {/* 1. Render Menu Utama Loop */}
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              // Tooltip native browser muncul hanya saat collapsed
              title={isCollapsed ? item.label : ""}
              className={`flex items-center gap-3 px-5 py-3 transition-all whitespace-nowrap relative group border-l-[4px]
                ${isCollapsed ? "justify-center" : ""} 
                ${location.pathname === item.path 
                  ? "bg-black/20 text-white border-[#2ECC71]" // Style Aktif
                  : "text-white/90 hover:bg-black/10 hover:text-white border-transparent" // Style Inaktif
                }`}
            >
              <item.icon className="text-[1.3rem] shrink-0" />
              
              {/* Teks Menu: Animasi opacity agar halus saat menghilang */}
              <span className={`text-[0.95rem] font-medium transition-all duration-200 
                ${isCollapsed ? "opacity-0 w-0 hidden absolute" : "opacity-100 w-auto relative"}`}>
                {item.label}
              </span>
            </Link>
          ))}

          {/* 2. Dropdown Menu "Input Data" */}
          <div className="pt-2">
            <button 
              // Hanya bisa diklik untuk toggle jika TIDAK collapsed
              onClick={() => !isCollapsed && setInputDataOpen(!isInputDataOpen)} 
              title={isCollapsed ? "Input Data" : ""}
              className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-black/10 text-white/90 transition-all whitespace-nowrap border-l-[4px] border-transparent
                ${isCollapsed ? "justify-center cursor-default hover:bg-transparent" : "cursor-pointer"}`}
            >
              <BiCog className="text-[1.3rem] shrink-0" />
              
              {/* Container Teks & Chevron (Hilang saat collapsed) */}
              <div className={`flex items-center flex-1 transition-all duration-200 
                 ${isCollapsed ? "opacity-0 w-0 hidden absolute" : "opacity-100 w-auto relative"}`}>
                <span className="text-[0.95rem] font-medium">Input Data</span>
                {/* Ikon Chevron berputar jika state open */}
                <BiChevronDown className={`ms-auto text-xl transition-transform duration-300 ${isInputDataOpen ? "rotate-180" : ""}`} />
              </div>
            </button>
            
            {/* Submenu Container: Hanya tampil jika TIDAK collapsed DAN state open */}
            {!isCollapsed && isInputDataOpen && (
              <div className="bg-black/10 animate-[fadeIn_0.2s_ease-in-out] py-1">
                {subMenuItems.map((sub) => (
                  <Link 
                    key={sub.path} 
                    to={sub.path} 
                    className={`flex items-center gap-3 pl-[52px] pr-5 py-2.5 text-white/70 hover:text-white hover:bg-black/10 text-[0.9rem] transition-colors border-l-[4px] border-transparent
                      ${location.pathname === sub.path ? "text-white bg-black/5" : ""}`}
                  >
                    <sub.icon className="text-[1.1rem] shrink-0" /> {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 3. Menu Tambahan Lainnya */}
          <Link to="/management-user" title={isCollapsed ? "Management User" : ""} className={`flex items-center gap-3 px-5 py-3 hover:bg-black/10 text-white/90 whitespace-nowrap border-l-[4px] border-transparent ${isCollapsed ? "justify-center" : ""}`}>
            <BiGroup className="text-[1.3rem] shrink-0" /> 
            <span className={`text-[0.95rem] font-medium transition-all ${isCollapsed ? "hidden absolute" : "block relative"}`}>Management User</span>
          </Link>
          
          {/* 4. Tombol Keluar (Memicu Modal) */}
          <div className="pt-4">
             <button 
               onClick={() => setShowLogoutModal(true)} 
               title={isCollapsed ? "Keluar" : ""}
               className={`w-full flex items-center gap-3 px-5 py-3 transition-colors whitespace-nowrap text-left text-white/90 hover:text-[#EF4444] hover:bg-[#EF4444]/10 border-l-[4px] border-transparent
                 ${isCollapsed ? "justify-center" : ""}`}
             >
               <BiLogOut className="text-[1.3rem] shrink-0" /> 
               <span className={`text-[0.95rem] font-medium transition-all ${isCollapsed ? "hidden absolute" : "block relative"}`}>Keluar</span>
             </button>
          </div>

        </nav>
      </aside>
    </>
  );
};

export default Sidebar;