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

export const ShopContext = createContext("context");

export const ShopContextProvider = (props) => {
  const address = useAddress();
  const chain = useChain();
  const chainIdd = useChainId();

  // console.log(chain, "checking chain out");

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
  //logs
  const prevLog = useRef();
  //playing as
  const [playingas, SetPlayingas] = useState("regular");

  // State to control user played
  const [hasPlayed, setHasPlayed] = useState(false);

  //handling chain
  const [selectedChainLocal, setSelectedChainLocal] = useState("");

  const [ContractAddress, setContractAddress] = useState();

  // const ContractAddress
  console.log(ContractAddress, "in here boyyysss");
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

  //call api endpoint to save game history
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
      const endpoint = `${LOCAL_URL}/game_played`;
      const headers = {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const body = {
        type: type,
        is_win: is_win,
        amount_played: amount_played,
        payout: payout,
        player: player,
        referral: referral,
        chain: chain,
        duplicate_id: requestId,
      };
      await makeCall(endpoint, body, headers, "post");
    } catch (error) {
      setLoading(false);
      console.log(error, "catch error");
    }
  };

  const handleEvent = async (log) => {
    console.log(log[0], "loggers checkers ooo");
    // prevLog.current = log;
    const expecter = localStorage.getItem("Expectingresult");
    // console.log(
    //   expecter,
    //   "one",
    //   `${log[0]?.data?.eventid}`,
    //   "player in game",
    //   `${log[0]}`,
    //   "player here",
    //   address,
    //   "finally"
    // );
    if (expecter === `${log[0]?.data?.eventid}`) {
      localStorage.setItem(`Expectingresult`, "");
      console.log(log[0].data.player, "checking if I got the data correctly");
      setGameResult(true);
      if (log[0].data.isWin === true) {
        console.log("in in in here win");
        const {
          gameType,
          player,
          amountPlayed,
          payout,
          isWin,
          requestId,
          referral,
          chain,
        } = log[0].data;
        //amountPlayed: amountPlayed.toString(),
        //payout: payout.toString(),
        // setNotify(true);
        // setNotifyType("success");
        // setNotifyMsg("Game Won");
        setloaderActive(false);
        setConfettiWin(true);
        const convertAmountPlayed = ethers.utils.formatEther(amountPlayed);
        const convertPayout = ethers.utils.formatEther(payout);
        const convertRequestId = parseFloat(requestId?.toString());
        console.log(
          convertAmountPlayed,
          convertPayout,
          convertRequestId,
          "testing them accordingly"
        );

        await gamePlayed(
          gameType,
          isWin,
          convertAmountPlayed,
          convertPayout,
          player,
          convertRequestId,
          referral,
          chain
        );
      } else {
        console.log("in in in in here loss");
        // setNotify(true);
        // setNotifyType("warn");
        // setNotifyMsg("Game Lost");
        setloaderActive(false);
        setConfettiLoss(true);
      }
    }
  };

  // const {
  //   data: log,
  //   isLoading: loadingEvent,
  //   error: errorEvent,
  // } = useContractEvents(contract, "BetResolved");

  const play = async (
    gametype,
    selectedChoice,
    amount,
    range,
    payout,
    searchParams
  ) => {
    console.log(ContractAddress, ", joooooe");
    if (!address) {
      setNotify(true);
      setNotifyType("warn");
      setNotifyMsg("Connect wallet to proceed");
      return;
    }
    try {
      console.log(
        gametype,
        selectedChoice,
        amount,
        range,
        payout,
        searchParams,
        "tracking play play"
      );
      setloaderActive(true);

      const fees = ethers.utils.parseEther(String(parseFloat(amount)));
      const rangeAsBigNumber = parseUnits(String(range), 18); // Assuming 18 decimal places
      const selectedChoiceAsBigNumber = parseUnits(String(selectedChoice), 18);
      const payoutAsBigNumber = parseUnits(String(payout), 18);
      const eventId = generateRandomId(); // Generate a unique ID for the event
      console.log(eventId, "checking out eventId");
      const refValue =
        searchParams.get("address") !== null
          ? searchParams.get("address")
          : "0x0000000000000000000000000000000000000000";
      const recieverValue =
        PLATFORM_CREATOR_ADDRESS !== ""
          ? PLATFORM_CREATOR_ADDRESS
          : "0x0000000000000000000000000000000000000000";
      localStorage.setItem(`Expectingresult`, `${eventId}`);
      // Math.round(selectedChoice),
      await PlaceBet({
        args: [
          gametype,
          selectedChoiceAsBigNumber,
          rangeAsBigNumber,
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
      //add to the args
      // overrides: {
      //   gasLimit: 1000000,
      //   value: fees, // send 0.1 native token with the contract call
      // },
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
  }, [notify, address, chainIdd, logResolved]);

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
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
