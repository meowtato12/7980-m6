import { useState } from "react";

const BasicInfo = ({ onNext }) => {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [founderName, setFounderName] = useState("");
  const [coFounders, setCoFounders] = useState([]);

  const addCoFounder = () => {
    const newCoFounder = prompt("Enter co-founder name:");
    if (newCoFounder) {
      setCoFounders([...coFounders, newCoFounder]);
    }
  };

  const removeCoFounder = (index) => {
    setCoFounders(coFounders.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const allCoFounders = [founderName, ...coFounders].filter(name => name.trim() !== "");
    if (allCoFounders.length === 0) {
      alert("Please enter at least one founder name.");
      return;
    }
    onNext(allCoFounders);
  };

  return (
    <div>
      <h2>Basic Information</h2>
      <label>Company Name:</label>
      <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

      <label>Industry:</label>
      <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} />

      <label>Your Name (Founder):</label>
      <input type="text" value={founderName} onChange={(e) => setFounderName(e.target.value)} />

      <h3>Co-Founders:</h3>
      <ul>
        {coFounders.map((coFounder, index) => (
          <li key={index}>
            {coFounder} <button onClick={() => removeCoFounder(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={addCoFounder}>Add Co-Founder</button>
      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
};

export default BasicInfo;
