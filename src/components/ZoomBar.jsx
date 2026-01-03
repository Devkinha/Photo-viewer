import React from "react";

export default function ZoomBar({ zoom, onZoomIn, onZoomOut, onReset }) {
  return (
    <div
      style={{
        width: "90%",
        maxWidth: "820px",
        height: "50px",
        background: "#141414",
        border: "1px solid #333",
        borderRadius: "8px",
        padding: "0 10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "18px",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={onZoomOut}
        style={btnStyle}
      >
        −
      </button>

      <span
        style={{
          width: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: "15px",
          opacity: 0.8,
        }}
      >
        {Math.round(zoom * 100)}%
      </span>

      <button
        onClick={onZoomIn}
        style={btnStyle}
      >
        +
      </button>

      <button
        onClick={onReset}
        style={{
          ...btnStyle,
          background: "#1f3a3a",
          borderColor: "#2f5a5a",
          color: "#8ff",
          width: "70px",
          fontSize: "14px",
        }}
      >
        Reset
      </button>
    </div>
  );
}

const btnStyle = {
  all: "unset",
  cursor: "pointer",
  fontSize: "14px",
  padding: "6px 12px",
  borderRadius: "6px",
  background: "#222",
  border: "1px solid #444",
  color: "#bbb",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "28px",
};
