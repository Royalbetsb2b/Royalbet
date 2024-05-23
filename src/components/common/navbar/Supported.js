import React, { useContext, useEffect, useState } from "react";
import { useSwitchChain, useChain } from "@thirdweb-dev/react";
import { ShopContext } from "../../../utils/contextShop";

const Supported = () => {
  const { selectedChainLocal, setSelectedChainLocal } = useContext(ShopContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedToken, setSelectedToken] = useState("");

  const switchChain = useSwitchChain();
  const chain = useChain();

  const chains = [
    { value: "ETHEREUM", label: "Eth Mainnet", short_code: "ETH", chain_id: 1 },
    { value: "BINANCE", label: "BnB Mainnet", short_code: "BNB", chain_id: 56 },
    {
      value: "MATIC",
      label: "Matic Mainnet",
      short_code: "MATIC",
      chain_id: 137,
    },
    {
      value: "USDT MATIC",
      label: "USDC Matic",
      short_code: "MATIC",
      chain_id: 137,
    },
    {
      value: "ETH MATIC",
      label: "Eth Matic",
      short_code: "MATIC",
      chain_id: 137,
    },
    { value: "ARBITRUM", label: "Eth Arb", short_code: "ETH", chain_id: 42161 },
    // Add more chains as needed
  ];

  const handleChainChange = (chain) => {
    // const hexChainId = "0x" + Number(chain.chain_id).toString(16); // Convert to hexadecimal
    console.log("money money", chain);
    switchChain(`0x${Number(chain.chain_id).toString(16)}`);
    // Reset the selected token when the chain changes
    setSelectedChain(chain.value);
    setSelectedChainLocal(chain.short_code);
    // Close the dropdown after selecting a chain
    setIsDropdownOpen(false);
  };

  const handleTokenChange = (token) => {
    setSelectedToken(token);
    // Close the dropdown after selecting a token
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (chain.chainId === 1) {
      setSelectedChain("ETHEREUM");
    } else if (chain.chainId === 56) {
      setSelectedChain("BINANCE");
    } else if (chain.chainId === 137) {
      setSelectedChain("ETH MATIC");
    }
  }, []);

  return (
    <div className=" absolute top-[62px] left-[46px] md:relative md:top-0 md:left-0 flex flex-col items-center justify-center ">
      {/* Custom Dropdown */}
      <div className="relative w-[121px] text-[13px]">
        <div
          className="text-[#fff] p-2 bg-[#07001A] border border-[#1cba6b] rounded-md cursor-pointer whitespace-nowrap"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedChain || "Choose currency"}
        </div>
        {isDropdownOpen && (
          <div className="absolute mt-2 p-2  bg-[#07001A] border border-[#1cba6b] rounded-md z-[99999]">
            {chains.map((chain) => (
              <div
                key={chain.value}
                className="cursor-pointer hover:bg-gray-200 p-1 text-[#fff]"
                onClick={() => handleChainChange(chain)}
              >
                {chain.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Supported;
