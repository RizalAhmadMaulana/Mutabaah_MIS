import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../components/templates/DashboardLayout";
import { 
  BiPlus, 
  BiFile, 
  BiPencil, 
  BiTrash
} from "react-icons/bi";
import { FormKelasModal, ImportExcelModal, ConfirmModal } from "../components/organisms/KelolaKelasModals";

const KelolaKelasPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  
  const [kelasData, setKelasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [tempFormData, setTempFormData] = useState(null);

  const fetchKelas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://127.0.0.1:8000/api/academic/kelas/?search=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setKelasData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Gagal ambil data kelas:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { fetchKelas(); }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleRequestConfirm = (formData) => {
    setTempFormData(formData);
    setActiveModal(activeModal === 'add' ? 'confirm-add' : 'confirm-edit');
  };

  const handleFinalAction = async () => {
    try {
      const token = localStorage.getItem("token");
      const isEdit = activeModal === 'confirm-edit';
      const url = isEdit 
        ? `http://127.0.0.1:8000/api/academic/kelas/${tempFormData.id}/` 
        : "http://127.0.0.1:8000/api/academic/kelas/";
      const method = isEdit ? "patch" : "post";

      await axios[method](url, tempFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setActiveModal(null);
      setTempFormData(null);
      fetchKelas();
      alert(isEdit ? "Data Kelas berhasil diubah!" : "Kelas baru berhasil ditambahkan!");
    } catch (err) {
      const errorMsg = err.response?.data ? Object.values(err.response.data).flat().join(", ") : "Gagal memproses data.";
      alert(errorMsg);
    }
  };

  const handleOpenDelete = (row) => {
    setSelectedKelas(row);
    setActiveModal('confirm-delete');
  };

  const handleFinalDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/academic/kelas/${selectedKelas.id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActiveModal(null);
      fetchKelas();
    } catch (err) {
      alert("Gagal menghapus data kelas.");
    }
  };

  const headers = ["#", "Kelas", "Musyif", "Target Hafalan", "Aksi"];
  
  // LOGIKA BARU: Render tabel dinamis sesuai jumlah data (tanpa baris kosong)
  const renderTableBody = () => {
    if (kelasData.length === 0) {
      return (
        <tr>
          <td colSpan={headers.length} className="text-center p-8 text-slate-500 italic bg-[#f9f9f9]">
            Belum ada data kelas yang tersedia.
          </td>
        </tr>
      );
    }

    return kelasData.map((row, idx) => (
      <tr key={row.id} className="even:bg-[#f2f2f2] hover:bg-slate-100 transition-colors">
        <td className="border border-black px-3 py-2.5 text-center h-[45px] whitespace-nowrap font-medium text-slate-700">{idx + 1}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap font-bold">{row.nama_kelas}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.nama_musyif || "-"}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.target_hafalan || "-"}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">
          <div className="flex gap-2 justify-center items-center">
            <button 
              onClick={() => { setSelectedKelas(row); setActiveModal('edit'); }}
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
      </tr>
    ));
  };

  return (
    <DashboardLayout title="Kelola Kelas">
      
      {(activeModal === 'add' || activeModal === 'edit') && (
        <FormKelasModal 
          mode={activeModal} 
          dataKelas={selectedKelas} 
          onClose={() => setActiveModal(null)} 
          onSave={handleRequestConfirm} 
        />
      )}
      
      {activeModal === 'import' && (
        <ImportExcelModal 
          onClose={() => setActiveModal(null)} 
          onSuccess={() => { setActiveModal(null); fetchKelas(); }}
        />
      )}
      
      {(activeModal === 'confirm-add' || activeModal === 'confirm-edit') && (
        <ConfirmModal 
          type={activeModal === 'confirm-add' ? 'add' : 'edit'} 
          dataKelas={tempFormData} 
          onClose={() => setActiveModal(activeModal === 'confirm-add' ? 'add' : 'edit')} 
          onConfirm={handleFinalAction} 
        />
      )}
      
      {activeModal === 'confirm-delete' && (
        <ConfirmModal 
          type="delete" 
          dataKelas={selectedKelas} 
          onClose={() => setActiveModal(null)} 
          onConfirm={handleFinalDelete} 
        />
      )}

      <div className="flex flex-row gap-3 mb-6">
        <button 
          onClick={() => { setSelectedKelas(null); setActiveModal('add'); }} 
          className="bg-[#5294A9] text-white rounded-[4px] px-3 py-2.5 font-[600] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm w-1/2 sm:w-auto text-[0.85rem] sm:text-base whitespace-nowrap"
        >
          <BiPlus className="text-xl shrink-0" /> Tambah Kelas
        </button>
        <button 
          onClick={() => setActiveModal('import')} 
          className="bg-[#8CB14E] text-white rounded-[4px] px-3 py-2.5 font-[600] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm w-1/2 sm:w-auto text-[0.85rem] sm:text-base whitespace-nowrap"
        >
          <BiFile className="text-xl shrink-0" /> Import Excel
        </button>
      </div>

      <div className="bg-white rounded-[8px] p-4 md:p-5 border-t-[5px] border-[#2ECC71] shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
        <div className="flex flex-row justify-between items-center gap-2 mb-5 text-sm font-[600] text-slate-700">
          <div className="flex items-center shrink-0">
            <span>Show</span>
            <select className="mx-1.5 bg-[#f8fafc] border border-gray-300 rounded px-1 py-1 outline-none focus:border-[#2ECC71] cursor-pointer">
                <option>10</option>
                <option>25</option>
            </select> 
            <span className="hidden sm:inline">entries</span>
          </div>
          <div className="flex items-center justify-end w-[60%] sm:w-auto">
            <span className="mr-2 hidden sm:inline">Search:</span>
            <input 
                type="text" 
                placeholder="Cari Kelas / Musyif..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-[200px] bg-white border border-gray-300 rounded px-3 py-1.5 outline-none font-normal focus:border-[#2ECC71] transition-all text-sm" 
            />
          </div>
        </div>

        <div className="border border-black rounded-[4px] overflow-x-auto bg-white mb-4 custom-scrollbar">
          <table className="w-full border-collapse min-w-max">
            <thead>
              <tr className="bg-white">
                {headers.map((h, i) => (
                  <th key={i} className="border border-black px-3 py-3 text-center font-[700] text-black text-[0.9rem] bg-white whitespace-nowrap uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={5} className="text-center p-10 font-bold text-slate-400">Memuat data kelas...</td></tr> : renderTableBody()}
            </tbody>
          </table>
        </div>

        <div className="flex flex-row justify-between items-center text-[0.8rem] sm:text-[0.85rem] font-[600] mt-2">
          <div className="text-slate-600">Showing {kelasData.length} entries</div>
          <div className="flex border border-gray-300 rounded-[4px] overflow-hidden shadow-sm scale-90 sm:scale-100 origin-right">
            <button className="px-2 sm:px-3 py-1 bg-white hover:bg-gray-50 border-r border-gray-300 transition-colors text-slate-600 disabled:opacity-50">Prev</button>
            <button className="px-2 sm:px-3 py-1 bg-[#007BFF] text-white border-r border-gray-300 font-bold">1</button>
            <button className="px-2 sm:px-3 py-1 bg-white hover:bg-gray-50 transition-colors text-slate-600">Next</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KelolaKelasPage;