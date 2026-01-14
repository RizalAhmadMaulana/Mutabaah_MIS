import { useState } from "react";
import DashboardLayout from "../components/templates/DashboardLayout";
import { 
  BiPencil, 
  BiSolidLock, 
  BiImage, 
  BiShield, 
  BiLockAlt 
} from "react-icons/bi";
import ProfileButton from "../components/atoms/ProfileButton";
import InfoRow from "../components/molecules/InfoRow";
import { EditProfileModal, ChangePasswordModal, ChangePhotoModal } from "../components/organisms/ProfileModals";

const SettingProfilePage = () => {
  const [activeModal, setActiveModal] = useState(null); 

  return (
    <DashboardLayout title="Setting Profile">
      
      {/* --- MODALS --- */}
      {activeModal === 'edit' && <EditProfileModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'password' && <ChangePasswordModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'photo' && <ChangePhotoModal onClose={() => setActiveModal(null)} />}

      {/* --- BUTTON GROUP --- */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
        <ProfileButton icon={BiPencil} label="Edit Profil" color="#4DB0B3" onClick={() => setActiveModal('edit')} />
        <ProfileButton icon={BiSolidLock} label="Ganti Kata Sandi" color="#1B4332" onClick={() => setActiveModal('password')} />
        <ProfileButton icon={BiImage} label="Ganti Foto" color="#A68A2D" onClick={() => setActiveModal('photo')} />
      </div>

      {/* --- PROFILE CARD --- */}
      <div className="bg-white rounded-[12px] p-6 lg:p-10 border-t-[5px] border-[#2ECC71] shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          
          {/* KOLOM KIRI: FOTO & ROLE */}
          <div className="w-full lg:w-5/12 text-center lg:border-r border-slate-200 lg:pr-10 mb-8 lg:mb-0">
            
            {/* Foto Profil */}
            <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] lg:w-[260px] lg:h-[260px] rounded-full overflow-hidden border-[5px] border-[#f8fafc] mx-auto mb-8 shadow-sm bg-gray-50">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rizal" alt="Profile" className="w-full h-full object-cover" />
            </div>
            
            {/* Wrapper Data: Gunakan max-w agar di HP tidak terlalu lebar tapi tetap center */}
            <div className="flex flex-col gap-2 w-full max-w-[320px] mx-auto">
              <InfoRow 
                type="center"
                label={<><BiShield className="text-xl" /> Role Pengguna</>} 
                value={<span className="bg-[#4DB0B3] text-white px-3 py-1 rounded-[6px] font-[500] text-[0.9rem] sm:text-[0.95rem]">Wali Murid</span>} 
              />
              <InfoRow 
                type="center"
                label={<><BiLockAlt className="text-xl" /> Kata Sandi</>} 
                value={<span className="text-xl tracking-[0.2em] font-bold text-slate-600 mt-1 block">.............</span>} 
              />
            </div>
          </div>

          {/* KOLOM KANAN: DETAIL DATA */}
          <div className="w-full lg:w-7/12 lg:pl-12 flex flex-col justify-center">
            
            {/* Group 1 */}
            <div className="mb-10">
              <div className="font-[700] text-[#27AE60] text-[1.4rem] mb-6 border-b border-slate-200 pb-2">Identitas Diri</div>
              
              <div className="space-y-4"> 
                <InfoRow label="ID Profil" value="1" />
                <InfoRow label="Username" value="Rizal" />
                <InfoRow label="Nama Lengkap" value="Rizal Ahmad M" />
              </div>
            </div>

            {/* Group 2 */}
            <div>
              <div className="font-[700] text-[#27AE60] text-[1.4rem] mb-6 border-b border-slate-200 pb-2">Kontak</div>
              <div className="space-y-4">
                <InfoRow label="Alamat Email" value="rizal@gmail.com" />
                <InfoRow label="No Telephone" value="089676440508" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingProfilePage;