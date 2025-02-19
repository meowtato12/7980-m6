import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Define 6 factors dynamically
const factors = [
  { id: 1, name: "Time Commitment" },
  { id: 2, name: "Capital Investment" },
  { id: 3, name: "Opportunity Costs" },
  { id: 4, name: "Personal Risk" },
  { id: 5, name: "IP/Patent" },
  { id: 6, name: "Liability Assumption" },
];

export default function CoreFactors({ onNext }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isNextDisabled = factors.some((f) => answers[f.id] === undefined);

  const calculateFactors = () => {
    const total = Object.values(answers).reduce((acc, val) => acc + val, 0);
    return factors.map((f) => ({
      name: f.name,
      value: (answers[f.id] / total) * 100,
    }));
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4563"];

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Answer the following questions:</h2>
          {factors.map((f) => (
            <div key={f.id}>
              <p>How important is {f.name}?</p>
              <label>
                <input type="radio" name={f.id} value={1} onChange={() => handleChange(f.id, 1)} /> Low
              </label>
              <label>
                <input type="radio" name={f.id} value={2} onChange={() => handleChange(f.id, 2)} /> Moderate
              </label>
              <label>
                <input type="radio" name={f.id} value={3} onChange={() => handleChange(f.id, 3)} /> High
              </label>
            </div>
          ))}

          <button disabled={isNextDisabled} onClick={() => setStep(2)}>
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Factor Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={calculateFactors()}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={(entry) => entry.name}
            >
              {calculateFactors().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <button onClick={() => setStep(1)}>Back</button>
          <button onClick={() => onNext(calculateFactors())}>Next</button>
        </div>
      )}
    </div>
  );
}
