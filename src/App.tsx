import "./App.css";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { PaymentVariants } from "./enums";
import { PaymentDialog } from "./components/payment-dialog";

function App() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(PaymentVariants.Deposit);

  const handleClickOpen = (value: PaymentVariants) => () => {
    setOpen(true);
    setSelectedValue(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box display="flex" gap={10}>
        <Button variant="contained" onClick={handleClickOpen(PaymentVariants.Buy)}>
          Buy
        </Button>
      </Box>
      <PaymentDialog open={open} onClose={handleClose} paymentVariant={selectedValue} />
    </>
  );
}

export default App;
