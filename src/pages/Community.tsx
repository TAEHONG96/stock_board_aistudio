import React from "react";
import { Search, Flame, Newspaper, Activity, MessageSquare, MoreHorizontal, ArrowUp, MessageCircle, Share2, TrendingUp, Medal } from "lucide-react";
import { cn } from "@/src/lib/utils";

const POSTS = [
  {
    id: 1,
    author: "Alex Mercer",
    time: "2 hours ago",
    category: "Analysis",
    title: "NVDA Earnings Preview: Why the Options Market is Pricing a Massive Move",
    content: "Looking at the current IV rank and historical volatility going into tomorrow's print, the implied move is currently sitting at +/- 8.5%. Given the supply chain constraints mentioned by TSMC last week, I'm expecting a slight beat on top-line but weaker forward guidance.",
    tags: ["NVDA", "TSMC"],
    upvotes: "1.2k",
    comments: "342"
  },
  {
    id: 2,
    author: "Sarah Chen",
    time: "4 hours ago",
    category: "News",
    title: "Fed holds rates steady, signals potential cuts in late 2024",
    content: "Powell's remarks suggest a cautiously optimistic outlook on inflation, though they remain 'data dependent'. Tech sector seems to be reacting positively in after-hours trading.",
    tags: ["SPY", "QQQ"],
    upvotes: "856",
    comments: "128"
  }
];

export default function Community() {
  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-6 flex flex-col gap-6">
      {/* Search and Filter Section */}
      <section className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bacbb9]" size={20} />
          <input 
            type="text" 
            placeholder="Search topics, stocks, or users..." 
            className="w-full bg-[#1d1f29]/50 border border-[#3b4a3d] rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#00e676] focus:ring-1 focus:ring-[#00e676] transition-all placeholder-[#bacbb9]"
          />
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-2 py-2">
          <FilterButton active icon={<Flame size={16} />} label="Hot" />
          <FilterButton icon={<Newspaper size={16} />} label="News" />
          <FilterButton icon={<Activity size={16} />} label="Analysis" />
          <FilterButton icon={<MessageSquare size={16} />} label="Discussion" />
        </div>
      </section>

      {/* Feed Layout */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Left Column: Main Feed */}
        <div className="md:col-span-8 flex flex-col gap-4">
          {POSTS.map(post => (
            <article key={post.id} className="bg-[#191b24] border border-[#3b4a3d]/50 rounded-xl p-6 backdrop-blur-xl hover:bg-[#1d1f29]/80 transition-all flex flex-col gap-4 group">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#32343e] overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[15px] text-white">{post.author}</h3>
                    <p className="text-xs text-[#bacbb9]">{post.time} • {post.category}</p>
                  </div>
                </div>
                <button className="text-[#bacbb9] hover:text-white"><MoreHorizontal size={20} /></button>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-[#00e676] transition-colors">{post.title}</h2>
                <p className="text-[15px] text-white/80 line-clamp-3">{post.content}</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-[#32343e] text-[#bacbb9] border border-[#3b4a3d]/50 rounded font-mono text-[11px] font-bold">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 mt-2 pt-4 border-t border-[#3b4a3d]/30 text-[#bacbb9]">
                <button className="flex items-center gap-1.5 hover:text-[#62ff96] transition-colors">
                  <ArrowUp size={20} />
                  <span className="text-sm font-semibold">{post.upvotes}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <MessageCircle size={20} />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto">
                  <Share2 size={20} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Right Column: Sidebar */}
        <aside className="md:col-span-4 flex flex-col gap-4 hidden md:flex">
          {/* Trending Tags */}
          <div className="bg-[#32343e] border border-[#3b4a3d]/30 rounded-xl p-5">
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#bacbb9] mb-4 flex items-center gap-2">
              <TrendingUp size={16} /> Trending Tickers
            </h3>
            <div className="flex flex-col gap-3">
              <TrendingItem symbol="$NVDA" count="3.2k posts" change="+4.2%" isUp={true} />
              <TrendingItem symbol="$TSLA" count="1.8k posts" change="-1.5%" isUp={false} />
              <TrendingItem symbol="$AAPL" count="950 posts" change="+0.8%" isUp={true} />
            </div>
          </div>

          {/* Top Contributors */}
          <div className="bg-[#32343e] border border-[#3b4a3d]/30 rounded-xl p-5">
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#bacbb9] mb-4 flex items-center gap-2">
              <Medal size={16} /> Top Analysts
            </h3>
            <div className="flex flex-col gap-4">
              <ContributorItem name="David Kim" role="Macro Strategy" />
              <ContributorItem name="Elena Rostova" role="Options Flow" />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function FilterButton({ active, icon, label }: { active?: boolean, icon: React.ReactNode, label: string }) {
  return (
    <button className={cn(
      "whitespace-nowrap px-4 py-2 rounded-full border font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2",
      active ? "bg-[#32343e] border-[#3b4a3d] text-white" : "bg-[#1d1f29] border-[#3b4a3d] text-[#bacbb9] hover:bg-[#32343e]"
    )}>
      {icon} {label}
    </button>
  );
}

function TrendingItem({ symbol, count, change, isUp }: { symbol: string, count: string, change: string, isUp: boolean }) {
  return (
    <div className="flex justify-between items-center group cursor-pointer">
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-bold text-white group-hover:text-[#62ff96] transition-colors">{symbol}</span>
        <span className="text-xs text-[#bacbb9]">{count}</span>
      </div>
      <span className={cn("text-xs font-semibold", isUp ? "text-[#ff4d4f]" : "text-[#3182f6]")}>{change}</span>
    </div>
  );
}

function ContributorItem({ name, role }: { name: string, role: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[#32343e] overflow-hidden">
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow">
        <p className="text-sm font-semibold text-white leading-none">{name}</p>
        <p className="text-xs text-[#bacbb9] mt-1">{role}</p>
      </div>
      <button className="px-2 py-1 rounded bg-[#1d1f29] text-xs text-[#00e676] border border-[#00e676]/30 hover:bg-[#00e676]/10 transition-colors">
        Follow
      </button>
    </div>
  );
}
