import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../../components/templates/DashboardLayout";
import { BiTimeFive, BiCheckCircle, BiXCircle, BiLoaderAlt, BiRefresh } from "react-icons/bi";

const RiwayatPesanPage = () => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [logs, setLogs] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchLogs = async () => {
    setFetching(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/wa/logs/", { headers });
      setLogs(res.data);
    } catch (err) { console.error("Gagal load log WA", err); }
    finally { setFetching(false); }
  };

  useEffect(() => { fetchLogs(); }, []);

  return (
    <DashboardLayout title="Riwayat Pesan">
      <div className="bg-white rounded-xl p-6 border-t-[5px] border-[#5294A9] shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b pb-3">
          <div className="flex items-center gap-2 text-[#5294A9] font-bold text-lg">
            <BiTimeFive className="text-2xl" /> STATUS PENGIRIMAN TERBARU
          </div>
          <button onClick={fetchLogs} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-500">
            <BiRefresh className={`text-2xl ${fetching ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="border border-black rounded-[4px] overflow-x-auto bg-white custom-scrollbar">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50">
                {["No", "Penerima", "Pesan", "Waktu Kirim", "Status"].map((h, i) => (
                  <th key={i} className="border border-black px-4 py-3 text-center font-bold text-[0.85rem] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fetching && logs.length === 0 ? (
                <tr><td colSpan={5} className="text-center p-20 text-slate-400 font-bold">Menghubungkan ke server...</td></tr>
              ) : logs.length > 0 ? logs.map((log, idx) => (
                <tr key={log.id} className="even:bg-gray-50/50 hover:bg-slate-50 transition-colors">
                  <td className="border border-black p-3 text-center text-slate-600 font-medium">{idx + 1}</td>
                  <td className="border border-black p-3 text-center font-bold text-slate-800">{log.penerima}</td>
                  <td className="border border-black p-3 max-w-md truncate italic text-slate-600" title={log.pesan}>"{log.pesan}"</td>
                  <td className="border border-black p-3 text-center text-xs font-medium">
                    {new Date(log.timestamp).toLocaleString("id-ID", { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                  <td className="border border-black p-3 text-center">
                    <div className="flex justify-center">
                        {log.status === 'terkirim' ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[0.7rem] font-black uppercase flex items-center gap-1"><BiCheckCircle /> {log.status}</span>
                        ) : log.status === 'delay' ? (
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[0.7rem] font-black uppercase flex items-center gap-1"><BiLoaderAlt className="animate-spin" /> {log.status}</span>
                        ) : (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[0.7rem] font-black uppercase flex items-center gap-1"><BiXCircle /> {log.status}</span>
                        )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="border border-black p-20 text-center text-slate-400">Belum ada aktivitas pengiriman pesan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiwayatPesanPage;