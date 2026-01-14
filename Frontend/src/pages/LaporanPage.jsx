import { useState } from "react";
import DashboardLayout from "../components/templates/DashboardLayout";
import DashboardInput from "../components/atoms/DashboardInput";
import ActionButton from "../components/atoms/ActionButton";
import CustomTable from "../components/molecules/CustomTable";
import { 
  BiDownload, 
  BiSearch, 
  BiBookContent, 
  BiTimeFive 
} from "react-icons/bi";

const LaporanPage = () => {
  // State untuk menangani logika dropdown nama siswa
  const [selectedStudent, setSelectedStudent] = useState("Semua");

  // Mockup data ringkasan per siswa
  const studentSummary = {
    "Rizal": { total: "5 Surah", target: "5 Surah", status: "Terpenuhi", statusColor: "bg-[#d1fae5] text-[#059669]" },
    "Ahmad": { total: "3 Surah", target: "5 Surah", status: "Belum Terpenuhi", statusColor: "bg-[#fee2e2] text-[#dc2626]" }
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  return (
    <DashboardLayout title="Laporan Progress">
      
      {/* --- KARTU 1: REKAP LAPORAN (UPDATED DESIGN) --- */}
      <div className="bg-white rounded-[8px] p-6 border-t-[5px] border-[#2ECC71] shadow-[0_4px_15px_rgba(0,0,0,0.05)] mb-8">
        <div className="flex items-center gap-2.5 font-[700] text-[1.25rem] mb-6 text-slate-800">
          <BiBookContent className="text-2xl" /> Rekap Laporan
        </div>

        {/* --- FORM FILTER --- */}
        <div className="space-y-4">
          
          {/* Baris 1: Tanggal (2 Kolom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DashboardInput label="Dari Tanggal" type="date" defaultValue="2026-01-08" />
            <DashboardInput label="Sampai Tanggal" type="date" defaultValue="2026-02-08" />
          </div>

          {/* Baris 2: Nama & Jenis (2 Kolom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dropdown Nama dengan Logic onChange */}
            <div>
              <label className="block font-[600] text-[#1a1a1a] mb-2 text-[0.95rem]">Nama Siswa</label>
              <select 
                className="w-full bg-[#f8fafc] border border-gray-300 rounded-[4px] px-4 py-2.5 font-[500] outline-none text-slate-800 focus:border-[#2ECC71] transition-all"
                value={selectedStudent}
                onChange={handleStudentChange}
              >
                <option value="Semua">Semua</option>
                <option value="Rizal">Rizal</option>
                <option value="Ahmad">Ahmad</option>
              </select>
            </div>

            {/* Dropdown Jenis + Tombol Search */}
            <div className="w-full">
              <label className="block font-[600] text-[#1a1a1a] mb-2 text-[0.95rem]">Jenis Hafalan</label>
              <div className="flex gap-2">
                <div className="flex-grow">
                  <select className="w-full bg-[#f8fafc] border border-gray-300 rounded-[4px] px-4 py-2.5 font-[500] outline-none text-slate-800 focus:border-[#2ECC71] transition-all">
                    <option value="Semua">Semua</option>
                    <option value="Ziyadah">Ziyadah</option>
                    <option value="Murajaah">Murajaah</option>
                  </select>
                </div>
                <button className="bg-[#1B4332] text-white rounded-[4px] w-[45px] flex items-center justify-center text-xl hover:opacity-90 transition-all">
                  <BiSearch />
                </button>
              </div>
            </div>
          </div>

          {/* Tombol Download (Full Width, Hijau Gelap) */}
          <button className="w-full bg-[#1B4332] text-white font-[700] py-3 rounded-[6px] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm mt-2">
            <BiDownload className="text-xl" /> Download Laporan
          </button>

        </div>

        {/* --- SECTION DATA SISWA (Hanya muncul jika siswa dipilih) --- */}
        {selectedStudent !== "Semua" && studentSummary[selectedStudent] && (
          <div className="mt-8 animate-[fadeIn_0.5s_ease-out]">
            <h4 className="text-[#2ECC71] font-[700] text-[1.1rem] mb-4">
              Laporan Siswa : <span className="text-[#1B4332]">{selectedStudent}</span>
            </h4>
            
            <div className="space-y-2.5 text-[0.95rem] font-[600] text-slate-700 ml-1">
              <div className="flex items-center">
                <span className="w-[140px] shrink-0">Total Hafalan</span>
                <span className="mr-2">:</span>
                <span>{studentSummary[selectedStudent].total}</span>
              </div>
              <div className="flex items-center">
                <span className="w-[140px] shrink-0">Target Hafalan</span>
                <span className="mr-2">:</span>
                <span>{studentSummary[selectedStudent].target}</span>
              </div>
              <div className="flex items-center">
                <span className="w-[140px] shrink-0">Status Hafalan</span>
                <span className="mr-2">:</span>
                <span className={`${studentSummary[selectedStudent].statusColor} px-3 py-1 rounded-[4px] text-[0.8rem] font-bold uppercase tracking-wide`}>
                  {studentSummary[selectedStudent].status}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* --- TABEL DATA --- */}
        <div className="mt-8">
          <CustomTable 
            headers={["Nama Siswa", "Tanggal", "Musyif", "Surah", "Ayat", "Jenis", "Nilai", "Catatan"]} 
          />
          {/* Mockup Data Row (Manual render utk demo) */}
          <div className="border border-t-0 border-black overflow-x-auto">
             <table className="w-full min-w-[800px]">
                <tbody>
                   {/* BARIS TERAKHIR SUDAH DIHAPUS DISINI AGAR RAPI */}
                </tbody>
             </table>
          </div>
        </div>

      </div>

      {/* --- KARTU 2: RIWAYAT TERBARU --- */}
      <div className="bg-white rounded-[8px] p-6 border-t-[5px] border-[#2ECC71] shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2.5 font-[700] text-[1.25rem] mb-6 text-slate-800">
          <BiTimeFive className="text-2xl" /> Riwayat Terbaru
        </div>

        {/* --- PERBAIKAN DISINI: TANGGAL & SEARCH SEJAJAR --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          
          {/* Nama Siswa (Full width di HP) */}
          <div className="w-full md:flex-[2]">
            <DashboardInput label="Nama Siswa" type="select" options={["Semua"]} />
          </div>

          {/* Wrapper Tanggal & Button (Sejajar Kanan-Kiri di HP & Laptop) */}
          <div className="w-full md:flex-[1] flex gap-2 items-end">
            <div className="flex-grow">
               <DashboardInput label="Tanggal Hafalan" type="date" defaultValue="2026-01-08" />
            </div>
            {/* Tombol Search Nempel di Kanan Input Tanggal */}
            <div className="mb-[1px]"> 
               <ActionButton icon={BiSearch} variant="primary" className="w-[45px] h-[45px]" />
            </div>
          </div>

        </div>

        {/* Tombol Filter Cepat */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <ActionButton label="Hari Ini" variant="green" className="px-6 py-2 text-sm" />
          <ActionButton label="Kemarin" variant="yellow" className="px-6 py-2 text-sm" />
          <ActionButton label="Semua" variant="blue" className="px-6 py-2 text-sm" />
        </div>

        <CustomTable 
          headers={["Nama Siswa", "Tanggal", "Musyif", "Surah", "Ayat", "Jenis", "Nilai", "Catatan"]} 
        />
      </div>

    </DashboardLayout>
  );
};

export default LaporanPage;