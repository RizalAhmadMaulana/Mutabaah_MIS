import { useState, useEffect } from "react";
import { 
  BiSave, 
  BiTrash, 
  BiFile, 
  BiPlus, 
  BiPencil, 
  BiX,
  BiCheck
} from "react-icons/bi";

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

// --- KOMPONEN INPUT ---
const ModalInput = ({ label, type = "text", value, options, readOnly, placeholder, onChange, ...props }) => {
  const baseClass = "w-full bg-[#D9D9D9] border-none rounded-[4px] px-4 py-2.5 font-[500] h-[45px] outline-none text-slate-800 placeholder-slate-500 transition-all focus:ring-2 focus:ring-[#5294A9]/50";
  
  return (
    <div className="w-full">
      {label && <label className="block font-[700] text-[#1a1a1a] mb-2 text-[0.95rem]">{label}</label>}
      
      {type === "select" ? (
        <select 
          className={baseClass} 
          value={value} 
          onChange={onChange}
          {...props}
        >
          {options?.map((opt, idx) => {
            const optValue = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return <option key={idx} value={optValue}>{optLabel}</option>
          })}
        </select>
      ) : (
        <input 
          type={type} 
          className={baseClass}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          {...props}
        />
      )}
    </div>
  );
};

// --- MODAL WRAPPER ---
const ModalWrapper = ({ title, icon: Icon, onClose, children, size = "max-w-lg" }) => (
  <div className="fixed inset-0 bg-black/50 z-[1070] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
    <div className={`bg-white rounded-[15px] w-full ${size} shadow-lg flex flex-col max-h-[95vh] animate-[zoomIn_0.3s_ease-out]`}>
      <div className="border-b border-black px-6 py-4 flex justify-between items-center shrink-0">
        <h5 className="font-[700] text-[1.2rem] flex items-center gap-2 text-slate-800">
          {Icon && <Icon className="text-xl" />} {title}
        </h5>
        <button onClick={onClose} className="text-3xl hover:text-red-500 transition-colors leading-none">&times;</button>
      </div>
      <div className="p-6 overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </div>
  </div>
);

