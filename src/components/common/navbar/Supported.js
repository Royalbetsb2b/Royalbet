import React, { useContext, useEffect, useState } from "react";
import { useChain, useChainId, useSwitchChain } from "@thirdweb-dev/react";
import { ShopContext } from "../../../utils/contextShop";

const Supported = ({ setCurrentChain }) => {
  const { selectedChainLocal, setSelectedChainLocal } = useContext(ShopContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedChainImg, setSelectedChainImg] = useState("");
  const [selectedToken, setSelectedToken] = useState("");

  const switchChain = useSwitchChain();
  const chain = useChain();
  const chainIdd = useChainId();

  const chains = [
    {
      img: "/wallet/ethereum.svg",
      value: "ETH",
      label: "ETH",
      short_code: "ETH",
      chain_id: 1,
    },
    {
      img: "/wallet/bsc.svg",
      value: "BNB",
      label: "BNB",
      short_code: "BNB",
      chain_id: 56,
    },
    {
      img: "/wallet/polygon.svg",
      value: "MATIC",
      label: "MATIC",
      short_code: "MATIC",
      chain_id: 137,
    },
    {
      img: "/wallet/fantom.svg",
      value: "FTM",
      label: "FTM",
      short_code: "FTM",
      chain_id: 250,
    },
    {
      img: "/wallet/avalanche.svg",
      value: "AVAX",
      label: "AVAX",
      short_code: "AVAX",
      chain_id: 43114,
    },
    {
      img: "/wallet/bsc.svg",
      value: "BNBT",
      label: "BNBT",
      short_code: "BSC",
      chain_id: 97,
    },
    {
      img: "/wallet/arbitrum.svg",
      value: "ARB",
      label: "ETH Arb",
      short_code: "ETH",
      chain_id: 42161,
    },
    // Add more chains as needed
  ];

  const handleChainChange = (chain) => {
    // const hexChainId = "0x" + Number(chain.chain_id).toString(16); // Convert to hexadecimal
    console.log("money money", chain);
    switchChain(`0x${Number(chain.chain_id).toString(16)}`);
    // Reset the selected token when the chain changes
    setSelectedChain(chain.value);
    setSelectedChainImg(chain.img);
    setSelectedChainLocal(chain.short_code);
    setCurrentChain(chain.chain_id);
    // Close the dropdown after selecting a chain
    setIsDropdownOpen(false);
  };

  const handleTokenChange = (token) => {
    setSelectedToken(token);
    // Close the dropdown after selecting a token
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    console.log(chainIdd, chain, "bring us backoooks");
    if (chain.chainId === 1) {
      setSelectedChain("ETH");
      setSelectedChainImg("/wallet/ethereum.svg");
      setCurrentChain(1);
    } else if (chain.chainId === 56) {
      setSelectedChain("BNB");
      setSelectedChainImg("/wallet/bsc.svg");
      setCurrentChain(56);
    } else if (chain.chainId === 137) {
      setSelectedChain("MATIC");
      setSelectedChainImg("/wallet/polygon.svg");
      setCurrentChain(137);
    } else if (chain.chainId === 250) {
      setSelectedChain("FTM");
      setSelectedChainImg("/wallet/fantom.svg");
      setCurrentChain(250);
    } else if (chain.chainId === 43114) {
      setSelectedChain("AVAX");
      setSelectedChainImg("/wallet/avalanche.svg");
      setCurrentChain(43114);
    } else if (chain.chainId === 42161) {
      setSelectedChain("ARB");
      setSelectedChainImg("/wallet/arbitrum.svg");
      setCurrentChain(42161);
    } else {
      setSelectedChain("BNBT");
      setSelectedChainImg("/wallet/bsc.svg");
      setCurrentChain(97);
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center ">
      {/* Custom Dropdown */}
      <div className="relative text-[13px]">
        <div
          className="text-[#fff] p-2 bg-[#07001A] border border-[#090CA9] rounded-md cursor-pointer whitespace-nowrap"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex justify-center gap-2 bg-[#07001A]">
            <div className="hidden md:block">
              {selectedChain || "Choose currency"}
            </div>
            <div className="w-5 h-5 flex-shrink-0">
              <img
                src={selectedChainImg}
                alt=""
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>
        </div>
        {isDropdownOpen && (
          <div className="absolute mt-2 p-2 md:p-4 bg-[#130D25] border border-[#090CA9] rounded-md z-[99999]">
            {chains.map((chain) => (
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-colors duration-200"
                key={chain.value}
                onClick={() => handleChainChange(chain)}
              >
                <div className="text-white flex-grow ">{chain.label}</div>
                <div className="w-5 h-5 flex-shrink-0">
                  <img
                    src={chain.img}
                    alt={`${chain.label} logo`}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Supported;
