import React from "react";

export default function Gamebox({
  gameName,
  gameInfo,
  winRate,
  status,
  svg,
  keymap,
  setSelectedGame,
}) {
  return (
    <div
      className="flex flex-col justify-center items-start gap-9 flex-[1_0_0] pt-[8rem] md:pt-52 pb-6 px-2 md:px-6 cursor-pointer text-[#fff] font-semibold h-[240px] sm:h-[300px] md:h-[458px] "
      key={keymap}
      onClick={() => status === "active" && setSelectedGame(gameName)}
      style={{
        borderRadius: "8px",
        background: `url(${svg}), lightgray 50% / cover no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="content w-[100%]">
        {status === "active" ? (
          <>
            {/* <div className="product-name">{gameInfo}</div> */}
            {/* <div className="rating">Win rate ({winRate})</div> */}

            {/* <div className="flex justify-center items-center w-[100%] p-1">
              <button className="px-5 md:px-15 xl:px-28 py-2 bg-[#1BB96B] outline-none w-[100%] rounded text-center">
                Play
              </button>
            </div> */}
          </>
        ) : (
          <>
            {/* <div className="brand">{gameName}</div> */}
            <div className="brand">Coming Soon</div>
          </>
        )}
      </div>
    </div>
  );
}
