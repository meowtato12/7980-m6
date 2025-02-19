import { useState } from "react";
import CoreFactors from "./components/CoreFactors";
import OtherFactors from "./components/OtherFactors";
import BasicInfo from "./components/BasicInfo";
import FounderSlider from "./components/FounderSlider";
import FinalEquity from "./components/FinalEquity";

function App() {
  const [step, setStep] = useState(1);
  const [coFounders, setCoFounders] = useState([]); // Includes user
  const [coreData, setCoreData] = useState([]);
  const [finalizedFactors, setFinalizedFactors] = useState([]);
  const [totalEquity, setTotalEquity] = useState({});

  const handleNext = (data) => {
    if (step === 1) setCoreData(data);
    if (step === 2) setFinalizedFactors(data);
    if (step === 3) setCoFounders(Array.isArray(data) ? data : []); // Ensure it's an array
    if (step === 4) setTotalEquity(data);
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div>
      {/* Stepper UI */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        {["Core Factor", "Other Factors", "Basic Info", "Founder Slider", "Final Equity"].map((label, index) => (
          <div key={index} style={{ 
            padding: "10px 20px", 
            borderBottom: step === index + 1 ? "3px solid blue" : "3px solid gray",
            fontWeight: step === index + 1 ? "bold" : "normal",
            color: step === index + 1 ? "blue" : "gray",
            margin: "0 10px"
          }}>
            {label}
          </div>
        ))}
      </div>

      {/* Steps */}
      {step === 1 && <CoreFactors onNext={handleNext} />}
      {step === 2 && <OtherFactors coreData={coreData} onNext={handleNext} />}
      {step === 3 && <BasicInfo onNext={handleNext} />}
      {step === 4 && <FounderSlider coFounders={coFounders} finalizedFactors={finalizedFactors} onBack={handleBack} onNext={handleNext} />}
      {step === 5 && <FinalEquity totalEquity={totalEquity} onBack={handleBack} />}
      
      {/* Navigation Buttons */}
      <div style={{ marginTop: "20px" }}>
        {step > 1 && step < 5 && <button onClick={handleBack}>Back</button>}
      </div>
    </div>
  );
}

export default App;
