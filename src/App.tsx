/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Community from "./pages/Community";
import Portfolio from "./pages/Portfolio";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/stock/:id" element={<Detail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/settings" element={<Portfolio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
