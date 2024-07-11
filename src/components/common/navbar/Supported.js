import React, { useContext, useEffect, useState } from "react";
import { useChain, useChainId, useSwitchChain } from "@thirdweb-dev/react";
import { ShopContext } from "../../../utils/contextShop";

const Supported = ({ setCurrentChain }) => {
  const { selectedChainLocal, setSelectedChainLocal } = useContext(ShopContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedToken, setSelectedToken] = useState("");

  const switchChain = useSwitchChain();
  const chain = useChain();
  const chainIdd = useChainId();

  const chains = [
    { value: "ETH", label: "ETH", short_code: "ETH", chain_id: 1 },
    { value: "BNB", label: "BNB", short_code: "BNB", chain_id: 56 },
    {
      value: "MATIC",
      label: "MATIC",
      short_code: "MATIC",
      chain_id: 137,
    },
    {
      value: "FTM",
      label: "FTM",
      short_code: "FTM",
      chain_id: 250,
    },
    {
      value: "AVAX",
      label: "AVAX",
      short_code: "AVAX",
      chain_id: 43114,
    },
    {
      value: "BNBT",
      label: "BNBT",
      short_code: "BSC",
      chain_id: 97,
    },
    { value: "ARB", label: "ETH Arb", short_code: "ETH", chain_id: 42161 },
    // Add more chains as needed
  ];

  const handleChainChange = (chain) => {
    // const hexChainId = "0x" + Number(chain.chain_id).toString(16); // Convert to hexadecimal
    console.log("money money", chain);
    switchChain(`0x${Number(chain.chain_id).toString(16)}`);
    // Reset the selected token when the chain changes
    setSelectedChain(chain.value);
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
      setCurrentChain(1);
    } else if (chain.chainId === 56) {
      setSelectedChain("BNB");
      setCurrentChain(56);
    } else if (chain.chainId === 137) {
      setSelectedChain("MATIC");
      setCurrentChain(137);
    } else if (chain.chainId === 250) {
      setSelectedChain("FTM");
      setCurrentChain(250);
    } else if (chain.chainId === 43114) {
      setSelectedChain("AVAX");
      setCurrentChain(43114);
    } else if (chain.chainId === 42161) {
      setSelectedChain("ARB");
      setCurrentChain(42161);
    } else {
      setSelectedChain("BNBT");
      setCurrentChain(97);
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
