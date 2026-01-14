import { useState } from "react";
import { 
  BiSave, 
  BiTrash, 
  BiCheck, 
  BiFile, 
  BiPlus, 
  BiPencil, 
  BiX 
} from "react-icons/bi";

// --- KOMPONEN INPUT (Reuse Logic) ---
const ModalInput = ({ label, type = "text", value, options, readOnly, ...props }) => {
  const baseClass = "w-full bg-[#D9D9D9] border-none rounded-[4px] px-4 py-2.5 font-[500] h-[45px] outline-none text-slate-800 placeholder-slate-500 transition-all focus:ring-2 focus:ring-[#5294A9]/50";
  
  return (
    <div className="w-full">
      {label && <label className="block font-[700] text-[#1a1a1a] mb-2 text-[0.95rem]">{label}</label>}
      
      {type === "select" ? (
        <select className={baseClass} defaultValue={value} {...props}>
          {options?.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input 
          type={type} 
          className={baseClass}
          defaultValue={value}
          readOnly={readOnly}
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

// --- 1. MODAL TAMBAH / EDIT KELAS ---
export const FormKelasModal = ({ mode = "add", onClose, onSave }) => {
  return (
    <ModalWrapper 
      title={mode === "add" ? "Tambah Kelas" : "Edit Kelas"} 
      icon={mode === "add" ? BiPlus : BiPencil} 
      onClose={onClose}
      size="max-w-2xl" // Ukuran medium
    >
      <div className="space-y-4">
        {/* Grid Responsive: Stack di HP, Sebelahan di Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ModalInput label="Nama Kelas" placeholder="Contoh: 1 A" value={mode === "edit" ? "1 A" : ""} />
            <ModalInput label="Musyif" type="select" options={["-- Pilih Musyif --", "Ustadz Ali", "Ustadz Budi"]} value={mode === "edit" ? "Ustadz Ali" : ""} />
        </div>
        
        <ModalInput label="Target Hafalan" placeholder="Contoh: 5 Surah" value={mode === "edit" ? "5 Surah" : ""} />

        <hr className="border-t border-black my-6 -mx-6 opacity-100" />
        
        {/* TOMBOL AKSI: Rata Kanan, Sejajar */}
        <div className="flex flex-row justify-end gap-3">
          <button className="bg-[#E53E3E] text-white rounded-[4px] px-6 py-2 font-[700] flex items-center gap-2 hover:bg-red-700 transition-colors">
            <BiTrash /> Reset
          </button>
          <button onClick={onSave} className="bg-[#5294A9] text-white rounded-[4px] px-6 py-2 font-[700] flex items-center gap-2 hover:bg-[#417688] transition-colors">
            <BiSave /> {mode === "add" ? "Simpan" : "Ubah"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

// --- 2. MODAL IMPORT EXCEL (Sama dengan sebelumnya) ---
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

// --- 3. MODAL KONFIRMASI (Reuse Style) ---
export const ConfirmModal = ({ type = "save", onClose, onConfirm }) => {
  const isDelete = type === "delete";
  const iconBg = isDelete ? "bg-[#DC3545]" : "bg-[#007BFF]";
  const icon = isDelete ? <BiX /> : <BiCheck />;
  
  const titleText = isDelete ? "Hapus Kelas?" : (type === "edit" ? "Konfirmasi Perubahan" : "Konfirmasi Tambah Kelas");
  const titleColor = isDelete ? "text-[#DC3545]" : "text-[#007BFF]";
  const descText = isDelete ? "Apakah Anda yakin ingin menghapus data Kelas ini?" : "Pastikan data berikut sudah benar sebelum disimpan ke sistem.";

  return (
    <div className="fixed inset-0 bg-black/50 z-[1080] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-white rounded-[15px] w-full max-w-[450px] p-6 md:p-8 text-center shadow-2xl animate-[zoomIn_0.3s_ease-out] overflow-y-auto max-h-[90vh]">
        <div className={`w-[80px] h-[80px] md:w-[90px] md:h-[90px] rounded-full flex items-center justify-center mx-auto mb-5 text-[3.5rem] md:text-[4rem] text-white ${iconBg} shadow-lg`}>{icon}</div>
        <h2 className={`font-[800] text-[1.4rem] md:text-[1.6rem] mb-2 ${titleColor}`}>{titleText}</h2>
        <p className="text-slate-500 mb-8 px-2 leading-relaxed text-sm md:text-base">{descText}</p>
        
        {!isDelete && (
          <div className="bg-slate-50 p-4 rounded-lg text-left mx-auto mb-8 border border-slate-200 text-sm w-full">
            <div className="flex mb-2"><span className="w-[100px] font-bold text-slate-700 shrink-0">Nama Kelas</span><span>: 1 A</span></div>
            <div className="flex mb-2"><span className="w-[100px] font-bold text-slate-700 shrink-0">Musyif</span><span>: Ustadz Ali</span></div>
            <div className="flex"><span className="w-[100px] font-bold text-slate-700 shrink-0">Target</span><span>: 5 Surah</span></div>
          </div>
        )}
        
        <div className="flex flex-row justify-center gap-3">
           <button onClick={onClose} className="bg-[#6C757D] text-white py-2.5 px-2 rounded-[8px] font-[700] hover:bg-[#5a6268] transition-all w-1/2">Batal</button>
          <button onClick={onConfirm} className={`${isDelete ? "bg-[#DC3545] hover:bg-[#bb2d3b]" : "bg-[#007BFF] hover:bg-[#0056b3]"} text-white py-2.5 px-2 rounded-[8px] font-[700] transition-all w-1/2`}>{isDelete ? "Hapus" : "Konfirmasi"}</button>
        </div>
      </div>
    </div>
  );
};