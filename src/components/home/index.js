import React, { useEffect, useState } from "react";
import Gamebox from "./Gamebox";
import Flip from "../games/Flip";
import Dice from "../games/Dice";
import Sloth from "../games/Sloth";
import HistoryTable from "./HistoryTable";
export default function Home() {
  //gameName, gameInfo, winRate
  const [selectedGame, setSelectedGame] = useState("");
  const gamesAvailable = [
    {
      gameName: "Flip",
      gameInfo: "Classic Flip Game",
      winRate: "29,062",
      svg: "./flip.svg",
      status: "active",
    },
    {
      gameName: "Dice",
      gameInfo: "Classic Dice Game",
      winRate: "29,062",
      svg: "./dice.svg",
      status: "active",
    },
    {
      gameName: "Slot",
      gameInfo: "Classic Sloth Game",
      winRate: "29,062",
      svg: "./slot.svg",
      status: "active",
    },
    {
      gameName: "Roulette",
      gameInfo: "Classic Sloth Game",
      winRate: "29,062",
      svg: "./roulette.svg",
      status: "coming soon",
    },
    {
      gameName: "Mines",
      gameInfo: "Classic Mine Game",
      winRate: "29,062",
      svg: "./mine.svg",
      status: "coming soon",
    },
    {
      gameName: "Hilo",
      gameInfo: "Classic Sloth Game",
      winRate: "29,062",
      svg: "./card.svg",
      status: "coming soon",
    },
    // {
    //   gameName: "Plinko",
    //   gameInfo: "Classic Sloth Game",
    //   winRate: "29,062",
    //   svg: "./plinko.svg",
    //   status: "coming soon",
    // },
    // {
    //   gameName: "Card",
    //   gameInfo: "Classic Sloth Game",
    //   winRate: "29,062",
    //   svg: "./roulette.svg",
    //   status: "coming soon",
    // },
  ];

  useEffect(() => {}, [selectedGame]);

  const showGame = () => {
    switch (selectedGame) {
      case "Flip":
        return <Flip setSelectedGame={setSelectedGame} />;

      case "Dice":
        return <Dice setSelectedGame={setSelectedGame} />;

      case "Slot":
        return <Sloth setSelectedGame={setSelectedGame} />;

      default:
        break;
    }
  };
  // <div className="flex justify-start pl-[22px] md:pl-0  items-center  gap-5 md:gap-10 mt-10 md:w-[70%] overflow-y-hidden overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] w-[100%] md:ml-0">

  return (
    <>
      {selectedGame === "" ? (
        <div className=" scroll-smooth pb-10 md:pb-0 flex flex-col items-center justify-center">
          <h5 className="game-font text-[#FFF] text-2xl md:text-3xl pb-5 font-extrabold text-center p-3 mt-10">
            #1 MOST TRUSTED PLACE TO PLAY CHAIN GAMES
          </h5>
          <div className="text-white font-bold text-center">
            An open source, decentralized casino. Copy this platform with your
            own branding and start earning fees on every bet.
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10 lg:w-[70%] lg:p-[5px] p-[20px] w-[100%] md:ml-0">
            {gamesAvailable.map((data, index) => (
              <Gamebox
                gameName={data.gameName}
                gameInfo={data.gameInfo}
                status={data.status}
                winRate={data.winRate}
                svg={data.svg}
                key={index}
                setSelectedGame={setSelectedGame}
              />
            ))}
          </div>

          <div className="font-bold text-white mt-8">Live Bets</div>
          <HistoryTable />
        </div>
      ) : (
        showGame()
      )}
    </>
  );
}
