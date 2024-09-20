import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";

interface ConnectWalletProps {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}

const CryptoPay: React.FC<ConnectWalletProps> = ({ onClose, onNext, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isTimeOut, setIsTimeOut] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsTimeOut(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <div className="container">
      {!isTimeOut && (
        <>
          <div className="connect-wallet-title">
            <p className="crypto-title">Pay for your order</p>
            <div className="timer">{formatTime(timeLeft)}</div>
          </div>
          <div className="network-container">
            <span className="input-title">Network</span>
            <span>TRC20</span>
          </div>
          <Button variant="contained" color="primary" onClick={onNext} fullWidth>
            Pay
          </Button>
          <div className="pay-field">
            <span className="input-title">Amount to pay</span>
            <div className="pay-data-container">
              <span>23.04 USDT</span>
              <ContentCopyIcon color="primary" className="pointer" />
            </div>
          </div>
          <div className="pay-field">
            <span className="input-title">Pay to this address</span>
            <div className="pay-data-container">
              <span>MWTk543dlsnsk6489wrksakjdhwjhdkjaskjd4</span>
              <ContentCopyIcon color="primary" className="pointer" />
            </div>
          </div>
          <Button variant="outlined" color="secondary" onClick={onClose} fullWidth>
            Cancel
          </Button>
        </>
      )}
      {isTimeOut && (
        <>
          <div className="title fail">
            Transaction is failed <CloseIcon fontSize="large" color="error" />
          </div>
          <Button variant="outlined" color="secondary" onClick={onBack} fullWidth>
            Back
          </Button>
        </>
      )}
    </div>
  );
};

export default CryptoPay;
