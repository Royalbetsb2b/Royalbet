import React, { useContext } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { ShopContext } from "../../utils/contextShop";

export default function Smallpreloader() {
  const { loader } = useContext(ShopContext);

  const colorAdd = "#553CDF";

  return (
    <div
      className="absolute top-0 flex justify-center items-center p-4 w-[100%] h-[100%] opacity-100 z-[9999]"
      style={{ backgroundColor: "rgb(0, 0, 0, 0.7)" }}
    >
      <BeatLoader loading={loader} color={colorAdd} size={25} />
    </div>
  );
}
