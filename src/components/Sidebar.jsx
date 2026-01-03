import React from "react";

export default function Sidebar({ images, currentIndex, setCurrentIndex, setZoom, onUploadClick }) {
  return (
    <div
      style={{
        width: "260px",
        background: "#161616",
        borderRight: "1px solid #222",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Pinned top */}
      <div
        style={{
          padding: "15px",
          borderBottom: "1px solid #333",
          position: "sticky",
          top: 0,
          background: "#161616",
          zIndex: 10,
        }}
      >
        <h3 style={{ textAlign: "center", color: "cyan", marginBottom: "10px" }}>Files</h3>
        <button
          onClick={onUploadClick}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            background: "#222",
            border: "1px solid #444",
            color: "#ddd",
            cursor: "pointer",
          }}
        >
          Choose Files
        </button>
      </div>

      {/* Scrollable files */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 15px", minHeight: 0 }}>
        {images.length === 0 && <p style={{ opacity: 0.5, textAlign: "center" }}>No photos uploaded</p>}
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => {
              setCurrentIndex(i);
              setZoom(1);
            }}
            style={{
              padding: "6px 8px",
              marginBottom: "6px",
              borderRadius: "5px",
              cursor: "pointer",
              background: i === currentIndex ? "#2a2a2a" : "transparent",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "14px",
            }}
          >
            {img.name}
          </div>
        ))}
      </div>

      {/* Collections box */}
      <div
        style={{
          height: "220px",
          background: "#111",
          margin: "10px",
          borderRadius: "12px",
          border: "1px solid #333",
          padding: "10px",
          boxSizing: "border-box",
          flexShrink: 0,
          marginBottom: "20px", // Fixed bottom margin so rounded corners visible
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "16px" }}>
          <span>Collections</span>
          <button
            style={{
              background: "none",
              border: "none",
              color: "cyan",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => alert("Collection Add Clicked")}
          >
            ＋
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", overflowY: "auto", height: "150px" }}>
          {["Favorites", "LeetCode Uploads", "Profile Shots"].map((col, i) => (
            <div
              key={i}
              style={{
                background: "#1c1c1c",
                padding: "6px 8px",
                borderRadius: "8px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {col}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
