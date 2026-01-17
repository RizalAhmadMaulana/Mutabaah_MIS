// --- DATABASE LENGKAP AL-QURAN (JUZ 1 - 30) ---
const QURAN_DATA = [
  // JUZ 1
  { name: "Al-Fatihah", juz: "1", total: 7 },
  { name: "Al-Baqarah", juz: "1", total: 286 },
  // JUZ 2
  { name: "Al-Baqarah", juz: "2", total: 286 },
  // JUZ 3
  { name: "Al-Baqarah", juz: "3", total: 286 },
  { name: "Ali 'Imran", juz: "3", total: 200 },
  // JUZ 4
  { name: "Ali 'Imran", juz: "4", total: 200 },
  { name: "An-Nisa'", juz: "4", total: 176 },
  // JUZ 5
  { name: "An-Nisa'", juz: "5", total: 176 },
  // JUZ 6
  { name: "An-Nisa'", juz: "6", total: 176 },
  { name: "Al-Ma'idah", juz: "6", total: 120 },
  // JUZ 7
  { name: "Al-Ma'idah", juz: "7", total: 120 },
  { name: "Al-An'am", juz: "7", total: 165 },
  // JUZ 8
  { name: "Al-An'am", juz: "8", total: 165 },
  { name: "Al-A'raf", juz: "8", total: 206 },
  // JUZ 9
  { name: "Al-A'raf", juz: "9", total: 206 },
  { name: "Al-Anfal", juz: "9", total: 75 },
  // JUZ 10
  { name: "Al-Anfal", juz: "10", total: 75 },
  { name: "At-Taubah", juz: "10", total: 129 },
  // JUZ 11
  { name: "At-Taubah", juz: "11", total: 129 },
  { name: "Yunus", juz: "11", total: 109 },
  { name: "Hud", juz: "11", total: 123 },
  // JUZ 12
  { name: "Hud", juz: "12", total: 123 },
  { name: "Yusuf", juz: "12", total: 111 },
  // JUZ 13
  { name: "Yusuf", juz: "13", total: 111 },
  { name: "Ar-Ra'd", juz: "13", total: 43 },
  { name: "Ibrahim", juz: "13", total: 52 },
  // JUZ 14
  { name: "Al-Hijr", juz: "14", total: 99 },
  { name: "An-Nahl", juz: "14", total: 128 },
  // JUZ 15
  { name: "Al-Isra'", juz: "15", total: 111 },
  { name: "Al-Kahf", juz: "15", total: 110 },
  // JUZ 16
  { name: "Al-Kahf", juz: "16", total: 110 },
  { name: "Maryam", juz: "16", total: 98 },
  { name: "Ta-Ha", juz: "16", total: 135 },
  // JUZ 17
  { name: "Al-Anbiya'", juz: "17", total: 112 },
  { name: "Al-Hajj", juz: "17", total: 78 },
  // JUZ 18
  { name: "Al-Mu'minun", juz: "18", total: 118 },
  { name: "An-Nur", juz: "18", total: 64 },
  { name: "Al-Furqan", juz: "18", total: 77 },
  // JUZ 19
  { name: "Al-Furqan", juz: "19", total: 77 },
  { name: "Asy-Syu'ara'", juz: "19", total: 227 },
  { name: "An-Naml", juz: "19", total: 93 },
  // JUZ 20
  { name: "An-Naml", juz: "20", total: 93 },
  { name: "Al-Qasas", juz: "20", total: 88 },
  { name: "Al-'Ankabut", juz: "20", total: 69 },
  // JUZ 21
  { name: "Al-'Ankabut", juz: "21", total: 69 },
  { name: "Ar-Rum", juz: "21", total: 60 },
  { name: "Luqman", juz: "21", total: 34 },
  { name: "As-Sajdah", juz: "21", total: 30 },
  { name: "Al-Ahzab", juz: "21", total: 73 },
  // JUZ 22
  { name: "Al-Ahzab", juz: "22", total: 73 },
  { name: "Saba'", juz: "22", total: 54 },
  { name: "Fatir", juz: "22", total: 45 },
  { name: "Ya-Sin", juz: "22", total: 83 },
  // JUZ 23
  { name: "Ya-Sin", juz: "23", total: 83 },
  { name: "As-Saffat", juz: "23", total: 182 },
  { name: "Sad", juz: "23", total: 88 },
  { name: "Az-Zumar", juz: "23", total: 75 },
  // JUZ 24
  { name: "Az-Zumar", juz: "24", total: 75 },
  { name: "Ghafir", juz: "24", total: 85 },
  { name: "Fussilat", juz: "24", total: 54 },
  // JUZ 25
  { name: "Fussilat", juz: "25", total: 54 },
  { name: "Asy-Syura", juz: "25", total: 53 },
  { name: "Az-Zukhruf", juz: "25", total: 89 },
  { name: "Ad-Dukhan", juz: "25", total: 59 },
  { name: "Al-Jasiyah", juz: "25", total: 37 },
  // JUZ 26
  { name: "Al-Ahqaf", juz: "26", total: 35 },
  { name: "Muhammad", juz: "26", total: 38 },
  { name: "Al-Fath", juz: "26", total: 29 },
  { name: "Al-Hujurat", juz: "26", total: 18 },
  { name: "Qaf", juz: "26", total: 45 },
  { name: "Az-Zariyat", juz: "26", total: 60 },
  // JUZ 27
  { name: "Az-Zariyat", juz: "27", total: 60 },
  { name: "At-Tur", juz: "27", total: 49 },
  { name: "An-Najm", juz: "27", total: 62 },
  { name: "Al-Qamar", juz: "27", total: 55 },
  { name: "Ar-Rahman", juz: "27", total: 78 },
  { name: "Al-Waqi'ah", juz: "27", total: 96 },
  { name: "Al-Hadid", juz: "27", total: 29 },
  // JUZ 28
  { name: "Al-Mujadilah", juz: "28", total: 22 },
  { name: "Al-Hasyr", juz: "28", total: 24 },
  { name: "Al-Mumtahanah", juz: "28", total: 13 },
  { name: "As-Saff", juz: "28", total: 14 },
  { name: "Al-Jumu'ah", juz: "28", total: 11 },
  { name: "Al-Munafiqun", juz: "28", total: 11 },
  { name: "At-Tagabun", juz: "28", total: 18 },
  { name: "At-Talaq", juz: "28", total: 12 },
  { name: "At-Tahrim", juz: "28", total: 12 },
  // JUZ 29
  { name: "Al-Mulk", juz: "29", total: 30 },
  { name: "Al-Qalam", juz: "29", total: 52 },
  { name: "Al-Haqqah", juz: "29", total: 52 },
  { name: "Al-Ma'arij", juz: "29", total: 44 },
  { name: "Nuh", juz: "29", total: 28 },
  { name: "Al-Jinn", juz: "29", total: 28 },
  { name: "Al-Muzzammil", juz: "29", total: 20 },
  { name: "Al-Muddassir", juz: "29", total: 56 },
  { name: "Al-Qiyamah", juz: "29", total: 40 },
  { name: "Al-Insan", juz: "29", total: 31 },
  { name: "Al-Mursalat", juz: "29", total: 50 },
  // JUZ 30
  { name: "An-Naba'", juz: "30", total: 40 },
  { name: "An-Nazi'at", juz: "30", total: 46 },
  { name: "'Abasa", juz: "30", total: 42 },
  { name: "At-Takwir", juz: "30", total: 29 },
  { name: "Al-Infitar", juz: "30", total: 19 },
  { name: "Al-Mutaffifin", juz: "30", total: 36 },
  { name: "Al-Insyiqaq", juz: "30", total: 25 },
  { name: "Al-Buruj", juz: "30", total: 22 },
  { name: "At-Tariq", juz: "30", total: 17 },
  { name: "Al-A'la", juz: "30", total: 19 },
  { name: "Al-Ghasyiyah", juz: "30", total: 26 },
  { name: "Al-Fajr", juz: "30", total: 30 },
  { name: "Al-Balad", juz: "30", total: 20 },
  { name: "Asy-Syams", juz: "30", total: 15 },
  { name: "Al-Lail", juz: "30", total: 21 },
  { name: "Ad-Duha", juz: "30", total: 11 },
  { name: "Al-Insyirah", juz: "30", total: 8 },
  { name: "At-Tin", juz: "30", total: 8 },
  { name: "Al-'Alaq", juz: "30", total: 19 },
  { name: "Al-Qadr", juz: "30", total: 5 },
  { name: "Al-Bayyinah", juz: "30", total: 8 },
  { name: "Az-Zalzalah", juz: "30", total: 8 },
  { name: "Al-'Adiyat", juz: "30", total: 11 },
  { name: "Al-Qari'ah", juz: "30", total: 11 },
  { name: "At-Takatsur", juz: "30", total: 8 },
  { name: "Al-'Asr", juz: "30", total: 3 },
  { name: "Al-Humazah", juz: "30", total: 9 },
  { name: "Al-Fil", juz: "30", total: 5 },
  { name: "Quraisy", juz: "30", total: 4 },
  { name: "Al-Ma'un", juz: "30", total: 7 },
  { name: "Al-Kautsar", juz: "30", total: 3 },
  { name: "Al-Kafirun", juz: "30", total: 6 },
  { name: "An-Nasr", juz: "30", total: 3 },
  { name: "Al-Lahab", juz: "30", total: 5 },
  { name: "Al-Ikhlas", juz: "30", total: 4 },
  { name: "Al-Falaq", juz: "30", total: 5 },
  { name: "An-Nas", juz: "30", total: 6 },
];


