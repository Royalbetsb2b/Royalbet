import React, { useEffect, useState, useContext } from "react";
import FlipCard from "./FlipCard";
import ShowRecent from "./ShowRecent";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../utils/contextShop";
import { useAddress } from "@thirdweb-dev/react";

function AllFlips() {
  const address = useAddress();
  const [userData, setUserdata] = useState();

  const { dataUsers, notify, dataHistory } =
    useContext(ShopContext);

  useEffect(() => {
    console.log(dataHistory, "checking from all flips component");
    if (dataHistory) {
      setUserdata(Array.from(dataHistory).reverse());
    }
  }, [address, dataHistory, notify]);

  return (
    <div className="w-100 h-[100dvh] flex justify-center items-center">
      {dataHistory?.length !== 0 && address ? (
        <div className="flex justify-center items-center flex-col mt-9 px-4 md:px-16">
          <div className=" p-5 flex items-center  justify-center rounded-md w-full text-white h-28">
            <h1 className="text-[#fff] game-font text-[25px] font-bold text-center ">
              Recent Flips
            </h1>
          </div>
          <div className="h-[50dvh] w-[100%] md:w-[70%] bg-[#130D25] border-2 border-[#FFF] rounded mb-10">
            {dataHistory?.map((data) => (
              <ShowRecent data={data} address={address} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-[#FFF] text-center font-bold rounded-lg w-[300px] h-[374px] bg-[#130D25] flex flex-col justify-center items-center">
          <svg
            width="82"
            height="90"
            viewBox="0 0 82 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M29.119 60.3069C29.04 60.8599 29 61.4249 29 61.9999C29 68.6269 34.373 73.9999 41 73.9999C47.627 73.9999 53 68.6269 53 61.9999C53 61.4249 52.96 60.8599 52.881 60.3069H82V86.9999C82 88.6569 80.657 89.9999 79 89.9999H3C1.3431 89.9999 0 88.6569 0 86.9999V60.3069H29.119Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M54 60C54 67.18 48.18 73 41 73C33.82 73 28 67.18 28 60C28 59.767 28.006 59.536 28.018 59.307H0L9.5604 31.0389C9.9726 29.8202 11.1159 29 12.4023 29H69.598C70.884 29 72.027 29.8202 72.44 31.0389L82 59.307H53.982C53.994 59.536 54 59.767 54 60Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M52.098 60.955C52.098 66.502 47.129 72 41 72C34.871 72 29.902 66.502 29.902 60.955C29.902 60.775 29.908 59.596 29.918 59.419H9L17.161 39.5755C17.513 38.6338 18.489 38 19.587 38H62.413C63.511 38 64.487 38.6338 64.839 39.5755L73 59.419H52.082C52.092 59.596 52.098 60.775 52.098 60.955Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.25 59.512V86C1.25 86.966 2.0335 87.75 3 87.75H79C79.966 87.75 80.75 86.966 80.75 86V59.512L71.255 31.4393C71.015 30.7285 70.348 30.25 69.598 30.25H12.4023C11.6519 30.25 10.985 30.7285 10.7446 31.4393L1.25 59.512Z"
              fill="black"
              stroke="#1cba6b"
              stroke-width="2.5"
            />
            <path
              d="M14 59C17.937 59 22.185 59 26.745 59C28.621 59 28.621 60.319 28.621 61C28.621 67.627 34.117 73 40.897 73C47.677 73 53.173 67.627 53.173 61C53.173 60.319 53.173 59 55.05 59H80"
              fill="black"
            />
            <path
              d="M14 59C17.937 59 22.185 59 26.745 59C28.621 59 28.621 60.319 28.621 61C28.621 67.627 34.117 73 40.897 73C47.677 73 53.173 67.627 53.173 61C53.173 60.319 53.173 59 55.05 59H80M6.57373 59H9.00003"
              stroke="#1cba6b"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M66.1 6.3027L55 18.7559Z" fill="black" />
            <path
              d="M66.1 6.3027L55 18.7559M40.1 2V18.7559M14 6.3027L25.1 18.7559"
              stroke="#1cba6b"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div className="mt-5 text-[#808792]">No history</div>
        </div>
      )}
    </div>
  );
}

export default AllFlips;
