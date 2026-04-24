import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { ArrowUpRight, ArrowDownRight, Info, RefreshCw } from "lucide-react";
import { cn } from "@/src/lib/utils";

// Fallback/Mock data layout for metrics
const METRICS_LAYOUT: Record<string, any> = {
  "005930": {
    revenue: [
      { year: "2021", rev: 85, profit: 18 },
      { year: "2022", rev: 92, profit: 14 },
      { year: "2023", rev: 80, profit: 9 },
    ],
    roe: "8.2%", roeChange: "-2.4%p (YoY)",
    per: "14.5x", perIndustry: "16.2x"
  },
  "AAPL": {
    revenue: [
      { year: "2021", rev: 90, profit: 25 },
      { year: "2022", rev: 95, profit: 28 },
      { year: "2023", rev: 92, profit: 26 },
    ],
    roe: "32.4%", roeChange: "+1.2%p (YoY)",
    per: "28.5x", perIndustry: "25.2x"
  }
};

function formatPrice(currency: string, value: number) {
  if (currency === 'KRW' || value > 1000) {
    return `₩ ${Math.round(value).toLocaleString()}`;
  }
  return `$ ${value.toFixed(2)}`;
}

export default function Detail() {
  const location = useLocation();
  const id = location.pathname.split("/").pop() || "005930";
  
  const [stockData, setStockData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // We need to resolve the Yahoo finance ticker
  const symbolMap: Record<string, string> = {
    "005930": "005930.KS",
    "005380": "005380.KS",
    "AAPL": "AAPL",
    "NVDA": "NVDA",
    "069500": "069500.KS"
  };

  const currentSymbol = symbolMap[id] || "005930.KS";
  const metrics = METRICS_LAYOUT[id] || METRICS_LAYOUT["005930"];

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/stock/${currentSymbol}`);
        const data = await res.json();
        setStockData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStockData();
  }, [currentSymbol]);

  if (loading && !stockData) {
    return (
      <div className="flex justify-center items-center h-48 text-[#bacbb9]">
        <RefreshCw size={24} className="animate-spin" />
      </div>
    );
  }

  const isUp = stockData ? stockData.change >= 0 : true;
  const chartColor = isUp ? "#ff4d4f" : "#3182f6";
  const chartData = stockData 
    ? stockData.history.map((val: number, i: number) => ({ value: val, index: i }))
    : [];

  return (
    <div className="px-6 max-w-4xl mx-auto space-y-6 pb-24 font-['Inter']">
      
      {/* Hero Section: Price & Trend */}
      <section className="surface-glass rounded-xl p-6 relative overflow-hidden group">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4 relative z-10">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-white">
               {stockData ? formatPrice(stockData.currency, stockData.price) : "..."}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "flex items-center font-semibold text-lg",
                isUp ? "text-[#ff4d4f]" : "text-[#3182f6]"
              )}>
                {isUp ? <ArrowUpRight size={18} className="mr-1" /> : <ArrowDownRight size={18} className="mr-1" />}
                {stockData ? `${stockData.change > 0 ? '+' : ''}${stockData.change.toFixed(2)} (${stockData.changePercent.toFixed(2)}%)` : "..."}
              </span>
              <span className="text-sm text-[#bacbb9] ml-1">Today</span>
            </div>
          </div>
          <div className="flex gap-2">
            {["1D", "1W", "1M", "1Y"].map((period) => (
              <button 
                 key={period} 
                 className={cn(
                   "px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-colors",
                   period === "1M" ? "bg-[#00e676] text-[#00612e] shadow-[0_0_15px_rgba(0,230,118,0.3)]" : "bg-[#32343e] hover:bg-[#373943] text-white"
                 )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Area */}
        <div className="w-full h-48 md:h-64 relative rounded-lg bg-[#191b24]/50 border border-white/5 overflow-hidden flex items-end">
          {stockData && chartData.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <YAxis domain={['dataMin', 'dataMax']} hide />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={chartColor} 
                  strokeWidth={3} 
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
          <button className="bg-[#3182f6] hover:bg-[#1890ff] text-white px-6 py-4 rounded-xl text-xl font-bold transition-all">
            Sell
          </button>
          <button className="bg-[#ff4d4f] hover:bg-[#ff7875] text-white px-6 py-4 rounded-xl text-xl font-bold transition-all shadow-[0_0_20px_rgba(255,77,79,0.2)]">
            Buy
          </button>
        </div>
      </section>

      {/* Financial Health Check Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#75ff9e]">health_and_safety</span>
            핵심 재무제표 요약 (기업 건강검진)
          </h3>
          <button className="text-sm text-[#75ff9e] hover:underline">자세히 보기</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Revenue & Profit Card */}
          <div className="surface-glass rounded-xl p-5 hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg text-white">매출액 & 영업이익</h4>
                <p className="text-sm text-[#bacbb9] mt-1">최근 3년 추이 (단위: 조 원)</p>
              </div>
              <span className="material-symbols-outlined text-[#bacbb9]">monitoring</span>
            </div>

            <div className="space-y-3">
              {metrics.revenue.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className={cn("w-12 text-sm", idx === 2 ? "text-[#75ff9e] font-bold" : "text-[#bacbb9]")}>{item.year}</span>
                  <div className="flex-1 h-6 bg-[#191b24] rounded-full relative overflow-hidden">
                    <div className={cn("absolute top-0 left-0 h-full rounded-full transition-all", idx === 2 ? "bg-[#75ff9e]/40" : "bg-[#3b4a3d]")} style={{ width: `${item.rev}%` }}></div>
                    <div className={cn("absolute top-0 left-0 h-full rounded-full transition-all", idx === 2 ? "bg-[#00e676]" : "bg-[#0068ed]")} style={{ width: `${item.profit}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10 text-xs text-[#bacbb9]">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-[#3b4a3d]"></div> 매출액</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-[#0068ed]"></div> 영업이익</div>
            </div>
          </div>

          {/* Efficiency & Valuation Card */}
          <div className="grid grid-rows-2 gap-4">
            {/* ROE */}
            <div className="surface-glass rounded-xl p-5 flex flex-col justify-between hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg text-white">ROE <span className="text-xs font-normal text-[#bacbb9] ml-1">(자기자본이익률)</span></h4>
                  <p className="text-xs text-[#75ff9e] mt-1 flex items-center gap-1">
                    <Info size={14} /> 높을수록 효율적
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-bold tracking-tight text-white block">{metrics.roe}</span>
                  <span className="text-sm text-[#3182f6] flex items-center justify-end gap-1 mt-1">
                    <ArrowDownRight size={14} /> {metrics.roeChange}
                  </span>
                </div>
              </div>
            </div>

            {/* PER */}
            <div className="surface-glass rounded-xl p-5 flex flex-col justify-between hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg text-white">PER <span className="text-xs font-normal text-[#bacbb9] ml-1">(주가수익비율)</span></h4>
                  <p className="text-xs text-[#b0c6ff] mt-1 flex items-center gap-1">
                    <Info size={14} /> 낮을수록 저평가
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-bold tracking-tight text-white block">{metrics.per}</span>
                  <span className="text-sm text-[#bacbb9] flex items-center justify-end gap-1 mt-1">업종 평균 {metrics.perIndustry}</span>
                </div>
              </div>
              
              <div className="w-full h-1.5 bg-[#32343e] rounded-full mt-4 relative">
                <div className="absolute top-0 left-[40%] w-2 h-3 -mt-0.5 bg-[#75ff9e] rounded-sm shadow-[0_0_8px_rgba(117,255,158,0.8)]"></div>
                <div className="absolute top-0 left-[60%] w-1 h-3 -mt-0.5 bg-[#3b4a3d] rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
