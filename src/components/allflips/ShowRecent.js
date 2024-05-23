import React, { useState, useEffect } from "react";
import { shortenAddress } from "../../utils/trauncate";
import { convertTime } from "../../utils/constants";

function ShowRecent({ data, address }) {
  useEffect(() => {}, []);

  return (
    <div className="px-5 mb-2 flex items-center relative justify-between rounded-md w-full text-white h-16">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="#888888"
            d="M5.85 17.1q1.275-.975 2.85-1.538T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.337T4 12q0 1.475.488 2.775T5.85 17.1ZM12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.012-2.488T12 6q1.475 0 2.488 1.012T15.5 9.5q0 1.475-1.012 2.488T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q1.325 0 2.5-.388t2.15-1.112q-.975-.725-2.15-1.113T12 17q-1.325 0-2.5.388T7.35 18.5q.975.725 2.15 1.113T12 20Zm0-9q.65 0 1.075-.425T13.5 9.5q0-.65-.425-1.075T12 8q-.65 0-1.075.425T10.5 9.5q0 .65.425 1.075T12 11Zm0-1.5Zm0 9Z"
          />
        </svg>
      </div>
      <div className="w-100">
        {`${shortenAddress(data.player)} flipped ${String(
          (Math.round(Number(data.amount) / 10) * 10) / 10 ** 18
        )} and ${data.isWin ? "doubled" : "lost"}`}
      </div>
      <div>{convertTime(data.time)}</div>
    </div>
  );
}

export default ShowRecent;
