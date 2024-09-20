import { useEffect, useState } from "react";
import "./styles.css";
import { Box } from "@mui/material";
import VisaIcon from "../../assets/visa.svg";

interface SelectPaymentProps {
  onNext: () => void;
  onClose: () => void;
}

const SecureForm: React.FC<SelectPaymentProps> = ({ onNext, onClose }) => {
  const [code, setCode] = useState("");
  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    const currentTime = new Date();

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    setFormattedTime(timeString);
  }, []);

  const handleContinue = () => {
    if (!code) {
      return;
    }
    onNext();
  };

  return (
    <div className="secure-container">
      <div className="form-title">
        <p className="title">Please submit your Verified by Visa password.</p>
        <VisaIcon />
      </div>
      <div className="details-container">
        <div className="form-item-container">
          <span className="item-title">Merchant:</span>
          <span>Shop</span>
        </div>
        <div className="form-item-container">
          <span className="item-title">Amount:</span>
          <span>€22.98</span>
        </div>
        <div className="form-item-container">
          <span className="item-title">Date:</span>
          <span>{formattedTime}</span>
        </div>
        <div className="form-item-container">
          <span className="item-title">Card number:</span>
          <span>XXXX XXXX XXXX 1234</span>
        </div>
        <div className="form-item-container">
          <span className="item-title">Code:</span>
          <div>
            <input value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
        </div>
      </div>
      <Box display={"flex"} justifyContent={"center"} gap={4} alignItems={"center"} fontSize={14}>
        <button onClick={handleContinue}>Submit</button>
        <div className="cancel-button" onClick={onClose}>
          Cancel
        </div>
      </Box>
    </div>
  );
};

export default SecureForm;
