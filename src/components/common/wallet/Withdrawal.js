import React, { useEffect, useRef, useState, useContext } from "react";
import { ChevronDown } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import QRCode from "qrcode";
import Copy from "../../../utils/Copy";
import { ShopContext } from "../../../utils/contextShop";

export default function Withdrawal() {
  const {
    userProfile,
    checkAddressCorrect,
    withdrawalInWallet,
    setWehookCalled,
    setCatchAddress,
  } = useContext(ShopContext);

  const [selectedOption, setSelectedOption] = useState({
    img: "/wallet/bsc.svg",
    value: "BNB",
    label: "Binance",
    merch: "evm",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [responeWithdrawTo, setResponseWithdrawTo] = useState({
    img: "/wallet/bsc.svg",
    value: "BNB",
    label: "Binance",
    merch: "evm",
  });
  const [withdrawalAddress, setWithdrawalAddress] = useState("");
  const [apiResCheck, setApiResCheck] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingwithdraw, setloadingwithdraw] = useState(false);

  //for calculation of amount and stuffs like that
  const [chainFiatAmt, setChainFiatAmt] = useState(0);
  const [calcAmtInFiat, setCalcAmtInFiat] = useState(0.0);
  const [err, setErr] = useState("");
  const dropdownRef = useRef(null);

  const options = [
    {
      img: "/wallet/btc.png",
      value: "BTC",
      label: "BTC",
      merch: "btc",
      coinpay: "BTC",
    },
    {
      img: "/wallet/bsc.svg",
      value: "BNB",
      label: "Binance",
      merch: "evm",
      coinpay: "BNB.BSC",
    },
    {
      img: "/wallet/sol.png",
      value: "SOL",
      label: "Solana",
      merch: "sol",
      coinpay: "SOL",
    },
    {
      img: "/wallet/usdt.png",
      value: "USDT",
      label: "USDT",
      merch: "tron",
      coinpay: "USDT",
    },
    {
      img: "/wallet/usdt.png",
      value: "USDT",
      label: "USDT(BSC)",
      merch: "evm",
      coinpay: "USDT.BEP20",
    },
    {
      img: "/wallet/usdt.png",
      value: "USDT",
      label: "USDT(ERC)",
      merch: "evm",
      coinpay: "USDT.ERC20",
    },
    {
      img: "/wallet/usdt.png",
      value: "USDT",
      label: "USDT(Polygon)",
      merch: "evm",
      coinpay: "USDT.PRC20",
    },
    {
      img: "/wallet/usdt.png",
      value: "USDT",
      label: "USDT(Solana)",
      merch: "sol",
      coinpay: "USDT.SOL",
    },
    {
      img: "/wallet/usdc.png",
      value: "USDC",
      label: "USDC(Solana)",
      merch: "sol",
      coinpay: "USDC.SOL",
    },
    {
      img: "/wallet/usdc.png",
      value: "USDC",
      label: "USDC(BSC)",
      merch: "evm",
      coinpay: "USDC.BEP20",
    },
    {
      img: "/wallet/usdc.png",
      value: "USDC",
      label: "USDC(ETH)",
      merch: "evm",
      coinpay: "USDC",
    },
    {
      img: "/wallet/polygon.svg",
      value: "MATIC",
      label: "MATIC",
      merch: "evm",
      coinpay: "MATIC.POLY",
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
    setResponseWithdrawTo(option);
    setIsOpen(false);
  };

  const mockApi = async (e) => {
    console.log("hi there");
    setApiResCheck("");
    setLoading(true);
    setErr("");
    if (e.target.value.length === 0) {
      setLoading(false);
      setErr("");
    }
    // let response = {
    //   status: true,
    //   //   message: "address is not correct",
    //   data: 500,
    // };

    const response = await checkAddressCorrect(
      e.target.value,
      selectedOption.merch,
      selectedOption.value
    );
    // console.log(response, "withdrawal");
    if (!response.status) {
      setErr(response.message);
      setLoading(false);
      return;
    }
    setApiResCheck(response.data);
    setChainFiatAmt(response.price);
    setWithdrawalAddress(e.target.value);
    setLoading(false);
  };

  const calculateFiat = (e) => {
    // const amountEntered = e.target.value;
    const converted = e.target.value * chainFiatAmt;
    if (converted > userProfile.balance) {
      setCalcAmtInFiat("insufficient balance");
      return;
    }
    setCalcAmtInFiat(converted);
  };

  const callWithdrawal = async () => {
    setloadingwithdraw(true);

    const response = await withdrawalInWallet(
      selectedOption.value,
      withdrawalAddress,
      calcAmtInFiat,
      chainFiatAmt
    );
    if (response.status) {
      setCatchAddress(withdrawalAddress);
      setWehookCalled(true);
      setloadingwithdraw(false);
      return;
    }
    setloadingwithdraw(false);
  };

  return (
    <div className="w-[100%] flex flex-col items-center justify-center mt-7 gap-10">
      {/* The select crypto to make deposit with */}
      <div className="flex justify-start w-[100%] gap-2 items-center">
        {/* Select chain */}
        <div className="relative inline-block w-[40%]" ref={dropdownRef}>
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
                  className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[#3f3a54] ${
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

        {/* Enter address*/}
        <div className="rounded text-white border border-[#BE36EB] flex gap-2 items-center p-2 w-[100%]">
          <img
            src={selectedOption?.img}
            alt={`deposit chain logo`}
            className="w-5 h-5 mr-2 rounded-full object-contain"
          />
          <input
            type="text"
            className="bg-transparent outline-none w-[100%]"
            placeHolder="Enter Recieving Address"
            onChange={(e) => mockApi(e)}
          />
        </div>
      </div>

      {/* Other content */}
      {loading && <div className="text-[#FFF]">Loading...</div>}
      {err !== "" && <div className="text-[#FFF]">{err}</div>}
      {!loading && apiResCheck && (
        <div className="w-[100%] flex flex-col justify-center items-center">
          <div className="flex flex-col justify-start w-[100%]">
            <div className="rounded text-white border border-[#BE36EB] flex gap-2 items-center p-2 w-[100%]">
              <input
                type="number"
                onChange={(e) => calculateFiat(e)}
                className="bg-transparent outline-none w-[100%]"
                placeHolder="Enter Amount To Withdraw"
              />
            </div>
            <div className="text-white text-xs">{calcAmtInFiat}</div>
          </div>

          <button
            className="text-white mt-4 bg-gradient-to-r from-[#080DA6] to-[#BE36EB] outline-none rounded-md px-3 py-2"
            onClick={() => callWithdrawal()}
          >
            {loadingwithdraw ? "loading..." : "withdraw"}
          </button>
        </div>
      )}
    </div>
  );
}
