import React, { useEffect, useState } from "react";

export default function Switch({ playingas, SetPlayingas }) {
  const [isChecked, setIsChecked] = useState(playingas === "whales");
  const changePlayAs = (type) => {
    SetPlayingas(type);
    setIsChecked(type === "whales");
  };

  useEffect(() => {}, [playingas]);

  return (
    <div className="w-full flex justify-center items-center mt-4 gap-5">
      <div className="cursor-pointer" onClick={() => changePlayAs("regular")}>
        <div
          className={`text-white text-xs font-bold ${
            playingas === "regular" && "text-[#fdc300]"
          }`}
        >
          Normal
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
          viewBox="0 0 24 24"
        >
          <path
            fill={playingas === "regular" ? "#fdc300" : "#888888"}
            d="M9.775 12q-.9 0-1.5-.675T7.8 9.75l.325-2.45q.2-1.425 1.3-2.363T12 4q1.475 0 2.575.938t1.3 2.362l.325 2.45q.125.9-.475 1.575t-1.5.675h-4.45Zm0-2h4.45L13.9 7.6q-.1-.7-.637-1.15T12 6q-.725 0-1.263.45T10.1 7.6L9.775 10ZM6 20q-.825 0-1.413-.588T4 18v-.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.588 1.413T18 20H6Zm0-2h12v-.8q0-.275-.138-.5t-.362-.35q-1.35-.675-2.725-1.012T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8Zm6 0Zm0-8Z"
          />
        </svg>
      </div>

      <label className="switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => changePlayAs(isChecked ? "regular" : "whales")}
        />
        <span
          className={playingas === "regular" ? "slider" : "slider active"}
        />
      </label>
      <div className="cursor-pointer" onClick={() => changePlayAs("whales")}>
        <div
          className={`text-white text-xs font-bold ${
            playingas === "whales" && "text-[#fdc300]"
          }`}
        >
          Whale
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
          viewBox="0 0 48 48"
        >
          <g fill="none">
            <path
              stroke={playingas === "whales" ? "#fdc300" : "#888888"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="M16.07 13c-9.817.35-11.394 8.006-10.956 11.791c-1.753 3.145-1.218 3.93.096 5.24c6.574 6.115 18.843 5.678 24.54 3.495c5.96-2.446 8.999-7.051 9.29-9.526c5.26-3.494 5.366-9.399 4.636-11c-.78 1.31-3.029 2.272-4.635 3c-1.753.35-4.275-.962-5.005-2.127c-.502 2.627 0 4.627 1.314 5.678c2.288 1.747 1.125 3.512.687 3.949c-1.896 1.89-5.506.99-7.26-1.766C24.053 14.31 18.99 13 16.07 13Z"
            />
            <path
              stroke={playingas === "whales" ? "#fdc300" : "#888888"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="M5 28c2.833.532 8.4 1.554 12-1"
            />
            <circle cx={12} cy={20} r={2} fill="#888888" />
          </g>
        </svg>
      </div>
    </div>
  );
}
