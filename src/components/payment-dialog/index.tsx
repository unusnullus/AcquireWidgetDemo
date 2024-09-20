import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PaymentMethods, PaymentVariants } from "../../enums";
import SelectPayment from "../select-payment";
import { Stepper } from "../stepper";
import { PAYMENT_METHOD_STEPS } from "../../constants";
import CardDetails from "../card-details";
import OrderSummary from "../order-summary";
import PaymentStatus from "../payment-status";

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  paymentVariant: PaymentVariants;
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [method, setMethod] = useState<PaymentMethods | null>(null);

  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleCloseDialog = () => {
    onClose();
  };

  useEffect(() => {
    if (open) {
      setActiveStep(1);
      setMethod(null);
    }
  }, [open]);

  const handleBackStep = () => {
    if (activeStep === 2) {
      setMethod(null);
    }

    setActiveStep((prev) => prev - 1);
  };

  const handleSelectPayment = (value: PaymentMethods) => () => {
    setMethod(value);
    handleNextStep();
  };

  const renderSteps = (step: number) => {
    switch (step) {
      case 1:
        return <SelectPayment onClick={handleSelectPayment} onClose={handleCloseDialog} />;
      case 2:
        return <CardDetails onClose={handleBackStep} onNext={handleNextStep} />;
      case 3:
        return <OrderSummary onClose={handleBackStep} onNext={handleNextStep} />;
      case 4:
        return <PaymentStatus onClose={handleCloseDialog} />;
    }
  };

  return (
    <Dialog onClose={handleCloseDialog} open={open} maxWidth={false}>
      {method && activeStep < PAYMENT_METHOD_STEPS[method].length && (
        <Stepper steps={PAYMENT_METHOD_STEPS[method]} activeStep={activeStep} />
      )}
      {renderSteps(activeStep)}
    </Dialog>
  );
};
