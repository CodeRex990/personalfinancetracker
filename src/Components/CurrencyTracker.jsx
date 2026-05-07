import { useEffect, useState } from "react";

const CurrencyTracker = () => {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    // Using a free API like ExchangeRate-API or similar
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => setRate(data.rates.PHP.toFixed(2)))
      .catch((err) => console.error("Exchange rate fetch error:", err));
  }, []);

  return (
    <div className="form-wrapper" style={{ padding: 'var(--space-md)' }}>
      <h3 className="h4"><span className="accent">Live</span> Exchange Rate</h3>
      <p style={{ fontSize: 'var(--fs-500)', fontWeight: 'bold' }}>
        $1 USD = <span className="accent" >₱{rate || "Loading..."}</span>
      </p>
      <small className="muted">Updated live via ExchangeRate-API</small>
    </div>
  );
};

export default CurrencyTracker;