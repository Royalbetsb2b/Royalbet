import React, { useState, useEffect } from "react";
import { Crash, Dice, Roulette, Sports } from "./svgs";

export default function Upcoming() {
  const [openMore, setOpenMore] = useState(false);

  const switchMore = () => {
    setOpenMore(!openMore);
  };

  useEffect(() => {}, [openMore]);

  return (
    <div className="flex flex-col flex-wrap justify-center gap-1 md:gap-10 items-center p-[1px] pb-5 scroll-m-0 overflow-y-scroll mt-5 h-[100%] md:h-screen scroll-smooth text-white">
      {/* Top side */}
      <div className="text-center w-100 flex flex-col justify-center items-center gap-[42px] md:gap-5">
        <h1 className="font-bold text-2xl md:text-6xl w-[80%]">
          Launch your own <span className="text-[#1cba6b]">web3 game</span> for
          free
        </h1>
        <div className=" text-xs font-light md:text-xl md:font-semibold w-[80%]">
          DApps using RoyalBets benefit from Royalbets’s liquidity, pricing and
          settlement, while they retain control of the UX/UI. Integrate your own
          frontend app with RoyalBets today and start earning
        </div>
      </div>

      <div className="flex justify-center items-center gap-8">
        <div className="p-2 rounded-3xl text-center bg-[#1cba6b] text-white  flex justify-center items-center gap-2 cursor-pointer">
          <div className="font-semibold">Get started </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path
                d="M295.6 163.7c-5.1 5-5.1 13.3-.1 18.4l60.8 60.9H124.9c-7.1 0-12.9 5.8-12.9 13s5.8 13 12.9 13h231.3l-60.8 60.9c-5 5.1-4.9 13.3.1 18.4 5.1 5 13.2 5 18.3-.1l82.4-83c1.1-1.2 2-2.5 2.7-4.1.7-1.6 1-3.3 1-5 0-3.4-1.3-6.6-3.7-9.1l-82.4-83c-4.9-5.2-13.1-5.3-18.2-.3z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
        <span className="flex justify-center items-center gap-2 cursor-pointer">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M18 18.115q.625 0 1.063-.437t.437-1.063q0-.625-.437-1.062T18 15.115q-.625 0-1.062.438t-.438 1.062q0 .625.438 1.063t1.062.437m0 3q.75 0 1.4-.35t1.075-.975q-.575-.35-1.2-.512T18 19.115q-.65 0-1.275.163t-1.2.512q.425.625 1.075.975t1.4.35M5.615 20q-.67 0-1.143-.472Q4 19.056 4 18.385V5.615q0-.67.472-1.143Q4.944 4 5.615 4h12.77q.67 0 1.143.472q.472.472.472 1.143v5.95q-.263-.09-.504-.147q-.24-.056-.496-.112v-5.69q0-.231-.192-.424Q18.615 5 18.385 5H5.615q-.23 0-.423.192Q5 5.385 5 5.615v12.77q0 .23.192.423q.193.192.423.192h5.666q.036.28.093.521q.057.24.147.479zM5 18v1V5v6.306v-.075zm2.5-1.73h3.96q.055-.257.15-.497l.2-.504H7.5zm0-3.77h6.58q.493-.346.97-.587q.479-.24 1.027-.376V11.5H7.5zm0-3.77h9v-1h-9zM18 22.116q-1.671 0-2.836-1.164T14 18.115q0-1.67 1.164-2.835T18 14.115q1.671 0 2.836 1.165T22 18.115q0 1.672-1.164 2.836Q19.67 22.115 18 22.115"
              />
            </svg>
          </div>
          <div className=""> Live Demo</div>
        </span>
      </div>

      <div className="flex flex-col justify-center items-center w-[100%]">
        <h3 className="font-bold mb-4">Built on Royal</h3>
        {/* Sponsors */}
        {/* <div className="flex justify-around w-[100%] md:w-[70%] gap-4">
          {Array(6)
            .fill(0)
            .map((data, idx) => (
              <div
                className="flex flex-wrap justify-center items-center text-center h-[50px] w-[100%] rounded-[100%] p-10"
                key={idx}
                style={{
                  borderRadius: "8px",
                  background: `linear-gradient(180deg, rgba(19, 13, 37, 0.00) 0%, rgba(19, 13, 37, 0.80) 46.95%, #130D25 100%), url("./footer-logo.png"), lightgray 50% / cover no-repeat`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                Fill here
              </div>
            ))}
        </div> */}
      </div>
    </div>
  );
}
