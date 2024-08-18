import React, { useContext, useState } from "react";
import { ShopContext } from "../../utils/contextShop";
import Deposit from "../common/wallet/Deposit";
import Withdrawal from "../common/wallet/Withdrawal";
import Buycrypto from "../common/wallet/Buycrypto";
import Swap from "../common/wallet/Swap";

export default function Depositmodal() {
  const { depositModal, setDepositModal } = useContext(ShopContext);
  const [selectedUi, setSelectedUi] = useState("deposit");

  const handleClose = () => {
    setDepositModal(false);
  };

  const renderSelectedUi = () => {
    switch (selectedUi) {
      case "deposit":
        return <Deposit />;
      case "withdraw":
        return <Withdrawal />;
      case "buycrypto":
        return <Buycrypto />;
      case "swap":
        return <Swap />;
      default:
        return <Deposit />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#130D25] flex flex-col gap-5 p-5 rounded-xl z-[99999999] w-[90%] md:w-[45%] h-[70%] overflow-auto">
        {/* header */}
        <div className="flex justify-between items-center">
          <div className="rounded-lg text-white text-xl font-bold">Wallet</div>
          <button
            onClick={handleClose}
            className="text-white"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6l-5.6 5.6Z"
              />
            </svg>
          </button>
        </div>
        {/* Navigation */}
        <div className="flex justify-between bg-[#2a253a] rounded-lg p-2">
          {["deposit", "withdraw", "buycrypto", "swap"].map((ui) => (
            <button
              key={ui}
              className={`text-sm font-semibold cursor-pointer transition-colors ${
                selectedUi === ui
                  ? "text-white"
                  : "text-[#808792] hover:text-white"
              }`}
              onClick={() => setSelectedUi(ui)}
            >
              {ui.charAt(0).toUpperCase() + ui.slice(1)}
            </button>
          ))}
        </div>
        {/* Dynamically displayed selected UI */}
        <div className="flex-grow overflow-auto">{renderSelectedUi()}</div>
      </div>
    </div>
  );
}
