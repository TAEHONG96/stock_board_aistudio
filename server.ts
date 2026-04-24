import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

const PORT = 3000;

async function fetchYahooFinance(symbol: string, range = "1mo", interval = "1d") {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=${range}&interval=${interval}`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
}

async function startServer() {
  const app = express();

  app.get("/api/stock/:symbol", async (req, res) => {
    const data = await fetchYahooFinance(req.params.symbol);
    if (!data || !data.chart?.result?.[0]) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }
    
    const result = data.chart.result[0];
    const meta = result.meta;
    const currentPrice = meta.regularMarketPrice;
    const previousClose = meta.chartPreviousClose;
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;
    
    // Get historical close prices
    const closes = result.indicators?.quote?.[0]?.close || [];
    // remove nulls
    const validCloses = closes.filter((c: number | null) => c !== null);

    res.json({
      symbol: meta.symbol,
      price: currentPrice,
      currency: meta.currency,
      change: change,
      changePercent: changePercent,
      history: validCloses
    });
  });

  // Multiple symbols endpoint
  app.get("/api/markets", async (req, res) => {
    const symbols = (req.query.symbols as string) || "^KS11,^IXIC,KRW=X,^GSPC,005930.KS,005380.KS,AAPL,NVDA,069500.KS";
    const symbolList = symbols.split(",");
    
    const results = await Promise.all(symbolList.map(sym => fetchYahooFinance(sym, "1d", "1d")));
    
    const responseData = symbolList.reduce((acc: any, sym, index) => {
      const data = results[index];
      if (data && data.chart?.result?.[0]) {
        const meta = data.chart.result[0].meta;
        const currentPrice = meta.regularMarketPrice;
        const previousClose = meta.chartPreviousClose;
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;
        
        acc[sym] = {
          price: currentPrice,
          change: change,
          changePercent: changePercent,
          currency: meta.currency
        };
      }
      return acc;
    }, {});
    
    res.json(responseData);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // app.use(vite.middlewares); -> In Vite 6, we use app.use(vite.middlewares)
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // For Express 4.x
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
