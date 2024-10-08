"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";

/**
 * Custom Wallet Connect Button
 */
export const RainbowKitCustomConnectButton = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <div className="wallet-connect-container">
      <button className="wallet-connect-button" onClick={openConnectModal} type="button">
        Connect Wallet
      </button>
    </div>
  );
};
