import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Search, Home as HomeIcon, Wallet, Users, Settings, ArrowLeft, Star } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetail = location.pathname.startsWith("/stock/");
  const stockId = location.pathname.split("/").pop() || "005930";
  
  const STOCK_NAMES: Record<string, string> = {
    "005930": "Samsung Electronics",
    "005380": "Hyundai Motor",
    "AAPL": "Apple Inc.",
    "NVDA": "NVIDIA Corp",
    "069500": "KODEX 200"
  };
  const stockName = STOCK_NAMES[stockId] || "Stock Detail";

  const NavContent = () => (
    <>
      <NavItem to="/" icon={<HomeIcon size={24} />} label="Home" current={location.pathname} />
      <NavItem to="/portfolio" icon={<Wallet size={24} />} label="Portfolio" current={location.pathname} />
      <NavItem to="/community" icon={<Users size={24} />} label="Community" current={location.pathname} />
      <NavItem to="/settings" icon={<Settings size={24} />} label="Settings" current={location.pathname} />
    </>
  );

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-16 bg-[#11131c]/80 backdrop-blur-xl border-b border-white/5">
        {isDetail ? (
          <>
            <button onClick={() => navigate(-1)} className="text-zinc-400 hover:bg-white/5 p-2 rounded-full transition-colors flex items-center justify-center">
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-lg font-black tracking-tighter">{stockName}</h1>
              <p className="text-xs font-bold tracking-widest text-[#bacbb9]">{stockId}</p>
            </div>
            <button className="text-zinc-400 hover:bg-white/5 p-2 rounded-full transition-colors flex items-center justify-center">
              <Star size={24} />
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#32343e] overflow-hidden border border-[#3b4a3d] md:hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <span className="md:hidden material-symbols-outlined text-zinc-400 p-1">search</span>
              <span className="hidden md:block text-lg font-black text-[#00E676] tracking-tighter">StockBoard</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
               <DesktopNavItem to="/" label="Home" current={location.pathname} />
               <DesktopNavItem to="/portfolio" label="Portfolio" current={location.pathname} />
               <DesktopNavItem to="/community" label="Community" current={location.pathname} />
               <DesktopNavItem to="/settings" label="Settings" current={location.pathname} />
            </nav>
            <div className="flex items-center gap-3">
               <span className="max-md:hidden material-symbols-outlined text-zinc-400 p-1">search</span>
               <div className="hidden md:block w-8 h-8 rounded-full bg-[#32343e] overflow-hidden border border-[#3b4a3d]">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Bottom Navigation for Mobile */}
      {!isDetail && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-2 pb-safe bg-[#11131c]/90 backdrop-blur-2xl border-t border-white/10 rounded-t-xl shadow-[0_-4px_24px_rgba(0,0,0,0.5)]">
          <NavContent />
        </nav>
      )}
    </div>
  );
}

function NavItem({ to, icon, label, current }: { to: string; icon: React.ReactNode; label: string; current: string }) {
  const navigate = useNavigate();
  const isActive = current === to || (to !== '/' && current.startsWith(to));
  
  return (
    <button
      onClick={() => navigate(to)}
      className={cn(
        "flex flex-col items-center justify-center p-2 transition-all duration-200 w-[72px] rounded-xl",
        isActive ? "text-[#00e676] bg-[#00e676]/10" : "text-zinc-500 hover:text-[#75ff9e] hover:bg-white/5"
      )}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-[10px] font-semibold uppercase tracking-widest">{label}</span>
    </button>
  );
}

function DesktopNavItem({ to, label, current }: { to: string; label: string; current: string }) {
  const navigate = useNavigate();
  const isActive = current === to || (to !== '/' && current.startsWith(to));

  return (
    <button
      onClick={() => navigate(to)}
      className={cn(
        "text-sm font-semibold uppercase tracking-widest px-3 py-1.5 rounded-xl transition-colors",
        isActive ? "text-[#00e676] bg-white/5" : "text-zinc-400 hover:bg-white/5"
      )}
    >
      {label}
    </button>
  );
}
