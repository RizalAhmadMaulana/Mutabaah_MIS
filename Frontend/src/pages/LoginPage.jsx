import { useState } from "react";
import { BiUserCircle, BiPhone, BiLockAlt, BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // LOGIKA: Import axios
import BannerPanel from "../components/organisms/BannerPanel";
import InputField from "../components/molecules/InputField";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // LOGIKA: State Username
  const [password, setPassword] = useState(""); // LOGIKA: State Password
  const [error, setError] = useState("");      // LOGIKA: State Error
  const [phone, setPhone] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // LOGIKA: Tembak API Login Django
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username: username,
        password: password
      });

      // LOGIKA: Simpan Token dan Data User
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("user", JSON.stringify({
        username: response.data.username,
        role: response.data.role, // ADMIN, MUSYIF, atau WALI_MURID
        name: response.data.name
      }));

      navigate("/beranda");
    } catch (err) {
      setError("Username atau password salah!");
      console.error(err);
    }
  };

  const handleChangePhone = (e) => {
    const value = e.target.value;
    const onlyNums = value.replace(/[^0-9]/g, "");
    setPhone(onlyNums);
  };

  const WA_NUMBER = "6289676440508";
  const WA_TEXT = "Assalamualaikum Admin Mutabaah MIS, saya (wali murid/musyif) mau tanya apakah diperbolehkan untuk login? Jika boleh, saya mau minta ditambahkan sebagai user baru ";
  const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f1f5f9] font-poppins text-[#0A2540]">
      <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] w-full max-w-[500px] lg:max-w-[1100px] flex flex-col lg:flex-row min-h-[650px]">
        
        <BannerPanel />

        <div className="w-full lg:w-1/2 p-8 md:p-10 lg:p-20 flex flex-col justify-center">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-[1.8rem] lg:text-[2.2rem] font-[800] mb-2 leading-tight">Login Akun</h2>
            <p className="text-slate-400 text-sm">Silakan masuk untuk mengakses system hafalan santri</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-1">
            {/* LOGIKA: Menampilkan Error */}
            {error && <p className="text-red-500 text-xs font-bold mb-2 ml-1">{error}</p>}

            <InputField 
              label="Nama Pengguna" 
              icon={BiUserCircle} 
              placeholder="Masukkan Username NISN/NIP" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <InputField 
              label="No Telp" 
              icon={BiPhone} 
              placeholder="Masukkan Nomor Telephone" 
              type="text" 
              value={phone} 
              onChange={handleChangePhone} 
              required 
            />
            <InputField 
              label="Kata Sandi" 
              icon={BiLockAlt} 
              placeholder="Kata Sandi" 
              isPassword 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            
            <button type="submit" className="w-full bg-gradient-to-r from-[#0D9488] to-[#0A2540] text-white font-[700] py-[12px] rounded-[12px] mt-6 hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(13,148,136,0.3)] transition-all flex items-center justify-center gap-2 text-[1.1rem]">
              Login <BiLogInCircle className="text-xl" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-[#64748b]">
            Belum punya akun?{" "}
            <a href={WA_URL} target="_blank" rel="noreferrer" className="text-[#0D9488] font-[700] hover:underline">
              Hubungi Admin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;