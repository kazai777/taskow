"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    adena: any;
  }
}

export const ButtonConnect = () => {
  const [address, setAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const connectWallet = async () => {
    try {
      if (!window.adena) {
        toast({
          title: "Error",
          description: "Adena wallet is not installed",
          action: <ToastAction altText="Install">Install</ToastAction>,
          variant: "destructive",
        });
        return;
      }

      const connection = await window.adena.AddEstablish("taskow.io");
      if (connection.status === "success") {
        console.log("Connection established");
        const accountInfo = await window.adena.GetAccount();
        setAddress(accountInfo.data.address);

        toast({
          title: "Success",
          description: "Connection established!",
          variant: "default",
        });
      } else {
        toast({
          title: "Connection error",
          description: connection.message,
          action: (
            <ToastAction altText="Try again" onClick={connectWallet}>
              Try again
            </ToastAction>
          ),
          variant: "destructive",
        });
        console.error("Connection error:", connection.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Connection error with Adena Wallet",
        action: (
          <ToastAction altText="Try again" onClick={connectWallet}>
            Try again
          </ToastAction>
        ),
        variant: "destructive",
      });
      console.error("Adena Wallet connection error:", error);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div>
      <Button onClick={connectWallet}>
        {address ? formatAddress(address) : "Connect Adena"}
      </Button>
    </div>
  );
};
