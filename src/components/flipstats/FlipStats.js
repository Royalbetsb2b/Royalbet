import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { shortenAddress } from "../../utils/trauncate";
import { ShopContext } from "../../utils/contextShop";
import { useAddress } from "@thirdweb-dev/react";

function FlipStats() {
  const address = useAddress();

  const navigate = useNavigate();
  const [inputData, setInputData] = useState();
  const {
    setNotify,
    setNotifyType,
    setNotifyMsg,
    getstats,
    dataFlipstat,
    Flipstatloading,
    Flipstatsuccess,
  } = useContext(ShopContext);

  const handleinputData = (event) => {
    setInputData(event.target.value);
  };

  useEffect(() => {
    if (!address) {
      setNotify(true);
      setNotifyType("warn");
      setNotifyMsg("Please connect your wallet to proceed");
      navigate("/");
    }
  }, [address]);

  return (
    <section className="h-[80vh]">
      <div className="mt-36">
        <div className="flex mb-10 justify-center flex-col items-center">
          <div className="flex border-2 to-[#0F0F0F] from-[#000] bg-gradient-to-br border-[#FFF]  rounded-full md:w-2/5 w-96 py-3 md:py-4 relative  items-center">
            <span>
              {" "}
              <svg
                stroke="#fff"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-5  left-4 pointer-events-none"
                height="1.3em"
                width="1.3em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              className="bg-transparent text-center default-font font-bold w-full border-none outline-none text-white -ml-5"
              placeholder="Get Flip"
              onChange={handleinputData}
            />
          </div>
          <button
            className="w-32 to-[#0F0F0F] from-[#000] bg-gradient-to-br sm:w-36 py-5 flex items-center text-xs justify-center text-center  h-9 rounded-full  hover:brightness-110 bg-opacity-0 shadow-sm  mt-4 default-font font-bold text-[#FFF]"
            onClick={() => getstats(inputData)}
          >
            {" "}
            {Flipstatloading
              ? "Loading"
              : Flipstatsuccess
              ? "Search Again"
              : "Search"}
          </button>
        </div>
        {dataFlipstat && (
          <div className="flex  justify-center ">
            <div className="border-2 border-[#FFF]  to-[#0F0F0F] from-[#000] bg-gradient-to-br  p-5 flex flex-col md:flex-row items-center relative justify-between rounded-md md:w-4/5 w-96 text-white md:h-28">
              <div className="flex flex-col items-center mb-6 md:mb-auto">
                <img
                  src="/ethlogo.png"
                  className="rounded-full h-10"
                  alt="jknfdkj"
                />
                <h1 className="text-white game-font  text-[12px] mt-4">
                  {shortenAddress(
                    String((Math.round(dataFlipstat.id / 10) * 10) / 10 ** 18)
                  )}
                </h1>
              </div>
              <div className="flex">
                <div className="flex flex-col md:w-44 w-24 items-center">
                  <h2 className="game-font  text-[12px]">Total BNB </h2>
                  <b>
                    {dataFlipstat.isWin
                      ? ((Math.round(dataFlipstat.amount / 10) * 10) /
                          10 ** 18) *
                        2
                      : (Math.round(dataFlipstat.amount / 10) * 10) / 10 ** 18}
                  </b>
                </div>

                <div className="flex flex-col md:w-44 w-36 items-center">
                  <h2 className="game-font  text-[12px]">Predition</h2>
                  <b>{parseInt(dataFlipstat.input) == 1 ? "Heads" : "Tails"}</b>
                </div>

                <div className="flex flex-col md:w-44 w-36 items-center">
                  <h2 className="game-font  text-[12px]">Stats</h2>
                  <b>{dataFlipstat.isWin ? "won" : "loss"}</b>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FlipStats;
