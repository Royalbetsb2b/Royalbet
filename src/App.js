import React, { useEffect, useState } from "react";
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
import { ThirdwebProvider, useChainId } from "@thirdweb-dev/react";
import {
  Ethereum,
  Polygon,
  Binance,
  Fantom,
  Avalanche,
  Arbitrum,
  BinanceTestnet,
} from "@thirdweb-dev/chains";
// import { useSyncedStore } from "useSyncExternalStoreWithSelector";

function App() {
  // const currentChain = useSyncedStore(
  //   React.useSyncExternalStore,
  //   () => localStorage.getItem("currentchain"),
  //   () => localStorage.getItem("currentchain")
  // );
  const [currentChain, setCurrentChain] = useState(56);
  const [supportedchains, setSupportedChains] = useState([
    { name: "binance-testnet", id: 97 },
    { name: "ethereum", id: 1 },
    { name: "binance", id: 56 },
    { name: "polygon", id: 137 },
    { name: "fantom", id: 250 },
    { name: "avalanche-fuji", id: 43114 },
    { name: "arbitrum", id: 42161 },
  ]);
  const [activechain, setActiveChain] = useState("binance");

  // const chainidd = useChainId();

  // //Its binance and binance-testnet
  // const chains = [
  //   { name: "binance-testnet", id: 97 },
  //   { name: "ethereum", id: 1 },
  //   { name: "binance", id: 56 },
  //   { name: "polygon", id: 137 },
  //   { name: "fantom", id: 250 },
  //   { name: "avalanche-fuji", id: 43114 },
  //   { name: "arbitrum", id: 42161 },
  // ];
  // const activeSelected = chains.find((data) => data.id === chainidd);
  //919374fd368afc2f273210df7d6e66f9 ps_own
  //mr matrick_own 9ec8fe1959510de35dbefa184240a8a9
  const clientId = "9ec8fe1959510de35dbefa184240a8a9";

  useEffect(() => {
    const findSelected = supportedchains.find(
      (chain) => chain.name === activechain
    );
    const findToSelect = supportedchains.find(
      (chain) => chain.id === currentChain
    );
    console.log(
      currentChain,
      findSelected,
      findToSelect,
      "checking all things",
      activechain
    );
    if (findSelected?.id !== parseInt(currentChain)) {
      console.log("in in here");
      setActiveChain(findToSelect?.name);
    }
  }, [activechain, currentChain]);

  return (
    <ThirdwebProvider
      activeChain={activechain}
      // supportedChains={[
      //   Ethereum,
      //   Polygon,
      //   Fantom,
      //   Binance,
      //   Avalanche,
      //   Arbitrum,
      //   BinanceTestnet,
      // ]}
      clientId={clientId}
    >
      <ShopContextProvider>
        <Layout setCurrentChain={setCurrentChain}>
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
    </ThirdwebProvider>
  );
}

export default App;
