import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../components/templates/DashboardLayout";
import IconButton from "../components/atoms/IconButton";
import { BiPlus, BiFile, BiPencil, BiTrash, BiLogoWhatsapp } from "react-icons/bi";
import { FormHafalanModal, ImportExcelModal, ConfirmModal } from "../components/organisms/SetorHafalanModals";

const SetorHafalanPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [hafalanData, setHafalanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHafalan, setSelectedHafalan] = useState(null);
  const [tempFormData, setTempFormData] = useState(null);

  const fetchHafalan = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://127.0.0.1:8000/api/academic/hafalan/?search=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHafalanData(response.data);
      setLoading(false);
    } catch (err) { console.error("Gagal ambil data hafalan:", err); setLoading(false); }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { fetchHafalan(); }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // LOGIKA BARU: Handler Kirim WhatsApp
  const handleSendWA = async (row) => {
    if (!row.siswa_phone) {
      return alert("Nomor telepon wali murid tidak ditemukan di data siswa!");
    }

    const today = new Date().toLocaleDateString('id-ID', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    // Template Pesan Sesuai Permintaan
    const message = `assalamualaikum wali murid dari ${row.nama_siswa}, kami dari Mentari Islamic School izin memberitahukan terkait laporan hafalan dari ${row.nama_siswa} hari ${today}:

juzz  : ${row.juz}
surah : ${row.surah}
ayat  : ${row.ayat}
jenis : ${row.jenis_setoran}
nilai : ${row.nilai}
catatan : ${row.catatan || '-'}

Atas perhatiannya kami ucapkan terimakasih, syukron`;

    const encodedMsg = encodeURIComponent(message);
    const waUrl = `https://wa.me/${row.siswa_phone.replace(/\D/g, '')}?text=${encodedMsg}`;

    // Update Status wa_sent ke Backend
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://127.0.0.1:8000/api/academic/hafalan/${row.id}/`, { wa_sent: true }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Buka WA di tab baru
      window.open(waUrl, '_blank');
      fetchHafalan(); // Refresh tabel untuk ganti warna tombol
    } catch (err) {
      console.error("Gagal update status WA", err);
      window.open(waUrl, '_blank'); // Tetap buka WA meski backend gagal update
    }
  };

  const handleRequestConfirm = (formData) => {
    setTempFormData(formData);
    setActiveModal(activeModal === 'add' ? 'confirm-add' : 'confirm-edit');
  };

  const handleFinalAction = async () => {
    try {
      const token = localStorage.getItem("token");
      const isEdit = activeModal === 'confirm-edit';
      const url = isEdit ? `http://127.0.0.1:8000/api/academic/hafalan/${tempFormData.id}/` : "http://127.0.0.1:8000/api/academic/hafalan/";
      const method = isEdit ? "patch" : "post";
      await axios[method](url, tempFormData, { headers: { Authorization: `Bearer ${token}` } });
      setActiveModal(null); setTempFormData(null); fetchHafalan(); 
      alert(isEdit ? "Data Hafalan berhasil diubah!" : "Setoran hafalan berhasil disimpan!");
    } catch (err) { alert("Gagal memproses data."); }
  };

  const handleOpenDelete = (row) => { setSelectedHafalan(row); setActiveModal('confirm-delete'); };

  const handleFinalDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/academic/hafalan/${selectedHafalan.id}/`, { headers: { Authorization: `Bearer ${token}` } });
      setActiveModal(null); fetchHafalan();
    } catch (err) { alert("Gagal menghapus data."); }
  };

  const headers = ["#", "Nama Siswa", "Kelas", "Tanggal", "Musyif", "Surah", "Juz", "Ayat", "Jenis", "Nilai", "Catatan", "Aksi"];
  
  const renderTableBody = () => {
    if (hafalanData.length === 0) {
      return (<tr><td colSpan={12} className="text-center p-8 text-slate-500 italic bg-[#f9f9f9]">Belum ada data setoran hafalan.</td></tr>);
    }

    return hafalanData.map((row, idx) => (
      <tr key={row.id} className="even:bg-[#f2f2f2] hover:bg-slate-100 transition-colors">
        <td className="border border-black px-3 py-2.5 text-center h-[45px] whitespace-nowrap font-medium text-slate-700">{idx + 1}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap font-bold">{row.nama_siswa}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.nama_kelas || "-"}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.tanggal}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.nama_musyif || "-"}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.surah}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.juz}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.ayat}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">
          <span className={`px-2 py-1 rounded text-xs font-bold ${row.jenis_setoran === 'Ziyadah' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>{row.jenis_setoran}</span>
        </td>
        <td className="border border-black px-3 py-2.5 text-center font-bold text-lg">{row.nilai}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap max-w-[150px] truncate" title={row.catatan}>{row.catatan}</td>
        <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">
          <div className="flex gap-2 justify-center items-center">
            <IconButton icon={BiPencil} colorClass="bg-[#2ECC71]" onClick={() => { setSelectedHafalan(row); setActiveModal('edit'); }} title="Edit" />
            <IconButton icon={BiTrash} colorClass="bg-[#E74C3C]" onClick={() => handleOpenDelete(row)} title="Hapus" />
            {/* LOGIKA BARU: Perubahan warna tombol WA berdasarkan status wa_sent */}
            <IconButton 
                icon={BiLogoWhatsapp} 
                colorClass={row.wa_sent ? "bg-[#128C7E]" : "bg-[#25D366]"} 
                onClick={() => handleSendWA(row)} 
                title={row.wa_sent ? "WA Terkirim" : "Kirim WA Laporan"} 
            />
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <DashboardLayout title="Setor Hafalan">
      {(activeModal === 'add' || activeModal === 'edit') && <FormHafalanModal mode={activeModal} onClose={() => setActiveModal(null)} onSave={handleRequestConfirm} dataHafalan={selectedHafalan} />}
      {activeModal === 'import' && <ImportExcelModal onClose={() => setActiveModal(null)} onSuccess={() => { setActiveModal(null); fetchHafalan(); }} />}
      {(activeModal === 'confirm-add' || activeModal === 'confirm-edit') && <ConfirmModal type={activeModal === 'confirm-add' ? 'add' : 'edit'} dataHafalan={tempFormData} onClose={() => setActiveModal(activeModal === 'confirm-add' ? 'add' : 'edit')} onConfirm={handleFinalAction} />}
      {activeModal === 'confirm-delete' && <ConfirmModal type="delete" dataHafalan={selectedHafalan} onClose={() => setActiveModal(null)} onConfirm={handleFinalDelete} />}

      <div className="flex flex-row gap-3 mb-6">
        <button onClick={() => { setSelectedHafalan(null); setActiveModal('add'); }} className="bg-[#5294A9] text-white rounded-[4px] px-3 py-2.5 font-[600] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm w-1/2 sm:w-auto text-[0.85rem] sm:text-base whitespace-nowrap"><BiPlus className="text-xl shrink-0" /> Tambah Hafalan</button>
        <button onClick={() => setActiveModal('import')} className="bg-[#8CB14E] text-white rounded-[4px] px-3 py-2.5 font-[600] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm w-1/2 sm:w-auto text-[0.85rem] sm:text-base whitespace-nowrap"><BiFile className="text-xl shrink-0" /> Import Excel</button>
      </div>

      <div className="bg-white rounded-[8px] p-4 md:p-5 border-t-[5px] border-[#2ECC71] shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
        <div className="flex flex-row justify-between items-center gap-2 mb-5 text-sm font-[600] text-slate-700">
          <div className="flex items-center shrink-0"><span>Show</span><select className="mx-1.5 bg-[#f8fafc] border border-gray-300 rounded px-1 py-1 outline-none"><option>10</option><option>25</option></select><span>entries</span></div>
          <div className="flex items-center justify-end w-[60%] sm:w-auto">
            <span className="mr-2 hidden sm:inline">Search:</span>
            <input type="text" placeholder="Cari Siswa / Surah..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full sm:w-[200px] bg-white border border-gray-300 rounded px-3 py-1.5 outline-none font-normal focus:border-[#2ECC71] transition-all text-sm" />
          </div>
        </div>
        <div className="border border-black rounded-[4px] overflow-x-auto bg-white mb-4 custom-scrollbar">
          <table className="w-full border-collapse min-w-[1200px]">
            <thead><tr className="bg-white">{headers.map((h, i) => (<th key={i} className="border border-black px-3 py-3 text-center font-[700] text-black text-[0.9rem] bg-white whitespace-nowrap">{h}</th>))}</tr></thead>
            <tbody>{loading ? <tr><td colSpan={12} className="text-center p-10 font-bold text-slate-400">Memuat data...</td></tr> : renderTableBody()}</tbody>
          </table>
        </div>
        <div className="flex flex-row justify-between items-center text-[0.8rem] sm:text-[0.85rem] font-[600] mt-2">
          <div className="text-slate-600">Showing {hafalanData.length} entries</div>
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

export default SetorHafalanPage;