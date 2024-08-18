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
import Depositmodal from "../../modals/Depositmodal";
import Usernamemodal from "../../modals/Usernamemodal";
import Webhooknotify from "../../modals/Webhooknotify";

function Layout({ children, setCurrentChain }) {
  const address = useAddress();
  const navigate = useNavigate();

  const {
    notify,
    loader,
    setNotify,
    setNotifyType,
    setNotifyMsg,
    gameResult,
    depositModal,
    usernameModal,
    webhookCalled,
    catchAddress,
    webhookRecieved,
  } = useContext(ShopContext);
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
      <Navbar setCurrentChain={setCurrentChain} />

      {notify && <Notifiy />}

      {/* {loader && <Preloader loader={loader} />} */}

      {gameResult && <Result />}
      {depositModal && <Depositmodal />}
      {usernameModal && <Usernamemodal />}
      {webhookRecieved && <Webhooknotify />}
      {children}
      <Footer />
    </main>
  );
}

export default Layout;
