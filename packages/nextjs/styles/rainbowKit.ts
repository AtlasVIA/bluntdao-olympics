import { Theme } from "@rainbow-me/rainbowkit";

const baseColors = {
  accentColor: "#22c55e",
  accentColorForeground: "white",
  actionButtonBorder: "rgba(0, 0, 0, 0.1)",
  actionButtonBorderMobile: "rgba(0, 0, 0, 0.1)",
  actionButtonSecondaryBackground: "rgba(0, 0, 0, 0.1)",
  closeButton: "rgba(0, 0, 0, 0.7)",
  closeButtonBackground: "rgba(0, 0, 0, 0.1)",
  connectButtonBackground: "#22c55e",
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
};

const fonts = {
  body: "system-ui, sans-serif",
};

const radii = {
  actionButton: "9999px",
  connectButton: "8px",
  menuButton: "8px",
  modal: "16px",
  modalMobile: "16px",
};

const shadows = {
  connectButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
  profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
  selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
  selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.12)",
  walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)",
};

const blurs = {
  modalOverlay: "blur(8px)",
};

export const bluntDAOTheme: Theme = {
  lightMode: {
    colors: {
      ...baseColors,
      modalBackground: "#f0fdf4",
      modalText: "#064e3b",
      modalTextSecondary: "#065f46",
    },
    fonts,
    radii,
    shadows,
    blurs,
  },
  darkMode: {
    colors: {
      ...baseColors,
      modalBackground: "#064e3b",
      modalText: "#ffffff",
      modalTextSecondary: "#d1fae5",
    },
    fonts,
    radii,
    shadows,
    blurs,
  },
};

// Custom styles for the wallet connect button
export const walletConnectStyles = `
  .wallet-connect-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
  }

  .wallet-connect-button {
    background-color: #22c55e;
    color: white;
    font-weight: bold;
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
    font-size: 16px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }

  .wallet-connect-button:hover {
    background-color: #16a34a;
  }

  @media (max-width: 640px) {
    .wallet-connect-button {
      padding: 10px 20px;
      font-size: 14px;
    }
  }
`;
