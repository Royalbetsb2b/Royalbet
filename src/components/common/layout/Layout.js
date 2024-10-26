import React, { useContext, useEffect, useState } from "react";

import Depositmodal from "../../modals/Depositmodal";
import {Footer} from "../../footer/Footer";
import Navbar from "../navbar/Navbar";
import Notifiy from "../../notify/Notifiy";
import Preloader from "../../preloader/Preloader";
import Result from "../../flipresult/Result";
import { ShopContext } from "../../../utils/contextShop";
import Upcoming from "../../upcoming/Upcoming";
import Usernamemodal from "../../modals/Usernamemodal";
import Webhooknotify from "../../modals/Webhooknotify";
import { useAddress } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";

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
    console.log(usernameModal, "in sie inside layuout");
    // if (!address) {
    //   setNotify(true);
    //   setNotifyType("warn");
    //   setNotifyMsg("Please connect your wallet to proceed");
    //   navigate("/");
    // }
  }, [address, webhookRecieved, gameResult, depositModal, usernameModal]);

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
