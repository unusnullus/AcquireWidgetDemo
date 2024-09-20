import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PaymentMethods, PaymentVariants } from "../../enums";
import SelectPayment from "../select-payment";
import { Stepper } from "../stepper";
import { PAYMENT_METHOD_STEPS } from "../../constants";
import CardDetails from "../card-details";
import OrderSummary from "../order-summary";
import PaymentStatus from "../payment-status";
import SecureForm from "../secure-form";
import ConnectWallet from "../connect-wallet";
import CryptoPay from "../crypto-pay";

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  paymentVariant: PaymentVariants;
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(2);
  const [method, setMethod] = useState<PaymentMethods | null>(null);

  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleCloseDialog = () => {
    onClose();
  };

  const handleBackToFirstStep = () => {
    setActiveStep(2);
    setMethod(null);
  };

  useEffect(() => {
    if (open) {
      setActiveStep(2);
      setMethod(null);
    }
  }, [open]);

  const handleBackStep = () => {
    if (activeStep === 2) {
      setMethod(null);
      return;
    }

    setActiveStep((prev) => prev - 1);
  };

  const handleSelectPayment = (value: PaymentMethods) => () => {
    setMethod(value);
  };

  const renderCryptoSteps = (step: number) => {
    switch (step) {
      case 2:
        return <ConnectWallet onClose={handleBackStep} onNext={handleNextStep} />;
      case 3:
        return <OrderSummary onClose={handleBackStep} onNext={handleNextStep} />;
      case 4:
        return <CryptoPay onClose={handleCloseDialog} onNext={handleNextStep} onBack={handleBackToFirstStep} />;
      case 5:
        return <PaymentStatus onClose={handleCloseDialog} />;
    }
  };

  const renderCardSteps = (step: number) => {
    switch (step) {
      case 2:
        return <CardDetails onClose={handleBackStep} onNext={handleNextStep} />;
      case 3:
        return <OrderSummary onClose={handleBackStep} onNext={handleNextStep} />;
      case 4:
        return <SecureForm onNext={handleNextStep} onClose={handleBackStep} />;
      case 5:
        return <PaymentStatus onClose={handleCloseDialog} />;
    }
  };

  return (
    <Dialog open={open} maxWidth={false}>
      {method && activeStep <= PAYMENT_METHOD_STEPS[method].length && (
        <Stepper steps={PAYMENT_METHOD_STEPS[method]} activeStep={activeStep} />
      )}
      {!method && <SelectPayment onClick={handleSelectPayment} onClose={handleCloseDialog} />}
      {method === PaymentMethods.Card && renderCardSteps(activeStep)}
      {method === PaymentMethods.Crypto && renderCryptoSteps(activeStep)}
    </Dialog>
  );
};
