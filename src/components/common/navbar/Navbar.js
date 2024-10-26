import React, { useContext, useEffect, useState } from "react";

import { ConnectWallet } from "@thirdweb-dev/react";
import { LOCAL_URL } from "../../../utils/constants";
import { Link } from "react-router-dom";
import Localwallet from "./Localwallet";
import { ShopContext } from "../../../utils/contextShop";
import Supported from "./Supported";
import { makeCall } from "../../../utils/makeCall";
import { useAddress } from "@thirdweb-dev/react";

function Navbar({ setCurrentChain }) {
  const {
    switchWalletType,
    setSwitchWalletType,
    setusernameModal,
    loginWallet,
    isRegistered,
  } = useContext(ShopContext);

  const [navbar, setNavbar] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const address = useAddress();

  const checkUserRegistered = async () => {
    try {
      const endpoint = `${LOCAL_URL}/check_user/${address}`;
      const headers = { "Content-Type": "application/json" };
      const response = await makeCall(endpoint, {}, headers, "get");

      if (!response.data) {
        setusernameModal(true);
        return;
      }

      await loginWallet(address, "dummy");
    } catch (error) {
      // Error handling could be added here if needed
    }
  };

  const handleToggle = () => {
    setSwitchWalletType(switchWalletType === "live" ? "local" : "live");
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (switchWalletType === "local" && address) {
      checkUserRegistered();
    }
  }, [switchWalletType, isRegistered, address]);

  const navLinks = [
    { to: "/REFERRALS", label: "REFERRALS" },
    { to: "/LEADERBOARD", label: "LEADERBOARD" },
  ];

  const navSocials = [
    {
      href: "https://discord.gg/6UYWXMJyGM",
      name: "Discord",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="#ffffff" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12" /></svg>,
    },
    {
      href: "https://x.com/royalbetsxyz",
      name: "Twitter",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50" className="fill-current"><path d="M50.061,10.438c-1.846,0.818-3.826,1.369-5.908,1.62c2.125-1.273,3.757-3.29,4.523-5.688c-1.986,1.177-4.19,2.033-6.531,2.493c-1.874-2-4.547-3.247-7.504-3.247c-5.68,0-10.284,4.604-10.284,10.282c0,0.805,0.092,1.589,0.269,2.343C16.08,17.812,8.502,13.718,3.429,7.497c-0.885,1.522-1.391,3.289-1.391,5.172c0,3.567,1.812,6.713,4.574,8.56c-1.688-0.054-3.271-0.517-4.657-1.288c0,0.044,0,0.086,0,0.131c0,4.984,3.544,9.134,8.245,10.084c-0.86,0.236-1.769,0.36-2.707,0.36c-0.664,0-1.309-0.064-1.938-0.186c1.313,4.081,5.108,7.06,9.607,7.143c-3.517,2.757-7.951,4.399-12.77,4.399c-0.833,0-1.649-0.048-2.452-0.144c4.548,2.919,9.956,4.619,15.762,4.619c18.915,0,29.26-15.668,29.26-29.252c0-0.448-0.011-0.894-0.03-1.332C46.94,14.313,48.684,12.5,50.061,10.438z" /></svg>,
    },
    {
      href: "https://telegram.com/",
      name: "Telegram",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50" className="fill-current"><path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445 c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758 c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125 c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077 C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z" /></svg>,
    },
  ];

  return (
    <nav className="w-full max-w-screen mx-auto px-4 py-4 bg-[#130D25]">
      <div className="flex items-center justify-between">
        {/* Left - Logo Section */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setNavbar(!navbar)}
            className="p-2 md:hidden flex flex-col gap-1.5"
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-4 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img className="h-12" src="/logo.png" alt="Royal Bets Logo" />
            <h1 className="hidden text-lg font-extrabold text-white md:block">Royal Bets</h1>
          </Link>
        </div>

        {/* Center - Wallet Section */}
        <div className="flex items-center justify-center">
          {switchWalletType === "live" ? (
            <div className="flex items-center">
              <ConnectWallet className="button_nav" />
              {address && <Supported setCurrentChain={setCurrentChain} />}
            </div>
          ) : (
            isRegistered && <Localwallet />
          )}

          {address && (
            <div className="  max-w-[50px] flex flex-col items-center ml-2">
              <span className="text-xs font-light text-white">{switchWalletType}</span>
              <label className="switch  max-w-[50px]">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleToggle}
                  className="toggle  max-w-[50px]"
                />
                <span className="slider"></span>
                <span className="card-side"></span>
              </label>
            </div>
          )}
        </div>

        {/* Right - Navigation Links */}
        <div className="items-center hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[#808792] hover:text-white text-sm font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        {navbar && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setNavbar(false)} />
            <div className="fixed w-48 p-4 bg-black border-2 border-white rounded-md top-20 left-4">
              <button
                onClick={() => setNavbar(false)}
                className="absolute text-2xl text-white top-2 right-2"
              >
                &times;
              </button>

              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-[#808792] hover:text-white text-sm font-medium"
                    onClick={() => setNavbar(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="flex gap-4 pt-4">
                  {navSocials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-white hover:text-gray-300"
                    >
                      {social.icon}
                      <span className="sr-only">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;