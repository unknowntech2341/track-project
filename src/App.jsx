import { useState, useEffect } from "react";
import "./App.css";

const d = [
  { n: "OOP", g: 100, c: 0 },
  { n: "DBMS", g: 100, c: 0 },
  { n: "DSA", g: 100, c: 0 },
  { n: "OS", g: 100, c: 0 },
  { n: "LLD", g: 100, c: 0 },
  { n: "CareConnect", g: 100, c: 0 },
  { n: "code editor", g: 100, c: 0 },
  { n: "Yet to be decided", g: 100, c: 0 },
];

function App() {
  const [s, setS] = useState(() => {
    const x = localStorage.getItem("tracker");
    return x ? JSON.parse(x) : d;
  });

  useEffect(() => {
    localStorage.setItem("tracker", JSON.stringify(s));
  }, [s]);

  const u = (i, k, v) => {
    const t = [...s];
    t[i][k] = Number(v);
    setS(t);
  };

  const r = () => {
    localStorage.removeItem("tracker");
    setS(d);
  };

  const overall =
    s.reduce((a, x) => a + (x.g ? (x.c / x.g) * 100 : 0), 0) / s.length;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
      }}
    >
      <h1>🚀 Placement Progress Tracker</h1>

      <div className="overall">
        <h2>Overall Progress</h2>

        <progress value={overall} max="100" />

        <h2>{overall.toFixed(1)}%</h2>

        <button
          onClick={r}
          style={{
            marginTop: "15px",
            padding: "10px 15px",
          }}
        >
          Reset All
        </button>
      </div>

      {s.map((x, i) => {
        const p = x.g
          ? Math.min(Math.round((x.c / x.g) * 100), 100)
          : 0;

        return (
          <div className="card" key={i}>
            <h3>{x.n}</h3>

            <div style={{ marginBottom: "12px" }}>
              <label>Goal: </label>
              <input
                type="number"
                value={x.g}
                onChange={(e) => u(i, "g", e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label>Completed: </label>
              <input
                type="number"
                value={x.c}
                onChange={(e) => u(i, "c", e.target.value)}
              />
            </div>

            <progress value={p} max="100" />

            <h3 style={{ marginTop: "10px" }}>
              {p}% Complete
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default App;