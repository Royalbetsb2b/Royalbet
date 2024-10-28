import { useChainId } from "@thirdweb-dev/react";
import abi from "./abi.json";

// import BigNumber from "bignumber.js";

//localhost
//testnet 0x73Afc09C863B8023892e2b319Ee3B86A984175D1
//testnet two 0x396aa5241a3C887dF9025674937F173468C59C2A
//another test  0x0258EA9b2254C8Eb5cD3a4A1D64E7e86dc3f1DDA
//main 0xAf289719FfCE9324d3ae1b7aa177bF69785F708B
//another main main 0x849779b5BCf1a8480bE109fe4597B7d1B68197f3
//main bnb 0x842964990372157AC9ed2Dd60a858f36441419A4
//main main 0x5801261CB804d72E1Ee8Ad876d56074235aD58DC
export const ContractAddressHold = {
  1: "",
  56: "0x5a52B6c864F6093eeF48b8BAB67C36Fd0Be901ce",
  137: "0x9073DaCf5AECBde325B45a20F5f3747d3ED6018F",
  250: "",
  43114: "",
  42161: "0x240223E3Fd3f952fFAFB2c02a8bf919D83Dec134",
  97: "0x51e77e722494F77635AF72b076c6E10DA887CE08",
};

export const getGameContractAddress = (chainId) => {
  return ContractAddressHold[chainId] || null;
};

// export const ContractAddress = "0x73Afc09C863B8023892e2b319Ee3B86A984175D1";

export const PLATFORM_CREATOR_ADDRESS = "";

export const contractABI = abi;

export const chainETH = 97;

//avalanche 43114
//bnb 56
//arbitruim 42161
//polygon 137

export const convertTime = (timestamp) => {
  const currentDate = new Date();
  const targetDate = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const timeDifference = currentDate - targetDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
};

export const generateRandomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    // minute: '2-digit',
    // second: '2-digit',
    // timeZoneName: 'short',
  };
  const formattedDate = new Date(dateString).toLocaleString("en-US", options);
  return formattedDate;
};

export function convertBigNumberToNumber(input) {
  // Check if the input is an object
  if (typeof input === "object" && input !== null) {
    // Check if the input has the expected properties
    if (input.type === "BigNumber" && typeof input.hex === "string") {
      // Convert the hexadecimal value to a decimal number
      const decimalValue = parseInt(input.hex, 16);
      return decimalValue;
    } else {
      throw new Error("Invalid input format");
    }
  } else {
    throw new Error("Input must be an object");
  }
}

//live  --  https://royalbets-backend-6jr8.onrender.com
//local -- http://localhost:8000
export const LOCAL_URL = "https://royalbets-backend-6jr8.onrender.com";
