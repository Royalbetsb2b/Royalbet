/** @format */

import { useContext, useState, useEffect } from "react";
// import { ShopContext } from "../../utils/contextShop";
import { formatDate, LOCAL_URL } from "../../utils/constants.js";
import { makeCall } from "../../utils/makeCall";
import { shortenAddress } from "../../utils/trauncate";

function HistoryTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([
    // {
    //   date: "2023-12-15T21:50:46.753+00:00",
    //   game: "flip",
    //   user: "0x223546",
    //   betA: 0.0053,
    //   multiplier: 0.2201,
    //   payout: 0.0005,
    // },
    // {
    //   date: "2023-12-15T21:50:46.753+00:00",
    //   game: "flip",
    //   user: "0x223546",
    //   betA: 0.0053,
    //   multiplier: 0.2201,
    //   payout: 0.0005,
    // },
  ]);

  const getTransactions = async () => {
    try {
      const endpoint = `${LOCAL_URL}/recent_plays_win`;
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
      getTransactions();
    }
  }, [data]);

  return (
    <div className="relative w-full flex justify-center">
      <div className="m-5 border rounded-2xl overflow-hidden bg-[#130D25] w-[83%] md:w-[62%] lg:w-[55%]">
        {data?.length !== 0 ? (
          <div className="overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-gray-500 hidden md:block">
              <thead>
                <tr className="text-xs uppercase bg-gray-50">
                  <th className="py-3 px-6 w-1/6">Time</th>
                  <th className="py-3 px-6 w-1/6">Game</th>
                  <th className="py-3 px-6 w-1/6">User</th>
                  <th className="py-3 px-6 w-1/6">Bet</th>
                  {/* <th className="py-3 px-6 w-1/6">Won</th> */}
                  <th className="py-3 px-6 w-1/6">Payout</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((item) => (
                  <tr key={item.id} className="bg-[#2A253A] hover:bg-[#333]">
                    <td className="py-4 px-6 w-1/6 text-center whitespace-nowrap">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="py-4 px-6 w-1/6 text-center">{item.type}</td>
                    <td className="py-4 px-6 w-1/6 text-center">
                      {shortenAddress(item.player)}
                    </td>
                    <td className="py-4 px-6 w-1/6 text-center">
                      {item.amount_played}
                    </td>
                    {/* <td className="py-4 px-6 w-1/6 text-center">
                      samp
                    </td> */}
                    <td className="py-4 px-6 w-1/6 text-center">
                      {item.payout}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* mobile view table */}
            <div className="block md:hidden">
              <div className="flex w-[100%] justify-between px-5 pt-3 text-[#fff] font-semibold border-b border-[#fff]">
                <div className="">User/date</div>
                <div className="">Game/Payout</div>
              </div>
              {data?.map((item, idx) => (
                <div
                  className="justify-between  items-center w-full py-3  flex border-b border-[#fff]"
                  key={idx}
                >
                  <div className="flex justify-between items-center w-[100%] px-5">
                    <div className="flex flex-col text-[#fff]">
                      <div className="p-2">{shortenAddress(item.player)}</div>
                      <div className="font-meduim  ml-2 text-xs ">
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
              ))}
            </div>
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
  );
}

export default HistoryTable;
