import React, { useContext, useState } from "react";
import { LOCAL_URL } from "../../utils/constants";
import { makeCall } from "../../utils/makeCall";
import { ShopContext } from "../../utils/contextShop";
import { useAddress } from "@thirdweb-dev/react";

export default function Usernamemodal() {
  const {
    setusernameModal,
    loginWallet,
    setUserprofile,
    setSwitchWalletType,
    setIsRegistered,
  } = useContext(ShopContext);
  const [userName, setuserName] = useState();
  const [usernameApp, setuserNameApp] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const address = useAddress();
  const handleClose = () => {
    setSwitchWalletType("live");
    setusernameModal(false);
  };

  const Checkusername = async (e) => {
    try {
      setShowErr(false);
      if (e.target.value === "") {
        setuserNameApp(false);
        return;
      }
      if (e.target.value.length < 4) {
        setuserNameApp(false);
        return;
      }
      console.log(e.target.value, "showing responses");
      //   setLoading(true);
      const endpoint = `${LOCAL_URL}/check_username/${e.target.value}`;
      console.log(endpoint, "showing responses two again");

      const headers = {
        "Content-Type": "application/json",
      };
      const response = await makeCall(endpoint, {}, headers, "get");
      if (!response.data) {
        setShowErr(true);
        return;
      }
      setuserName(e.target.value);
      setuserNameApp(true);
    } catch (error) {
      setLoading(false);
      console.log(error, "catch error");
    }
  };

  const createAcount = async () => {
    setLoading(true);

    const response = await loginWallet(address, userName);
    if (!response.status) {
      setLoading(false);
    }
    setLoading(false);
    setusernameModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#130D25] flex flex-col gap-5 p-5 rounded-xl z-[99999999] w-[90%] md:w-[45%] h-[50%] overflow-auto">
        {/* header */}
        <div className="flex justify-between items-center">
          <div className="rounded-lg text-white text-xl font-bold">
            Username
          </div>
          <button
            onClick={handleClose}
            className="text-white"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6l-5.6 5.6Z"
              />
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="rounded text-white border border-[#BE36EB] flex gap-2 items-center p-2 w-[100%]">
            <input
              type="text"
              onChange={(e) => Checkusername(e)}
              className="bg-transparent outline-none w-[100%]"
              placeHolder="Enter Username"
            />
          </div>

          {usernameApp && !showErr ? (
            <button
              className="text-white mt-4 bg-gradient-to-r from-[#080DA6] to-[#BE36EB] outline-none rounded-md px-3 py-2"
              onClick={() => createAcount()}
            >
              {loading ? "loading..." : "Create Wallet"}
            </button>
          ) : (
            !usernameApp &&
            showErr && <div className="text-white">Username has been taken</div>
          )}
        </div>
      </div>
    </div>
  );
}
