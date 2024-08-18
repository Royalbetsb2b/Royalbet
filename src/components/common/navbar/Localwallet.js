import React, { useContext, useEffect } from "react";
import { ShopContext } from "../../../utils/contextShop";

export default function Localwallet() {
  const { depositModal, setDepositModal, userProfile } =
    useContext(ShopContext);

  useEffect(() => {}, [userProfile]);

  return (
    <div
      className="relative p-[1px] rounded-lg bg-gradient-to-r from-[#090CA9] to-[#BE36EB] hover:bg-[#BE36EB] cursor-pointer"
      onClick={() => setDepositModal(!depositModal)}
    >
      <div className="bg-[#130D25] rounded-lg px-3 py-2 flex">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23px"
            height="23x1px"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#BE36EB"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M16.154 7.154c-.949-.949-2.619-1.608-4.154-1.65m-4.154 10.65c.893 1.19 2.552 1.868 4.154 1.926m0-12.576c-1.826-.049-3.461.778-3.461 3.034c0 4.154 7.615 2.077 7.615 6.231c0 2.37-2.027 3.387-4.154 3.31m0-12.575V3m0 15.08V21"
            ></path>
          </svg>
          <span className="font-semibold text-white">
            {userProfile?.balance}
          </span>
        </div>
        <div className="font-light pl-2 text-white text-[11px] cursor-pointer ">
          {userProfile?.username}
        </div>
      </div>
    </div>
  );
}
