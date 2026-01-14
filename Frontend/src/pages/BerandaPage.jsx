import { useState, useEffect } from "react"; // Tambah useEffect
import DashboardLayout from "../components/templates/DashboardLayout";
import StatCard from "../components/atoms/StatCard";
import WelcomeModal from "../components/molecules/WelcomeModal"; // Import Modal Baru
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const BerandaPage = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  // Munculkan modal saat halaman pertama kali dibuka
  useEffect(() => {
    setShowWelcome(true);
  }, []);

  // ... (Data Chart Tetap Sama seperti sebelumnya)
  const doughnutData = {
    labels: ['A - Sangat Baik', 'B - Baik', 'C - Cukup', 'D - Kurang'],
    datasets: [{
      data: [20, 15, 25, 10],
      backgroundColor: ['#22C55E', '#3b82f6', '#fbbf24','#f87171'],
      borderWidth: 0
    }]
  };

  const barData = {
    labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
    datasets: [{
      label: 'Hafalan',
      data: [150, 230, 390, 360],
      backgroundColor: '#60a5fa',
      borderRadius: 4
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } }
  };

  return (
    <DashboardLayout title="Beranda">
      {/* Tampilkan Modal jika state true */}
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

      {/* Konten Halaman (Grid StatCard, dll) Tetap Sama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Siswa" value="xx Siswa" bgColor="#3B82F6" />
        <StatCard title="Total Musyif" value="xx Musyif" bgColor="#A855F7" />
        <StatCard title="Total Kelas" value="x kelas" bgColor="#FBBF24" />
        <StatCard title="Progress Terbaik" value="nama (x)" bgColor="#10B981" />
      </div>

      <div className="mb-8">
        <button className="w-full bg-[#2D88FF] text-white p-3 rounded-t text-lg font-[600] border-none text-left px-4">
          Pilih Periode Statistik
        </button>
        <select className="w-full p-3 bg-[#D1D5DB] border-none rounded-b outline-none text-[#666] font-medium">
          <option disabled defaultValue>-- Pilih Periode --</option>
          <option>Mingguan</option>
          <option>Bulanan</option>
          <option>Semester (6 Bulan)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col h-[450px]">
          <div className="bg-[#EF4444] text-white p-3 font-[600] text-[1.1rem] px-4">Diagram Grafik Nilai</div>
          <div className="p-4 flex-1 flex items-center justify-center">
            <div className="w-full h-full"><Doughnut data={doughnutData} options={chartOptions} /></div>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col h-[450px]">
          <div className="bg-[#22C55E] text-white p-3 font-[600] text-[1.1rem] px-4">Diagram Progress Hafalan</div>
          <div className="p-4 flex-1 flex items-center justify-center">
            <div className="w-full h-full"><Bar data={barData} options={{ ...chartOptions, plugins: { legend: { display: false } } }} /></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BerandaPage;