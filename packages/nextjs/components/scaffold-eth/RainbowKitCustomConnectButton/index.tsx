"use client";

import { Address } from "../Address";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaSignOutAlt } from "react-icons/fa";
import { useDisconnect } from "wagmi";

/**
 * Custom Wallet Connect Button
 */
export const RainbowKitCustomConnectButton = () => {
  const { disconnect } = useDisconnect();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="bluntdao-wallet-connect"
          >
            {(() => {
              if (!connected) {
                return (
                  <div className="wallet-connect-container">
                    <button onClick={openConnectModal} type="button" className="wallet-connect-button">
                      Connect Wallet
                    </button>
                  </div>
                );
              }

              return (
                <div className="wallet-connect-container flex items-center gap-2">
                  <div className="wallet-connect-button cursor-default">
                    <Address address={account.address} format="short" disableAddressLink />
                  </div>
                  <button
                    onClick={() => disconnect()}
                    className="p-2 hover:bg-secondary rounded-md transition-colors text-primary-content"
                    title="Disconnect Wallet"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
