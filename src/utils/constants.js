import abi from "./abi.json";

// import BigNumber from "bignumber.js";

//localhost
//testnet 0x3742133f47e0120d0f508f0ada108d14ab7e171b
//main 0xAf289719FfCE9324d3ae1b7aa177bF69785F708B
export const ContractAddress = "0x1917cF25AAde137467758F8A95Eb97a2B8475561";

export const PLATFORM_CREATOR_ADDRESS = ""

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

//live  --  https://royalbets-backend.onrender.com
//local -- http://localhost:8000
export const LOCAL_URL = "https://royalbets-backend.onrender.com";
