import { useState } from "react";
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

  const handleSaveAdd = () => setActiveModal('confirm-add');
  const handleSaveEdit = () => setActiveModal('confirm-edit');
  const handleDelete = () => setActiveModal('confirm-delete');
  
  const handleClose = () => setActiveModal(null);
  const handleFinalAction = () => {
    setActiveModal(null);
    alert("Aksi Berhasil Dilakukan! (Mockup)");
  };

  const headers = ["#", "Kelas", "Musyif", "Target Hafalan", "Aksi"];
  
  const rowData = [
    {
      id: 1, kelas: "1 A", musyif: "Ustadz Ali", target: "5 Surah"
    },
    {}, {}, {}, {}, {}, {}, {}, {}, {} 
  ];

  const renderTableBody = () => {
    return rowData.map((row, idx) => (
      <tr key={idx} className="even:bg-[#f2f2f2] hover:bg-slate-100 transition-colors">
        {row.id ? (
          <>
            <td className="border border-black px-3 py-2.5 text-center h-[45px] whitespace-nowrap">{row.id}</td>
            <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.kelas}</td>
            <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.musyif}</td>
            <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">{row.target}</td>
            <td className="border border-black px-3 py-2.5 text-center whitespace-nowrap">
              
              <div className="flex gap-2 justify-center items-center">
                <button 
                  onClick={() => setActiveModal('edit')}
                  className="bg-[#2ECC71] text-white py-[4px] px-[12px] rounded-[4px] text-[0.85rem] font-[600] flex items-center gap-1.5 hover:bg-[#27ae60] transition-all"
                >
                  <BiPencil className="text-[1rem]" /> Edit
                </button>

                <button 
                  onClick={handleDelete}
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
    <DashboardLayout title="Kelola Kelas">
      
      {activeModal === 'add' && <FormKelasModal mode="add" onClose={handleClose} onSave={handleSaveAdd} />}
      {activeModal === 'edit' && <FormKelasModal mode="edit" onClose={handleClose} onSave={handleSaveEdit} />}
      {activeModal === 'import' && <ImportExcelModal onClose={handleClose} />}
      
      {activeModal === 'confirm-add' && <ConfirmModal type="add" onClose={() => setActiveModal('add')} onConfirm={handleFinalAction} />}
      {activeModal === 'confirm-edit' && <ConfirmModal type="edit" onClose={() => setActiveModal('edit')} onConfirm={handleFinalAction} />}
      {activeModal === 'confirm-delete' && <ConfirmModal type="delete" onClose={handleClose} onConfirm={handleFinalAction} />}

      <div className="flex flex-row gap-3 mb-6">
        <button 
          onClick={() => setActiveModal('add')} 
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
                placeholder="Search..."
                className="w-full sm:w-[200px] bg-white border border-gray-300 rounded px-3 py-1.5 outline-none font-normal focus:border-[#2ECC71] transition-all text-sm" 
            />
          </div>
        </div>

        <div className="border border-black rounded-[4px] overflow-x-auto bg-white mb-4 custom-scrollbar">
          {/* PERBAIKAN DISINI: min-w-[800px] DIGANTI min-w-max */}
          <table className="w-full border-collapse min-w-max">
            <thead>
              <tr className="bg-white">
                {headers.map((h, i) => (
                  <th key={i} className="border border-black px-3 py-3 text-center font-[700] text-black text-[0.9rem] bg-white whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderTableBody()}
            </tbody>
          </table>
        </div>

        <div className="flex flex-row justify-between items-center text-[0.8rem] sm:text-[0.85rem] font-[600] mt-2">
          <div className="text-slate-600">Showing 1 to 10</div>
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