import React, { useContext, useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Notifiy from "../../notify/Notifiy";
import Preloader from "../../preloader/Preloader";
import Footer from "../../footer/Footer";
import Upcoming from "../../upcoming/Upcoming";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../../utils/contextShop";
import Result from "../../flipresult/Result";
import { useAddress } from "@thirdweb-dev/react";

function Layout({ children }) {
  const address = useAddress();
  const navigate = useNavigate();

  const { notify, loader, setNotify, setNotifyType, setNotifyMsg, gameResult } =
    useContext(ShopContext);
  useEffect(() => {
    // if (!address) {
    //   setNotify(true);
    //   setNotifyType("warn");
    //   setNotifyMsg("Please connect your wallet to proceed");
    //   navigate("/");
    // }
  }, [address]);

  return (
    <main className="h-full min-h-screen relative bg-[#07001A]">
      <Navbar />

      {notify && <Notifiy />}

      {/* {loader && <Preloader loader={loader} />} */}

      {gameResult && <Result />}
      {children}
      <Footer />
    </main>
  );
}

export default Layout;
