import React, { useContext, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import QRCode from "qrcode";
import Copy from "../../../utils/Copy";
import { ShopContext } from "../../../utils/contextShop";

export default function Deposit() {
  const { depositInWallet, setWehookCalled, setCatchAddress } =
    useContext(ShopContext);
  const [selectedOption, setSelectedOption] = useState({
    img: "/wallet/bsc.svg",
    value: "BNB",
    label: "Binance",
    coinpay: "BNB.BSC",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [responeDepositTo, setResponseDepositTo] = useState({});
  const [loading, setLoading] = useState(false);
  //   const [showSelectedImg, setShowSelectedImg] = useState("");
  const [qrCodeURL, setQRCodeURL] = useState("");
  const dropdownRef = useRef(null);

  const options = [
    {
      img: "/wallet/btc.png",
      value: "BTC",
      label: "BTC",
      coinpay: "BTC",
    },
    {
      img: "/wallet/bsc.svg",
      value: "BNB",
      label: "Binance",
      coinpay: "BNB.BSC",
    },
    { img: "/wallet/sol.png", value: "SOL", label: "Solana", coinpay: "SOL" },
    { img: "/wallet/usdt.png", value: "USDT", label: "USDT", coinpay: "USDT" },
    {
      img: "/wallet/usdt.png",
      value: "USDT",
      label: "USDT(BSC)",
      coinpay: "USDT.BEP20",
    },
    {
      img: "/wallet/usdt.png",
      value: "USDT",
      label: "USDT(ERC)",
      coinpay: "USDT.ERC20",
    },
    {
      img: "/wallet/usdt.png",
      value: "USDT",
      label: "USDT(Polygon)",
      coinpay: "USDT.PRC20",
    },
    {
      img: "/wallet/usdt.png",
      value: "USDT",
      label: "USDT(Solana)",
      coinpay: "USDT.SOL",
    },
    {
      img: "/wallet/usdc.png",
      value: "USDC",
      label: "USDC(Solana)",
      coinpay: "USDC.SOL",
    },
    {
      img: "/wallet/usdc.png",
      value: "USDC",
      label: "USDC(BSC)",
      coinpay: "USDC.BEP20",
    },
    {
      img: "/wallet/usdc.png",
      value: "USDC",
      label: "USDC(ETH)",
      coinpay: "USDC",
    },
    {
      img: "/wallet/polygon.svg",
      value: "MATIC",
      label: "MATIC",
      coinpay: "MATIC.POLY",
    },
    {
      img: "/wallet/ltc.png",
      value: "LTC",
      label: "LTC",
      coinpay: "LTC",
    },
    {
      img: "/wallet/trx.png",
      value: "TRX",
      label: "TRX",
      coinpay: "TRX",
    },
    {
      img: "/wallet/doge.png",
      value: "DOGE",
      label: "DOGE",
      coinpay: "DOGE",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setResponseDepositTo({});
    setIsOpen(false);
  };

  const generateQRCode = async (chain, address, amount) => {
    let uri;

    switch (chain.toLowerCase()) {
      case "bitcoin":
        uri = `bitcoin:${address}?amount=${amount}`;
        break;
      case "ethereum":
        uri = `ethereum:${address}?value=${amount}`;
        break;
      case "usdt":
        uri = `usdt:${address}?amount=${amount}`;
        break;
      case "solana":
        uri = `solana:${address}?amount=${amount}`;
        break;
      case "binance":
        uri = `binance:${address}?amount=${amount}`;
        break;
      default:
        throw new Error("Unsupported chain");
    }

    try {
      const qrCodeDataURL = await QRCode.toDataURL(uri);
      return qrCodeDataURL; // Returns a Data URL that can be used as the src of an <img> tag
    } catch (err) {
      console.error("Failed to generate QR code", err);
      throw err;
    }
  };

  const mockApi = async () => {
    setLoading(true);
    // let response = {
    //   type: "BNB",
    //   address: "0x8b9b7969f5059550704620eb602a7b08b2509458",
    // };

    const response = await depositInWallet(
      selectedOption.value,
      selectedOption.coinpay
    );
    console.log(response, "in deposit");
    setResponseDepositTo(response);
    let chain = options.find((one) => one.value === response.type).value;
    setCatchAddress(response.address);
    setWehookCalled(true);
    const qrURL = await generateQRCode(chain, response.address, 10);
    setQRCodeURL(qrURL);
    setLoading(false);
  };

  return (
    <div className="w-[100%] flex flex-col items-center justify-center mt-7 gap-10">
      {/* The select crypto to make deposit with */}
      <div className="relative inline-block w-[100%]" ref={dropdownRef}>
        <div
          className="flex items-center justify-between w-full bg-[#2a253a] border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow cursor-pointer"
          onClick={toggleDropdown}
        >
          {selectedOption ? (
            <div className="flex items-center">
              <img
                src={selectedOption.img}
                alt={`${selectedOption.label} logo`}
                className="w-5 h-5 mr-2 rounded-full object-contain"
              />
              <span className="text-white">{selectedOption.label}</span>
            </div>
          ) : (
            <span className="text-gray-400 text-sm">
              Select the Deposit meduim
            </span>
          )}
          <ChevronDown
            className={`w-5 h-5 text-white transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-[#2a253a] border border-gray-400 rounded shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-[#3f3a54] ${
                  selectedOption === option
                    ? "bg-[#3f3a54] border-l-4 border-indigo-500"
                    : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <img
                  src={option?.img}
                  alt={`${option?.label} logo`}
                  className="w-5 h-5 mr-2 rounded-full object-contain"
                />
                <span className="text-white">{option?.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action button to dynmaically bring up address and Qr code */}
      {Object.keys(responeDepositTo).length === 0 ? (
        <button
          className="text-white mt-4 bg-gradient-to-r from-[#080DA6] to-[#BE36EB] outline-none rounded-md px-4 py-2"
          onClick={() => mockApi()}
        >
          {loading ? "loading..." : "deposit"}
        </button>
      ) : (
        <div className="w-[100%]">
          <div className="rounded text-white border border-[#080DA6] flex gap-2 items-center p-2">
            <img
              src={selectedOption.img}
              alt={`deposit chain logo`}
              className="w-5 h-5 mr-2 rounded-full object-contain"
            />
            <input
              type="text"
              className="bg-transparent outline-none w-[100%]"
              value={responeDepositTo?.address}
            />
            <Copy copyValue={responeDepositTo?.address} />
          </div>
          <div className="">
            <div className="mt-4 flex justify-center">
              <img src={qrCodeURL} alt="QR Code" className=" w-52 h-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
