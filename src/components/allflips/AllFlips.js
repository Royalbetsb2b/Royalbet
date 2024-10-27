import React, { useEffect, useState, useContext } from "react";
import FlipCard from "./FlipCard";
import ShowRecent from "./ShowRecent";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../utils/contextShop";
import { useAddress } from "@thirdweb-dev/react";
import { formatDate, LOCAL_URL } from "../../utils/constants";
import { makeCall } from "../../utils/makeCall";
import { shortenAddress } from "../../utils/trauncate";

function AllFlips() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getRecents = async () => {
    try {
      const endpoint = `${LOCAL_URL}/info/recent_plays`;
      const headers = {
        "Content-Type": "application/json", // You may include this header if required by the API
      };
      const response = await makeCall(endpoint, {}, headers, "get");
      // console.log(response, "inside transaction");
      if (response.status) {
        // Process the response data as needed
        setData(response.data);
        setLoading(false);
        // setPagination(response.pagination);
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
      getRecents();
    }
  }, [data]);

  return (
    <div className="w-100 h-[100dvh] flex justify-center items-start">
      <div className="relative w-full flex justify-center mt-12">
        <div className="m-5 border rounded-2xl overflow-y-auto bg-[#130D25] w-[83%] h-96">
          {data?.length !== 0 ? (
            <div className="sm:rounded-lg h-auto">
              <table className="w-full text-sm text-gray-500 table-auto">
                <thead>
                  <tr className="text-xs uppercase bg-gray-50">
                    <th className="py-3 px-6 w-1/6">Time</th>
                    <th className="py-3 px-6 w-1/6">Game</th>
                    <th className="py-3 px-6 w-1/6">User</th>
                    <th className="py-3 px-6 w-1/6">Bet</th>
                    <th className="py-3 px-6 w-1/6">Status</th>
                    <th className="py-3 px-6 w-1/6">Payout</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((item) => (
                    <tr key={item.id} className="bg-[#2A253A] hover:bg-[#333]">
                      <td className="py-4 px-6 w-1/6 text-center whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="py-4 px-6 w-1/6 text-center">
                        {item.type}
                      </td>
                      <td className="py-4 px-6 w-1/6 text-center">
                        {shortenAddress(item.player)}
                      </td>
                      <td className="py-4 px-6 w-1/6 text-center">
                        {item.amount_played}
                      </td>
                      <td className="py-4 px-6 w-1/6 text-center">
                        {item.is_Win ? "Won" : "Loss"}
                      </td>
                      <td className="py-4 px-6 w-1/6 text-center">
                        {item.payout}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : data.length === 0 && loading ? (
            <div className="font-bold text-2xl text-center px-10 py-10 text-white">
              Loading....
            </div>
          ) : (
            <div className="flex justify-center flex-col mt-20 items-center ">
              <img src="./no-transaction.png" className="w-28 h-28" alt="" />
              <p className="font-semibold text-xs text-black">
                You have no transactions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllFlips;
