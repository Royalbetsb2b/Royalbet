import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../utils/contextShop";
import { shortenAddress } from "../../utils/trauncate";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

function Referrals() {
  const [isCopied, setIsCopied] = useState(false);
  const [referralsData, setReferalsData] = useState(0);
  const [referralsWon, setreferralsWon] = useState(0);
  const [referralsLost, setreferralsLost] = useState(0);

  const navigate = useNavigate();
  const address = useAddress();
  const [windowObj, setWindowObj] = useState();

  const { userData, setUserdata, dataUsers } = useContext(ShopContext);

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  const refsdata = () => {
    let won = 0;
    let loss = 0;
    const dataget = userData?.filter((data) => {
      return data.player !== address;
    });

    const filteredData = dataget?.filter((item, index, arr) => {
      // Check if there are any other objects with the same value
      const hasDuplicate = arr.some((otherItem, otherIndex) => {
        return otherIndex !== index && otherItem.player === item.player;
      });

      // Return objects that don't have the same value as any other object
      return !hasDuplicate;
    });

    dataget?.map((data) => {
      if (data.isWin == true) {
        won += (Math.round(data.amount / 10) * 10) / 10 ** 18;
      } else {
        loss += (Math.round(data.amount / 10) * 10) / 10 ** 18;
      }
    });
    setReferalsData(filteredData?.length);
    setreferralsWon(won);
    setreferralsLost(loss);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    if (userData?.length !== 0) {
      refsdata();
    }

    if (dataUsers) {
      setUserdata(Array.from(dataUsers).reverse());
    }

    setWindowObj(window);
  }, [isCopied, dataUsers]);

  return (
    <div className="flex justify-center items-center flex-col px-5 h-[100dvh] pb-0 md:pb-[100px]">
      {address ? (
        <>
          <div className="bg-[#130D25] py-5 px-10 rounded-lg w-[100%] md:w-[50%]">
            <div className="flex items-center md:gap-8">
              {" "}
              {/* http://localhost:3000/ */}{" "}
              {/* https://flipgamers.netlify.app */}
              <button
                onClick={() =>
                  handleCopyClick(
                    `${windowObj?.location.protocol}//${windowObj?.location.hostname}/?address=${address}`
                  )
                }
                className="cursor-pointer"
                title="copy"
              >
                {isCopied ? (
                  <div className="text-[#FFF] text-center pt-2">Copied!</div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    title="copy"
                    width="24"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#FFF"
                      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                    />
                  </svg>
                )}
              </button>
              <h1 className="text-white game-font text-[13px]  md:text-xs">
                {`${windowObj?.location.protocol}://${windowObj?.location.hostname}/?address=${address}`}
              </h1>
            </div>
          </div>

          <div className=" w-full md:w-[70%] to-[#130D25] from-[#000] bg-gradient-to-br mt-10 rounded-md">
            <div className="p-5 flex items-center relative justify-around w-full text-[#FFF]">
              <div className="flex w-[100%] md:w-2/4 justify-between">
                <div className="flex flex-col items-center">
                  <h2 className="game-font text-[13px]">Total Refs </h2>
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="game-font text-[13px]">Amount won</h2>
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="game-font text-[13px]">Amount Lost</h2>
                </div>
              </div>
            </div>

            <div className=" px-5 mb-2 flex items-center relative justify-around rounded-md w-full text-white h-[100px]">
              <div className="flex justify-between w-[100%] md:w-2/4">
                <div className="flex flex-col text-lg items-center w-1/5">
                  <b>{referralsData}</b>
                </div>
                <div className="flex flex-col text-lg items-center w-1/5">
                  <b>{referralsWon}</b>
                </div>
                <div className="flex flex-col text-lg  items-center w-1/5">
                  <b>{referralsLost}</b>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-[#FFF] text-center font-bold rounded-lg w-[300px] h-[374px] bg-[#130D25] flex flex-col justify-center items-center">
          <svg
            className="mb-3"
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

          <ConnectWallet className="button_nav" />
        </div>
      )}
    </div>
  );
}

export default Referrals;