// --- 1. MODAL TAMBAH / EDIT HAFALAN (LOGIC BARU) ---
export const FormHafalanModal = ({ mode = "add", onClose, onSave }) => {
  // State untuk form control
  const [selectedJuz, setSelectedJuz] = useState(mode === "edit" ? "30" : "");
  const [selectedSurah, setSelectedSurah] = useState(mode === "edit" ? "An-Naba" : "");
  const [ayat, setAyat] = useState(mode === "edit" ? "1-40" : "");
  const [filteredSurahs, setFilteredSurahs] = useState([]);

  // Generate Options Juz 1-30 secara otomatis
  const juzOptions = [
    { label: "-- Pilih Juz --", value: "" },
    ...Array.from({ length: 30 }, (_, i) => ({ label: `Juz ${i + 1}`, value: `${i + 1}` }))
  ];

  // Logic 1: Filter Surah saat Juz berubah
  useEffect(() => {
    if (selectedJuz) {
      // Filter data berdasarkan Juz yang dipilih
      const filtered = QURAN_DATA.filter(item => item.juz === selectedJuz);
      setFilteredSurahs(filtered);
    } else {
      setFilteredSurahs([]);
    }
  }, [selectedJuz]);

  // Handler Ganti Juz
  const handleJuzChange = (e) => {
    const val = e.target.value;
    setSelectedJuz(val);
    setSelectedSurah(""); // Reset Surah saat ganti Juz
    setAyat(""); // Reset Ayat saat ganti Juz
  };

  // Handler Ganti Surah (Logic 2 & 3: Auto-fill Ayat)
  const handleSurahChange = (e) => {
    const val = e.target.value;
    setSelectedSurah(val);
    
    // Cari data surah untuk dapatkan total ayat
    // Kita cari berdasarkan Nama Surah DAN Juz yang sedang aktif (untuk handle surah yang ada di banyak juz)
    const surahInfo = QURAN_DATA.find(s => s.name === val && s.juz === selectedJuz);
    
    if (surahInfo) {
      setAyat(`1-${surahInfo.total}`); // Auto fill format: 1-Total
    } else {
      setAyat("");
    }
  };

  return (
    <ModalWrapper 
      title={mode === "add" ? "Tambah Hafalan" : "Edit Hafalan"} 
      icon={mode === "add" ? BiPlus : BiPencil} 
      onClose={onClose}
      size="max-w-3xl"
    >
      <div className="space-y-4">
        <ModalInput label="Nama Siswa" type="select" options={["-- Pilih Siswa --", "Rizal Ahmad M", "Budi"]} value={mode === "edit" ? "Rizal Ahmad M" : ""} onChange={() => {}} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ModalInput label="Tanggal" type="date" value="2026-01-09" onChange={() => {}} />
            <ModalInput label="Musyif" type="select" options={["-- Pilih Musyif --", "Ustadz Ali"]} value={mode === "edit" ? "Ustadz Ali" : ""} onChange={() => {}} />
        </div>
        
        {/* LOGIC UTAMA: JUZ & SURAH */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 1. Pilih Juz Dulu */}
          <ModalInput 
            label="Pilih Juz" 
            type="select" 
            options={juzOptions} 
            value={selectedJuz} 
            onChange={handleJuzChange} 
          />

          {/* 2. Surah Terfilter otomatis */}
          <div>
            <label className="block font-[700] text-[#1a1a1a] mb-2 text-[0.95rem]">Surah</label>
            <select 
              className="w-full bg-[#D9D9D9] border-none rounded-[4px] px-4 py-2.5 font-[500] h-[45px] outline-none text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              value={selectedSurah}
              onChange={handleSurahChange}
              disabled={!selectedJuz} // Disabled kalau Juz belum dipilih
            >
              <option value="">{selectedJuz ? "-- Pilih Surah --" : "-- Pilih Juz Terlebih Dahulu --"}</option>
              {filteredSurahs.map((surah, idx) => (
                <option key={idx} value={surah.name}>{surah.name}</option>
              ))}
            </select>
          </div>

        </div>

        {/* LOGIC 3: Ayat Auto Fill tapi Editable */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ModalInput 
              label="Ayat" 
              placeholder="Contoh: 1-10" 
              value={ayat} 
              onChange={(e) => setAyat(e.target.value)} // Bisa diedit manual
            />
            
            <ModalInput label="Jenis Setoran" type="select" options={["-- Pilih Jenis --", "Ziyadah (Hafalan Baru)", "Murajaah (Mengulang)"]} onChange={() => {}} />
            <ModalInput label="Nilai" type="select" options={["-- Pilih Nilai --", "A", "B", "C", "D"]} onChange={() => {}} />
        </div>
        
        <div>
          <label className="block font-[700] text-[#1a1a1a] mb-2 text-[0.95rem]">Catatan</label>
          <textarea className="w-full bg-[#D9D9D9] border-none rounded-[4px] px-4 py-3 font-[500] h-[100px] outline-none resize-none placeholder-slate-500 text-slate-800" defaultValue={mode === "edit" ? "Lancar" : ""} placeholder="Masukkan catatan untuk siswa..."></textarea>
        </div>

        <hr className="border-t border-black my-6 -mx-6 opacity-100" />
        
        <div className="flex flex-row justify-end gap-3">
          <button className="bg-[#E53E3E] text-white rounded-[4px] px-6 py-2 font-[700] flex items-center gap-2 hover:bg-red-700 transition-colors">
            <BiTrash /> Reset
          </button>
          <button onClick={onSave} className="bg-[#5294A9] text-white rounded-[4px] px-6 py-2 font-[700] flex items-center gap-2 hover:bg-[#417688] transition-colors">
            <BiSave /> Simpan
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

// --- 2. MODAL IMPORT EXCEL ---
export const ImportExcelModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/50 z-[1070] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
    <div className="bg-white rounded-[15px] w-full max-w-md shadow-lg overflow-hidden animate-[zoomIn_0.3s_ease-out]">
      <div className="flex justify-between items-center p-4 border-b">
        <h6 className="font-bold text-lg flex items-center gap-2"><BiFile /> Import Excel</h6>
        <button onClick={onClose} className="text-3xl hover:text-red-500 leading-none">&times;</button>
      </div>
      <div className="p-8 text-center">
        <div className="mb-6"><BiFile className="text-[5rem] text-[#198754] mx-auto mb-2 opacity-80" /><p className="text-sm text-slate-500">Upload file format .xlsx / .xls</p></div>
        <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#198754] file:text-white hover:file:bg-[#146c43] cursor-pointer bg-slate-100 rounded-lg border border-slate-200" />
      </div>
      <div className="p-4 border-t bg-slate-50">
        <button className="w-full bg-[#198754] text-white font-bold py-3 rounded-[6px] shadow-sm hover:bg-[#157347] transition-all flex justify-center items-center gap-2">Import Sekarang</button>
      </div>
    </div>
  </div>
);

// --- 3. MODAL KONFIRMASI ---
export const ConfirmModal = ({ type = "save", onClose, onConfirm }) => {
  const isDelete = type === "delete";
  const iconBg = isDelete ? "bg-[#DC3545]" : "bg-[#007BFF]";
  const icon = isDelete ? <BiX /> : <BiCheck />;
  
  const titleText = isDelete ? "Hapus Hafalan?" : (type === "edit" ? "Konfirmasi Perubahan" : "Konfirmasi Data");
  const titleColor = isDelete ? "text-[#DC3545]" : "text-[#007BFF]";
  const descText = isDelete ? "Apakah Anda yakin ingin menghapus data hafalan ini?" : "Apakah Anda yakin ingin menyimpan data setoran hafalan ini?";

  return (
    <div className="fixed inset-0 bg-black/50 z-[1080] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-white rounded-[15px] w-full max-w-[450px] p-6 md:p-8 text-center shadow-2xl animate-[zoomIn_0.3s_ease-out] overflow-y-auto max-h-[90vh]">
        <div className={`w-[80px] h-[80px] md:w-[90px] md:h-[90px] rounded-full flex items-center justify-center mx-auto mb-5 text-[3.5rem] md:text-[4rem] text-white ${iconBg} shadow-lg`}>{icon}</div>
        <h2 className={`font-[800] text-[1.4rem] md:text-[1.6rem] mb-2 ${titleColor}`}>{titleText}</h2>
        <p className="text-slate-500 mb-8 px-2 leading-relaxed text-sm md:text-base">{descText}</p>
        {!isDelete && (
          <div className="bg-slate-50 p-4 rounded-lg text-left mx-auto mb-8 border border-slate-200 text-sm w-full">
            <div className="flex mb-2"><span className="w-[80px] md:w-[100px] font-bold text-slate-700 shrink-0">Nama</span><span>: Rizal Ahmad</span></div>
            <div className="flex mb-2"><span className="w-[80px] md:w-[100px] font-bold text-slate-700 shrink-0">Surah</span><span>: An-Naba</span></div>
            <div className="flex"><span className="w-[80px] md:w-[100px] font-bold text-slate-700 shrink-0">Juz</span><span>: 30</span></div>
          </div>
        )}
        
        <div className="flex flex-row justify-center gap-3">
           <button onClick={onClose} className="bg-[#6C757D] text-white py-2.5 px-2 rounded-[8px] font-[700] hover:bg-[#5a6268] transition-all w-1/2">Batal</button>
          <button onClick={onConfirm} className={`${isDelete ? "bg-[#DC3545] hover:bg-[#bb2d3b]" : "bg-[#007BFF] hover:bg-[#0056b3]"} text-white py-2.5 px-2 rounded-[8px] font-[700] transition-all w-1/2`}>{isDelete ? "Hapus" : "Ya, Simpan"}</button>
        </div>
      </div>
    </div>
  );
};