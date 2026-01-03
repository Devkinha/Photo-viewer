import React, { useRef } from "react";

export default function ImageViewer({ images, currentIndex, zoom, setZoom, onNext, onPrev }) {
  const startDistRef = useRef(null);
  const startZoomRef = useRef(1);

  const getDistance = (touches) => {
    const [t1, t2] = touches;
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      startDistRef.current = getDistance(e.touches);
      startZoomRef.current = zoom;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && startDistRef.current !== null) {
      const newDist = getDistance(e.touches);
      const scale = newDist / startDistRef.current;
      let newZoom = startZoomRef.current * scale;

      // clamp zoom
      newZoom = Math.min(Math.max(newZoom, 0.5), 4);
      setZoom(newZoom);
    }
  };

  const handleTouchEnd = () => {
    startDistRef.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{
        width: "90%",
        maxWidth: "820px",
        height: "60vh",
        background: "#333231",
        border: "2px solid #222",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {currentIndex === null ? (
        <span style={{ opacity: 0.6, fontSize: "18px" }}>No Image Selected</span>
      ) : (
        <img
          src={images[currentIndex]?.url}
          style={{
            transform: `scale(${zoom})`,  // ✔ Only image zooms now
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            transformOrigin: "center center",
            transition: "0.15s ease-out",
          }}
          alt="viewer"
        />
      )}

      {currentIndex !== null && (
        <>
          <button onClick={onPrev} style={navBtn("left")}>Prev</button>
          <button onClick={onNext} style={navBtn("right")}>Next</button>
        </>
      )}
    </div>
  );
}

const navBtn = (side) => ({
  position: "absolute",
  [side]: "12px",
  bottom: "12px",
  padding: "6px 10px",
  borderRadius: "6px",
  background: "#222",
  border: "1px solid #444",
  color: "#ccc",
  cursor: "pointer",
  fontSize: "13px",
});
