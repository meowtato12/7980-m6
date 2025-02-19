import { useState } from "react";

const FounderSlider = ({ coFounders = [], finalizedFactors, onBack, onNext }) => {
  const validCoFounders = Array.isArray(coFounders) ? coFounders : [];

  const [allocations, setAllocations] = useState(() => {
    const initialAllocations = {};
    finalizedFactors.forEach((factor) => {
      initialAllocations[factor.name] = {};
      validCoFounders.forEach((founder) => {
        initialAllocations[factor.name][founder] = 0; // Default to 0%
      });
    });
    return initialAllocations;
  });

  const handleChange = (factor, founder, value) => {
    setAllocations((prev) => ({
      ...prev,
      [factor]: {
        ...prev[factor],
        [founder]: parseInt(value, 10),
      },
    }));
  };

  const calculateTotalEquity = () => {
    const totalEquity = {};
    validCoFounders.forEach((founder) => {
      totalEquity[founder] = 0;
      finalizedFactors.forEach((factor) => {
        totalEquity[founder] += allocations[factor.name][founder] || 0;
      });
    });
    return totalEquity;
  };

  const handleContinue = () => {
    const totalEquity = calculateTotalEquity();
    onNext(totalEquity);
  };

  return (
    <div>
      <h2>Distribute Equity Among Factors</h2>

      {validCoFounders.length === 0 ? <p>No co-founders added.</p> : (
        finalizedFactors.map((factor) => (
          <div key={factor.name}>
            <h3>{factor.name}</h3>
            {validCoFounders.map((founder) => (
              <div key={founder}>
                <label>{founder}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={allocations[factor.name][founder]}
                  onChange={(e) => handleChange(factor.name, founder, e.target.value)}
                />
                <span>{allocations[factor.name][founder]}%</span>
              </div>
            ))}
          </div>
        ))
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={onBack}>Back</button>
        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
};

export default FounderSlider;
