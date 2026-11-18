import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonList from "./PersonList";

function App() {
  return (
    <div>
      <header
        style={{
          backgroundColor: "#38b03a",
          padding: "14px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 500, color: "#111" }}>
          User List
        </h1>
      </header>
      <main style={{ backgroundColor: "#f4f6f8", minHeight: "100vh", padding: "16px 0" }}>
        <PersonList />
      </main>
    </div>
  );
}

export default App;
