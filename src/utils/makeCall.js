// import { useContext } from "react";
// import { ShopContext } from "./contextShop";

export const makeCall = async (
    endpoint,
    body = {},
    headers = {},
    reqType = ""
  ) => {
    // const { setNotify, setNotifyType, setNotifymsg } = useContext(ShopContext);
  
    try {
      const requestOptions = {
        method: reqType,
        headers: headers,
      };
      //  console.log("gotten in here");
      // Add body only if the request type is not "GET" or "HEAD"
      if (reqType.toUpperCase() !== "GET" && reqType.toUpperCase() !== "HEAD") {
        requestOptions.body = JSON.stringify(body);
      }
  
      const response = await fetch(endpoint, requestOptions);
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      // console.log(error, "error checking");
      // setNotify(true);
      // setNotifyType("warn");
      // setNotifymsg("Payment has not been made");
      console.log("error");
      throw error;
    }
  };
  