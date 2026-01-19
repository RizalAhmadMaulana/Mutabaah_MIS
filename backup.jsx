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

12345678, 89676440508

import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../components/templates/DashboardLayout";
import StatCard from "../components/atoms/StatCard";
import WelcomeModal from "../components/molecules/WelcomeModal";
import { Doughnut, Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement 
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const BerandaPage = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [periode, setPeriode] = useState("Mingguan");
  const [loading, setLoading] = useState(true);
  
  const [data, setData] = useState({
    cards: {
      total_siswa: 0, total_musyif: 0, total_kelas: 0,
      best_student: { name: "-", count: "0 Surah" }
    },
    charts: {
      nilai: [0, 0, 0, 0],
      progress: { labels: [], data: [] }
    }
  });

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://127.0.0.1:8000/api/academic/dashboard/summary/?periode=${periode}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Gagal load dashboard", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // 1. Ambil data user dari localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    
    /** * 2. LOGIKA BARU: Tampilkan modal JIKA:
     * - Password masih default (is_default === true)
     * - DAN Profil belum lengkap (is_profile_complete === false)
     * - DAN Modal belum di-dismiss di sesi ini
     */
    if (storedUser.is_default === true && 
        storedUser.is_profile_complete === false && 
        !sessionStorage.getItem("welcome_dismissed")) {
      setShowWelcome(true);
    }

    fetchDashboardData();
  }, [periode]);

  // Fungsi untuk menutup modal sementara
  const handleCloseWelcome = () => {
    setShowWelcome(false);
    // Simpan ke sessionStorage supaya modal tidak muncul lagi di tab yang sama selama sesi aktif
    sessionStorage.setItem("welcome_dismissed", "true");
  };

  // --- Konfigurasi Chart Data ---
  const doughnutData = {
    labels: ['A - Sangat Baik', 'B - Baik', 'C - Cukup', 'D - Kurang'],
    datasets: [{
      data: data.charts.nilai,
      backgroundColor: ['#22C55E', '#3b82f6', '#fbbf24', '#f87171'],
      borderWidth: 0
    }]
  };

  const barData = {
    labels: data.charts.progress.labels,
    datasets: [{
      label: 'Jumlah Hafalan (Surah)',
      data: data.charts.progress.data,
      backgroundColor: '#3B82F6',
      borderRadius: 5,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  };

  return (
    <DashboardLayout title="Beranda">
      {/* WelcomeModal muncul untuk semua user tanpa filter */}
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}

      {/* GRID KARTU STATISTIK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Siswa" value={`${data.cards.total_siswa} Siswa`} bgColor="#4A90E2" />
        <StatCard title="Total Musyif" value={`${data.cards.total_musyif} Musyif`} bgColor="#9B51E0" />
        <StatCard title="Total Kelas" value={`${data.cards.total_kelas} kelas`} bgColor="#F2994A" />
        <StatCard 
          title="Progress Terbaik" 
          value={
            <div className="flex flex-col items-center">
              <span className="text-[1.4rem] leading-tight">{data.cards.best_student.name}</span>
              <span className="text-[1.1rem]">({data.cards.best_student.count})</span>
            </div>
          } 
          bgColor="#27AE60"
        />
      </div>

      {/* FILTER PERIODE */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 w-full">
        <div className="bg-[#3B82F6] text-white p-3 text-[1.1rem] font-[600] text-left px-4">
          Pilih Periode Statistik
        </div>
        <select 
          className="w-full p-3 bg-[#E5E7EB] border-none outline-none text-[#1a1a1a] font-medium cursor-pointer appearance-none"
          value={periode}
          onChange={(e) => setPeriode(e.target.value)}
          style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
        >
          <option value="Mingguan">Mingguan</option>
          <option value="Bulanan">Bulanan</option>
          <option value="Semester">Semester (6 Bulan)</option>
        </select>
      </div>

      {/* DIAGRAM GRAFIK */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col h-[450px]">
          <div className="bg-[#EF4444] text-white p-3 font-[600] text-[1.1rem] px-4">Diagram Grafik Nilai</div>
          <div className="p-4 flex-1 flex items-center justify-center">
            {loading ? <p className="text-slate-400">Memuat data...</p> : <Doughnut data={doughnutData} options={chartOptions} />}
          </div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col h-[450px]">
          <div className="bg-[#22C55E] text-white p-3 font-[600] text-[1.1rem] px-4">Diagram Progress Hafalan</div>
          <div className="p-4 flex-1 flex items-center justify-center">
            {loading ? <p className="text-slate-400">Memuat data...</p> : <Bar data={barData} options={chartOptions} />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BerandaPage;