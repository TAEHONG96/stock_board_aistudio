import React from "react";
import { ArrowUpRight, ArrowDownRight, History, FileText, HeadphonesIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

const WATCHLIST = [
  { symbol: "AAPL", price: "$189.30", change: "+1.2%", isUp: true },
  { symbol: "TSLA", price: "$210.45", change: "-0.8%", isUp: false },
  { symbol: "NVDA", price: "$450.20", change: "+3.4%", isUp: true },
  { symbol: "MSFT", price: "$330.11", change: "+0.5%", isUp: true },
];

export default function Portfolio() {
  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-6 flex flex-col gap-8 pb-24 font-['Inter']">
      
      {/* User Profile Summary */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border border-[#3b4a3d] overflow-hidden p-1 bg-[#1d1f29] relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#75ff9e]/20 to-transparent pointer-events-none"></div>
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=EliasVance" 
              alt="Avatar" 
              className="w-full h-full object-cover rounded-full relative z-10 bg-[#32343e]" 
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Elias Vance</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-xs text-[#bacbb9] uppercase tracking-widest">Pro Tier</span>
              <div className="h-1 w-1 rounded-full bg-[#3b4a3d]"></div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#0068ed]/10 text-[#b0c6ff] font-bold text-[10px] tracking-widest border border-[#0068ed]/20 uppercase">
                Aggressive Growth
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Total Assets Overview */}
      <section className="bg-[#191b24]/60 backdrop-blur-xl border border-[#3b4a3d] rounded-xl p-6 relative overflow-hidden group hover:border-[#75ff9e]/30 transition-colors">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#75ff9e]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none transition-opacity group-hover:bg-[#75ff9e]/10"></div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
          <div>
            <h2 className="font-bold text-xs uppercase tracking-widest text-[#bacbb9] mb-2">Total Assets</h2>
            <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              $1,248,590.00
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center text-[#ff4d4f] font-semibold text-[14px] bg-[#ff4d4f]/10 px-2 py-0.5 rounded border border-[#ff4d4f]/20">
                <ArrowUpRight size={16} className="mr-1" />
                +12.4%
              </span>
              <span className="text-[13px] text-[#bacbb9]">YTD Return</span>
            </div>
          </div>
          
          {/* Minimalist Chart Representation */}
          <div className="w-full md:w-[240px] h-[70px] relative opacity-80 mt-4 md:mt-0">
            <svg className="w-full h-full stroke-[#ff4d4f] fill-[#ff4d4f]/5" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path className="stroke-none" d="M0 30 L0 25 L10 22 L20 28 L30 15 L40 18 L50 5 L60 12 L70 2 L80 10 L90 0 L100 5 L100 30 Z"></path>
              <path d="M0 25 L10 22 L20 28 L30 15 L40 18 L50 5 L60 12 L70 2 L80 10 L90 0 L100 5" fill="none" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Watchlist Highlights */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[18px] font-semibold text-white">Watchlist Highlights</h3>
          <button className="font-bold text-xs uppercase tracking-widest text-[#b0c6ff] hover:text-[#d9e2ff] transition-colors">Manage</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {WATCHLIST.map((item) => (
            <div key={item.symbol} className="bg-[#1d1f29]/50 border border-[#3b4a3d] rounded-lg p-3 hover:bg-[#1d1f29] transition-colors flex flex-col gap-2 relative overflow-hidden group">
              <div className={cn(
                "absolute bottom-0 left-0 w-full h-1/2 opacity-0 group-hover:opacity-100 transition-opacity",
                item.isUp ? "bg-gradient-to-t from-[#ff4d4f]/5 to-transparent" : "bg-gradient-to-t from-[#3182f6]/5 to-transparent"
              )}></div>
              
              <div className="flex justify-between items-center relative z-10">
                <span className="font-semibold text-[14px] text-white tracking-wider">{item.symbol}</span>
                {item.isUp ? <ArrowUpRight className="text-[#bacbb9]" size={16} /> : <ArrowDownRight className="text-[#bacbb9]" size={16} />}
              </div>
              <div className="relative z-10">
                <div className="text-[16px] text-white font-semibold">{item.price}</div>
                <div className={cn("text-[13px] mt-0.5", item.isUp ? "text-[#ff4d4f]" : "text-[#3182f6]")}>{item.change}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickLink icon={<History size={20} />} title="History" description="Transactions & Orders" />
        <QuickLink icon={<FileText size={20} />} title="Documents" description="Statements & Tax forms" />
        <QuickLink icon={<HeadphonesIcon size={20} />} title="Support" description="Help center & Live chat" />
      </section>
    </div>
  );
}

function QuickLink({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <button className="bg-[#191b24]/80 backdrop-blur-sm border border-[#3b4a3d] rounded-lg p-4 flex items-center gap-4 hover:bg-[#282933] transition-all hover:-translate-y-0.5 group text-left">
      <div className="w-10 h-10 rounded-full bg-[#b0c6ff]/10 flex items-center justify-center text-[#b0c6ff] group-hover:bg-[#b0c6ff]/20 transition-colors border border-[#b0c6ff]/10">
        {icon}
      </div>
      <div>
        <div className="text-[16px] font-semibold text-white">{title}</div>
        <div className="text-[13px] text-[#bacbb9] mt-0.5">{description}</div>
      </div>
    </button>
  );
}
