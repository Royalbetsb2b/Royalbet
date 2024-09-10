import React, { useEffect, useContext, useState } from "react";
import Card from "../topgamercard/Card";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../utils/contextShop";
import { shortenAddress } from "../../utils/trauncate";
import { useAddress } from "@thirdweb-dev/react";
import { LOCAL_URL } from "../../utils/constants";
import { makeCall } from "../../utils/makeCall";

export default function LeaderBoard() {
  const address = useAddress();
  const { leaderboard, setLeaderBoard, dataLeaders } = useContext(ShopContext);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getLeaderboard = async () => {
    try {
      const endpoint = `${LOCAL_URL}/leader_board`;
      const headers = {
        "Content-Type": "application/json", // You may include this header if required by the API
      };
      const response = await makeCall(endpoint, {}, headers, "get");
      console.log(response, "inside leaderboard");
      if (response.status) {
        // sort the response by max in payout
        const sortedData = response.data.sort((a, b) => b.payout - a.payout);

        setData(sortedData);
        setLoading(false);
      }
    } catch (error) {
      // setNotify(true);
      // setNotifyType("error");
      // setNotifymsg(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading) {
      getLeaderboard();
    }
  }, [data]);

  return (
    <section>
      <h1 className="game-font text-white text-2xl mt-4 font-bold text-center mb-1">
        Leaderboard
      </h1>
      <h3 className="game-font text-gray-400 text-sm font-bold text-center mb-6">
        Our Top Gamers
      </h3>
      {data?.length !== 0 ? (
        <div className="flex justify-center">
          <div className="grid gap-5 scroll-m-0 overflow-y-scroll h-[80vh] pb-16 scroll-smooth px-4">
            {data?.map((data, index) => (
              <Card
                walletId={shortenAddress(String(data.player))}
                totalEth={data.totalAmountPlayed}
                totalWon={data.totalWinnings}
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
