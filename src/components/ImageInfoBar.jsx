import React from "react";

export default function ImageInfoBar({ images, currentIndex }) {
  return (
    <div
      style={{
        width: "90%",
        maxWidth: "820px",
        height: "50px",               // ❗ Fixed height
        minHeight: "50px",
        maxHeight: "50px",
        background: "#1a1a1a",
        padding: "0 15px",
        borderRadius: "8px",
        border: "1px solid #333",
        display: "grid",
        gridTemplateColumns: "1fr 120px 120px",
        alignItems: "center",
        fontSize: "15px",
        overflow: "hidden",           // ❗ Prevent expansion
        boxSizing: "border-box",
      }}
    >
      {/* File Name (no wrap + ellipsis) */}
      <div
        style={{
          whiteSpace: "nowrap",       // ❗ No wrapping
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {currentIndex !== null ? images[currentIndex]?.name : "No Image"}
      </div>

      {/* Index */}
      <div style={{ textAlign: "center" }}>
        {currentIndex !== null ? currentIndex + 1 : "—"} / {images.length}
      </div>

      {/* Total Count */}
      <div style={{ textAlign: "right" }}>
        Total: {images.length}
      </div>
    </div>
  );
}
