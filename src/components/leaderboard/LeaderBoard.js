import React, { useEffect, useContext } from "react";
import Card from "../topgamercard/Card";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../utils/contextShop";
import { shortenAddress } from "../../utils/trauncate";
import { useAddress } from "@thirdweb-dev/react";

export default function LeaderBoard() {
  const address = useAddress();
  const { leaderboard, setLeaderBoard, dataLeaders } = useContext(ShopContext);
  const sorted = (val) => {
    let miniSort = Array.from(val).sort(function (a, b) {
      console.log(parseInt(a.amount, 10));
      return parseInt(a.amount, 10) - parseInt(b.amount, 10);
    });

    setLeaderBoard(miniSort);
  };

  useEffect(() => {
    console.log(dataLeaders, "checking leaders log");
    if (dataLeaders) {
      sorted(dataLeaders);
    }
  }, [address]);

  return (
    <section>
      <h1 className="game-font text-white text-2xl mt-4 font-bold text-center mb-1">
        Leaderboard
      </h1>
      <h3 className="game-font text-gray-400 text-sm font-bold text-center mb-6">
        Our Top Gamers
      </h3>
      {leaderboard?.length !== 0 ? (
        <div className="flex justify-center">
          <div className="grid gap-5 scroll-m-0 overflow-y-scroll h-[80vh] pb-16 scroll-smooth px-4">
            {leaderboard?.map((data, index) => (
              <Card
                walletId={shortenAddress(String(data.player))}
                totalEth={
                  ((Math.round(Number(data.amount) / 10) * 10) / 10 ** 18) * 2
                }
                chosenText={parseInt(data.input) == 1 ? "Heads" : "Tails"}
                positionNumber={index + 1}
                positionAph="st"
              />
            ))}
          </div>
        </div>
      ) : (
        <h3 className="font-bold text-center text-white mt-6 md:mt-10">
          Empty
        </h3>
      )}
    </section>
  );
}
