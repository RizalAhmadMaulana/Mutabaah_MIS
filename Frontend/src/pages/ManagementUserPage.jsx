import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../components/templates/DashboardLayout";
import { BiPlus, BiFile, BiPencil, BiTrash } from "react-icons/bi";
import { FormUserModal, ImportExcelModal, ConfirmModal } from "../components/organisms/ManagementUserModals";

const ManagementUserPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  
  // LOGIKA: State Data & Search
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [tempFormData, setTempFormData] = useState(null);

  // LOGIKA: Fetch dengan parameter search
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      // Menambahkan query param ?search=
      const response = await axios.get(`http://127.0.0.1:8000/api/users/?search=${searchTerm}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) { 
      console.error(err); 
      setLoading(false); 
    }
  };

  useEffect(() => {
    // Debounce search agar tidak spam request setiap ketik
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleOpenAdd = () => {
    setSelectedUser(null);
    setActiveModal('add');
  };

  const handleRequestConfirm = (formData) => {
    setTempFormData(formData);
    setActiveModal(activeModal === 'add' ? 'confirm-add' : 'confirm-edit');
  };

  const handleFinalAction = async () => {
    try {
      const token = localStorage.getItem("token");
      const isEdit = activeModal === 'confirm-edit';
      const url = isEdit ? `http://127.0.0.1:8000/api/users/${tempFormData.id}/` : "http://127.0.0.1:8000/api/users/";
      const method = isEdit ? "patch" : "post";
      
      await axios[method](url, tempFormData, { headers: { Authorization: `Bearer ${token}` } });
      
      setActiveModal(null);
      setTempFormData(null);
      fetchUsers();
      alert(isEdit ? "User berhasil diperbarui!" : "User baru berhasil ditambahkan!");
    } catch (err) {
      const errorData = err.response?.data;
      let msg = "Gagal memproses data.";
      if (errorData) {
        msg = Object.values(errorData).flat().join(", ");
      }
      alert(msg);
    }
  };

  const handleOpenDelete = (user) => { setSelectedUser(user); setActiveModal('confirm-delete'); };

  const handleFinalDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/users/${selectedUser.id}/`, { headers: { Authorization: `Bearer ${token}` } });
      setActiveModal(null); fetchUsers();
    } catch (err) { alert("Gagal hapus."); }
  };

  const renderRoleBadge = (role) => {
    let bg = role === "ADMIN" ? "bg-[#1B4332]" : role === "MUSYIF" ? "bg-[#5294A9]" : "bg-[#007BFF]";
    return <span className={`${bg} text-white px-3 py-1.5 rounded-[6px] text-[0.75rem] font-[700] min-w-[110px] inline-block text-center shadow-sm uppercase`}>{role}</span>;
  };

  // Mockup visual table body jika data sedikit
  const renderTableBody = () => {
    const displayData = [...users];
    while(displayData.length < 10 && searchTerm === "") displayData.push({});

    return displayData.map((u, i) => (
      <tr key={i} className="even:bg-[#f2f2f2] hover:bg-slate-100 transition-colors">
        {u.id ? (
          <>
            <td className="border border-black px-3 py-2.5 text-center h-[45px] font-medium text-slate-700">{i + 1}</td>
            <td className="border border-black px-3 py-2.5 text-center font-medium">{u.username}</td>
            <td className="border border-black px-3 py-2.5 text-center">{u.first_name} {u.last_name}</td>
            <td className="border border-black px-3 py-2.5 text-center">{u.phone_number || "-"}</td>
            <td className="border border-black px-3 py-2.5 text-center">{u.email}</td>
            <td className="border border-black px-3 py-2.5 text-center">{renderRoleBadge(u.role)}</td>
            <td className="border border-black px-3 py-2.5 text-center">
              <div className="flex gap-2 justify-center items-center">
                <button 
                  onClick={() => { setSelectedUser(u); setActiveModal('edit'); }} 
                  className="bg-[#2ECC71] text-white py-[4px] px-[12px] rounded-[4px] text-[0.85rem] font-[600] flex items-center gap-1.5 hover:bg-[#27ae60] transition-all"
                >
                  <BiPencil className="text-[1rem]" /> Edit
                </button>
                <button 
                  onClick={() => handleOpenDelete(u)} 
                  className="bg-[#E74C3C] text-white py-[4px] px-[12px] rounded-[4px] text-[0.85rem] font-[600] flex items-center gap-1.5 hover:bg-[#c0392b] transition-all"
                >
                  <BiTrash className="text-[1rem]" /> Hapus
                </button>
              </div>
            </td>
          </>
        ) : (
          [...Array(7)].map((_, cIdx) => <td key={cIdx} className="border border-black px-2 py-2 h-[45px]">&nbsp;</td>)
        )}
      </tr>
    ));
  };

  return (
    <DashboardLayout title="Management User">
      {/* MODALS */}
      {(activeModal === 'add' || activeModal === 'edit') && <FormUserModal mode={activeModal} userData={selectedUser} onClose={() => setActiveModal(null)} onSave={handleRequestConfirm} />}
      {(activeModal === 'confirm-add' || activeModal === 'confirm-edit') && <ConfirmModal type={activeModal === 'confirm-add' ? "add" : "edit"} userData={tempFormData} onClose={() => setActiveModal(activeModal === 'confirm-add' ? 'add' : 'edit')} onConfirm={handleFinalAction} />}
      {activeModal === 'confirm-delete' && <ConfirmModal type="delete" userData={selectedUser} onClose={() => setActiveModal(null)} onConfirm={handleFinalDelete} />}
      {activeModal === 'import' && <ImportExcelModal onClose={() => setActiveModal(null)} onSuccess={() => { setActiveModal(null); fetchUsers(); }} />}

      {/* HEADER ACTIONS */}
      <div className="flex flex-row gap-3 mb-6">
        <button onClick={handleOpenAdd} className="bg-[#5294A9] text-white rounded-[4px] px-3 py-2.5 font-[600] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm w-1/2 sm:w-auto text-[0.85rem] sm:text-base whitespace-nowrap">
          <BiPlus className="text-xl shrink-0" /> Tambah User
        </button>
        <button onClick={() => setActiveModal('import')} className="bg-[#8CB14E] text-white rounded-[4px] px-3 py-2.5 font-[600] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm w-1/2 sm:w-auto text-[0.85rem] sm:text-base whitespace-nowrap">
          <BiFile className="text-xl shrink-0" /> Import Excel
        </button>
      </div>

      {/* TABLE CARD */}
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
            {/* Input Search Real-time */}
            <input 
              type="text" 
              placeholder="Cari Username / Nama..." 
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
                {["#", "Username", "Nama Lengkap", "No Telp", "Email", "Role", "Aksi"].map((h, i) => (
                  <th key={i} className="border border-black px-3 py-3 text-center font-[700] text-black text-[0.9rem] bg-white whitespace-nowrap uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={7} className="text-center p-10 font-bold text-slate-400">Memuat data user...</td></tr> : renderTableBody()}
            </tbody>
          </table>
        </div>

        <div className="flex flex-row justify-between items-center text-[0.8rem] sm:text-[0.85rem] font-[600] mt-2">
          <div className="text-slate-600">Showing {users.length} entries</div>
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

export default ManagementUserPage;