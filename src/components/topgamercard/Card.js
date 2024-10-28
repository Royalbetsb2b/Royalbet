import React from "react";

function Card({ walletId, totalEth, totalWon, positionNumber, positionAph }) {
  return (
    <div className="border-2 border-[#090ca9] to-[#0F0F0F] from-[#130D25] bg-gradient-to-r  p-5 flex items-center relative justify-between rounded-md  md:w-full text-white h-28">
      <div className="absolute -bottom-2 bg-[#2469b7] game-font border px-3 -right-2 py-1">
        {positionNumber}
        <sup>{positionAph}</sup>{" "}
      </div>
      <div className="flex flex-col items-center">
        {/* <img src="/ethlogo.png" className="rounded-full h-10" alt="jknfdkj" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
        >
          <path
            fill="#888888"
            d="M9.775 12q-.9 0-1.5-.675T7.8 9.75l.325-2.45q.2-1.425 1.3-2.363T12 4t2.575.938t1.3 2.362l.325 2.45q.125.9-.475 1.575t-1.5.675zM4 18v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18"
          ></path>
        </svg>
        <h1 className="text-white game-font text-[12px] mt-1">{walletId}</h1>
      </div>
      <div className="flex">
        <div className="flex flex-col md:w-44 w-24 items-center">
          <h2 className="game-font text-[8px]">Amount Played</h2>
          <b>
            {"$"}{" "}
            {Number(totalEth).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </b>
        </div>
        <div className="flex flex-col md:w-44 w-24 items-center">
          <h2 className="game-font text-[8px]">Price</h2>
          <b>
            {"$"}{" "}
            {Number(totalWon).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </b>
        </div>
      </div>
    </div>
  );
}

export default Card;
