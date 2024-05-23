import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./global.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
//Its binance and binance-testnet
const chains = "binance-testnet";
//919374fd368afc2f273210df7d6e66f9 ps_own
//mr matrick_own 9ec8fe1959510de35dbefa184240a8a9
const clientId = "919374fd368afc2f273210df7d6e66f9";

root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={chains} clientId={clientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
