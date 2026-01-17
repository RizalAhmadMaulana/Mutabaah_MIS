import { useState, useEffect } from "react";
import axios from "axios"; 
import { 
  BiSave, BiTrash, BiCheck, BiFile, BiPlus, 
  BiPencil, BiX, BiShow, BiHide 
} from "react-icons/bi";

// --- KOMPONEN INPUT CUSTOM ---
const ModalInput = ({ label, type = "text", value, options, readOnly, placeholder, onChange, name, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const baseClass = "w-full bg-[#D9D9D9] border-none rounded-[4px] px-4 py-2.5 font-[500] h-[45px] outline-none text-slate-800 placeholder-slate-500 transition-all focus:ring-2 focus:ring-[#5294A9]/50";
  
  return (
    <div className="w-full">
      {label && <label className="block font-[700] text-[#1a1a1a] mb-2 text-[0.9rem]">{label}</label>}
      <div className="relative flex">
        {type === "select" ? (
          <select className={baseClass} name={name} value={value} onChange={onChange} {...props}>
            {options?.map((opt, idx) => (
              <option key={idx} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          <input 
            type={inputType} 
            name={name} 
            className={`${baseClass} ${isPassword ? "pr-10" : ""}`} 
            value={value} 
            readOnly={readOnly} 
            placeholder={placeholder} 
            onChange={onChange} 
            {...props} 
          />
        )}
        {isPassword && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-slate-600">
            {showPassword ? <BiShow /> : <BiHide />}
          </button>
        )}
      </div>
    </div>
  );
};

const ModalWrapper = ({ title, icon: Icon, onClose, children, size = "max-w-lg" }) => (
  <div className="fixed inset-0 bg-black/50 z-[1070] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
    <div className={`bg-white rounded-[15px] w-full ${size} shadow-lg flex flex-col max-h-[95vh] animate-[zoomIn_0.3s_ease-out]`}>
      <div className="border-b border-black px-6 py-4 flex justify-between items-center shrink-0">
        <h5 className="font-[700] text-[1.2rem] flex items-center gap-2 text-slate-800">{Icon && <Icon className="text-xl" />} {title}</h5>
        <button onClick={onClose} className="text-3xl hover:text-red-500 leading-none">&times;</button>
      </div>
      <div className="p-6 overflow-y-auto custom-scrollbar">{children}</div>
    </div>
  </div>
);

// --- 1. MODAL TAMBAH / EDIT USER ---
export const FormUserModal = ({ mode = "add", onClose, onSave, userData }) => {
  const initialForm = {
    username: "", first_name: "", last_name: "", phone_number: "", email: "", role: "WALI_MURID", password: ""
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    // LOGIKA: Jika mode edit, isi form. Jika mode add, reset form agar bersih
    if (mode === "edit" && userData) {
      setForm({ ...userData, password: "" });
    } else {
      setForm(initialForm);
    }
  }, [mode, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // LOGIKA: Hanya angka yang bisa diinput di field phone_number
    if (name === "phone_number") {
      const onlyNums = value.replace(/[^0-9]/g, ""); 
      setForm({ ...form, [name]: onlyNums });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const roleOptions = [
    { label: "-- Pilih Role --", value: "" },
    { label: "Administrator", value: "ADMIN" },
    { label: "Musyif", value: "MUSYIF" },
    { label: "Wali Murid", value: "WALI_MURID" }
  ];

  return (
    <ModalWrapper title={mode === "add" ? "Tambah User" : "Edit User"} icon={mode === "add" ? BiPlus : BiPencil} onClose={onClose} size="max-w-3xl">
      <div className="space-y-4">
        <ModalInput label="Username" name="username" placeholder="Masukkan Username" value={form.username} onChange={handleChange} readOnly={mode === "edit"} />
        <div className="flex gap-4">
          <ModalInput label="Nama Depan" name="first_name" placeholder="Masukkan Nama Depan" value={form.first_name} onChange={handleChange} />
          <ModalInput label="Nama Belakang" name="last_name" placeholder="Masukkan Nama Belakang" value={form.last_name} onChange={handleChange} />
        </div>
        <ModalInput label="Nomor Telephone" name="phone_number" placeholder="Masukkan Nomor Telephone" value={form.phone_number} onChange={handleChange} />
        <ModalInput label="Email" name="email" type="email" placeholder="Masukkan Email" value={form.email} onChange={handleChange} />
        <ModalInput label="Role" name="role" type="select" options={roleOptions} value={form.role} onChange={handleChange} />
        <ModalInput label={mode === "add" ? "Password" : "Password (Kosongkan jika tidak ganti)"} name="password" type="password" placeholder="Masukkan Password" value={form.password} onChange={handleChange} />
        <hr className="border-t border-black my-6 -mx-6 opacity-100" />
        <div className="flex flex-row justify-end gap-3">
          <button onClick={() => setForm(initialForm)} className="bg-[#E53E3E] text-white rounded-[4px] px-6 py-2 font-[700] flex items-center gap-2">
            <BiTrash /> Reset
          </button>
          <button onClick={() => onSave(form)} className="bg-[#5294A9] text-white rounded-[4px] px-6 py-2 font-[700] flex items-center gap-2">
            <BiSave /> {mode === "add" ? "Simpan" : "Ubah"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

// --- (Modal Import & Confirm tetap sama seperti sebelumnya) ---
export const ImportExcelModal = ({ onClose, onSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const handleImport = async () => {
    if (!selectedFile) return alert("Pilih file excel!");
    const formData = new FormData();
    formData.append("file", selectedFile);
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/api/users/import/", formData, { headers: { Authorization: `Bearer ${token}` } });
      alert("Import Sukses!"); onSuccess();
    } catch (err) { alert("Gagal import."); } finally { setUploading(false); }
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-[1070] flex items-center justify-center p-4">
      <div className="bg-white rounded-[15px] w-full max-w-md shadow-lg p-6">
        <h6 className="font-bold mb-4">Import Excel</h6>
        <input type="file" accept=".xlsx, .xls" onChange={(e) => setSelectedFile(e.target.files[0])} className="mb-4" />
        <button onClick={handleImport} disabled={uploading} className="w-full bg-[#198754] text-white py-2 rounded">{uploading ? "Proses..." : "Import"}</button>
      </div>
    </div>
  );
};

export const ConfirmModal = ({ type = "add", onClose, onConfirm, userData }) => {
  const isDelete = type === "delete";
  const iconBg = isDelete ? "bg-[#EF5350]" : "bg-[#4285F4]";
  const titleText = isDelete ? "Hapus User?" : "Konfirmasi Perubahan";
  const getRoleLabel = (r) => r === "ADMIN" ? "Administrator" : r === "MUSYIF" ? "Musyif" : "Wali Murid";
  return (
    <div className="fixed inset-0 bg-black/50 z-[1080] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] w-full max-w-[480px] p-8 text-center shadow-2xl animate-[zoomIn_0.3s_ease-out]">
        <div className={`w-[85px] h-[85px] rounded-full flex items-center justify-center mx-auto mb-6 text-[4.5rem] text-white ${iconBg}`}>{isDelete ? <BiX /> : <BiCheck />}</div>
        <h2 className="font-[800] text-[1.7rem] mb-2 text-[#007BFF]">{titleText}</h2>
        <p className="text-[#4A4A4A] mb-8 font-[500] leading-snug">{isDelete ? "Data ini akan dihapus permanen. Yakin?" : "Periksa kembali data sebelum disimpan."}</p>
        {!isDelete && userData && (
          <div className="mb-10 text-left mx-auto max-w-[300px] text-[1.05rem]">
            <div className="grid grid-cols-[110px_15px_1fr] mb-2"><span className="font-[700]">Username</span><span>:</span><span>{userData.username}</span></div>
            <div className="grid grid-cols-[110px_15px_1fr] mb-2"><span className="font-[700]">Nama</span><span>:</span><span>{userData.first_name} {userData.last_name}</span></div>
            <div className="grid grid-cols-[110px_15px_1fr]"><span className="font-[700]">Role</span><span>:</span><span>{getRoleLabel(userData.role)}</span></div>
          </div>
        )}
        <div className="flex gap-4">
          <button onClick={onClose} className="bg-[#EF5350] text-white py-3 rounded-[12px] font-[700] flex-1">Batal</button>
          <button onClick={onConfirm} className="bg-[#007BFF] text-white py-3 rounded-[12px] font-[700] flex-1">Konfirmasi</button>
        </div>
      </div>
    </div>
  );
};