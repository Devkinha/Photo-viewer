import React from "react";

export default function Header() {
  return (
    <div
      style={{
        height: "60px",
        background: "#333231",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontWeight: "600",
        borderBottom: "1px solid #222",
      }}
    >
      React Photo Viewer
    </div>
  );
}
