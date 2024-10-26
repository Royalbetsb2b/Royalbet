/** @format */

import { useContext, useState, useEffect } from "react";
import { formatDate, LOCAL_URL } from "../../utils/constants.js";
import { makeCall } from "../../utils/makeCall";
import { shortenAddress } from "../../utils/trauncate";

function HistoryTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getTransactions = async () => {
    try {
      const endpoint = `${LOCAL_URL}/recent_plays_win`;
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await makeCall(endpoint, {}, headers, "get");
      if (response.status) {
        setData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading) {
      getTransactions();
    }
  }, [loading]);

  return (
    <div className="relative flex justify-center w-full">
      <div className="m-5 bg-[#130D25] w-full md:w-[83%] lg:w-[70%]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase">
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Game</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Bet</th>
                <th className="px-4 py-3 text-left">Payout</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center">
                    You have no transactions
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="bg-[#2A253A] hover:bg-[#333]">
                    <td className="px-4 py-4 text-center whitespace-nowrap">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-4 py-4 text-center">{item.type}</td>
                    <td className="px-4 py-4 text-center">
                      {shortenAddress(item.player)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {item.amount_played}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {item.payout}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Mobile view table */}
          <div className="block md:hidden">
            <div className="flex w-full justify-between px-5 pt-3 text-[#fff] font-semibold border-b border-[#fff]">
              <div>User/date</div>
              <div>Game/Payout</div>
            </div>
            {loading ? (
              <div className="flex items-center justify-center w-full py-3">
                <p className="text-white">Loading...</p>
              </div>
            ) : data.length === 0 ? (
              <div className="flex items-center justify-center w-full py-3">
                <p className="text-white">You have no transactions</p>
              </div>
            ) : (
              data.map((item, idx) => (
                <div className="flex items-center justify-between w-full py-3" key={idx}>
                  <div className="flex items-center justify-between w-full px-5">
                    <div className="flex flex-col text-[#fff]">
                      <div className="p-2">{shortenAddress(item.player)}</div>
                      <div className="ml-2 text-xs font-medium ">
                        {formatDate(item.createdAt)}
                      </div>
                    </div>
                    <div className="text-[#fff] ">
                      <div className="font-semibold text-xs ml-2 text-[#fff]">
                        {item.type}
                      </div>
                      <div className="text-[#fff] text-xs ml-2 font-bold">
                        {item.payout}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryTable;
