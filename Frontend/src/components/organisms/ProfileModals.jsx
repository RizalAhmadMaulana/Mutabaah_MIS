import { BiPencil, BiSave, BiTrash, BiLockAlt, BiImage, BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";

// --- KOMPONEN INPUT ---
const ModalInput = ({ label, type = "text", value, ...props }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="mb-4">
      <label className="block font-[700] text-[#1a1a1a] text-[1rem] mb-2">{label}</label>
      <div className="relative flex">
        <input 
          type={inputType} 
          className="w-full bg-[#D9D9D9] border-none rounded-[4px] px-[15px] py-[12px] font-[500] h-[50px] outline-none"
          defaultValue={value}
          {...props}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)} className="bg-[#D9D9D9] px-3 rounded-r-[4px] text-xl">
            {show ? <BiShow /> : <BiHide />}
          </button>
        )}
      </div>
    </div>
  );
};

const ModalWrapper = ({ title, icon: Icon, onClose, children }) => (
  <div className="fixed inset-0 bg-black/50 z-[1070] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
    <div className="bg-white rounded-[12px] w-full max-w-lg shadow-lg overflow-hidden animate-[zoomIn_0.3s_ease-out]">
      <div className="border-b border-black px-6 py-4 flex justify-between items-center">
        <h5 className="font-[600] text-[1.4rem] flex items-center gap-3"><Icon /> {title}</h5>
        <button onClick={onClose} className="text-2xl hover:text-red-500">&times;</button>
      </div>
      <div className="p-6">
        {children}
        <hr className="border-t border-black my-6 -mx-6" />
        <div className="flex justify-end gap-3">
          <button className="bg-[#E53E3E] text-white rounded-[8px] px-6 py-2.5 font-[700] flex items-center gap-2 hover:bg-red-700">
            <BiTrash /> Reset
          </button>
          <button className="bg-[#4DB0B3] text-white rounded-[8px] px-6 py-2.5 font-[700] flex items-center gap-2 hover:bg-[#3a8b8d]">
            <BiSave /> Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- 1. MODAL EDIT PROFIL ---
export const EditProfileModal = ({ onClose }) => (
  <ModalWrapper title="Edit User" icon={BiPencil} onClose={onClose}>
    {/* Tambahkan autoComplete="off" disini juga biar aman */}
    <ModalInput label="Username" value="Rizal" autoComplete="off" />
    <ModalInput label="Nama Lengkap" value="Rizal Ahmad M" autoComplete="off" />
    <ModalInput label="Nomor Telephone" value="089676440508" autoComplete="off" />
    <ModalInput label="Email" type="email" value="rizal@gmail.com" autoComplete="off" />
  </ModalWrapper>
);

// --- 2. MODAL GANTI PASSWORD (PERBAIKAN UTAMA DISINI) ---
export const ChangePasswordModal = ({ onClose }) => (
  <ModalWrapper title="Ganti Kata Sandi" icon={BiLockAlt} onClose={onClose}>
    {/* Gunakan autoComplete="new-password" untuk mencegah browser mengisi password lama */}
    <ModalInput 
      label="Kata Sandi Lama" 
      type="password" 
      placeholder="Masukkan Kata Sandi Lama" 
      autoComplete="new-password" 
    />
    <ModalInput 
      label="Kata Sandi Baru" 
      type="password" 
      placeholder="Masukkan Kata Sandi Baru" 
      autoComplete="new-password" 
    />
    <ModalInput 
      label="Ulangi Kata Sandi" 
      type="password" 
      placeholder="Ulangi Kata Sandi Baru" 
      autoComplete="new-password" 
    />
  </ModalWrapper>
);

// --- 3. MODAL GANTI FOTO ---
export const ChangePhotoModal = ({ onClose }) => (
  <ModalWrapper title="Ganti Foto" icon={BiImage} onClose={onClose}>
    <div className="mb-4">
      <label className="block font-[700] text-[#1a1a1a] text-[1rem] mb-2">Foto Baru</label>
      <input type="file" className="w-full bg-[#D9D9D9] border-none rounded-[4px] px-[15px] py-[10px] font-[500] h-[50px] outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-[#4DB0B3]" />
    </div>
  </ModalWrapper>
);