// SIDEBAR
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "../molecules/LogoutModal";
import { 
  BiHome, BiBarChartSquare, BiCheckSquare, BiLayer, 
  BiCog, BiChevronDown, BiUser, BiIdCard, BiGroup, BiLogOut 
} from "react-icons/bi";
import logoMIS from "../../assets/logo.png"; 

const Sidebar = ({ isCollapsed, isActive }) => {
  const [isInputDataOpen, setInputDataOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user")) || { role: "" };
  const userRole = userData.role;

  useEffect(() => {
    if (isCollapsed) setInputDataOpen(false);
  }, [isCollapsed]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    navigate("/"); 
  };

  const menuItems = [
    { path: "/beranda", label: "Beranda", icon: BiHome, roles: ["ADMIN", "MUSYIF", "WALI_MURID"] },
    { path: "/laporan-progress", label: "Laporan Progress", icon: BiBarChartSquare, roles: ["ADMIN", "MUSYIF", "WALI_MURID"] },
    { path: "/setor-hafalan", label: "Setor Hafalan", icon: BiCheckSquare, roles: ["ADMIN", "MUSYIF"] },
  ];

  const subItems = [
    { path: "/data-musyif", label: "Data Musyif", icon: BiUser },
    { path: "/data-siswa", label: "Data Siswa", icon: BiIdCard },
  ];

  return (
    <>
      <aside className={`fixed top-0 left-0 h-full bg-[#1B4332] text-white transition-all duration-300 z-[1050] flex flex-col shadow-xl
        ${isCollapsed ? "w-[80px]" : "w-[260px]"}
        ${isActive ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        
        {/* LOGO SECTION */}
        <div className={`flex items-center gap-3 px-5 py-7 border-b border-white/10 ${isCollapsed ? "justify-center" : ""}`}>
          <img src={logoMIS} alt="Logo MIS" className="w-10 h-10 object-contain shrink-0" />
          <div className={`transition-opacity duration-300 ${isCollapsed ? "hidden opacity-0" : "block opacity-100"}`}>
            <h1 className="text-[1.1rem] font-bold leading-tight tracking-tight whitespace-nowrap">MUTABAAH DIGITAL</h1>
            <p className="text-[0.65rem] text-white/70 font-medium tracking-widest uppercase">MIS DARUL ULUM</p>
          </div>
        </div>

        {/* MENU NAVIGATION */}
        <nav className="flex-1 mt-6 overflow-y-auto custom-scrollbar overflow-x-hidden">
          {menuItems.filter(item => item.roles.includes(userRole)).map((item, index) => {
            const isItemActive = location.pathname === item.path;
            return (
              <Link 
                key={index} 
                to={item.path} 
                title={isCollapsed ? item.label : ""}
                className={`flex items-center gap-3 px-5 py-3.5 transition-all duration-200 whitespace-nowrap border-l-[4px]
                  ${isItemActive 
                    ? "bg-black/15 text-white border-[#2ecc71] font-semibold" 
                    : "text-white/80 hover:bg-black/10 hover:text-white border-transparent"
                  } ${isCollapsed ? "justify-center" : ""}`}
              >
                <item.icon className={`text-[1.35rem] shrink-0 ${isItemActive ? "text-[#2ecc71]" : ""}`} />
                <span className={`text-[0.95rem] transition-all duration-300 ${isCollapsed ? "hidden absolute" : "block relative"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* DROP DOWN: INPUT DATA MASTER */}
          {userRole === "ADMIN" && (
            <div className="mt-1">
              <button 
                onClick={() => !isCollapsed && setInputDataOpen(!isInputDataOpen)}
                className={`w-full flex items-center justify-between px-5 py-3.5 text-white/80 hover:bg-black/10 hover:text-white transition-colors border-l-[4px] border-transparent
                  ${isCollapsed ? "justify-center" : ""} ${isInputDataOpen ? "bg-black/5" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <BiLayer className={`text-[1.35rem] shrink-0 ${subItems.some(s => s.path === location.pathname) ? "text-[#2ecc71]" : ""}`} />
                  {!isCollapsed && <span className="text-[0.95rem] font-medium">Input Data Master</span>}
                </div>
                {!isCollapsed && (
                  <BiChevronDown className={`text-xl transition-transform duration-300 ${isInputDataOpen ? "rotate-180" : ""}`} />
                )}
              </button>

              {isInputDataOpen && !isCollapsed && (
                <div className="bg-black/10 py-1">
                  {subItems.map((sub, idx) => {
                    const isSubActive = location.pathname === sub.path;
                    return (
                      <Link 
                        key={idx} 
                        to={sub.path} 
                        className={`flex items-center gap-3 pl-10 pr-5 py-3 text-[0.9rem] transition-all duration-200 border-l-[4px]
                          ${isSubActive 
                            ? "bg-white/10 text-white border-[#2ecc71] font-semibold" 
                            : "text-white/70 hover:text-white hover:bg-white/5 border-transparent"
                          }`}
                      >
                        <sub.icon className={`text-[1.1rem] shrink-0 ${isSubActive ? "text-[#2ecc71]" : ""}`} /> 
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* MANAGEMENT USER */}
          {userRole === "ADMIN" && (
            <Link 
              to="/management-user" 
              title={isCollapsed ? "Management User" : ""} 
              className={`flex items-center gap-3 px-5 py-3.5 transition-all duration-200 whitespace-nowrap border-l-[4px]
                ${location.pathname === "/management-user"
                  ? "bg-black/15 text-white border-[#2ecc71] font-semibold"
                  : "text-white/80 hover:bg-black/10 hover:text-white border-transparent"
                } ${isCollapsed ? "justify-center" : ""}`}
            >
              <BiGroup className={`text-[1.35rem] shrink-0 ${location.pathname === "/management-user" ? "text-[#2ecc71]" : ""}`} /> 
              <span className={`text-[0.95rem] transition-all ${isCollapsed ? "hidden absolute" : "block relative"}`}>
                Management User
              </span>
            </Link>
          )}
          
          {/* LOGOUT SECTION */}
          <div className="pt-4 mt-4 border-t border-white/10">
             <button 
               onClick={() => setShowLogoutModal(true)} 
               className={`w-full flex items-center gap-3 px-5 py-3.5 transition-colors whitespace-nowrap text-left text-white/90 hover:text-[#EF4444] hover:bg-[#EF4444]/10 border-l-[4px] border-transparent ${isCollapsed ? "justify-center" : ""}`}
             >
               <BiLogOut className="text-[1.35rem] shrink-0" /> 
               {!isCollapsed && <span className="text-[0.95rem] font-medium">Keluar Sistem</span>}
             </button>
          </div>
        </nav>
      </aside>

      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
        onConfirm={handleLogout} 
      />
    </>
  );
};

export default Sidebar;