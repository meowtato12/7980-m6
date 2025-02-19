import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const suppFactors = [
  { id: 7, name: "Supp Factor 1" },
  { id: 8, name: "Supp Factor 2" },
  { id: 9, name: "Supp Factor 3" },
  { id: 10, name: "Supp Factor 4" },
  { id: 11, name: "Supp Factor 5" },
];

export default function OtherFactors({ coreData, onNext }) {
  const [supplementary, setSupplementary] = useState({});

  const handleSuppChange = (id, value) => {
    setSupplementary({ ...supplementary, [id]: Number(value) });
  };

  const calculateFactors = () => {
    const suppTotal = Object.values(supplementary).reduce((acc, val) => acc + val, 0);
    const corePercentage = 100 - suppTotal;

    const coreAdjusted = coreData.map((f) => ({
      name: f.name,
      value: (f.value / 100) * corePercentage,
    }));

    const suppAdjusted = Object.entries(supplementary).map(([id, value]) => ({
      name: suppFactors.find((s) => s.id === Number(id))?.name || "",
      value,
    }));

    return [...coreAdjusted, ...suppAdjusted];
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4563", "#66CC99", "#FF6699", "#9999FF", "#FFD700", "#FF6347"];

  return (
    <div>
      <h3>Select Supplementary Factors</h3>
      {suppFactors.map((f) => (
        <div key={f.id}>
          <label>
            {f.name} (%):
            <input
              type="number"
              min="0"
              max="100"
              value={supplementary[f.id] || ""}
              onChange={(e) => handleSuppChange(f.id, e.target.value)}
            />
          </label>
        </div>
      ))}

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

      <button onClick={() => onNext(calculateFactors())}>Next</button>
    </div>
  );
}
