import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../../utils/contextShop";
import Draggable from "react-draggable";

export default function Dice({ setSelectedGame }) {
  const { play, loaderActive, chain, switchWalletType } =
    useContext(ShopContext);
  const [position, setPosition] = useState(120);
  const [newPosition, setNewPosition] = useState(50);
  const [winChance, setWinChance] = useState(50);
  const [mul, setMul] = useState(2.0);
  const [normalPayout, setNormalPayout] = useState(0);

  const [searchParams] = useSearchParams();
  const [selectedChoice, setSelectedChoice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [gametype, setGameType] = useState("dice");
  const [range, setRange] = useState(6);
  const [payout, setPayout] = useState(0.05);

  const handleDrag = (e, ui) => {
    const newPositions = position + ui.deltaX;
    const boundedPosition = Math.min(Math.max(newPositions, 0), 240);

    setPosition(boundedPosition);
    setNewPosition((boundedPosition / 240) * 100);

    let newRollUnder = Math.floor((boundedPosition / 240) * 98) + 1;
    let newWinChance = newRollUnder;
    let newMultiplier = calculateMultiplier(newWinChance);
    let newPayout = calculatePayout(newMultiplier, amount);

    setWinChance(newWinChance);
    setMul(newMultiplier === undefined ? 0 : newMultiplier);
    setPayout(newPayout);
    setNormalPayout(newPayout);
  };

  const roll = () => {
    setSelectedChoice(parseFloat(newPosition.toFixed(2)));
    const newselect = parseInt(newPosition);
    console.log(newselect, "checking thinges out");
    const selected_choice = (newselect * 100) / 6;

    setTimeout(() => {
      play(gametype, selected_choice, amount, range, payout, searchParams);
    }, 500);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    if (value !== 0 && value > 0) {
      const newPayout = calculatePayout(mul, value);
      setPayout(parseFloat(newPayout));
      setAmount(value);
    } else {
      setPayout(normalPayout);
      setAmount(value);
    }
  };

  const calculateMultiplier = (winChance) => {
    if (winChance <= 2) {
      return 50;
    } else if (winChance >= 98) {
      return 1.02;
    } else {
      return 100 / winChance;
    }
  };

  const calculatePayout = (multiplier, amount) => {
    if (amount !== 0 && amount > 0) {
      return multiplier !== undefined ? (amount * multiplier).toFixed(2) : 0;
    } else {
      return 0;
    }
  };

  // useEffect(() => {
  //   setGameType("dice");
  //   setAmount(0.05);
  // }, []);

  useEffect(() => {
    setGameType("dice");
    if (switchWalletType === "local") {
      setAmount(10);
    } else {
      setAmount(0.05);
    }
    setMul(2.0); // Initialize mul with a valid number
  }, [switchWalletType]);

  return (
    <div
      className="flex justify-center items-center p-5 md:p-10  flex-col scroll-m-0 overflow-y-scroll h-[100dvh] scroll-smooth relative"
      style={{
        background: `linear-gradient(90deg, rgba(6, 0, 24, 0.80) 7.11%, rgba(0, 0, 0, 0.00) 100%), url(${"/background.svg"}), lightgray -0.002px 6px / 98.451% 141.25% no-repeat`,
      }}
    >
      <div
        className="absolute z-[99999] text-[#fff] left-5 top-7 cursor-pointer bg-[#130D25] p-1 rounded"
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

      <div className="flex flex-col items-center rounded-2xl bg-[#130D25] w-[100%] md:w-[28%] justify-start scroll-m-0 overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] text-white text-opacity-60 p-3">
        <div className="flex flex-col mt-3">
          <h5 className="game-font text-[#FFF] text-2xl md:text-3xl font-extrabold text-center p-3">
            Dice
          </h5>
          <div className="w-100 flex justify-center items-center">
            <svg
              id={`${loaderActive ? "diceroll" : "dicestay"}`}
              xmlns="http://www.w3.org/2000/svg"
              width="90"
              height="90"
              viewBox="0 0 512 512"
            >
              <path
                fill="#888888"
                d="M440.88 129.37L288.16 40.62a64.14 64.14 0 0 0-64.33 0L71.12 129.37a4 4 0 0 0 0 6.9L254 243.85a4 4 0 0 0 4.06 0L440.9 136.27a4 4 0 0 0-.02-6.9M256 152c-13.25 0-24-7.16-24-16s10.75-16 24-16s24 7.16 24 16s-10.75 16-24 16m-18 118.81L54 163.48a4 4 0 0 0-6 3.46v173.92a48 48 0 0 0 23.84 41.39L234 479.48a4 4 0 0 0 6-3.46V274.27a4 4 0 0 0-2-3.46M96 368c-8.84 0-16-10.75-16-24s7.16-24 16-24s16 10.75 16 24s-7.16 24-16 24m96-32c-8.84 0-16-10.75-16-24s7.16-24 16-24s16 10.75 16 24s-7.16 24-16 24m266-172.49L274 271.56a4 4 0 0 0-2 3.45V476a4 4 0 0 0 6 3.46l162.15-97.23A48 48 0 0 0 464 340.86V167a4 4 0 0 0-6-3.49M320 424c-8.84 0-16-10.75-16-24s7.16-24 16-24s16 10.75 16 24s-7.16 24-16 24m0-88c-8.84 0-16-10.75-16-24s7.16-24 16-24s16 10.75 16 24s-7.16 24-16 24m96 32c-8.84 0-16-10.75-16-24s7.16-24 16-24s16 10.75 16 24s-7.16 24-16 24m0-88c-8.84 0-16-10.75-16-24s7.16-24 16-24s16 10.75 16 24s-7.16 24-16 24"
              />
            </svg>
          </div>
        </div>
        <div className="border-b mb-1 w-4/5 border-[#ffffff1d]"></div>

        <h1 className="game-font text-[#FFF] text-lg font-bold leading-[15px] mb-[20px]">
          <div className="text-center text-2xl">{newPosition.toFixed(0)}</div>
          Roll under
        </h1>

        <div className="flex justify-between text-[#fff] font-extrabold text-xs border border-[#2a253a] w-[100%] p-[6px] mb-[10px] rounded">
          <div className="text-center">
            <div className="">{winChance}%</div>
            <div className="">win chance</div>
          </div>

          <div className="text-center">
            <div className="">{mul?.toFixed(2)}x</div>
            <div className="">multiplier</div>
          </div>

          <div className="text-center">
            <div className="">
              {payout}
              {switchWalletType === "local"
                ? "$"
                : !chain && switchWalletType === "live"
                ? "ETH"
                : chain?.chain}
            </div>
            <div className="">Payout</div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 text-sm ">
          <div
            className="w-64 h-4 bg-[#fff] relative rounded-full cursor-pointer bg-gradient-to-l from-red-500 via-yellow-300 to-green-500"
            // onWheel={handleScroll}
          >
            <Draggable
              axis="x"
              bounds={{ left: 3, right: 238 }}
              position={{ x: position, y: 0 }}
              onDrag={handleDrag}
            >
              <div className="w-4 h-4 bg-blue-500 rounded-full absolute top-0 transform -translate-x-1/2 -translate-y-1/2" />
            </Draggable>
          </div>
          <div className="flex justify-between w-[100%] text-xs relative md:left-[7px] xl:left-[2px]">
            <div className="p-1 border border-[#2a253a] rounded">1</div>
            <div className="p-1 border border-[#2a253a] rounded">25</div>
            <div className="p-1 border border-[#2a253a] rounded">50</div>
            <div className="p-1 border border-[#2a253a] rounded">75</div>
            <div className="p-1 border border-[#2a253a] rounded">99</div>
          </div>
        </div>

        <div className="border-b mb-5 w-full my-5 border-[#ffffff1d]"></div>

        <div className="flex justify-center mt-5">
          <div className="px-3 mb-6 md:mb-5 flex flex-col justify-center items-center">
            {/* {switchWalletType === "local" && (
              <small className="text-white">Enter amount in dollars</small>
            )} */}
            <label className="border-2 border-[#090CA9] rounded pl-5 py-5 h-10 flex justify-center items-center">
              <input
                className="w-[100%] bg-transparent outline-none text-[#fff] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                placeholder="Input bet amount"
                defaultValue={payout}
                onChange={(e) => handleInput(e)}
              />
              <div
                onClick={roll}
                className="w-[100px] text-[#fff] border-l-2 border-[#090CA9] font-extrabold p-3 game-font text-sm md:text-sm cursor-pointer text-center hover:bg-[#090CA9] hover:text-[#fff]"
              >
                Roll
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
