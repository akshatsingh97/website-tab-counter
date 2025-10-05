import { useState, useEffect } from "react";

function App() {
  const [domain, setDomain] = useState("");
  const [count, setCount] = useState(null);

  useEffect(() => {
    chrome.storage.local.get("tabCounts", (result) => {
      if (result.tabCounts && domain) {
        setCount(result.tabCounts[domain] || 0);
      }
    });
  }, [domain]);

  return (
    <div style={{ padding: "10px", fontFamily: "Arial" }}>
      <h3>Site Tab Counter</h3>
      <input
        type="text"
        placeholder="example.com"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        style={{ marginBottom: "5px", padding: "5px", width: "100%" }}
      />
      <p>{count !== null ? `Open tabs: ${count}` : "Enter a domain"}</p>
    </div>
  );
}

export default App;