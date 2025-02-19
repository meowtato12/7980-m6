import React, { useEffect, useState } from "react";

const FinalEquity = ({ totalEquity, onBack }) => {
  const [normalizedEquity, setNormalizedEquity] = useState({});
  const [aiComment, setAiComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Normalize equity so the total is 100%
  useEffect(() => {
    const totalRawEquity = Object.values(totalEquity).reduce((sum, equity) => sum + equity, 0);
    
    if (totalRawEquity > 0) {
      const normalized = Object.fromEntries(
        Object.entries(totalEquity).map(([founder, equity]) => [
          founder,
          (equity / totalRawEquity) * 100, // Normalize to 100%
        ])
      );
      setNormalizedEquity(normalized);
    } else {
      setNormalizedEquity(totalEquity);
    }
  }, [totalEquity]);

  // Fetch AI-generated comment
  useEffect(() => {
    const fetchAIComment = async () => {
      setLoading(true);
      setError(false);

      const apiKey = "YOUR_API_KEY"; // Replace with your API key
      const systemPrompt = "You are an expert in startup equity allocation.";
      const userPrompt = `Analyze the following startup equity distribution and provide feedback on fairness, balance, and possible adjustments:\n\n${JSON.stringify(normalizedEquity, null, 2)}`;

      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            max_tokens: 150,
          }),
        });

        const data = await response.json();
        
        if (!response.ok || !data.choices) {
          throw new Error(data.error?.message || "API request failed.");
        }

        setAiComment(data.choices[0].message.content.trim());
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setError(true);
        setAiComment("Failed to generate feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchAIComment();
  }, [normalizedEquity]);

  return (
    <div>
      <h2>Final Equity Distribution</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Co-Founder</th>
            <th>Equity (%)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(normalizedEquity).map(([founder, equity]) => (
            <tr key={founder}>
              <td>{founder}</td>
              <td>{equity.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* AI-generated feedback */}
      <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
        <h3>AI Feedback</h3>
        {loading ? (
          <p>Loading AI analysis...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Failed to generate feedback.</p>
        ) : (
          <p>{aiComment}</p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
};

export default FinalEquity;
