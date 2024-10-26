/** @format */

import { LOCAL_URL, formatDate } from "../../utils/constants.js";
import { useEffect, useState } from "react";

import { makeCall } from "../../utils/makeCall";
import { shortenAddress } from "../../utils/trauncate";

function HistoryTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getTransactions = async () => {
    try {
      const endpoint = `${LOCAL_URL}/recent_plays_win`;
      const headers = { "Content-Type": "application/json" };
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
    if (loading) getTransactions();
  }, [loading]);

  return (
    <div className="relative flex justify-center w-full px-4">
      <div className="m-5 bg-[#130D25] w-full md:w-[83%] lg:w-[70%]">
        {/* Responsive Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full text-sm text-center text-gray-500">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase">
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Game</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Bet</th>
                <th className="px-4 py-3">Payout</th>
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
                    <td className="px-4 py-4 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.type}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{shortenAddress(item.player)}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.amount_played}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.payout}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoryTable;
