import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Svgloader from "../preloader/Svgloader";
import { ShopContext } from "../../utils/contextShop";

export default function Sloth({ setSelectedGame }) {
  const {
    play,
    confettiWin,
    gameResult,
    setGameResult,
    loaderActive,
    setloaderActive,
    setConfettiWin,
    switchWalletType,
  } = useContext(ShopContext);

  const [searchParams] = useSearchParams();

  const emojiPool = [
    "🍒",
    "🍋",
    "🍊",
    "🍓",
    "🍇",
    "🍍",
    "🧛‍♀️",
    "🦇",
    "🕷️",
    "🎃",
    "👻",
  ];
  const [reel1, setReel1] = useState(
    emojiPool[Math.floor(Math.random() * emojiPool.length)]
  );
  const [reel2, setReel2] = useState(
    emojiPool[Math.floor(Math.random() * emojiPool.length)]
  );
  const [reel3, setReel3] = useState(
    emojiPool[Math.floor(Math.random() * emojiPool.length)]
  );
  const [win, setWin] = useState(false);
  const [loading, setLoading] = useState(false);
  const winCondition = false;
  //animation
  const [indices, setIndices] = useState([0, 0, 0]);

  //game params states
  const [selectedChoice, setSelectedChoice] = useState(0);
  const [amount, setAmount] = useState();
  const [gametype, setGameType] = useState("slot");
  const [range, setRange] = useState(3);
  const [payout, setPayout] = useState(2);
  // Update the reels with a delay and animation effect
  let newReel1, newReel2, newReel3;
  const intervalIds = [];

  const spin = () => {
    try {
      setLoading(true);
      const randomNumber = Math.floor(Math.random() * 3);
      console.log(randomNumber, "random checking");
      // setSelectedChoice(randomNumber);
      // setRange(emojiPool.length);
      // setPayout(amount * 2);
      const calcAmount = amount * 2;

      newReel1 = emojiPool[Math.floor(Math.random() * emojiPool.length)];
      // let newReel2, newReel3;
      // play(gametype, 0, 0.02, 100, 0.00, searchParams);
      setTimeout(() => {
        play(
          gametype,
          randomNumber,
          amount,
          emojiPool.length,
          calcAmount,
          searchParams
        );
      }, 700); // Delay of 500 milliseconds
      // play(gametype, selectedChoice, amount, range, payout, searchParams);

      intervalIds.push(
        setInterval(() => {
          setIndices((prevIndices) =>
            prevIndices.map((index, i) => (index + 1) % emojiPool.length)
          );
        }, 100)
      );

      // setTimeout(() => {
      //   console.log("testing code called");
      //   setGameResult(true);
      //   setloaderActive(true);
      //   setConfettiWin(true);
      // }, 5000);
    } catch (error) {
      setLoading(false);
      console.log(error, "something went wrong");
    }
  };

  const checkWin = () => {
    console.log("We are checking you out sire");
    //use this -- confettiWin
    // console.log(confettiWin, "initialize win");
    if (confettiWin && reel1 === reel2 && reel2 === reel3) {
      setWin(true);
    } else {
      setWin(false);
    }
  };

  useEffect(() => {
    setGameType("slot");
    if (switchWalletType === "local") {
      setAmount(10);
    } else {
      setAmount(0.03);
    }
  }, [switchWalletType]); // Empty dependency array to run only once

  useEffect(() => {
    if (gameResult) {
      console.log("Results gotten in here");
      if (confettiWin) {
        console.log("inside confetti");
        newReel1 = emojiPool[Math.floor(Math.random() * emojiPool.length)];
        newReel2 = newReel1;
        newReel3 = newReel1;
      } else {
        console.log("else of confetti");
        newReel1 = emojiPool[Math.floor(Math.random() * emojiPool.length)];
        newReel2 = emojiPool[Math.floor(Math.random() * emojiPool.length)];
        newReel3 = emojiPool[Math.floor(Math.random() * emojiPool.length)];
      }

      // Delay of 500 milliseconds for reel 1
      // Delay of 500 milliseconds for reel 1
      setTimeout(() => {
        clearInterval(intervalIds[0]);
        setReel1(newReel1);
        intervalIds.push(
          setInterval(() => {
            setIndices((prevIndices) =>
              prevIndices.map((index, i) => (index + 1) % emojiPool.length)
            );
          }, 100)
        );
      }, 500);

      // Delay of 1000 milliseconds (1 second) for reel 2
      setTimeout(() => {
        clearInterval(intervalIds[1]);
        setReel2(newReel2);
        intervalIds.push(
          setInterval(() => {
            setIndices((prevIndices) =>
              prevIndices.map((index, i) => (index + 1) % emojiPool.length)
            );
          }, 100)
        );
      }, 1000);

      // Delay of 1500 milliseconds (1.5 seconds) for reel 3
      setTimeout(() => {
        clearInterval(intervalIds[2]);
        setReel3(newReel3);
        checkWin();
        setLoading(false);
      }, 1500);
    }
  }, [gameResult]);

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

      <div className="flex flex-col items-center rounded-2xl bg-[#130D25] w-[90%] md:w-[28%] justify-start scroll-m-0 overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] text-white text-opacity-60 p-2">
        <div className="flex flex-col mt-3">
          <h5 className="game-font text-[#FFF] text-2xl md:text-3xl pb-5 font-extrabold text-center p-3">
            Slot
          </h5>
          {/* <div className="w-100 flex justify-center items-center">
            {winner === null
              ? "Waiting…"
              : winner
              ? "🤑 Pure skill! 🤑"
              : loserMessages[Math.floor(Math.random() * loserMessages.length)]}
            Hi messages
          </div> */}
        </div>
        <div className="border-b mb-5 w-4/5 border-[#ffffff1d]"></div>

        <div className="flex justify-center items-center h-24 overflow-hidden">
          <span className="text-6xl">
            {loading ? emojiPool[indices[0]] : reel1}
          </span>
          <span className="text-6xl">
            {loading ? emojiPool[indices[1]] : reel2}
          </span>
          <span className="text-6xl">
            {loading ? emojiPool[indices[2]] : reel3}
          </span>
        </div>

        <div className="border-b mb-5 w-full my-5 border-[#ffffff1d]"></div>

        <div className="flex justify-center mt-5">
          <div className="px-3 mb-6 md:mb-5 flex flex-col justify-center items-center">
            {switchWalletType === "local" && (
              <small className="text-white">Enter amount in dollars</small>
            )}
            <label className="border-2 border-[#090CA9] rounded pl-5 py-5 h-10 flex justify-center items-center">
              <input
                className="w-[100%] bg-transparent outline-none text-[#fff] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                placeholder="Input bet amount"
                defaultValue={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                onClick={() => spin()}
                className="w-[100px] text-[#fff] border-l-2 border-[#090CA9] font-extrabold p-3 game-font text-sm md:text-sm cursor-pointer text-center hover:bg-[#090CA9] hover:text-[#fff]"
              >
                Spin
              </button>
            </label>

            {/* <Switch playingas={playingas} SetPlayingas={SetPlayingas} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
