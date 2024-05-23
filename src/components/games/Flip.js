import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ethers } from "ethers";
import Svgloader from "../preloader/Svgloader";
import { ethDataRegular, ethDataWhales } from "../../utils/data";
import Switch from "../switchplayer/Switch";
import { ShopContext } from "../../utils/contextShop";

function Flip({ setSelectedGame }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [toMap, SetTomap] = useState([]);

  const {
    loaderActive,
    play,
    chain,
    selectedChainLocal,
    playingas,
    SetPlayingas,
  } = useContext(ShopContext);

  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("address"), "getting query for referrals"); // ▶ URLSearchParams {}
  const [selectedChoice, setSelectedChoice] = useState();
  const [amount, setAmount] = useState(0);
  const [gametype, setGameType] = useState("");
  const [range, setRange] = useState();
  const [payout, setPayout] = useState();

  const handleChoice = (event) => {
    console.log("lets seee", event.target.value);
    setSelectedMode(event.target.value);
    setSelectedChoice(event.target.value === "heads" ? 1 : 0);
  };
  const handleAmountChange = (event) => {
    console.log("more seeing", event.target.value);
    setSelectedOption(event.target.value);
    setAmount(event.target.value);
    setPayout(parseInt(event.target.value) * 2);
    setRange(2);
  };

  useEffect(() => {
    if (playingas === "regular") {
      SetTomap(ethDataRegular);
    } else {
      SetTomap(ethDataWhales);
    }

    setGameType("flip");
  }, [playingas]);

  return (
    <div
      className="flex justify-center items-center p-5 md:p-10  flex-col scroll-m-0 overflow-y-scroll h-[100dvh] scroll-smooth relative"
      style={{
        background: `linear-gradient(90deg, rgba(6, 0, 24, 0.80) 7.11%, rgba(0, 0, 0, 0.00) 100%), url(${"/background.svg"}), lightgray -0.002px 6px / 98.451% 141.25% no-repeat`,
      }}
    >
      <div
        className="absolute z-[99999] text-[#fff] left-5 top-7 cursor-pointer bg-[#000] p-1 rounded"
        onClick={() => setSelectedGame("")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <path
            fill="#FFF"
            d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13z"
          />
        </svg>
      </div>
      <div className="flex flex-col items-center rounded-2xl bg-[#130D25] w-[100%] md:w-[28%] justify-start scroll-m-0 overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] text-white text-opacity-60 p-[10px] md:p-0">
        <h5 className="game-font text-[#FFF] text-2xl md:text-3xl font-extrabold text-center p-3 ">
          {/* {`#1 MOST TRUSTED PLACE TO FLIP ON ${
            chain?.chain === "BSC"
              ? "BSC"
              : chain?.chain === "ETH"
              ? "ETH"
              : "MATIC"
          } `} */}
          FLIP
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
                  onChange={handleChoice}
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
                  onChange={handleChoice}
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

        <h1 className="game-font text-2xl font-bold mb-4 md:mb-5">
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
                  onChange={handleAmountChange}
                />
                <span className="checkmark p-3 game-font text-sm font-extrabold md:text-xs">
                  {eth.eth} {selectedChainLocal !== "" && selectedChainLocal}
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
                onChange={handleAmountChange}
              />
              <div className="border-b mb-5 w-full my-5 border-[#ffffff1d]"></div>
              <span
                className="checkmark w-[17rem]  border-2 border-[#fff] w-100  font-extrabold p-3 game-font text-sm md:text-sm"
                onClick={() =>
                  play(
                    gametype,
                    selectedChoice,
                    amount,
                    range,
                    payout,
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

export default Flip;
