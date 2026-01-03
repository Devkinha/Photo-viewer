import React from "react";

export default function ThumbnailBar({ images, currentIndex, setCurrentIndex, deleteImage }) {
  return (
    <div
      style={{
        width: "90%",
        maxWidth: "820px",
        height: "120px",
        background: "#111",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        gap: "10px",
        overflowX: "auto",
        overflowY: "hidden",
        boxSizing: "border-box",
        borderTop: "1px solid #222",
        borderRadius: "0 0 12px 12px",
      }}
    >
      {images.map((img, i) => (
        <div key={i} style={{ width: "90px", height: "90px", flex: "0 0 auto", position: "relative" }}>
          <img
            src={img.url}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "6px",
              cursor: "pointer",
              border: i === currentIndex ? "2px solid cyan" : "1px solid #333",
            }}
            alt="thumb"
          />
          <button onClick={() => deleteImage(i)} style={deleteBtnStyle}>✕</button>
        </div>
      ))}
    </div>
  );
}

const deleteBtnStyle = {
  position: "absolute",
  top: "3px",
  right: "3px",
  background: "red",
  border: "none",
  color: "white",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  fontSize: "12px",
  cursor: "pointer",
};
