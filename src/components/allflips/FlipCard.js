import React, { useState, useEffect } from "react";
import { shortenAddress } from "../../utils/trauncate";

function FlipCard({ data, address }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }, [isCopied]);

  return (
    <div className="border-2 border-[#FDE047]  to-[#0F0F0F] from-[#000] bg-gradient-to-br  px-5 mb-2 flex items-center relative justify-between rounded-md w-full text-white h-16">
      <div className="flex items-center md:gap-8">
        <button
          onClick={() => handleCopyClick(`${data.id}`)}
          className="cursor-pointer"
          title="copy"
        >
          {isCopied ? (
            "Copied!"
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              title="copy"
              width="24"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
              />
            </svg>
          )}
        </button>
        <h1 className="text-white game-font text-[5px]  md:text-xs">
          {shortenAddress(
            String((Math.round(Number(data?.id) / 10) * 10) / 10 ** 18)
          )}
        </h1>
      </div>
      <div className="flex justify-between w-2/4">
        <div className="flex flex-col text-[9px] md:text-lg items-center w-1/5">
          <b>
            {data.isWin
              ? String(
                  ((Math.round(Number(data.amount) / 10) * 10) / 10 ** 18) * 2
                )
              : String((Math.round(Number(data.amount) / 10) * 10) / 10 ** 18)}
          </b>
        </div>
        {String(data.player) !== String(address) && (
          <div className="flex flex-col text-[9px] md:text-lg items-center w-1/5">
            <b>Ref</b>
          </div>
        )}
        <div className="flex flex-col text-[9px] md:text-lg items-center w-1/5">
          <b>{parseInt(data.input) == 1 ? "Heads" : "Tails"}</b>
        </div>
        <div className="flex flex-col text-[9px] md:text-lg  items-center w-1/5">
          <b>{data.isWin ? "won" : "loss"}</b>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
