import "./styles.css";
import { Box, Button, CircularProgress } from "@mui/material";
import SuccessIcon from "../../assets/success.svg";
import { useEffect, useState } from "react";

interface PaymentStatusProps {
  onClose: () => void;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ onClose }) => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPaymentSuccessful(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="payment-status-container">
      <div className="status-container">
        {isPaymentSuccessful ? (
          <>
            <SuccessIcon />
            <span className="status">Your payment is successful</span>
          </>
        ) : (
          <>
            <div className="progress">
              <CircularProgress size={100} />
            </div>
            <span className="status">Processing your payment</span>
          </>
        )}
      </div>
      <Box display="flex" width="100%">
        <Button variant="outlined" color="secondary" onClick={onClose} fullWidth>
          Back to merchant
        </Button>
      </Box>
    </div>
  );
};

export default PaymentStatus;
