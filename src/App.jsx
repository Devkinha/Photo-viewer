import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [zoom, setZoom] = useState(1);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("photos")) || [];
    setImages(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("photos", JSON.stringify(images));
  }, [images]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const deleteImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (index === currentIndex) setCurrentIndex(null);
  };

  const nextImage = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % images.length);
    setZoom(1);
  };

  const prevImage = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    setZoom(1);
  };

  const zoomIn = () => setZoom((z) => z + 0.15);
  const zoomOut = () => setZoom((z) => (z > 0.5 ? z - 0.15 : z));


  {/*main screen div */ }
  return (

    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0f0f0f",
        color: "white",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* this is our heading part */}
      <div
        style={{
          height: "60px",
          background: "#141414",
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

      {/* main full page */}
      <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
        {/* left side file side bar */}
        <div
          style={{
            width: "260px",
            background: "#161616",
            borderRight: "1px solid #222",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            height: "100%",
          }}
        >

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
              onClick={() => fileInputRef.current.click()}
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
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              hidden
            />
          </div>

          {/*list of images */}
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

          {/* collection div */}
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
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "16px" }}>
              <span>Collections</span>
              <button style={{ background: "none", border: "none", color: "rgb(0,0,0)", fontSize: "20px", cursor: "pointer" }}>＋</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px", overflowY: "auto", height: "150px" }}>
              {["Favorites", "LeetCode Uploads", "Profile Shots"].map((col, i) => (
                <div key={i} style={{ background: "#1c1c1c", padding: "6px 8px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>
                  {col}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right side main viewer section */}
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflow: "hidden",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          {/* zoom bar */}
          <div
            style={{
              width: "90%",
              maxWidth: "820px",
              background: "#141414",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #333",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginBottom: "10px",
            }}
          >
            <button onClick={zoomOut} style={{ all: "unset", cursor: "pointer", fontSize: "14px", padding: "6px 12px", borderRadius: "6px", background: "#222", border: "1px solid #444", color: "#bbb" }}>− Zoom Out</button>
            <span style={{ fontSize: "15px", opacity: 0.8 }}>{Math.round(zoom * 100)}%</span>
            <button onClick={zoomIn} style={{ all: "unset", cursor: "pointer", fontSize: "14px", padding: "6px 12px", borderRadius: "6px", background: "#222", border: "1px solid #444", color: "#bbb" }}>+ Zoom In</button>
          </div>

          {/* image box viewing */}
          <div
            style={{
              width: "90%",
              maxWidth: "820px",
              height: "55vh",
              minHeight: "360px",
              background: "#000",
              border: "2px solid #222",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
              color: "#666",
              fontSize: "20px",
            }}
          >
            {currentIndex === null ? (
              <span>No Image Selected</span>
            ) : (
              <img
                src={images[currentIndex]?.url}
                style={{
                  transform: `scale(${zoom})`,
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  transition: "0.2s ease",
                }}
                alt="viewer"
              />
            )}

            {currentIndex !== null && (
              <>
                <button onClick={prevImage} style={{ position: "absolute", left: "10px", padding: "6px 10px", borderRadius: "6px", background: "#222", border: "1px solid #444", color: "#ccc", cursor: "pointer", fontSize: "13px" }}>Prev</button>
                <button onClick={nextImage} style={{ position: "absolute", right: "10px", padding: "6px 10px", borderRadius: "6px", background: "#222", border: "1px solid #444", color: "#ccc", cursor: "pointer", fontSize: "13px" }}>Next</button>
              </>
            )}
          </div>

          {/* information of image */}
          <div
            style={{
              width: "90%",
              maxWidth: "820px",
              background: "#1a1a1a",
              padding: "10px 15px",
              borderRadius: "8px",
              border: "1px solid #333",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "15px",
              margin: "10px 0",
            }}
          >
            <div style={{ width: "200px", textAlign: "left", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {currentIndex !== null ? images[currentIndex]?.name : "No Image"}
            </div>
            <div style={{ width: "120px", textAlign: "center" }}>
              {currentIndex !== null ? currentIndex + 1 : "—"} / {images.length}
            </div>
            <div style={{ width: "120px", textAlign: "right" }}>
              Total: {images.length}
            </div>
          </div>

          {/* lower photobar */}
          {images.length > 0 && (
            <div
              style={{
                width: "calc(100vw - 260px)",
                position: "absolute",
                bottom: 0,
                left: 260,
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
              }}
            >
              {images.map((img, i) => (
                <div key={i} style={{ width: "90px", height: "90px", flex: "0 0 auto", position: "relative" }}>
                  <img
                    src={img.url}
                    onClick={() => {
                      setCurrentIndex(i);
                      setZoom(1);
                    }}
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
                  <button
                    onClick={() => deleteImage(i)}
                    style={{
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
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
