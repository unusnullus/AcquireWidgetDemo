import { useState } from "react";
import "./styles.css";
import { Box, Button, Checkbox } from "@mui/material";

interface SelectPaymentProps {
  onNext: () => void;
  onClose: () => void;
}

const OrderSummary: React.FC<SelectPaymentProps> = ({ onNext, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setError(false);
  };

  const handleContinue = () => {
    if (!isChecked) {
      setError(true);
      return;
    }
    onNext();
  };

  return (
    <div className="select-payment-container">
      <p className="step-title">Order summary</p>
      <div className="items-list">
        <div className="item-container">
          <span>Item to buy</span>
          <span>€13.99</span>
        </div>
        <div className="item-container">
          <span>Item to buy</span>
          <span>€8.99</span>
        </div>
      </div>
      <div className="total-container">
        <span>Total</span>
        <span>€22.98</span>
      </div>
      <div className="terms-of-use-container">
        <Checkbox className={error ? "error" : ""} checked={isChecked} onChange={handleCheckboxChange} />
        <p>
          I confirm that I have read <span>Terms of Use</span>
        </p>
      </div>
      <Box display={"flex"} gap={"16px"}>
        <Button variant="outlined" color="secondary" onClick={onClose} fullWidth>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleContinue} fullWidth>
          Continue
        </Button>
      </Box>
    </div>
  );
};

export default OrderSummary;
