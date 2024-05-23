import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ethers } from "ethers";
import Svgloader from "../preloader/Svgloader";
import { ethDataRegular, ethDataWhales } from "../../utils/data";
import Switch from "../switchplayer/Switch";
import { ShopContext } from "../../utils/contextShop";

function GameSection() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [playingas, SetPlayingas] = useState("regular");
  const [toMap, SetTomap] = useState([]);

  const { loaderActive, flip, chain } = useContext(ShopContext);

  const [searchParams] = useSearchParams();
  console.log(searchParams.get("address"), "getting query for referrals"); // ▶ URLSearchParams {}

  const handleSwitch = (event) => {
    setSelectedMode(event.target.value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (playingas === "regular") {
      SetTomap(ethDataRegular);
    } else {
      SetTomap(ethDataWhales);
    }
  }, [playingas]);

  return (
    <div className="flex justify-center items-center pb-10  flex-col scroll-m-0 overflow-y-scroll h-[100dvh] scroll-smooth">
      <div className=" flex flex-col items-center border-2 mt-10 py-10 rounded-md border-[#FFF] to-[#0F0F0F] from-[#000] bg-gradient-to-br w-[90%] md:w-[28%] justify-center scroll-m-0 overflow-y-scroll  scroll-smooth">
        <h5 className="game-font text-[#FFF] text-2xl md:text-3xl pb-5 font-extrabold text-center p-3 mt-[144px]">
          {`#1 MOST TRUSTED PLACE TO FLIP ON ${
            chain?.chain === "BSC"
              ? "BSC"
              : chain?.chain === "ETH"
              ? "ETH"
              : "MATIC"
          } `}
        </h5>
        <div className="flex flex-col mt-3">
          <Svgloader loaderActive={loaderActive} />
          {/* Start of cover */}
          <div className="flex md:my-2 gap-3">
            <div className=" ">
              <label className="containers ">
                <input
                  className="hidden"
                  type="checkbox"
                  name="mode"
                  value="heads"
                  checked={selectedMode === "heads"}
                  onChange={handleSwitch}
                />
                <span className="checkmark text-xl font-extrabold  md:text-base game-font">
                  Heads
                </span>
              </label>
            </div>
            <div className=" mb-6 md:mb-0">
              <label className="containers ">
                <input
                  className="hidden"
                  type="checkbox"
                  name="mode"
                  value="tails"
                  checked={selectedMode === "tails"}
                  onChange={handleSwitch}
                />
                <span className="checkmark text-center text-xl font-extrabold md:text-base game-font">
                  Tails
                </span>
              </label>
            </div>
          </div>
          {/* End of cover for coin and selection */}
        </div>
        <div className="border-b mb-5 w-4/5 border-[#ffffff1d]"></div>

        <h1 className="game-font text-[#FFF] text-2xl font-bold mb-4 md:mb-5">
          Choose bet
        </h1>

        <div className="grid grid-cols-3 gap-2 ">
          {toMap?.map((eth) => (
            <div key={eth.id} className=" mb-6 md:mb-5">
              <label className="containers">
                <input
                  className="hidden"
                  type="checkbox"
                  name="optionEth"
                  value={eth.eth}
                  checked={selectedOption === eth.eth}
                  onChange={handleOptionChange}
                />
                <span className="checkmark p-3 game-font text-sm font-extrabold md:text-xs">
                  {eth.eth}{" "}
                  {chain?.chain === "BSC"
                    ? eth.currency.split("|")[1]
                    : chain?.chain === "ETH"
                    ? eth.currency.split("|")[0]
                    : eth.currency.split("|")[2]}
                </span>
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className=" px-3 mb-6 md:mb-5 flex flex-col justify-center items-center">
            <label className="containers">
              <input
                className="hidden"
                type="checkbox"
                name="optionEth"
                value="all"
                checked={selectedOption === "all"}
                onChange={handleOptionChange}
              />
              <div className="border-b mb-5 w-full my-5 border-[#ffffff1d]"></div>
              <span
                className="checkmark w-[17rem]  border-2 border-[#FFF] w-100  font-extrabold p-3 game-font text-sm md:text-sm"
                onClick={() =>
                  flip(
                    `${selectedMode === "heads" ? 1 : 0}`,
                    selectedOption,
                    searchParams
                  )
                }
              >
                Flip
              </span>
            </label>

            <Switch playingas={playingas} SetPlayingas={SetPlayingas} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSection;
