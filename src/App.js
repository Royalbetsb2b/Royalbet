import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/common/layout/Layout";
import GameSection from "./components/home/GameSection";
import Home from "./components/home/index";
import LeaderBoard from "./components/leaderboard/LeaderBoard";
import FlipStats from "./components/flipstats/FlipStats";
import AllFlips from "./components/allflips/AllFlips";
import Referrals from "./components/referrals/Referrals";
import Upcoming from "./components/upcoming/Upcoming";
import { ShopContextProvider } from "./utils/contextShop";

function App() {
  return (
    <ShopContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/stats" element={<FlipStats />} />
          <Route path="/recent" element={<AllFlips />} />

          <Route path="/referrals" element={<Referrals />} />

          <Route path="/upcoming" element={<Upcoming />} />
        </Routes>
      </Layout>
    </ShopContextProvider>
  );
}

export default App;
