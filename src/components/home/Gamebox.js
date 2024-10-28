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
      className="relative flex flex-col justify-end items-start gap-4 p-4 rounded-lg cursor-pointer text-white font-semibold transition-transform transform hover:scale-105 overflow-hidden h-[35vh] md:h-[65vh]"
      key={keymap}
      onClick={() => status === "active" && setSelectedGame(gameName)}
    >
      {/* Image element */}
      <img
        src={svg}
        alt={`${gameName} image`}
        className="absolute inset-0 object-fill w-full h-full"
      />

      {/* Gradient overlay for better text readability */}
      {/* <div className="bg-gradient-to-t from-black/60 to-transparent absolute inset-0 rounded-lg"></div> */}

      {/* Text content */}
      <div className="relative z-10">
        {status !== "active" && (
          <p className="text-sm opacity-70">Coming Soon</p>
        )}
      </div>
    </div>
  );
}
