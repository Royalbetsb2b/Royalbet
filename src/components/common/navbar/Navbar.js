import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { shortenAddress } from "../../../utils/trauncate";
import { useAddress, useConnect, useDisconnect } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import Supported from "./Supported";
import { ShopContext } from "../../../utils/contextShop";
import Localwallet from "./Localwallet";
import { LOCAL_URL } from "../../../utils/constants";
import { makeCall } from "../../../utils/makeCall";

function Navbar({ setCurrentChain }) {
  const {
    switchWalletType,
    setSwitchWalletType,
    setUserprofile,
    setusernameModal,
    loginWallet,
    isRegistered,
    setIsRegistered,
  } = useContext(ShopContext);
  const [navbar, setNavbar] = useState(false);

  const address = useAddress();

  //check if address is correct
  const checkUserRegistered = async () => {
    try {
      // setLoading(true);
      const endpoint = `${LOCAL_URL}/check_user/${address}`;
      // const token = await localStorage.getItem("token");
      const headers = {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await makeCall(endpoint, {}, headers, "get");
      if (!response.data) {
        //call modal to input username and create account
        setusernameModal(true);
        return;
      }

      const responseReq = await loginWallet(address, "dummy");
      console.log(responseReq, "checking responseReq and thinges");
    } catch (error) {
      // setLoading(false);
      console.log(error, "catch error");
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setSwitchWalletType(switchWalletType === "live" ? "local" : "live");

    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (switchWalletType === "local" && address) {
      checkUserRegistered();
    }
  }, [switchWalletType, isRegistered]);

  return (
    <nav
      className={`flex py-4 md:justify-between justify-between text-[#808792] md:gap-24 md:px-auto bg-[#130D25] font-bold text-base items-center default-font px-4`}
    >
      <button
        onClick={() => setNavbar(!false)}
        className=" font-serif p-2 mr-1 rounded-md md:hidden flex items-end text-xs flex-col gap-1.5 outline-none  "
      >
        <span className="w-6 bg-[#FFF] h-[1.5px]"></span>
        <span className="w-4 bg-[#FFF] h-[1.5px]"></span>
        <span className="w-6 bg-[#FFF] h-[1.5px]"></span>
      </button>
      <Link
        to="/"
        className="md:text-lg flex font-extrabold text-sm items-center gap-2"
      >
        <img className="h-12" src="/logo.png" alt="" />
        <h1 className="hidden md:block text-white">Royal Bets</h1>
      </Link>
      <ul
        className={`md:flex transition-all z-50 md:flex-row flex-col  justify-center md:h-auto md:relative border-2 md:border-none fixed top-20 md:top-0 md:left-8 left-4 py-8 md:py-0 bg-[#000] border-[#FFF] w-48 rounded-md  md:w-1/5 md:bg-transparent md:gap-10 items-start gap-4 pl-6 ${
          navbar ? "flex" : "hidden "
        } `}
      >
        <button
          onClick={() => setNavbar(false)}
          className="absolute text-2xl font-serif md:hidden top-0 right-3 "
        >
          &times;
        </button>
        <li className="md:text-sm text-xs font-medium md:font-semibold whitespace-nowrap">
          <Link to="/RECENT" onClick={() => setNavbar(false)}>
            RECENT
          </Link>
        </li>
        {/* <li className="md:text-sm text-xs font-medium md:font-semibold whitespace-nowrap">
          <Link to="/STATS" onClick={() => setNavbar(false)}>
            FLIP STATS
          </Link>
        </li> */}
        <li className="md:text-sm text-xs font-medium md:font-semibold whitespace-nowrap">
          <Link to="/REFERRALS" onClick={() => setNavbar(false)}>
            REFERRALS
          </Link>
        </li>
        {/*<li className='md:text-sm text-xs font-medium md:font-semibold whitespace-nowrap'><Link to="/CONTEST" onClick={() => setNavbar(false)}>CONTESTS</Link></li>*/}
        <li className="md:text-sm text-xs font-medium md:font-semibold whitespace-nowrap">
          <Link to="/LEADERBOARD" onClick={() => setNavbar(false)}>
            LEADERBOARD
          </Link>
        </li>
        {/* <li className="md:text-sm text-xs font-medium md:font-semibold whitespace-nowrap">
          <Link to="/UPCOMING" onClick={() => setNavbar(false)}>
            UPCOMING
          </Link>
        </li> */}

        <div className="flex gap-6">
          <a href="https://twitter.com/@ethbets_">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="24px"
              height="24px"
              className="md:hidden block fill-current"
            >
              <path d="M50.061,10.438c-1.846,0.818-3.826,1.369-5.908,1.62c2.125-1.273,3.757-3.29,4.523-5.688c-1.986,1.177-4.19,2.033-6.531,2.493c-1.874-2-4.547-3.247-7.504-3.247c-5.68,0-10.284,4.604-10.284,10.282c0,0.805,0.092,1.589,0.269,2.343C16.08,17.812,8.502,13.718,3.429,7.497c-0.885,1.522-1.391,3.289-1.391,5.172c0,3.567,1.812,6.713,4.574,8.56c-1.688-0.054-3.271-0.517-4.657-1.288c0,0.044,0,0.086,0,0.131c0,4.984,3.544,9.134,8.245,10.084c-0.86,0.236-1.769,0.36-2.707,0.36c-0.664,0-1.309-0.064-1.938-0.186c1.313,4.081,5.108,7.06,9.607,7.143c-3.517,2.757-7.951,4.399-12.77,4.399c-0.833,0-1.649-0.048-2.452-0.144c4.548,2.919,9.956,4.619,15.762,4.619c18.915,0,29.26-15.668,29.26-29.252c0-0.448-0.011-0.894-0.03-1.332C46.94,14.313,48.684,12.5,50.061,10.438z"></path>
            </svg>
          </a>
          <a href="https://telegram.org/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="24px"
              height="24px"
              className="md:hidden block fill-current"
            >
              <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445 c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758 c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125 c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077 C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
            </svg>
          </a>
        </div>
      </ul>

      <div className="flex items-center justify-between gap-2 relative">
        {switchWalletType === "live" ? (
          <>
            {address && <Supported setCurrentChain={setCurrentChain} />}
            <ConnectWallet className="button_nav" />
          </>
        ) : (
          <>{isRegistered && <Localwallet />}</>
        )}

        {address && (
          <div className="w-auto relative navside flex flex-col">
            <div className="text-[12px] text-[#FFF] font-light text-center">
              {switchWalletType}
            </div>

            <label className="switch">
              <input
                className="toggle"
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
              />
              <span className="slider"></span>
              <span className="card-side"></span>
            </label>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
