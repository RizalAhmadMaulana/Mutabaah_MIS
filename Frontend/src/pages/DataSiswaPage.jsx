import { useState, useEffect } from "react"; // LOGIKA: Hook React
import axios from "axios"; // LOGIKA: Library API
import DashboardLayout from "../components/templates/DashboardLayout";
import { 
  BiPlus, 
  BiFile, 
  BiPencil, 
  BiTrash
} from "react-icons/bi";
import { FormSiswaModal, ImportExcelModal, ConfirmModal } from "../components/organisms/DataSiswaModals";

const DataSiswaPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  // LOGIKA: State Data & Kontrol
  const [siswa, setSiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // LOGIKA: State Search
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [tempFormData, setTempFormData] = useState(null);

  // LOGIKA: Fungsi ambil data dari Backend (Mendukung Fitur Search)
  const fetchSiswa = async () => {
    try {
      const token = localStorage.getItem("token");
      // Gunakan query param ?search= untuk filter di backend
      const response = await axios.get(`http://127.0.0.1:8000/api/siswa/?search=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSiswa(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Gagal mengambil data siswa:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Delay sedikit saat mengetik search (debouncing) agar tidak terlalu berat ke server
    const delayDebounceFn = setTimeout(() => {
      fetchSiswa();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // --- LOGIKA ALUR KONFIRMASI ---

  const handleRequestConfirm = (formData) => {
    setTempFormData(formData);
    setActiveModal(activeModal === 'add' ? 'confirm-add' : 'confirm-edit');
  };

  const handleFinalAction = async () => {
    try {
      const token = localStorage.getItem("token");
      const isEdit = activeModal === 'confirm-edit';
      const url = isEdit 
        ? `http://127.0.0.1:8000/api/siswa/${tempFormData.id}/` 
        : "http://127.0.0.1:8000/api/siswa/";
      const method = isEdit ? "patch" : "post";

      await axios[method](url, tempFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setActiveModal(null);
      setTempFormData(null);
      fetchSiswa();
      alert(isEdit ? "Data Siswa berhasil diubah!" : "Siswa baru berhasil ditambahkan!");
    } catch (err) {
      console.error(err);
      alert("Gagal memproses data. NISN mungkin sudah terdaftar.");
    }
  };

  const handleOpenDelete = (data) => {
    setSelectedSiswa(data);
    setActiveModal('confirm-delete');
  };

  const handleFinalDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/siswa/${selectedSiswa.id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActiveModal(null);
      fetchSiswa();
    } catch (err) {
      alert("Gagal menghapus data");
    }
  };

  const headers = ["#", "Nama Siswa", "Jenis Kelamin", "NISN", "Kelas", "Tempat, Tanggal Lahir", "No Telp Orangtua", "Aksi"];
  
  const renderTableBody = () => {
    // Tampilkan data asli, jika kurang dari 10 tampilkan mockup kosong agar desain tetap rapi
    const displayData = [...siswa];

    return displayData.map((row, idx) => (
      <tr key={idx} className="even:bg-[#f2f2f2] hover:bg-slate-100 transition-colors">
        {row.id ? (
          <>
            <td className="border border-black px-3 py-2.5 text-center h-[45px] whitespace-nowrap font-medium text-slate-700">{idx + 1}</td>
            <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{`${row.first_name} ${row.last_name}`}</td>
            <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.gender}</td>
            <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap font-mono">{row.nisn}</td>
            <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.kelas}</td>
            <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.birth_info}</td>
            <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.phone_number}</td>
            <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">
              <div className="flex gap-2 justify-center items-center">
                <button 
                  onClick={() => { setSelectedSiswa(row); setActiveModal('edit'); }}
                  className="bg-[#2ECC71] text-white py-[4px] px-[12px] rounded-[4px] text-[0.85rem] font-[600] flex items-center gap-1.5 hover:bg-[#27ae60] transition-all"
                >
                  <BiPencil className="text-[1rem]" /> Edit
                </button>
                <button 
                  onClick={() => handleOpenDelete(row)}
                  className="bg-[#E74C3C] text-white py-[4px] px-[12px] rounded-[4px] text-[0.85rem] font-[600] flex items-center gap-1.5 hover:bg-[#c0392b] transition-all"
                >
                  <BiTrash className="text-[1rem]" /> Hapus
                </button>
              </div>
            </td>
          </>
        ) : (
          headers.map((_, cIdx) => <td key={cIdx} className="border border-black px-2 py-2 h-[45px]">&nbsp;</td>)
        )}
      </tr>
    ));
  };

  return (
    <DashboardLayout title="Data Siswa">
      {/* MODALS */}
      {(activeModal === 'add' || activeModal === 'edit') && (
        <FormSiswaModal 
          mode={activeModal} 
          userData={selectedSiswa}
          onClose={() => setActiveModal(null)} 
          onSave={handleRequestConfirm} 
        />
      )}
      
      {activeModal === 'import' && (
        <ImportExcelModal 
          onClose={() => setActiveModal(null)} 
          onSuccess={() => { setActiveModal(null); fetchSiswa(); }} 
        />
      )}
      
      {activeModal === 'confirm-add' && <ConfirmModal type="add" userData={tempFormData} onClose={() => setActiveModal('add')} onConfirm={handleFinalAction} />}
      {activeModal === 'confirm-edit' && <ConfirmModal type="edit" userData={tempFormData} onClose={() => setActiveModal('edit')} onConfirm={handleFinalAction} />}
      {activeModal === 'confirm-delete' && <ConfirmModal type="delete" userData={selectedSiswa} onClose={() => setActiveModal(null)} onConfirm={handleFinalDelete} />}

      <div className="flex flex-row gap-3 mb-6">
        <button onClick={() => { setSelectedSiswa(null); setActiveModal('add'); }} className="bg-[#5294A9] text-white rounded-[4px] px-3 py-2.5 font-[600] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm w-1/2 sm:w-auto text-[0.85rem] sm:text-base whitespace-nowrap">
          <BiPlus className="text-xl shrink-0" /> Tambah Siswa
        </button>
        <button onClick={() => setActiveModal('import')} className="bg-[#8CB14E] text-white rounded-[4px] px-3 py-2.5 font-[600] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm w-1/2 sm:w-auto text-[0.85rem] sm:text-base whitespace-nowrap">
          <BiFile className="text-xl shrink-0" /> Import Excel
        </button>
      </div>

      <div className="bg-white rounded-[8px] p-4 md:p-5 border-t-[5px] border-[#2ECC71] shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
        <div className="flex flex-row justify-between items-center gap-2 mb-5 text-sm font-[600] text-slate-700">
          <div className="flex items-center shrink-0">
            <span>Show</span>
            <select className="mx-1.5 bg-[#f8fafc] border border-gray-300 rounded px-1 py-1 outline-none">
                <option>10</option>
                <option>25</option>
            </select> 
            <span className="hidden sm:inline">entries</span>
          </div>
          <div className="flex items-center justify-end w-[60%] sm:w-auto">
            <span className="mr-2 hidden sm:inline">Search:</span>
            {/* LOGIKA: Input Search Terhubung ke searchTerm */}
            <input 
              type="text" 
              placeholder="Cari Nama atau NISN..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[200px] bg-white border border-gray-300 rounded px-3 py-1.5 outline-none font-normal text-sm focus:border-[#2ECC71]" 
            />
          </div>
        </div>

        <div className="border border-black rounded-[4px] overflow-x-auto bg-white mb-4 custom-scrollbar">
          <table className="w-full border-collapse min-w-max">
            <thead>
              <tr className="bg-white">
                {headers.map((h, i) => (
                  <th key={i} className="border border-black px-3 py-3 text-center font-[700] text-black text-[0.9rem] bg-white whitespace-nowrap uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={8} className="text-center p-10 font-bold text-slate-400">Memuat data santri...</td></tr> : renderTableBody()}
            </tbody>
          </table>
        </div>

        <div className="flex flex-row justify-between items-center text-[0.8rem] sm:text-[0.85rem] font-[600] mt-2">
          <div className="text-slate-600">Showing {siswa.length} entries</div>
          <div className="flex border border-gray-300 rounded-[4px] overflow-hidden shadow-sm scale-90 sm:scale-100 origin-right">
            <button className="px-2 sm:px-3 py-1 bg-white border-r border-gray-300">Prev</button>
            <button className="px-2 sm:px-3 py-1 bg-[#007BFF] text-white border-r border-gray-300 font-bold">1</button>
            <button className="px-2 sm:px-3 py-1 bg-white">Next</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DataSiswaPage;