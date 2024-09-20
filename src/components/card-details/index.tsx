import "./styles.css";
import { Box, Button, Typography } from "@mui/material";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useRef, useState } from "react";

interface SelectPaymentProps {
  onNext: () => void;
  onClose: () => void;
}

const CardDetails: React.FC<SelectPaymentProps> = ({ onNext, onClose }) => {
  const [card, setCard] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [errors, setErrors] = useState<{ card?: string; name?: string; expiry?: string; cvc?: string }>({});
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    if (inputRef.current) {
      const cardValue = inputRef.current.value.replace(/\D/g, "").match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);

      if (cardValue) {
        inputRef.current.value = [cardValue[1], cardValue[2], cardValue[3], cardValue[4]].filter(Boolean).join(" ");

        const numbers = inputRef.current.value.replace(/(\s)/g, "");
        setCard(numbers);
      }
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    const currentYear = new Date().getFullYear() % 100;

    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    if (value.length > 2) {
      value = `${value.slice(0, 2)} / ${value.slice(2)}`;
    }

    if (value.length >= 2) {
      const month = parseInt(value.slice(0, 2), 10);
      if (month < 1 || month > 12) {
        value = `12${value.slice(2)}`;
      }
    }

    if (value.length === 7) {
      const year = parseInt(value.slice(5), 10);
      if (year < currentYear) {
        value = `${value.slice(0, 5)}${currentYear}`;
      }
    }

    setExpiry(value);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvc(value);
    }
  };

  const handleSubmit = () => {
    const newErrors: { card?: string; name?: string; expiry?: string; cvc?: string } = {};
    if (!card || card.length !== 16) newErrors.card = "Card number is required";
    if (!name) newErrors.name = "Name is required";
    if (!expiry) newErrors.expiry = "Expiry date is required";
    if (!cvc) newErrors.cvc = "CVC is required";

    setErrors(newErrors);

    if (!Object.keys(newErrors).length) {
      onNext();
    }
  };

  return (
    <div className="select-payment-container">
      <p className="step-title">Enter your card details</p>
      <Box display="flex" flexDirection="column" gap={"16px"}>
        <Box display="flex" flexDirection="column" gap={"6px"}>
          <Typography>Card number</Typography>
          <div className={`input-container ${errors.card ? "input-error" : ""}`}>
            <input
              placeholder="1234 1234 1234 1234"
              className="input"
              type="text"
              ref={inputRef}
              onChange={handleChange}
            />
            <LocalSeeIcon color="secondary" />
          </div>
        </Box>
        <Box display="flex" flexDirection="column" gap={"6px"}>
          <Typography>Name on card</Typography>
          <div className={`input-container ${errors.name ? "input-error" : ""}`}>
            <input
              placeholder="Name Surname"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </Box>
        <Box display="flex" gap={"6px"}>
          <Box display="flex" flexDirection="column" gap={"6px"} flex={1}>
            <Typography>Expiry</Typography>
            <div className={`input-container ${errors.expiry ? "input-error" : ""}`}>
              <input
                placeholder="12 / 30"
                maxLength={16}
                className="input"
                value={expiry}
                onChange={handleExpiryChange}
              />
            </div>
          </Box>
          <Box display="flex" flexDirection="column" gap={"6px"} flex={1}>
            <Typography>CVC</Typography>
            <div className={`input-container ${errors.cvc ? "input-error" : ""}`}>
              <input
                placeholder="123"
                type="password"
                maxLength={3}
                className="input"
                value={cvc}
                onChange={handleCvcChange}
              />
              <CreditCardIcon color="secondary" />
            </div>
          </Box>
        </Box>
      </Box>
      <div className="caption">
        By providing your card information, you allow Name Shop to charge your card for future payments in accordance
        with their terms.
      </div>
      <Box display={"flex"} gap={"16px"}>
        <Button variant="outlined" color="secondary" onClick={onClose} fullWidth>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Continue
        </Button>
      </Box>
    </div>
  );
};

export default CardDetails;
