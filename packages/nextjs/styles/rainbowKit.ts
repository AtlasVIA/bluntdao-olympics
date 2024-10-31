import { Theme } from "@rainbow-me/rainbowkit";

const rainbowKitTheme: Theme = {
  colors: {
    accentColor: "#8B4513",
    accentColorForeground: "white",
    actionButtonBorder: "rgba(0, 0, 0, 0.1)",
    actionButtonBorderMobile: "rgba(0, 0, 0, 0.1)",
    actionButtonSecondaryBackground: "rgba(0, 0, 0, 0.1)",
    closeButton: "rgba(0, 0, 0, 0.7)",
    closeButtonBackground: "rgba(0, 0, 0, 0.1)",
    connectButtonBackground: "#8B4513",
    connectButtonBackgroundError: "#FF494A",
    connectButtonInnerBackground: "linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))",
    connectButtonText: "white",
    connectButtonTextError: "white",
    connectionIndicator: "#30E000",
    error: "#FF494A",
    generalBorder: "rgba(0, 0, 0, 0.1)",
    generalBorderDim: "rgba(0, 0, 0, 0.05)",
    menuItemBackground: "rgba(0, 0, 0, 0.1)",
    modalBackdrop: "rgba(0, 0, 0, 0.5)",
    modalBackground: "white",
    modalBorder: "rgba(0, 0, 0, 0.1)",
    modalText: "black",
    modalTextDim: "rgba(0, 0, 0, 0.5)",
    modalTextSecondary: "rgba(0, 0, 0, 0.7)",
    profileAction: "rgba(0, 0, 0, 0.1)",
    profileActionHover: "rgba(0, 0, 0, 0.2)",
    profileForeground: "rgba(0, 0, 0, 0.1)",
    selectedOptionBorder: "rgba(0, 0, 0, 0.1)",
    standby: "#FFD641",
    downloadBottomCardBackground:
      "linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #FFFFFF",
    downloadTopCardBackground:
      "linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #FFFFFF",
  },
  fonts: {
    body: "system-ui, sans-serif",
  },
  radii: {
    actionButton: "9999px",
    connectButton: "8px",
    menuButton: "8px",
    modal: "16px",
    modalMobile: "16px",
  },
  shadows: {
    connectButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
    profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
    selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.12)",
    walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)",
  },
  blurs: {
    modalOverlay: "blur(8px)",
  },
};

export const walletConnectStyles = `
  .bluntdao-wallet-connect .wallet-connect-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bluntdao-wallet-connect .wallet-connect-button {
    background-color: #8B4513 !important;
    color: white !important;
    font-weight: bold !important;
    padding: 12px 24px !important;
    border-radius: 8px !important;
    border: none !important;
    cursor: pointer !important;
    transition: background-color 0.2s ease !important;
    font-size: 16px !important;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1) !important;
  }

  .bluntdao-wallet-connect .wallet-connect-button:hover {
    background-color: #654321 !important;
  }

  @media (max-width: 640px) {
    .bluntdao-wallet-connect .wallet-connect-button {
      padding: 10px 20px !important;
      font-size: 14px !important;
    }
  }
`;

export { rainbowKitTheme };
