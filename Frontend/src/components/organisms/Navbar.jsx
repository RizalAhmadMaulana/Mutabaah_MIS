import { Link } from "react-router-dom"; // Import Link
import { BiMenu, BiCog } from "react-icons/bi";

const Navbar = ({ onToggleSidebar, onToggleMobile }) => (
  <header className="h-[60px] bg-gradient-to-r from-[#17CA4D] to-[#268C45] flex items-center justify-between px-5 text-white shadow-md sticky top-0 z-[1000]">
    <BiMenu className="text-3xl cursor-pointer" onClick={() => window.innerWidth >= 1024 ? onToggleSidebar() : onToggleMobile()} />
    <div className="flex items-center gap-4">
      {/* Bungkus BiCog dengan Link */}
      <Link to="/setting-profile" className="text-white hover:text-gray-200 transition-colors">
        <BiCog className="text-xl cursor-pointer" title="Setting Profile" />
      </Link>
      <div className="flex items-center gap-2">
        <img src="https://ui-avatars.com/api/?name=Rizal&background=random" className="w-8 h-8 rounded-full border-2 border-white/50" alt="user" />
        <span className="text-sm font-medium hidden sm:inline">Rizal</span>
      </div>
    </div>
  </header>
);
export default Navbar;