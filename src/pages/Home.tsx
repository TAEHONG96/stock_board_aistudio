import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import { cn } from "@/src/lib/utils";

const MARKET_SYMBOLS = ["^KS11", "^IXIC", "KRW=X", "^GSPC"];
const MARKET_NAMES: Record<string, string> = {
  "^KS11": "KOSPI",
  "^IXIC": "NASDAQ",
  "KRW=X": "USD/KRW",
  "^GSPC": "S&P 500"
};

const INITIAL_STOCKS = {
  domestic: [
    { id: "005930", name: "Samsung Electronics", symbol: "005930.KS", icon: "S" },
    { id: "005380", name: "Hyundai Motor", symbol: "005380.KS", icon: "H" },
  ],
  international: [
    { id: "AAPL", name: "Apple Inc.", symbol: "AAPL", icon: "A" },
    { id: "NVDA", name: "NVIDIA Corp", symbol: "NVDA", icon: "N" },
  ],
  etf: [
    { id: "069500", name: "KODEX 200", symbol: "069500.KS", icon: "K" },
  ]
};

function formatPrice(currency: string, value: number) {
  if (currency === 'KRW' || value > 1000) {
    return `₩ ${Math.round(value).toLocaleString()}`;
  }
  return `$ ${value.toFixed(2)}`;
}

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"domestic" | "international" | "etf">("domestic");
  const [marketData, setMarketData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/markets");
      const data = await res.json();
      setMarketData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  const indicesData = MARKET_SYMBOLS.map(sym => {
    const data = marketData[sym];
    if (!data) return { name: MARKET_NAMES[sym], value: "Loading...", change: "-", isUp: true };
    return {
      name: MARKET_NAMES[sym],
      value: sym === 'KRW=X' ? `${data.price.toFixed(2)}` : data.price.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      change: `${data.change > 0 ? '+' : ''}${data.changePercent.toFixed(2)}%`,
      isUp: data.change >= 0
    };
  });

  const generateStockList = (categoryItems: any[]) => {
    return categoryItems.map(item => {
      const data = marketData[item.symbol];
      if (!data) {
        return { ...item, price: "...", change: "...", isUp: true };
      }
      return {
        ...item,
        price: formatPrice(data.currency, data.price),
        change: `${data.change > 0 ? '+' : ''}${data.changePercent.toFixed(2)}%`,
        isUp: data.change >= 0
      };
    });
  };

  const currentCategoryStocks = generateStockList(INITIAL_STOCKS[activeTab]);

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6">
      {/* Ticker Scroll Bar */}
      <div className="w-full overflow-x-auto no-scrollbar py-3 border-b border-[#1d1f29]">
        <div className="flex gap-8 whitespace-nowrap min-w-max px-2">
          {indicesData.map((index, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-bold text-xs uppercase tracking-widest text-[#bacbb9]">{index.name}</span>
              <span className="font-semibold text-lg text-white">{index.value}</span>
              {index.value !== "Loading..." && (
                <span className={cn(
                  "font-bold text-xs flex items-center px-1 rounded",
                  index.isUp ? "text-[#ff4d4f]" : "text-[#3182f6]"
                )}>
                  {index.change}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-6 flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          주식 투자의 첫걸음, <br />
          <span className="text-[#00e676]">시장의 흐름</span>을 한눈에.
        </h1>
        <p className="text-[15px] text-[#bacbb9] max-w-2xl mt-2">
          실시간 데이터와 직관적인 인사이트로 성공적인 투자 포트폴리오를 구축하세요.
        </p>
      </section>

      {/* Market Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar border-b border-[#282933] mt-4 mb-6">
        <TabButton active={activeTab === "domestic"} onClick={() => setActiveTab("domestic")}>국내 주식</TabButton>
        <TabButton active={activeTab === "international"} onClick={() => setActiveTab("international")}>해외 주식</TabButton>
        <TabButton active={activeTab === "etf"} onClick={() => setActiveTab("etf")}>ETF (KODEX/TIGER)</TabButton>
        <div className="flex-1" />
        <button onClick={fetchMarketData} className="px-2 text-[#bacbb9] hover:text-white transition-colors">
          <RefreshCw size={16} className={cn(loading && "animate-spin")} />
        </button>
      </div>

      {/* Content Area: Glassmorphic Card List */}
      <div className="flex flex-col gap-4 pb-12">
        {currentCategoryStocks.map((stock) => (
          <div
            key={stock.id}
            onClick={() => navigate(`/stock/${stock.id}`)}
            className="surface-glass rounded-xl p-4 flex items-center justify-between hover:bg-[#1d1f29]/80 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#32343e] flex items-center justify-center border border-white/5 text-xl font-bold text-white">
                {stock.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg text-white">{stock.name}</span>
                <span className="font-bold text-xs uppercase tracking-widest text-[#bacbb9]">{stock.symbol}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-semibold text-lg text-white">{stock.price}</span>
              <span className={cn(
                "font-bold text-xs px-2 py-0.5 rounded flex items-center mt-1",
                stock.isUp ? "text-[#ff4d4f] bg-[#ff4d4f]/10" : "text-[#3182f6] bg-[#3182f6]/10"
              )}>
                {stock.isUp ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
                {stock.change}
              </span>
            </div>
          </div>
        ))}
        {loading && Object.keys(marketData).length === 0 && (
           <div className="py-12 flex justify-center text-[#bacbb9]">
              Loading market data...
           </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 border-b-2 font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-colors",
        active ? "border-[#00e676] text-[#00e676]" : "border-transparent text-[#bacbb9] hover:text-white"
      )}
    >
      {children}
    </button>
  );
}
