"use client";

import { useState } from "react";
import { JSONRPCProvider } from "@gnolang/tm2-js-client";

declare global {
  interface Window {
    adena: any;
  }
}

export const WalletConnector = () => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  const connectWallet = async () => {
    try {
      if (!window.adena) {
        alert("Adena wallet is not installed");
        window.open("https://adena.app/", "_blank");
        return;
      }

      const connection = await window.adena.AddEstablish("taskow.io");
      if (connection.status === "success") {
        console.log("Connection established");

        const accountInfo = await window.adena.GetAccount();
        setAddress(accountInfo.data.address);
        setBalance(accountInfo.data.coins);
      } else {
        console.error("Connection error:", connection.message);
      }
    } catch (error) {
      console.error("Adena Wallet connection error:", error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connection Wallet</button>
      {address && <p>Wallet Address : {address}</p>}
      {balance && <p>Balance : {balance}</p>}
    </div>
  );
};
