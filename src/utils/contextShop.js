import React, { createContext, useEffect, useRef, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  useContractEvents,
  useAddress,
  useContract,
  useChain,
  useChainId,
} from "@thirdweb-dev/react";
import {
  LOCAL_URL,
  contractABI,
  generateRandomId,
  PLATFORM_CREATOR_ADDRESS,
  getGameContractAddress,
} from "../utils/constants";
import { ethers, utils } from "ethers";
import { makeCall } from "./makeCall";
import { parseUnits } from "ethers/lib/utils";
import io from "socket.io-client";

export const ShopContext = createContext("context");

export const ShopContextProvider = (props) => {
  const address = useAddress();
  const chain = useChain();
  const chainIdd = useChainId();

  // console.log(chain, "checking chain out context");

  /* global BigInt */

  // States should be here
  const [userData, setUserdata] = useState();
  const [leaderboard, setLeaderBoard] = useState();
  const [gottenDdata, setGottendata] = useState();

  //notifiers
  const [notify, setNotify] = useState(false);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  //loader
  const [loader, setLoading] = useState(false);
  const [loaderActive, setloaderActive] = useState(false);
  const [confettiWin, setConfettiWin] = useState(false);
  const [confettiLoss, setConfettiLoss] = useState(false);
  const [gameResult, setGameResult] = useState(false);

  //playing as
  const [playingas, SetPlayingas] = useState("regular");

  // State to control user played
  const [hasPlayed, setHasPlayed] = useState(false);

  //handling chain
  const [selectedChainLocal, setSelectedChainLocal] = useState("");

  //local wallet
  //handle wallet type
  const [switchWalletType, setSwitchWalletType] = useState("live"); //its of type "local" and "live"
  const [depositModal, setDepositModal] = useState(false);

  //userprofile if connected on local wallet
  const [userProfile, setUserprofile] = useState();

  //open username enter modal
  const [usernameModal, setusernameModal] = useState(false);
  //check if user has previously been registered
  const [isRegistered, setIsRegistered] = useState(false);

  //notify for webhook
  const [webhookCalled, setWehookCalled] = useState(false);
  const [webhookRecieved, setWehookRecived] = useState(false);
  const [webhookType, setWehookType] = useState(false);
  const [webhookconfetti, setWebhookConfetti] = useState(false);

  //webhook catch address
  const [catchAddress, setCatchAddress] = useState("");

  const [ContractAddress, setContractAddress] = useState();

  // const ContractAddress
  const { contract } = useContract(ContractAddress, contractABI);

  const {
    mutateAsync: PlaceBet,
    isLoading: Flipload,
    error: flipError,
  } = useContractWrite(contract, "placeBet");

  const {
    data: logResolved,
    isLoading: loadingEvent,
    error: errorEvent,
  } = useContractEvents(contract, "BetResolved");

  //call api endpoints
  const gamePlayed = async (
    type,
    is_win,
    amount_played,
    payout,
    player,
    requestId,
    referral,
    chain
  ) => {
    try {
      setLoading(true);

      let data = 0;
      if (chain !== "wallet") {
        // console.log(chain, "checking other things");

        const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${
          chain === "BSC" ? "BNB" : chain
        }&tsyms=USD`;
        const headersProce = {
          "Content-Type": "application/json",
        };
        const responsePrice = await makeCall(apiUrl, {}, headersProce, "get");

        // console.log(responsePrice, "itchy in a bittsy");
        if (responsePrice.Response === "Error") {
          throw new Error(responsePrice.Message);
        }

        data = responsePrice.USD;
      }

      const endpoint = `${LOCAL_URL}/game_played`;
      const headers = {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const body = {
        type: type,
        is_win: is_win,
        wallet: chain === "wallet" ? "local" : "live",
        amount_played: amount_played,
        payout: payout,
        player: player,
        referral: referral,
        chain: chain,
        token_price_convt: data,
        duplicate_id: requestId,
      };
      await makeCall(endpoint, body, headers, "post");
    } catch (error) {
      setLoading(false);
      console.log(error, "catch error");
    }
  };

  //call to store recent
  const gameRecent = async (
    type,
    is_win,
    amount_played,
    payout,
    player,
    requestId,
    chain
  ) => {
    try {
      setLoading(true);
      const endpoint = `${LOCAL_URL}/game_recent`;
      const headers = {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const body = {
        type: type,
        is_win: is_win,
        wallet: chain === "wallet" ? "local" : "live",
        amount_played: amount_played,
        payout: payout,
        player: player,
        chain: chain,
        duplicate_id: requestId,
      };
      const response = await makeCall(endpoint, body, headers, "post");
      // console.log(response, "check check check something");
    } catch (error) {
      setLoading(false);
      console.log(error, "catch error");
    }
  };

  const loginWallet = async (addresssub, username) => {
    try {
      // setLoading(true);
      const endpoint = `${LOCAL_URL}/account_signin_signup`;
      const headers = {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const body = {
        address: addresssub,
        username: username,
      };
      const response = await makeCall(endpoint, body, headers, "post");

      localStorage.setItem("token", response.token);
      setUserprofile(response.user);
      setIsRegistered(true);
      return response;
    } catch (error) {
      setLoading(false);
      console.log(error, "catch error");
    }
  };

  //for deposit
  const depositInWallet = async (asset, assetcoin) => {
    try {
      const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${asset}&tsyms=USD`;
      const headersProce = {
        "Content-Type": "application/json",
      };
      const responsePrice = await makeCall(apiUrl, {}, headersProce, "get");

      if (responsePrice.Response === "Error") {
        throw new Error(responsePrice.Message);
      }

      const data = responsePrice.USD;

      const endpoint = `${LOCAL_URL}/deposit`;
      const token = await localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const body = {
        asset: assetcoin,
        current_price: data,
      };
      const response = await makeCall(endpoint, body, headers, "post");
      return response;
    } catch (error) {
      console.log(error, "catch error");
    }
  };

  //for withdrawal
  const withdrawalInWallet = async (asset, address, amount, convert_price) => {
    try {
      setLoading(true);
      const endpoint = `${LOCAL_URL}/withdraw`;
      const token = await localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const body = {
        asset: asset,
        address: address,
        amount: amount,
        convert_price: convert_price,
      };
      const response = await makeCall(endpoint, body, headers, "post");
      return response;
    } catch (error) {
      setLoading(false);
      console.log(error, "catch error");
    }
  };

  //check if address is correct
  const checkAddressCorrect = async (address_check, chain, asset) => {
    try {
      setLoading(true);
      const endpoint = `${LOCAL_URL}/verify_address/${address_check}/${chain}/${asset}`;
      const token = await localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await makeCall(endpoint, {}, headers, "get");
      return response;
    } catch (error) {
      setLoading(false);
      console.log(error, "catch error");
    }
  };

  const handleEvent = async (log) => {
    const expecter = localStorage.getItem("Expectingresult");
    if (expecter === `${log[0]?.data?.eventid}`) {
      localStorage.setItem(`Expectingresult`, "");
      setGameResult(true);
      if (log[0].data.isWin === true) {
        const {
          gameType,
          player,
          amountPlayed,
          payout,
          isWin,
          requestId,
          referral,
        } = log[0].data;

        setloaderActive(false);
        setConfettiWin(true);
        const convertAmountPlayed = ethers.utils.formatEther(amountPlayed);
        const convertPayout = ethers.utils.formatEther(payout);
        const convertRequestId = parseFloat(requestId?.toString());

        await gamePlayed(
          gameType,
          isWin,
          convertAmountPlayed,
          convertPayout,
          player,
          convertRequestId,
          referral,
          chain.chain
        );
      } else {
        setloaderActive(false);
        setConfettiLoss(true);
      }

      const { gameType, player, amountPlayed, payout, isWin, requestId } =
        log[0].data;

      await gameRecent(
        gameType,
        isWin,
        amountPlayed,
        payout,
        player,
        requestId,
        "metamask"
      );
    }
  };

  const play = async (
    gametype,
    selectedChoice,
    amount,
    range,
    payout,
    searchParams
  ) => {
    // console.log(ContractAddress, ", joooooe");
    if (!address) {
      setNotify(true);
      setNotifyType("warn");
      setNotifyMsg("Connect wallet to proceed");
      return;
    }
    try {
      const refValue =
        searchParams.get("address") !== null
          ? searchParams.get("address")
          : "0x0000000000000000000000000000000000000000";
      const recieverValue =
        PLATFORM_CREATOR_ADDRESS !== ""
          ? PLATFORM_CREATOR_ADDRESS
          : "0x0000000000000000000000000000000000000000";
      //for storing recent games
      let winRecent = false;
      let duplicateRecent;
      let gameTypeRecent;
      let playerRecent;
      let AmountRecent;
      let payoutRecent;
      if (switchWalletType === "live") {
        setloaderActive(true);

        const fees = ethers.utils.parseEther(String(parseFloat(amount)));
        const selectedChoiceAsBigNumber = parseUnits(
          String(selectedChoice),
          18
        );
        const payoutAsBigNumber = parseUnits(String(payout), 18);
        const eventId = generateRandomId(); // Generate a unique ID for the event
        localStorage.setItem(`Expectingresult`, `${eventId}`);
        // Math.round(selectedChoice),
        await PlaceBet({
          args: [
            gametype,
            selectedChoiceAsBigNumber,
            // rangeAsBigNumber,
            payoutAsBigNumber,
            refValue,
            eventId,
            recieverValue,
          ],
          overrides: {
            value: fees, // send 0.1 native token with the contract call
            // gasLimit: 30000,
          },
        });

        setHasPlayed(true);
      } else {
        setloaderActive(true);

        //check if the user's balance is enough
        if (parseFloat(userProfile.balance) < amount) {
          setNotify(true);
          setNotifyType("warn");
          setNotifyMsg("Insufficient funds");
          setloaderActive(false);
          return;
        }

        const endpoint = `${LOCAL_URL}/place_bet`;
        const token = await localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const body = {
          gameType: gametype,
          selection: selectedChoice,
          payout: payout,
          referral: refValue,
          betAmount: amount,
          feeReceiver: recieverValue,
        };
        const response = await makeCall(endpoint, body, headers, "post");
        setGameResult(true);
        if (!response.status && response.message) {
          setloaderActive(false);
          setNotify(true);
          setNotifyType("warn");
          setNotifyMsg(response.message);
          return;
        }
        if (!response.win && response.status) {
          setloaderActive(false);
          setConfettiLoss(true);
          setUserprofile(response.user);
          return;
        }
        setloaderActive(false);
        setConfettiWin(true);
        setUserprofile(response.user);
        const duplicateId = generateRandomId(); // Generate a unique ID for the duplicated id
        winRecent = true;
        duplicateRecent = duplicateId;
        gameTypeRecent = gametype;
        playerRecent = userProfile.username;
        AmountRecent = amount;
        payoutRecent = payout;
        await gamePlayed(
          gametype,
          response.win,
          amount,
          payout,
          userProfile.username,
          duplicateId,
          refValue,
          "wallet"
        );
      }

      await gameRecent(
        gameTypeRecent,
        winRecent,
        AmountRecent,
        payoutRecent,
        playerRecent,
        duplicateRecent,
        "wallet"
      );
    } catch (error) {
      console.log(error, "error ini");
      setloaderActive(false);
      setNotify(true);
      setNotifyType("warn");
      setNotifyMsg("User cancelled transaction");
      setloaderActive(false);
      // throw error;
    }
  };

  //Useeffect
  useEffect(() => {
    if (selectedChainLocal === "" && address) {
      setSelectedChainLocal(chain?.chain);
    }

    if (notify) {
      setTimeout(() => {
        setNotify(false);
        setNotifyType("");
        setNotifyMsg("");
      }, 5000);
    }

    if (address && chainIdd) {
      const contractAddress = getGameContractAddress(chainIdd);
      setContractAddress(contractAddress);
    }

    if (logResolved) {
      handleEvent(logResolved);
    }
  }, [
    notify,
    address,
    chainIdd,
    logResolved,
    confettiWin,
    confettiLoss,
    userProfile,
  ]);

  let socket; // Declare socket outside of the try block to access it in the cleanup function

  useEffect(() => {
    if (webhookCalled) {
      try {
        // Connect to the server
        const live = "https://royalbets-backend.onrender.com";
        socket = io.connect(live);

        // Log when the connection is established
        socket.on("connect", () => {
          console.log("Connection established with the server");
        });

        socket.on(`DepositSuccess${catchAddress}`, (data) => {
          if (data.status === "success") {
            setWehookCalled(false);
            setWehookRecived(true);
            // setCatchAddress("");
            setWehookType("deposit");
            //call confetti and update balance
            setWebhookConfetti(true);
            setUserprofile((profile) => ({
              ...profile,
              balance: data.userBalance,
            }));
          }
        });

        socket.on(`WithdrawalSuccess${catchAddress}`, (data) => {
          if (data.status === "success") {
            setWehookCalled(false);
            setWehookRecived(true);
            // setCatchAddress("");
            setWehookType("withdrawal");
            //call confetti and update balance for withdrawal
            setWebhookConfetti(true);
            setUserprofile((profile) => ({
              ...profile,
              balance: data.userBalance,
            }));
          }
        });
      } catch (error) {
        console.log(error, "repayment");
      }
    }
  }, []);

  const contextValue = {
    userData,
    setUserdata,
    leaderboard,
    setLeaderBoard,
    gottenDdata,
    setGottendata,
    notify,
    setNotify,
    notifyType,
    setNotifyType,
    notifyMsg,
    setNotifyMsg,
    loader,
    setLoading,
    loaderActive,
    setloaderActive,
    play,
    confettiWin,
    setConfettiWin,
    confettiLoss,
    setConfettiLoss,
    gameResult,
    setGameResult,
    chain,
    // dataHistory,
    playingas,
    SetPlayingas,
    selectedChainLocal,
    setSelectedChainLocal,
    switchWalletType,
    setSwitchWalletType,
    depositModal,
    setDepositModal,
    userProfile,
    setUserprofile,
    loginWallet,
    depositInWallet,
    withdrawalInWallet,
    checkAddressCorrect,
    usernameModal,
    setusernameModal,
    isRegistered,
    setIsRegistered,
    webhookCalled,
    setWehookCalled,
    catchAddress,
    setCatchAddress,
    webhookType,
    webhookconfetti,
    setWebhookConfetti,
    webhookRecieved,
    setWehookRecived,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
