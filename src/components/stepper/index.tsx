import "./styles.css";
import CheckIcon from "@mui/icons-material/Check";

interface StepperProps {
  activeStep: number;
  steps: number[];
}

export const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <div className="stepper-container">
      {steps.map((step, index) => {
        const isActive = step === activeStep || step < activeStep;
        const isChecked = step < activeStep;
        return (
          <>
            <div className={`step-circle ${isActive ? "active" : ""}`}>
              {isChecked ? <CheckIcon fontSize="inherit" /> : step}
            </div>
            {index !== steps.length - 1 && <div className={`step-divider ${isChecked ? "active" : ""}`} />}
          </>
        );
      })}
    </div>
  );
};
